// src/hooks/useGameState.ts
import { useState, useCallback, useEffect } from 'react';
import {DiceFace, DiceState, GameState} from "@/types/game";

const INITIAL_ACTIVE_DICE = 7;
const INITIAL_INACTIVE_DICE = 3;
const MAX_ROUNDS = 5;
const WINNING_SCORE = 30;

const OPPOSITE_FACES: Record<DiceFace, DiceFace> = {
    meeple: 'spaceship',
    spaceship: 'meeple',
    superhero: 'dragon',
    dragon: 'superhero',
    heart: '42',
    '42': 'heart'
};

const DICE_FACES: DiceFace[] = ['meeple', 'spaceship', 'superhero', 'heart', 'dragon', '42'];

const generateRandomDice = (count: number, prefix: string = '') => (
    Array.from({ length: count }, (_, index) => ({
        id: `${prefix}dice-${index}-${Date.now()}-${Math.random().toString(36).substr(2)}`,
        face: DICE_FACES[Math.floor(Math.random() * DICE_FACES.length)]
    }))
);

const calculateScore = (dice: DiceState[]) => {
    const count = dice.filter(d => d.face === '42').length;
    const scores: Record<number, number> = {
        1: 1, 2: 3, 3: 6, 4: 10, 5: 15,
        6: 21, 7: 28, 8: 36, 9: 45, 10: 55
    };
    return scores[count] || 0;
};

const initialGameState: GameState = {
    currentRound: 1,
    totalScore: 0,
    activeDice: [],
    inactiveDice: [],
    usedDice: [],
    scoredDice: [],
    isGameOver: false,
    hasWon: false,
    selectedDice: null,  // Para el dado que ejecutará la acción
    waitingForTarget: false,  // Para indicar si esperamos selección de objetivo
};

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);

    useEffect(() => {
        setGameState(prev => ({
            ...prev,
            activeDice: generateRandomDice(INITIAL_ACTIVE_DICE, 'active'),
            inactiveDice: generateRandomDice(INITIAL_INACTIVE_DICE, 'inactive')
        }));
    }, []);

    const startNewGame = useCallback(() => {
        setGameState({
            ...initialGameState,
            activeDice: generateRandomDice(INITIAL_ACTIVE_DICE, 'active'),
            inactiveDice: generateRandomDice(INITIAL_INACTIVE_DICE, 'inactive')
        });
    }, []);

    const handleDiceAction = useCallback((diceId: string, targetId?: string) => {
        setGameState(prevState => {
            // Si estamos esperando un objetivo y no se proporcionó uno, guardar el dado seleccionado
            if (!targetId && (prevState.selectedDice?.face === 'superhero' ||
                prevState.selectedDice?.face === 'meeple')) {
                return {
                    ...prevState,
                    selectedDice: prevState.activeDice.find(d => d.id === diceId) || null,
                    waitingForTarget: true
                };
            }

            const activeDice = [...prevState.activeDice];
            const diceIndex = activeDice.findIndex(d => d.id === diceId);

            if (diceIndex === -1) return prevState;

            // Primero mover el dado a usados
            const dice = activeDice.splice(diceIndex, 1)[0];
            const usedDice = [...prevState.usedDice, dice];
            const inactiveDice = [...prevState.inactiveDice];
            const scoredDice = [...prevState.scoredDice];

            // Ejecutar acción si quedan dados activos
            if (activeDice.length > 0) {
                switch (dice.face) {
                    case 'meeple':
                        if (targetId) {
                            const targetIndex = activeDice.findIndex(d => d.id === targetId);
                            if (targetIndex !== -1) {
                                activeDice[targetIndex] = {
                                    ...activeDice[targetIndex],
                                    face: DICE_FACES[Math.floor(Math.random() * DICE_FACES.length)]
                                };
                            }
                        }
                        break;

                    case 'spaceship':
                        const dragonIndex = activeDice.findIndex(d => d.face === 'dragon');
                        if (dragonIndex !== -1) {
                            const [removedDie] = activeDice.splice(dragonIndex, 1);
                            inactiveDice.push(removedDie);
                        }
                        break;

                    case 'superhero':
                        if (targetId) {
                            const targetIndex = activeDice.findIndex(d => d.id === targetId);
                            if (targetIndex !== -1) {
                                activeDice[targetIndex] = {
                                    ...activeDice[targetIndex],
                                    face: OPPOSITE_FACES[activeDice[targetIndex].face]
                                };
                            }
                        }
                        break;

                    case 'heart':
                        if (inactiveDice.length > 0) {
                            const [activatedDie] = inactiveDice.splice(
                                Math.floor(Math.random() * inactiveDice.length),
                                1
                            );
                            activeDice.push({
                                ...activatedDie,
                                face: DICE_FACES[Math.floor(Math.random() * DICE_FACES.length)]
                            });
                        }
                        break;
                }
            }

            // Verificar fin de turno
            if (activeDice.length === 0) {
                // Si el último dado es dragón, perdemos
                if (dice.face === 'dragon') {
                    return {
                        ...prevState,
                        activeDice,
                        inactiveDice,
                        usedDice,
                        scoredDice: [],
                        totalScore: 0,
                        isGameOver: true,
                        hasWon: false,
                        selectedDice: null,
                        waitingForTarget: false
                    };
                }

                // Si hay 42s, los movemos al área de puntuación
                const fortyTwos = usedDice.filter(d => d.face === '42');
                if (fortyTwos.length > 0) {
                    scoredDice.push(...fortyTwos);
                }

                const newScore = prevState.totalScore + calculateScore(scoredDice);
                const nextRound = prevState.currentRound + 1;
                const isGameOver = nextRound > MAX_ROUNDS;
                const hasWon = newScore >= WINNING_SCORE;

                if (isGameOver || hasWon) {
                    return {
                        ...prevState,
                        activeDice,
                        inactiveDice,
                        usedDice,
                        scoredDice,
                        totalScore: newScore,
                        currentRound: nextRound,
                        isGameOver: true,
                        hasWon,
                        selectedDice: null,
                        waitingForTarget: false
                    };
                }

                // Siguiente ronda
                return {
                    ...prevState,
                    activeDice: generateRandomDice(INITIAL_ACTIVE_DICE, 'active'),
                    inactiveDice: generateRandomDice(INITIAL_INACTIVE_DICE, 'inactive'),
                    usedDice: [],
                    scoredDice: [],
                    totalScore: newScore,
                    currentRound: nextRound,
                    selectedDice: null,
                    waitingForTarget: false
                };
            }

            // Actualizar estado durante la ronda
            return {
                ...prevState,
                activeDice,
                inactiveDice,
                usedDice,
                scoredDice,
                selectedDice: null,
                waitingForTarget: false
            };
        });
    }, []);

    return {
        gameState,
        startNewGame,
        handleDiceAction
    };
};