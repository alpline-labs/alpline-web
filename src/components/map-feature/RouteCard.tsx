import React from 'react';
import type { Route } from './types';
import { ROUTE_COLORS } from './config';

interface RouteCardProps {
    route: Route;
    index: number;
    isActive: boolean;
    onClick: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
    route,
    index,
    isActive,
    onClick
}) => {
    const rankLabel = index === 0 ? 'RECOMMENDED' : `Option ${index + 1}`;
    const color = (ROUTE_COLORS as any)[index === 0 ? 'primary' : `alternative${index}`] || ROUTE_COLORS.primary;

    return (
        <div
            className={`cursor-pointer p-4 mb-3 rounded-xl border-2 transition-all duration-200 ${isActive ? 'bg-primary/5 shadow-md' : 'bg-white hover:bg-gray-50'
                }`}
            onClick={onClick}
            style={{ borderColor: isActive ? color : 'transparent' }}
        >
            <div className="flex justify-between items-start mb-2">
                <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: color }}
                >
                    {rankLabel}
                </span>
            </div>
            <div className="flex gap-4 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{Math.round(route.duration / 60)} min</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>📏</span>
                    <span>{(route.distance / 1000).toFixed(2)} km</span>
                </div>
            </div>
        </div>
    );
};
