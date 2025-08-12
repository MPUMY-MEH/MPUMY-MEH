import { NextResponse } from 'next/server';
import { getBusinessById } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id);
  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(business);
}