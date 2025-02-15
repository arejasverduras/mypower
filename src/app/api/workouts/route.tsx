// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import workouts from'../../../../cypress/fixtures/workouts.json';


// GET requests
export async function GET() {
    
    return NextResponse.json(workouts, {status: 200});
}