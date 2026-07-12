import { NextResponse } from 'next/server';
import cf from '@/lib/cloudflare/client';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const analytics = await cf.dns.analytics.reports.bytimes.get({
            zone_id: id,
            since: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            until: new Date().toISOString(),
            metrics: 'queryCount'
        });
        return NextResponse.json(analytics);
    } catch (error) {
        console.error('Analytics fetch error:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch analytics',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}