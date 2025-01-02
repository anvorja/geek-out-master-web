'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/game/GameBoard';
import HelpCard from '@/components/game/HelpCard';
import { useGameState } from '@/hooks/useGameState';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const { gameState, startNewGame, handleDiceAction } = useGameState();
    const {
        currentRound,
        totalScore,
        activeDice,
        inactiveDice,
        usedDice,
        isGameOver,
        hasWon
    } = gameState;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600">Cargando juego...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            {isGameOver && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                        <Alert className={hasWon ? "bg-green-50" : "bg-red-50"}>
                            <AlertTitle className="text-xl font-bold mb-2">
                                {hasWon ? "¡Felicitaciones!" : "Juego Terminado"}
                            </AlertTitle>
                            <AlertDescription className="text-lg">
                                {hasWon
                                    ? `¡Has ganado con ${totalScore} puntos!`
                                    : `Has conseguido ${totalScore} puntos en ${currentRound} rondas.`}
                            </AlertDescription>
                        </Alert>
                        <div className="mt-6 flex justify-center">
                            <Button onClick={startNewGame}>
                                Jugar de Nuevo
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                    Geek Out Masters
                </h1>

                <GameBoard
                    currentRound={currentRound}
                    totalScore={totalScore}
                    activeDice={activeDice}
                    inactiveDice={inactiveDice}
                    usedDice={usedDice}
                    onDiceClick={handleDiceAction}
                    onNewGame={startNewGame}
                    onShowHelp={() => setShowHelp(true)}
                    selectedDice={gameState.selectedDice} // new
                    waitingForTarget={gameState.waitingForTarget} // new
                />

                <HelpCard
                    isOpen={showHelp}
                    onClose={() => setShowHelp(false)}
                />
            </div>
        </main>
    );
}