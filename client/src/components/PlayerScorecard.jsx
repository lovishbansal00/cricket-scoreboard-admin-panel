// src/components/PlayerScorecard.tsx
import React from 'react';

const PlayerScorecard = () => {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">Player Scorecard</h3>

      {/* Batsman Section */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Batsman</h4>
        <div className="border rounded-md p-2 mb-2">Player 1 Name + Runs</div>
        <div className="border rounded-md p-2 mb-2">Player 2 Name + Runs</div>
        <div className="border rounded-md p-2">Player 3 Name + Runs</div>
      </div>

      {/* Bowler Section */}
      <div>
        <h4 className="font-semibold mb-2">Bowler</h4>
        <div className="border rounded-md p-2 mb-2">Player 1 Name + Runs + Overs + Maidens</div>
        <div className="border rounded-md p-2">Player 2 Name + Runs + Overs + Maidens</div>
      </div>
    </div>
  );
};

export default PlayerScorecard;
