// // src/components/game/GameBoard.tsx
// import React from 'react';
// import DiceArea from './DiceArea';
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardTitle,
// } from "@/components/ui/card";
// import { Info } from 'lucide-react';
// import {GameBoardProps} from "@/types/game";
//
//
// export default function GameBoard({
//                                       currentRound,
//                                       totalScore,
//                                       activeDice,
//                                       inactiveDice,
//                                       usedDice,
//                                       onDiceClick,
//                                       onNewGame,
//                                       onShowHelp,
//                                   }: GameBoardProps) {
//     return (
//         <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
//             {/* Header con información del juego */}
//             <div className="flex justify-between items-center">
//                 <Card className="p-4">
//                     <CardTitle className="text-lg">Ronda: {currentRound}/5</CardTitle>
//                 </Card>
//                 <Card className="p-4">
//                     <CardTitle className="text-lg">Puntos: {totalScore}</CardTitle>
//                 </Card>
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={onShowHelp}
//                     className="rounded-full"
//                 >
//                     <Info className="h-6 w-6" />
//                 </Button>
//             </div>
//
//             {/* Áreas de juego */}
//             <div className="grid gap-6 md:grid-cols-2">
//                 <DiceArea
//                     title="Dados Activos"
//                     diceList={activeDice}
//                     onDiceClick={onDiceClick}
//                     className="md:col-span-2"
//                 />
//
//                 <DiceArea
//                     title="Dados Inactivos"
//                     diceList={inactiveDice}
//                     className="bg-gray-50"
//                 />
//
//                 <DiceArea
//                     title="Dados Utilizados"
//                     diceList={usedDice}
//                     className="bg-gray-50"
//                 />
//             </div>
//
//             {/* Footer con recordatorio y botón de nuevo juego */}
//             <Card className="mt-4">
//                 <CardContent className="p-4">
//                     <Alert>
//                         <Info className="h-4 w-4" />
//                         <AlertTitle>Recuerda</AlertTitle>
//                         <AlertDescription>
//                             Debes conseguir 30 puntos en 5 rondas para ganar. ¡Usa tus dados sabiamente!
//                         </AlertDescription>
//                     </Alert>
//                 </CardContent>
//                 <CardFooter className="flex justify-center">
//                     <Button onClick={onNewGame} variant="outline">
//                         Nuevo Juego
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }

// src/components/game/GameBoard.tsx
import React from 'react';
import DiceArea from './DiceArea';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Info } from 'lucide-react';
import { GameBoardProps } from "@/types/game";

export default function GameBoard({
                                      currentRound,
                                      totalScore,
                                      activeDice,
                                      inactiveDice,
                                      usedDice,
                                      onDiceClick,
                                      onNewGame,
                                      onShowHelp,
                                      selectedDice,
                                      waitingForTarget,
                                  }: GameBoardProps) {

    const getStatusMessage = () => {
        if (waitingForTarget) {
            switch (selectedDice?.face) {
                case 'superhero':
                    return 'Selecciona un dado para voltearlo';
                case 'meeple':
                    return 'Selecciona un dado para relanzarlo';
                case 'spaceship':
                    return 'Selecciona un dragón para enviarlo a inactivos';
                default:
                    return '';
            }
        }
        return 'Debes conseguir 30 puntos en 5 rondas para ganar. ¡Usa tus dados sabiamente!';
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            {/* Header con información del juego */}
            <div className="flex justify-between items-center">
                <Card className="p-4">
                    <CardTitle className="text-lg">Ronda: {currentRound}/5</CardTitle>
                </Card>
                <Card className="p-4">
                    <CardTitle className="text-lg">Puntos: {totalScore}</CardTitle>
                </Card>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onShowHelp}
                    className="rounded-full"
                >
                    <Info className="h-6 w-6" />
                </Button>
            </div>

            {/* Áreas de juego */}
            <div className="grid gap-6 md:grid-cols-2">
                <DiceArea
                    title="Dados Activos"
                    diceList={activeDice}
                    onDiceClick={onDiceClick}
                    className="md:col-span-2"
                    selectedDice={selectedDice}
                    waitingForTarget={waitingForTarget}
                />

                <DiceArea
                    title="Dados Inactivos"
                    diceList={inactiveDice}
                    className="bg-gray-50"
                    selectedDice={selectedDice}
                    waitingForTarget={waitingForTarget}
                />

                <DiceArea
                    title="Dados Utilizados"
                    diceList={usedDice}
                    className="bg-gray-50"
                    selectedDice={selectedDice}
                    waitingForTarget={waitingForTarget}
                />
            </div>

            {/* Footer con recordatorio y botón de nuevo juego */}
            <Card className="mt-4">
                <CardContent className="p-4">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Recuerda</AlertTitle>
                        <AlertDescription>
                            {getStatusMessage()}
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={onNewGame} variant="outline">
                        Nuevo Juego
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}