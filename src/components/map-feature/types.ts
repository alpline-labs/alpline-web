export interface Location {
    lat: number;
    lon: number;
}

export interface Route {
    geometry: any; // GeoJSON.LineString
    distance: number;
    duration: number;
    rank?: number;
    score?: number;
}

export interface Closure {
    id: string;
    resortId: string;
    type: 'lift' | 'trail' | 'area' | 'terrain_park';
    name: string;
    reason: string;
    severity: 'closed' | 'restricted' | 'cautioned';
    startTime: number;
    endTime?: number;
    isActive: boolean;
    lastUpdated: number;
}

export interface Resort {
    id: string;
    name: string;
    center: [number, number];
    zoom: number;
    bbox: [number, number, number, number];
}

export interface RouteRequest {
    origin: Location;
    destination: Location;
    skillLevel: 1 | 2 | 3 | 4;
    resortId: string;
    preferGroomed?: boolean;
    avoidMoguls?: boolean;
    alternatives?: number;
}

export interface RouteResponse {
    success: boolean;
    routes: Route[];
    cached?: boolean;
    computeTime?: number;
}

export interface ClosuresResponse {
    success: boolean;
    resortId: string;
    closures: Closure[];
    lastUpdated: number;
    totalCount: number;
}
