export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiYWxpZW5wZW5ndWluIiwiYSI6ImNtanNtdTBtejQ3azEzZXF6NDN2aDR1eTcifQ.WxUkk7QMpoUn9Y4YMEXk2Q';
export const API_BASE_URL = '';

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

export const ROUTE_COLORS = {
    primary: '#1a73e8',
    alternative1: '#34a853',
    alternative2: '#fbbc04',
    alternative3: '#ea4335'
};

export const SKILL_LEVELS = [
    { value: 1, label: '🟢 Beginner (Green)', color: '#4CAF50' },
    { value: 2, label: '🔵 Intermediate (Blue)', color: '#2196F3' },
    { value: 3, label: '🔴 Advanced (Red)', color: '#F44336' },
    { value: 4, label: '⚫ Expert (Black)', color: '#000000' }
];
