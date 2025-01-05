// src/components/game/DiceArea.tsx
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Dice from './Dice';
// import { DiceAreaProps } from '@/types/game';
//
// export default function DiceArea({
//                                      title,
//                                      diceList,
//                                      onDiceClick,
//                                      className = ''
//                                  }: DiceAreaProps) {
//     return (
//         <Card className={`w-full ${className}`}>
//             <CardHeader className="p-4">
//                 <CardTitle className="text-xl font-bold text-center text-primary">
//                     {title}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-wrap gap-4 justify-center p-4 min-h-[120px]">
//                 {diceList.map((dice) => (
//                     <Dice
//                         key={dice.id}
//                         face={dice.face}
//                         disabled={dice.disabled}
//                         onClick={() => onDiceClick?.(dice.id)}
//                         size="md"
//                         tooltipContent={`Click para usar ${dice.face}`}
//                     />
//                 ))}
//             </CardContent>
//         </Card>
//     );
// }

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dice from './Dice';
import { DiceAreaProps, DiceState } from '@/types/game';

export default function DiceArea({
                                     title,
                                     diceList,
                                     onDiceClick,
                                     className = '',
                                     selectedDice = null,
                                     waitingForTarget = false
                                 }: DiceAreaProps) {
    const isValidTarget = (dice: DiceState) => {
        if (!waitingForTarget || !selectedDice) return false;

        switch (selectedDice.face) {
            case 'superhero':
            case 'meeple':
                return true;
            case 'spaceship':
                return dice.face === 'dragon';
            default:
                return false;
        }
    };

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-bold text-center text-primary">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 justify-center p-4 min-h-[120px]">
                {diceList.map((dice) => (
                    <Dice
                        key={dice.id}
                        face={dice.face}
                        disabled={dice.disabled}
                        onClick={() => onDiceClick?.(dice.id)}
                        size="md"
                        tooltipContent={getTooltipContent(dice, selectedDice, waitingForTarget)}
                        isSelected={selectedDice?.id === dice.id}
                        isValidTarget={isValidTarget(dice)}
                    />
                ))}
            </CardContent>
        </Card>
    );
}

function getTooltipContent(
    dice: DiceState,
    selectedDice: DiceState | null,
    waitingForTarget: boolean
) {
    if (waitingForTarget && selectedDice) {
        switch (selectedDice.face) {
            case 'superhero':
                return 'Click para voltear este dado';
            case 'meeple':
                return 'Click para relanzar este dado';
            case 'spaceship':
                if (dice.face === 'dragon') {
                    return 'Click para enviar este dragón a inactivos';
                }
        }
    }

    return `Click para usar ${dice.face}`;
}
