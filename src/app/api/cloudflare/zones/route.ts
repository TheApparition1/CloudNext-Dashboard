import { NextResponse } from 'next/server';
import cf from '@/lib/cloudflare/client';

export async function GET() {
    try {
        console.log('Fetching zones from Cloudflare...');
        console.log('API Token present:', !!process.env.CLOUDFLARE_API_TOKEN);
        const zones = await cf.zones.list();
        console.log('Zones fetched successfully:', zones);
        return NextResponse.json(zones);
    } catch (error) {
        console.error('Error fetching zones:', error);
        return NextResponse.json({ error: 'Failed to fetch zones', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}