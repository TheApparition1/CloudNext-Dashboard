import { NextResponse } from 'next/server';
import cf from '@/lib/cloudflare/client';

export async function GET() {
    try {
        const zones = await cf.zones.list();
        return NextResponse.json(zones);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 500 });
    }
}