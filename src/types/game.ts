// src/types/game.ts

export type DiceFace = 'meeple' | 'spaceship' | 'superhero' | 'heart' | 'dragon' | '42';

export interface DiceState {
    id: string;
    face: DiceFace;
    disabled?: boolean;
}

// export interface DiceProps {
//     face: DiceFace;
//     disabled?: boolean;
//     onClick?: () => void;
//     size?: 'sm' | 'md' | 'lg';
//     tooltipContent?: string;
//     isActive?: boolean;
// }
export interface DiceProps {
    face: DiceFace;
    disabled?: boolean;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    tooltipContent?: string;
    isActive?: boolean;
    isSelected?: boolean;
    isValidTarget?: boolean;
}

export interface HelpCardProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface GameBoardProps {
    currentRound: number;
    totalScore: number;
    activeDice: DiceState[];
    inactiveDice: DiceState[];
    usedDice: DiceState[];
    onDiceClick: (id: string) => void;
    onNewGame: () => void;
    onShowHelp: () => void;
    selectedDice: DiceState | null;
    waitingForTarget: boolean;
}

// export interface DiceAreaProps {
//     title: string;
//     diceList: DiceState[];
//     onDiceClick?: (id: string) => void;
//     className?: string;
// }
export interface DiceAreaProps {
    title: string;
    diceList: DiceState[];
    onDiceClick?: (id: string) => void;
    className?: string;
    selectedDice: DiceState | null;
    waitingForTarget: boolean;
}

export interface GameState {
    currentRound: number;
    totalScore: number;
    activeDice: DiceState[];
    inactiveDice: DiceState[];
    usedDice: DiceState[];
    isGameOver: boolean;
    hasWon: boolean;
    scoredDice: DiceState[];
    selectedDice: DiceState | null;
    waitingForTarget: boolean;
}