import React from 'react';

const TeamScorecard = () => {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Team Scorecard</h3>
      <div className="mb-4">
        <p className="text-lg">Static Team Name</p>
        <p>Runs / Wickets</p>
        <p>Balls & Overs</p>
      </div>
      <div className="border-t pt-4">
        <p>Wide: 0</p>
        <p>NoBall: 0</p>
        <p>Legbyes: 0</p>
        <p>Byes: 0</p>
      </div>
    </div>
  );
};

export default TeamScorecard;