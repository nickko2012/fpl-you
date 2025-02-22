import { useState } from 'react';

export default function Home() {
  const [teamId, setTeamId] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const fetchTeamData = async () => {
    try {
      const response = await fetch(`/api/fpl?teamId=${teamId}`);
      const data = await response.json();
      if (data.error) {
        setResult(data.error);
      } else {
        setResult(`Team: ${data.team.name}, Points: ${data.team.summary_overall_points}`);
      }
    } catch {
      setResult('Error fetching data');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FPL Checker</h1>
      <input
        type="text"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="Team ID"
      />
      <button onClick={fetchTeamData}>Check</button>
      {result && <p>{result}</p>}
    </div>
  );
}