import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.teamId) {
    const teamId = req.query.teamId as string;
    try {
      const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
      if (!response.ok) throw new Error('Invalid Team ID');
      const teamData = await response.json();
      res.status(200).json({ team: teamData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team' });
    }
  } else {
    res.status(400).json({ error: 'Provide a Team ID' });
  }
}