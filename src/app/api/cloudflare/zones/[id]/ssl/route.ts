import { NextResponse } from 'next/server';
import cf from '@/lib/cloudflare/client';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const ssl = await cf.zones.settings.get('ssl', {
            zone_id: id
        });
        return NextResponse.json(ssl);
    } catch (error) {
        console.error('SSL fetch error:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch SSL settings',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}