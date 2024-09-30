// src/components/CommentaryList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentaryList = () => {
  const [inningsData, setInningsData] = useState([]);

  useEffect(() => {
    const fetchInningsData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/innings/');
         // Or `/api/innings/:matchId` for a specific match
        setInningsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching innings data:', error);
      }
    };

    fetchInningsData();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Ball By Ball Commentary</h3>
      <div className="mt-4">
        jnkjn
        {inningsData.map((inning, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mt-2">
            <p>
              {`Over ${inning.overs}: ${inning.battingTeam.name} vs ${inning.bowlingTeam.name} - ${inning.runs} runs`}
            </p>
            <button className="text-sm px-2 py-1 bg-blue-500 text-white rounded-md">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentaryList;
