import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/notion';

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts para API:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
