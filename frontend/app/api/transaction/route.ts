// app/api/transaction/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const take = searchParams.get('take') || '10';
    const offset = searchParams.get('offset') || '0';

    try {
        const res = await fetch(
            `http://localhost:8080/api/transaction?take=${take}&offset=${offset}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Add auth headers if needed
                },
            }
        );

        if (!res.ok) {
            return Response.json(
                { error: 'Failed to fetch transactions' },
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the request body first

        const res = await fetch(
            `http://localhost:8080/api/transaction`,
            {
                method: 'POST', // Don't forget this!
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body) // Stringify the parsed body
            }
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return Response.json(
                { error: 'Failed to create transaction', details: errorData },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data);

    } catch (error) {
        console.error('Transaction API error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}