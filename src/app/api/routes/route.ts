import { NextRequest, NextResponse } from 'next/server';

const GH_URL = 'http://localhost:8989';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { origin, destination, skillLevel, alternatives } = body;

        // 1. Construct Custom Model based on skill level
        // This implements the "OsmAnd Parity" logic
        const customModel = {
            // "base": "foot", // Removed as per server config
            speed: [
                { "if": "aerialway != MISSING", "limit_to": 30 }, // Lifts are fast
                { "if": "piste_type == DOWNHILL", "limit_to": 60 },
                { "if": "piste_type == NORDIC", "limit_to": 10 },
                { "else": "", "limit_to": 4 }
            ],
            priority: [
                // Base priority
                { "if": "piste_type == MISSING && aerialway == MISSING", "multiply_by": 0.1 },
                { "if": "aerialway != MISSING", "multiply_by": 0.9 },

                // Skill Level Logic
                // Level 1 (Beginner): STRICTLY avoid Black/Red
                ...(skillLevel === 1 ? [
                    { "if": "piste_difficulty == BLACK", "multiply_by": 0.0 },
                    { "if": "piste_difficulty == RED", "multiply_by": 0.0 }
                ] : []),

                // Level 2 (Intermediate): Avoid Black
                ...(skillLevel === 2 ? [
                    { "if": "piste_difficulty == BLACK", "multiply_by": 0.0 }
                ] : []),

                // Level 3 (Advanced): Prefer Red/Black, avoid nothing specific
                ...(skillLevel === 3 ? [
                    { "if": "piste_difficulty == BLACK", "multiply_by": 1.0 }
                ] : []),

                // Level 4 (Expert): Same as advanced, maybe prefers harder
                ...(skillLevel === 4 ? [
                    { "if": "piste_difficulty == BLACK", "multiply_by": 1.2 }
                ] : [])
            ]
        };

        // 2. Call GraphHopper
        // We use the /route endpoint with the generic 'ski' profile but override logic with 'custom_model'
        const ghResponse = await fetch(`${GH_URL}/route`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                points: [
                    [origin.lon, origin.lat],
                    [destination.lon, destination.lat]
                ],
                profile: 'ski',
                elevation: true,
                instructions: true,
                calc_points: true,
                points_encoded: false,
                'ch.disable': true, // Required for custom models
                custom_model: customModel,
                algorithm: alternatives ? 'alternative_route' : undefined,
                'alternative_route.max_paths': alternatives ? 3 : undefined
            })
        });

        if (!ghResponse.ok) {
            const errText = await ghResponse.text();
            let errorMessage = errText;
            try {
                // Try to parse GH error JSON to get the "message" field
                // GH returns { message: "...", hints: [...] }
                const errJson = JSON.parse(errText);
                if (errJson.message) {
                    errorMessage = errJson.message;
                }
            } catch (e) {
                // process as text
            }
            console.error('GH Error:', errorMessage);
            return NextResponse.json({ success: false, error: errorMessage }, { status: ghResponse.status });
        }

        const ghData = await ghResponse.json();

        // 3. Map Response to frontend format
        // GraphHopper returns { paths: [...] }
        const routes = ghData.paths.map((path: any) => ({
            geometry: path.points, // GeoJSON LineString (since points_encoded: false)
            distance: path.distance,
            duration: path.time / 1000,
            score: path.score
        }));

        return NextResponse.json({ success: true, routes });

    } catch (error) {
        console.error('Route Proxy Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
