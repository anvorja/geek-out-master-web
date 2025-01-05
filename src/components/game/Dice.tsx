// src/components/game/Dice.tsx
// import React from 'react';
// import {
//     Rocket,
//     Heart,
//     Flame,
//     User2,
//     Shield,
//     Binary
// } from 'lucide-react';
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { DiceProps, DiceFace } from '@/types/game';
//
// const diceColors = {
//     meeple: 'bg-green-500',
//     spaceship: 'bg-green-500',
//     superhero: 'bg-yellow-500',
//     heart: 'bg-red-500',
//     dragon: 'bg-yellow-500',
//     '42': 'bg-red-500'
// };
//
// const DiceIcon = ({ face }: { face: DiceFace }) => {
//     switch (face) {
//         case 'meeple':
//             return <User2 className="w-full h-full p-2 text-white" />;
//         case 'spaceship':
//             return <Rocket className="w-full h-full p-2 text-white" />;
//         case 'superhero':
//             return <Shield className="w-full h-full p-2 text-white" />;
//         case 'heart':
//             return <Heart className="w-full h-full p-2 text-white" />;
//         case 'dragon':
//             return <Flame className="w-full h-full p-2 text-white" />;
//         case '42':
//             return <Binary className="w-full h-full p-2 text-white" />;
//     }
// };
//
// const getDiceSize = (size: 'sm' | 'md' | 'lg') => {
//     switch (size) {
//         case 'sm':
//             return 'w-12 h-12';
//         case 'md':
//             return 'w-16 h-16';
//         case 'lg':
//             return 'w-20 h-20';
//     }
// };
//
// export default function Dice({
//                                  face,
//                                  disabled = false,
//                                  onClick,
//                                  size = 'md',
//                                  tooltipContent,
//                                  isActive = true
//                              }: DiceProps) {
//     const baseClasses = `
//     relative
//     rounded-lg
//     shadow-lg
//     transition-all
//     duration-200
//     transform
//     cursor-pointer
//     hover:scale-105
//     active:scale-95
//     ${getDiceSize(size)}
//     ${diceColors[face]}
//     ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
//     ${isActive ? 'hover:shadow-xl' : 'opacity-70'}
//   `;
//
//     const dice = (
//         <div
//             className={baseClasses}
//             onClick={!disabled ? onClick : undefined}
//             role="button"
//             tabIndex={disabled ? -1 : 0}
//             aria-disabled={disabled}
//             aria-label={`Dado ${face}`}
//         >
//             <DiceIcon face={face} />
//         </div>
//     );
//
//     if (tooltipContent) {
//         return (
//             <TooltipProvider>
//                 <Tooltip>
//                     <TooltipTrigger asChild>
//                         {dice}
//                     </TooltipTrigger>
//                     <TooltipContent>
//                         <p>{tooltipContent}</p>
//                     </TooltipContent>
//                 </Tooltip>
//             </TooltipProvider>
//         );
//     }
//
//     return dice;
// }
import React from 'react';
import {
    Rocket,
    Heart,
    Flame,
    User2,
    Shield,
    Binary
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {DiceFace, DiceProps} from '@/types/game';

const diceColors = {
    meeple: 'bg-green-500',
    spaceship: 'bg-green-500',
    superhero: 'bg-yellow-500',
    heart: 'bg-red-500',
    dragon: 'bg-yellow-500',
    '42': 'bg-red-500'
};

const DiceIcon = ({ face }: { face: DiceFace }) => {
    switch (face) {
        case 'meeple':
            return <User2 className="w-full h-full p-2 text-white" />;
        case 'spaceship':
            return <Rocket className="w-full h-full p-2 text-white" />;
        case 'superhero':
            return <Shield className="w-full h-full p-2 text-white" />;
        case 'heart':
            return <Heart className="w-full h-full p-2 text-white" />;
        case 'dragon':
            return <Flame className="w-full h-full p-2 text-white" />;
        case '42':
            return <Binary className="w-full h-full p-2 text-white" />;
    }
};

const getDiceSize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        case 'sm':
            return 'w-12 h-12';
        case 'md':
            return 'w-16 h-16';
        case 'lg':
            return 'w-20 h-20';
    }
};

export default function Dice({
                                 face,
                                 disabled = false,
                                 onClick,
                                 size = 'md',
                                 tooltipContent,
                                 isActive = true,
                                 isSelected = false,
                                 isValidTarget = false
                             }: DiceProps) {
    const baseClasses = `
        relative 
        rounded-lg 
        shadow-lg 
        transition-all 
        duration-200 
        transform 
        cursor-pointer 
        hover:scale-105 
        active:scale-95
        ${getDiceSize(size)}
        ${diceColors[face]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isActive ? 'hover:shadow-xl' : 'opacity-70'}
        ${isSelected ? 'ring-4 ring-blue-500' : ''}
        ${isValidTarget ? 'ring-4 ring-green-500' : ''}
    `;

    const dice = (
        <div
            className={baseClasses}
            onClick={!disabled ? onClick : undefined}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-label={`Dado ${face}`}
        >
            <DiceIcon face={face} />
        </div>
    );

    if (tooltipContent) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {dice}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltipContent}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return dice;
}