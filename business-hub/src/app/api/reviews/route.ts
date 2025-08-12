import { NextResponse } from 'next/server';
import { addReview, getReviewsForBusiness } from '@/lib/db';
import { createReviewSchema } from '@/lib/validation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get('businessId');
  if (!businessId) return NextResponse.json({ error: 'businessId required' }, { status: 400 });
  const reviews = await getReviewsForBusiness(businessId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = createReviewSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const review = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };
  await addReview(review);
  return NextResponse.json(review, { status: 201 });
}