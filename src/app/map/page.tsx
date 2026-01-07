"use client";

import React, { useState } from 'react';
import { Map } from '@/components/map-feature/Map';
import { Sidebar } from '@/components/map-feature/Sidebar';
import { RESORTS } from '@/components/map-feature/config';
import { apiClient } from '@/components/map-feature/api';
import type { Location, Route } from '@/components/map-feature/types';
import { Header } from '@/components/sections/header';

export default function MapPage() {
    const [resortId, setResortId] = useState<keyof typeof RESORTS>('zermatt');
    const [origin, setOrigin] = useState<Location | null>(null);
    const [destination, setDestination] = useState<Location | null>(null);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [activeRouteIndex, setActiveRouteIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const resort = RESORTS[resortId];

    const handleMapClick = (location: Location) => {
        if (!origin) {
            setOrigin(location);
        } else if (!destination) {
            setDestination(location);
        } else {
            setOrigin(location);
            setDestination(null);
            setRoutes([]);
        }
    };

    const handleCalculateRoute = async (options: {
        skillLevel: number;
        preferGroomed: boolean;
        avoidMoguls: boolean;
        showAlternatives: boolean;
    }) => {
        if (!origin || !destination) return;

        setLoading(true);
        try {
            const response = await apiClient.calculateRoute({
                origin,
                destination,
                skillLevel: options.skillLevel as 1 | 2 | 3 | 4,
                resortId,
                preferGroomed: options.preferGroomed,
                avoidMoguls: options.avoidMoguls,
                alternatives: options.showAlternatives ? 3 : 0
            });

            if (response.success && response.routes.length > 0) {
                setRoutes(response.routes);
                setActiveRouteIndex(0);
            }
        } catch (error) {
            console.error('Route calculation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearRoute = () => {
        setOrigin(null);
        setDestination(null);
        setRoutes([]);
        setActiveRouteIndex(0);
    };

    const handleResortChange = (newResortId: string) => {
        setResortId(newResortId as keyof typeof RESORTS);
        handleClearRoute();
    };

    return (
        <main className="relative h-screen w-full flex flex-col overflow-hidden">
            {/* Minimal Header for Map */}
            <div className="z-20 bg-white/80 backdrop-blur border-b">
                <Header />
            </div>

            <div className="relative flex-1">
                <Map
                    center={resort.center}
                    zoom={resort.zoom}
                    onMapClick={handleMapClick}
                    routes={routes}
                    origin={origin}
                    destination={destination}
                />

                <Sidebar
                    resortId={resortId}
                    origin={origin}
                    destination={destination}
                    routes={routes}
                    onCalculateRoute={handleCalculateRoute}
                    onClearRoute={handleClearRoute}
                    onRouteSelect={setActiveRouteIndex}
                    onResortChange={handleResortChange}
                    onOriginChange={setOrigin}
                    onDestinationChange={setDestination}
                    activeRouteIndex={activeRouteIndex}
                    loading={loading}
                />
            </div>
        </main>
    );
}
