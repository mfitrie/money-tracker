import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const BASE_URL = process.env.API_URL;


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    try {
        const res = await fetch(
            `${BASE_URL}/backend-api/dashboard/currentweekspend`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch current week spend" },
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