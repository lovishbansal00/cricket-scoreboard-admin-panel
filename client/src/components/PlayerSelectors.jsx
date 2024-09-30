import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStrikerBatsmanId, setNonStrikerBatsmanId, setBowlerId } from '../store/matchSlice'; 

const PlayerSelectors = () => {
  const [battingPlayers, setBattingPlayers] = useState([]);
  const [bowlingPlayers, setBowlingPlayers] = useState([]);
  const [selectedStriker, setSelectedStriker] = useState('');
  const [selectedNonStriker, setSelectedNonStriker] = useState('');
  
  const dispatch = useDispatch(); 

  const { battingTeamId, bowlingTeamId } = useSelector((state) => state.match);

  useEffect(() => {
    // Fetch batting team players
    const fetchBattingPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/player/getBatsman/${battingTeamId}`);
        setBattingPlayers(response.data);
      } catch (error) {
        console.error('Error fetching batting players:', error);
      }
    };

    // Fetch bowling team players (bowlers only)
    const fetchBowlingPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/player/getBowlers/${bowlingTeamId}`);
        setBowlingPlayers(response.data);
      } catch (error) {
        console.error('Error fetching bowling players:', error);
      }
    };

    if (battingTeamId) fetchBattingPlayers();
    if (bowlingTeamId) fetchBowlingPlayers();
  }, [battingTeamId, bowlingTeamId]);

  // Handle selection for striker
  const handleStrikerChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStriker(selectedValue); 
    dispatch(setStrikerBatsmanId(selectedValue)); 
  };

  // Handle selection for non-striker
  const handleNonStrikerChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedNonStriker(selectedValue); 
    dispatch(setNonStrikerBatsmanId(selectedValue)); 
  };

  // Handle selection for bowler
  const handleBowlerChange = (e) => {
    dispatch(setBowlerId(e.target.value)); 
  };

  return (
    <div className="flex space-x-4 p-4">
      <div className="flex flex-col">
        <label className="text-sm">Batsman (Striker)</label>
        <select className="border p-2 rounded-md" onChange={handleStrikerChange}>
          <option value="">Select Striker</option>
          {battingPlayers.map((player) => (
            <option 
              key={player._id} 
              value={player._id}
              disabled={player._id === selectedNonStriker} 
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Batsman (Non-Striker)</label>
        <select className="border p-2 rounded-md" onChange={handleNonStrikerChange}>
          <option value="">Select Non-Striker</option>
          {battingPlayers.map((player) => (
            <option 
              key={player._id} 
              value={player._id}
              disabled={player._id === selectedStriker} 
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Bowler</label>
        <select className="border p-2 rounded-md" onChange={handleBowlerChange}>
          <option value="">Select Bowler</option>
          {bowlingPlayers.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlayerSelectors;
