import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Log the incoming Team ID
  const teamId = req.nextUrl.searchParams.get('teamId');
  console.log('Received Team ID:', teamId);

  if (!teamId) {
    console.log('No Team ID provided');
    return NextResponse.json({ error: 'Provide a Team ID' }, { status: 400 });
  }

  try {
    // Log before fetching from FPL API
    console.log('Fetching team data for ID:', teamId);
    const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
    
    // Log the response status
    console.log('FPL API Response Status:', response.status);
    if (!response.ok) {
      console.log('FPL API failed with status:', response.status);
      throw new Error('Invalid Team ID');
    }
    
    const teamData = await response.json();
    console.log('Team data fetched successfully:', teamData.name);
    
    return NextResponse.json({ team: teamData });
  } catch (e) {
    // Log the error details
    console.error('Error in API route:', e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}