import { NextResponse } from 'next/server';
import { addMessage, getMessages } from '@/lib/db';
import { createMessageSchema } from '@/lib/validation';

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = createMessageSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const message = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };
  await addMessage(message);
  return NextResponse.json(message, { status: 201 });
}