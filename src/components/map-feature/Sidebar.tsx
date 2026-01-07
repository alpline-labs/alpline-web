"use client";

import React, { useState } from 'react';
import { SKILL_LEVELS, RESORTS } from './config';
import { RouteCard } from './RouteCard';
import { ClosuresPanel } from './ClosuresPanel';
import type { Location, Route } from './types';
import { MapPin, Navigation, Settings2, Calculator, X, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
    resortId: string;
    origin: Location | null;
    destination: Location | null;
    routes: Route[];
    onCalculateRoute: (request: {
        skillLevel: number;
        preferGroomed: boolean;
        avoidMoguls: boolean;
        showAlternatives: boolean;
    }) => void;
    onClearRoute: () => void;
    onRouteSelect: (index: number) => void;
    onResortChange: (resortId: string) => void;
    onOriginChange: (location: Location | null) => void;
    onDestinationChange: (location: Location | null) => void;
    activeRouteIndex: number;
    loading?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    resortId,
    origin,
    destination,
    routes,
    onCalculateRoute,
    onClearRoute,
    onRouteSelect,
    onResortChange,
    onOriginChange,
    onDestinationChange,
    activeRouteIndex,
    loading
}) => {
    const [skillLevel, setSkillLevel] = useState(2);
    const [preferGroomed, setPreferGroomed] = useState(true);
    const [avoidMoguls, setAvoidMoguls] = useState(false);
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    // Local state for inputs to allow typing
    const [originText, setOriginText] = useState('');
    const [destText, setDestText] = useState('');

    const formatLocation = (loc: Location | null) => {
        if (!loc) return '';
        return `${loc.lat.toFixed(5)}, ${loc.lon.toFixed(5)}`;
    };

    // Sync local state when props change (e.g. from map click)
    React.useEffect(() => {
        if (origin) {
            setOriginText(formatLocation(origin));
        } else if (origin === null) {
            // Only clear if explicitly null (cleared), ideally we might want to keep text if user typed invalid
            // But for now, sync with source of truth
            setOriginText('');
        }
    }, [origin]);

    React.useEffect(() => {
        if (destination) {
            setDestText(formatLocation(destination));
        } else if (destination === null) {
            setDestText('');
        }
    }, [destination]);

    const parseLocation = (str: string): Location | null => {
        const parts = str.split(',').map(s => s.trim());
        if (parts.length === 2) {
            const lat = parseFloat(parts[0]);
            const lon = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lon)) {
                return { lat, lon };
            }
        }
        return null;
    };

    const handleOriginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setOriginText(val);
        const loc = parseLocation(val);
        if (loc) {
            onOriginChange(loc);
        }
    };

    const handleDestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDestText(val);
        const loc = parseLocation(val);
        if (loc) {
            onDestinationChange(loc);
        }
    };

    const handleCalculate = () => {
        onCalculateRoute({
            skillLevel,
            preferGroomed,
            avoidMoguls,
            showAlternatives
        });
    };

    return (
        <div className="absolute top-4 left-4 z-10 w-full max-w-[400px] h-[calc(100%-2rem)] flex flex-col pointer-events-none">
            {/* Main Panel */}
            <div className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 pointer-events-auto flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Navigation className="text-white w-5 h-5" />
                        </div>
                        <h2 className="font-bold text-xl text-gray-900 tracking-tight">Plan Route</h2>
                    </div>
                    <div className="relative group">
                        <select
                            value={resortId}
                            onChange={(e) => onResortChange(e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 pr-8 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            {Object.entries(RESORTS).map(([id, resort]) => (
                                <option key={id} value={id}>
                                    {resort.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    {/* Origin */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 py-1">
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-white"></div>
                            <div className="w-0.5 h-6 bg-gray-200"></div>
                        </div>
                        <input
                            type="text"
                            value={originText}
                            onChange={handleOriginInput}
                            placeholder="Click map or type (lat, lon)"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary/20 transition-all truncate"
                        />
                    </div>

                    {/* Destination */}
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <MapPin className="w-4 h-4 text-red-500" />
                        </div>
                        <input
                            type="text"
                            value={destText}
                            onChange={handleDestInput}
                            placeholder="Click map or type (lat, lon)"
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary/20 transition-all truncate"
                        />
                        {(origin || destination) && (
                            <button
                                onClick={() => {
                                    onClearRoute();
                                    setOriginText('');
                                    setDestText('');
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="border-t border-b py-4 space-y-4">
                    <button
                        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        className="flex items-center justify-between w-full text-sm font-bold text-gray-700 hover:text-primary transition-colors pr-2"
                    >
                        <div className="flex items-center gap-2">
                            <Settings2 className="w-4 h-4" />
                            Route Options
                        </div>
                        {isOptionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    {isOptionsOpen && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {/* Skill Level */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Skill Level</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {SKILL_LEVELS.map((level) => (
                                        <button
                                            key={level.value}
                                            onClick={() => setSkillLevel(level.value)}
                                            className={`p-2 rounded-lg border-2 text-center transition-all ${skillLevel === level.value
                                                ? 'border-primary bg-primary/5 shadow-sm scale-105'
                                                : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                                }`}
                                            title={level.label}
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full mx-auto"
                                                style={{ backgroundColor: level.color }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 gap-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={preferGroomed}
                                        onChange={(e) => setPreferGroomed(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary transition-all"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Prefer groomed runs</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={avoidMoguls}
                                        onChange={(e) => setAvoidMoguls(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary transition-all"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Avoid moguls</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={showAlternatives}
                                        onChange={(e) => setShowAlternatives(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary transition-all"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Show 3 route options</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleCalculate}
                        disabled={!origin || !destination || loading}
                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Calculator className="w-5 h-5" />
                                Calculate Route
                            </>
                        )}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto mt-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                    {/* Route Results */}
                    {routes.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 leading-none">Suggested Routes</h3>
                            <div className="space-y-4">
                                {routes.map((route, index) => (
                                    <RouteCard
                                        key={index}
                                        route={route}
                                        index={index}
                                        isActive={index === activeRouteIndex}
                                        onClick={() => onRouteSelect(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Closures */}
                    <ClosuresPanel resortId={resortId} />
                </div>
            </div>
        </div>
    );
};
