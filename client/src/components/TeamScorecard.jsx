// src/components/TeamScorecard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TeamScorecard = () => {
  const [scorecard, setScorecard] = useState(null);
  const matchId = useSelector((state) => state.match.matchId); // Get matchId from Redux store

  useEffect(() => {
    const fetchScorecard = async () => {
      if (!matchId) return; // Don't fetch if matchId is not set
      try {
        const response = await axios.get(`http://localhost:8000/api/match/${matchId}`);
        setScorecard(response.data);
      } catch (error) {
        console.error('Error fetching scorecard:', error);
      }
    };

    fetchScorecard();
  }, [matchId]);


  const { match, innings } = scorecard;

  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Team Scorecard</h3>
      <div className="mb-4">
        <p className="text-lg">{match.team1Id.teamName} vs {match.team2Id.teamName}</p>
        {innings.map((inning, index) => (
          <div key={index}>
            <p>{inning.battingTeam.teamName}: {inning.runs} / {inning.wickets} in {inning.overs} overs</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <p>Wide: {innings.reduce((total, inning) => total + inning.wide || 0, 0)}</p>
        <p>NoBall: {innings.reduce((total, inning) => total + inning.noBall || 0, 0)}</p>
        <p>Legbyes: {innings.reduce((total, inning) => total + inning.legByes || 0, 0)}</p>
        <p>Byes: {innings.reduce((total, inning) => total + inning.byes || 0, 0)}</p>
      </div>
    </div>
  );
};

export default TeamScorecard;
