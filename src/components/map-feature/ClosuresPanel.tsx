import React, { useEffect, useState } from 'react';
import { apiClient } from './api';
import type { Closure } from './types';

interface ClosuresPanelProps {
    resortId: string;
}

export const ClosuresPanel: React.FC<ClosuresPanelProps> = ({ resortId }) => {
    const [closures, setClosures] = useState<Closure[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadClosures();
    }, [resortId]);

    const loadClosures = async () => {
        setLoading(true);
        try {
            const response = await apiClient.getClosures(resortId);
            setClosures(response.closures);
        } catch (error) {
            console.warn('Failed to load closures:', error);
            setClosures([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 leading-none">Active Closures</h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{closures.length}</span>
            </div>

            {loading ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm italic py-2">
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    Loading...
                </div>
            ) : closures.length === 0 ? (
                <p className="text-gray-500 text-sm italic py-2">No active closures</p>
            ) : (
                <div className="space-y-3">
                    {closures.map((closure) => (
                        <div
                            key={closure.id}
                            className={`p-3 rounded-lg border flex flex-col gap-1 transition-colors ${closure.severity === 'closed'
                                    ? 'bg-red-50 border-red-100'
                                    : closure.severity === 'restricted'
                                        ? 'bg-orange-50 border-orange-100'
                                        : 'bg-yellow-50 border-yellow-100'
                                }`}
                        >
                            <div className="text-sm font-bold text-gray-900">{closure.name}</div>
                            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                                {closure.type.replace('_', ' ')} • {closure.reason.replace('_', ' ')}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
