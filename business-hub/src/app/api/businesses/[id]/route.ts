import { NextResponse } from 'next/server';
import { getBusinessById, updateBusinessPartial } from '@/lib/db';
import { updateBusinessSchema } from '@/lib/validation';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id);
  if (!business) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(business);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const parsed = updateBusinessSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const updated = await updateBusinessPartial(params.id, parsed.data);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}