"use client";

import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { MAPTILER_API_KEY } from './config';

interface MapProps {
    center: [number, number];
    zoom: number;
}

export const Map: React.FC<MapProps> = ({ center, zoom }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        maptilersdk.config.apiKey = MAPTILER_API_KEY;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.WINTER,
            center,
            zoom,
            pitch: 45,
            bearing: 0,
            projection: 'globe',
            terrain: true,
            terrainExaggeration: 1.5,
        });

        map.current.addControl(new maptilersdk.NavigationControl({
            showCompass: true,
            visualizePitch: true
        }), 'bottom-right');

        map.current.addControl(
            new maptilersdk.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
            }),
            'bottom-right'
        );

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update map center when resort changes
    useEffect(() => {
        if (map.current) {
            map.current.flyTo({ center, zoom, duration: 2000, essential: true });
        }
    }, [center, zoom]);

    return <div ref={mapContainer} className="w-full h-full bg-blue-50" />;
};
