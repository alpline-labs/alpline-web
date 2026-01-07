"use client";

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from './config';
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
    const map = useRef<mapboxgl.Map | null>(null);
    const originMarker = useRef<mapboxgl.Marker | null>(null);
    const destMarker = useRef<mapboxgl.Marker | null>(null);

    const onMapClickRef = useRef(onMapClick);

    useEffect(() => {
        onMapClickRef.current = onMapClick;
    }, [onMapClick]);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center,
            zoom,
            pitch: 45,
            bearing: 0,
            antialias: true
        });

        map.current.addControl(new mapboxgl.NavigationControl({
            showCompass: true,
            visualizePitch: true
        }), 'bottom-right');

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
                showUserHeading: true
            }),
            'bottom-right'
        );

        map.current.on('load', () => {
            if (!map.current) return;

            // Add 3D terrain
            map.current.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
            });

            map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

            // Add sky layer
            map.current.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });

            // Load ski infrastructure
            loadSkiInfrastructure();
        });

        // Click handler
        const handleClick = (e: mapboxgl.MapMouseEvent) => {
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

    const loadSkiInfrastructure = async () => {
        if (!map.current) return;

        try {
            // Load pistes (ski runs)
            const pistesResponse = await fetch('/ski-data/pistes.geojson');
            if (pistesResponse.ok) {
                const pistesData = await pistesResponse.json();

                if (!map.current.getSource('pistes')) {
                    map.current.addSource('pistes', {
                        type: 'geojson',
                        data: pistesData
                    });

                    // Add layers
                    const difficulties = [
                        { id: 'pistes-easy', filter: ['in', ['get', 'piste:difficulty'], ['literal', ['novice', 'easy', 'eaasy']]], color: '#4CAF50' },
                        { id: 'pistes-intermediate', filter: ['in', ['get', 'piste:difficulty'], ['literal', ['intermediate', 'medium', 'blue']]], color: '#2196F3' },
                        { id: 'pistes-advanced', filter: ['==', ['get', 'piste:difficulty'], 'advanced'], color: '#F44336' },
                        { id: 'pistes-expert', filter: ['in', ['get', 'piste:difficulty'], ['literal', ['expert', 'extreme', 'freeride', 'L']]], color: '#000000' }
                    ];

                    difficulties.forEach(diff => {
                        map.current!.addLayer({
                            id: diff.id,
                            type: 'line',
                            source: 'pistes',
                            filter: ['all', ['==', ['geometry-type'], 'LineString'], diff.filter],
                            paint: {
                                'line-color': diff.color,
                                'line-width': 2.5,
                                'line-opacity': 0.8
                            }
                        });
                    });
                }
            }

            // Load lifts
            const liftsResponse = await fetch('/ski-data/lifts.geojson');
            if (liftsResponse.ok) {
                const liftsData = await liftsResponse.json();

                if (!map.current.getSource('lifts')) {
                    map.current.addSource('lifts', {
                        type: 'geojson',
                        data: liftsData
                    });

                    map.current.addLayer({
                        id: 'lifts',
                        type: 'line',
                        source: 'lifts',
                        filter: ['==', ['geometry-type'], 'LineString'],
                        paint: {
                            'line-color': '#FF6B6B',
                            'line-width': 2,
                            'line-dasharray': [3, 2],
                            'line-opacity': 0.8
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Error loading ski infrastructure:', error);
        }
    };

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
            originMarker.current = new mapboxgl.Marker({ element: el })
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
            destMarker.current = new mapboxgl.Marker({ element: el })
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
                (bounds: mapboxgl.LngLatBounds, coord: any) => bounds.extend(coord as [number, number]),
                new mapboxgl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number])
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
