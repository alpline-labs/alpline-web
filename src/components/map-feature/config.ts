// MapTiler key: must be NEXT_PUBLIC_-prefixed to reach the browser bundle
// (this module is imported from "use client" components). The un-prefixed
// fallback only works server-side and is kept for backwards compatibility.
export const MAPTILER_API_KEY =
    process.env.NEXT_PUBLIC_MAPTILER_API_KEY || process.env.MAPTILER_API_KEY || '';

export const RESORTS = {
    zermatt: {
        id: 'zermatt',
        name: 'Zermatt',
        center: [7.75, 46.02] as [number, number],
        zoom: 13,
        bbox: [7.7, 45.9, 7.8, 46.1] as [number, number, number, number]
    },
    verbier: {
        id: 'verbier',
        name: 'Verbier',
        center: [7.3, 46.0] as [number, number],
        zoom: 13,
        bbox: [7.2, 45.9, 7.4, 46.1] as [number, number, number, number]
    },
    davos: {
        id: 'davos',
        name: 'Davos',
        center: [9.85, 46.8] as [number, number],
        zoom: 13,
        bbox: [9.8, 46.7, 10.0, 46.9] as [number, number, number, number]
    }
};
