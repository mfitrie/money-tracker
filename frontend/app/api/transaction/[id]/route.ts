import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const BASE_URL = process.env.API_URL;

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    console.log("ID: ", id);

    try {
        const res = await fetch(
            `${BASE_URL}/backend-api/transaction/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return Response.json(
                { error: 'Failed to delete transaction', details: errorData },
                { status: res.status }
            );
        }

        return new Response(null, { status: 204 });

    } catch (error) {
        console.error('Transaction API error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}