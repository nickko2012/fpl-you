import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method === 'GET' && req.query.teamId) {
    const teamId = req.query.teamId as string;
    try {
      const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
      
      // Handle different error scenarios
      if (response.status === 404) {
        return res.status(404).json({ error: 'Team not found' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Too many requests' });
      }
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch team data' });
      }

      const teamData = await response.json();
      res.status(200).json({ team: teamData });
    } catch (error) {
      console.error('FPL API Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'Please provide a valid Team ID' });
  }
}