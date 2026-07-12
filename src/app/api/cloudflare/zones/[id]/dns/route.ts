import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${id}/dns_records`, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                error: 'Failed to fetch DNS records',
                details: data
            }, { status: response.status });
        }

        return NextResponse.json(data.result);
    } catch (error) {
        console.error('DNS fetch error:', error);
        return NextResponse.json({
            error: 'Failed to fetch DNS records',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}