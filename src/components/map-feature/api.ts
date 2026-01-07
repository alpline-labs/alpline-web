import { API_BASE_URL } from './config';
import type { RouteRequest, RouteResponse, ClosuresResponse } from './types';

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async calculateRoute(request: RouteRequest): Promise<RouteResponse> {
        const response = await fetch(`${this.baseUrl}/api/routes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Route calculation failed: ${response.statusText}`);
        }

        return response.json();
    }

    async getClosures(resortId: string): Promise<ClosuresResponse> {
        const response = await fetch(
            `${this.baseUrl}/api/closures?resortId=${resortId}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch closures: ${response.statusText}`);
        }

        return response.json();
    }

    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

export const apiClient = new ApiClient();
