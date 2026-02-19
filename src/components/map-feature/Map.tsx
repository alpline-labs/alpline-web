"use client";

import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { MAPTILER_API_KEY } from './config';
import type { Location, Route } from './types';

interface MapProps {
    center: [number, number];
    zoom: number;
    onMapClick: (location: Location) => void;
    routes: Route[];
    origin: Location | null;
    destination: Location | null;
}

export const Map: React.FC<MapProps> = ({
    center,
    zoom,
    onMapClick,
    routes,
    origin,
    destination
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const originMarker = useRef<maptilersdk.Marker | null>(null);
    const destMarker = useRef<maptilersdk.Marker | null>(null);

    const onMapClickRef = useRef(onMapClick);

    useEffect(() => {
        onMapClickRef.current = onMapClick;
    }, [onMapClick]);

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

        // Click handler
        const handleClick = (e: maptilersdk.MapMouseEvent) => {
            onMapClickRef.current({ lat: e.lngLat.lat, lon: e.lngLat.lng });
        };

        map.current.on('click', handleClick);

        return () => {
            if (map.current) {
                map.current.off('click', handleClick);
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Update map center when resort changes
    useEffect(() => {
        if (map.current) {
            map.current.flyTo({ center, zoom, duration: 2000, essential: true });
        }
    }, [center, zoom]);

    // Update origin marker
    useEffect(() => {
        if (!map.current) return;
        if (originMarker.current) originMarker.current.remove();

        if (origin) {
            const el = createMarkerElement('A', '#3b82f6');
            originMarker.current = new maptilersdk.Marker({ element: el })
                .setLngLat([origin.lon, origin.lat])
                .addTo(map.current);
        }
    }, [origin]);

    // Update destination marker
    useEffect(() => {
        if (!map.current) return;
        if (destMarker.current) destMarker.current.remove();

        if (destination) {
            const el = createMarkerElement('B', '#ef4444');
            destMarker.current = new maptilersdk.Marker({ element: el })
                .setLngLat([destination.lon, destination.lat])
                .addTo(map.current);
        }
    }, [destination]);

    // Update routes
    useEffect(() => {
        if (!map.current) return;

        // Clean up old routes
        for (let i = 0; i < 10; i++) {
            if (map.current.getLayer(`route-${i}`)) {
                map.current.removeLayer(`route-${i}`);
                map.current.removeSource(`route-${i}`);
            }
        }

        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

        routes.forEach((route, index) => {
            if (!map.current) return;
            const color = colors[index] || colors[0];

            map.current.addSource(`route-${index}`, {
                type: 'geojson',
                data: route.geometry
            });

            map.current.addLayer({
                id: `route-${index}`,
                type: 'line',
                source: `route-${index}`,
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: {
                    'line-color': color,
                    'line-width': index === 0 ? 6 : 4,
                    'line-opacity': index === 0 ? 1 : 0.7
                }
            });
        });

        if (routes.length > 0) {
            const coordinates = routes[0].geometry.coordinates;
            const bounds = coordinates.reduce(
                (bounds: maptilersdk.LngLatBounds, coord: any) => bounds.extend(coord as [number, number]),
                new maptilersdk.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number])
            );
            map.current.fitBounds(bounds, { padding: 100, duration: 1000 });
        }
    }, [routes]);

    return <div ref={mapContainer} className="w-full h-full bg-blue-50" />;
};

function createMarkerElement(label: string, color: string): HTMLDivElement {
    const el = document.createElement('div');
    el.className = 'relative flex items-center justify-center';
    el.style.width = '32px';
    el.style.height = '32px';

    // Pin shape
    const pin = document.createElement('div');
    pin.style.width = '32px';
    pin.style.height = '32px';
    pin.style.borderRadius = '50% 50% 50% 0';
    pin.style.background = color;
    pin.style.transform = 'rotate(-45deg)';
    pin.style.border = '2px solid white';
    pin.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    el.appendChild(pin);

    const text = document.createElement('div');
    text.textContent = label;
    text.className = 'absolute font-bold text-white text-sm';
    text.style.top = '6px';
    el.appendChild(text);

    return el;
}
