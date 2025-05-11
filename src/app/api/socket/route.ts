import { NextResponse } from 'next/server';
import { initSocket } from '@/lib/websocket';

export async function GET(req: Request, res: any) {
    try {
        const io = initSocket(res);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Socket initialization error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize socket' },
            { status: 500 }
        );
    }
} 