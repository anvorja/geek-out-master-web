// src/components/game/HelpCard.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Dice from './Dice';
import { HelpCardProps } from '@/types/game';

export default function HelpCard({ isOpen, onClose }: HelpCardProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Cómo jugar Geek Out Masters</DialogTitle>
                    <DialogDescription>
                        Aprende las reglas básicas del juego
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] p-4">
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-semibold mb-2">Objetivo del Juego</h3>
                            <p>
                                Consigue la mayor cantidad de puntos juntando dados con la cara 42.
                                Necesitas 30 puntos en 5 rondas para ganar.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold">Caras del Dado</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Dice face="meeple" size="sm" />
                                    <span>Meeple: Relanza otro dado activo</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Dice face="spaceship" size="sm" />
                                    <span>Nave: Envía un dado a inactivos</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Dice face="superhero" size="sm" />
                                    <span>Superhéroe: Voltea un dado</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Dice face="heart" size="sm" />
                                    <span>Corazón: Activa un dado inactivo</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Dice face="dragon" size="sm" />
                                    <span>Dragón: ¡Cuidado! Pierdes puntos</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Dice face="42" size="sm" />
                                    <span>42: Suma puntos al final</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold mb-2">Reglas Importantes</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Debes usar TODAS las caras de los dados activos</li>
                                <li>Si terminas con un dragón activo, pierdes todos los puntos</li>
                                <li>Los dados usados no pueden volver al juego</li>
                                <li>El orden de tus acciones es importante para la estrategia</li>
                                <li>Las caras opuestas son:
                                    <ul className="list-disc pl-6 mt-2">
                                        <li>Meeple ↔ Nave Espacial</li>
                                        <li>Dragón ↔ Superhéroe</li>
                                        <li>Corazón ↔ 42</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold mb-2">Puntuación</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>1 dado 42 = 1 punto</div>
                                <div>2 dados 42 = 3 puntos</div>
                                <div>3 dados 42 = 6 puntos</div>
                                <div>4 dados 42 = 10 puntos</div>
                                <div>5 dados 42 = 15 puntos</div>
                                <div>6 dados 42 = 21 puntos</div>
                            </div>
                        </section>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}