// app/api/transaction/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const take = searchParams.get('take') || '10';
    const offset = searchParams.get('offset') || '0';

    const params = new URLSearchParams({
        take: take.toString(),
        offset: offset.toString(),
    });
    if (type) {
        params.append("type", type);
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/category?${params.toString()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Add auth headers if needed
                },
            }
        );

        if (!res.ok) {
            return Response.json(
                { error: 'Failed to fetch categories' },
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