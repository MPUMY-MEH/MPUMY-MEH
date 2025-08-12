import { NextResponse } from 'next/server';
import { addPromotion, getPromotionsForBusiness } from '@/lib/db';
import { createPromotionSchema } from '@/lib/validation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get('businessId');
  if (!businessId) return NextResponse.json({ error: 'businessId required' }, { status: 400 });
  const promos = await getPromotionsForBusiness(businessId);
  return NextResponse.json(promos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = createPromotionSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const promo = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };
  await addPromotion(promo);
  return NextResponse.json(promo, { status: 201 });
}