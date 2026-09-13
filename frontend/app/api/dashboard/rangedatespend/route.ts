import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const BASE_URL = process.env.API_URL;


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const dateFrom = request.nextUrl.searchParams.get("dateFrom");
    const dateTo = request.nextUrl.searchParams.get("dateTo");

    try {
        const url = new URL(`${BASE_URL}/backend-api/dashboard/rangedatespend`);
        url.searchParams.set("dateFrom", dateFrom ?? "");
        url.searchParams.set("dateTo", dateTo ?? "");

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