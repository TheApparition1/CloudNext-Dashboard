import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${id}/settings/ssl`, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                error: 'Failed to fetch SSL settings',
                details: data
            }, { status: response.status });
        }

        return NextResponse.json(data.result);
    } catch (error) {
        console.error('SSL fetch error:', error);
        return NextResponse.json({
            error: 'Failed to fetch SSL settings',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}