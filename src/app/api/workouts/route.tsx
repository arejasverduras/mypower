import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET requests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { tags: { some: { name: { contains: search } } } },
          { createdBy: { name: { contains: search } } },
          { exercises: { some: { exercise: { title: { contains: search } } } } },
        ],
      },
      include: {
        createdBy: true,
        tags: true,
        exercises: { include: { exercise: true } },
        likedBy: true,
        programs: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workouts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}