import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/todaysspend`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Add auth headers if needed
                },
            }
        );

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch today's expense" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data);

    } catch (error) {
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}