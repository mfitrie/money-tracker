import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const BASE_URL = process.env.API_URL;


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const date_from = request.nextUrl.searchParams.get("date_from");
    const date_to = request.nextUrl.searchParams.get("date_to");

    try {
        const url = new URL(`${BASE_URL}/backend-api/dashboard/rangedatespend?`);
        url.searchParams.set("date_from", date_from ?? "");
        url.searchParams.set("date_to", date_to ?? "");

        const res = await fetch(
            url.toString(),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch range date spend" },
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