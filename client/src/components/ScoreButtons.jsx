import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ScoreButtons = () => {
  const [selectedRun, setSelectedRun] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [isWicket, setIsWicket] = useState(false);
  const [isNewBall, setIsNewBall] = useState(false);

  const buttonClasses = "p-4 border text-sm font-semibold rounded-md text-center";
  const selectedClasses = "bg-green-500 text-white";

  const matchId = useSelector((state) => state.match.matchId);
  const inningId = useSelector((state) => state.match.inningId);
  const overId = useSelector((state) => state.match.overId);

  // New ball creation handler
  const handleNewBall = async () => {
    try {
      // API call to create a new ball
      await axios.post('http://localhost:8000/api/ball/create');
      setIsNewBall(true);  // Disable the New Ball button
    } catch (error) {
      console.error('Error creating new ball:', error);
    }
  };

  // Run selection handler
  const handleRunSelect = (run) => {
    if (isWicket) return;  // If wicket is selected, do nothing
    setSelectedRun(run);
  };

  // Extra selection handler
  const handleExtraSelect = (extra) => {
    if (isWicket) return;  // If wicket is selected, do nothing
    setSelectedExtra(extra);
  };

  // Wicket selection handler
  const handleWicketSelect = () => {
    setSelectedRun(null);   // Deselect runs
    setSelectedExtra(null); // Deselect extras
    setIsWicket(true);      // Mark as wicket
  };

  // Done button handler
  const handleDone = async () => {
    try {
      const ballData = {
        runsScored: selectedRun || 0,
        isWicket,
        isExtra: !!selectedExtra,
        extraType: selectedExtra,
      };

      // API call to update the ball
      await axios.put('/api/ball/update', ballData);

      // Reset state after submission
      setSelectedRun(null);
      setSelectedExtra(null);
      setIsWicket(false);
      setIsNewBall(false); // Re-enable the New Ball button after the done
    } catch (error) {
      console.error('Error updating ball:', error);
    }
  };

  return (
    <div className="p-4">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <button
          className={`${buttonClasses} ${selectedRun === 0 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(0)}
          disabled={isWicket || !isNewBall}
        >
          0
        </button>
        <button
          className={`${buttonClasses} ${selectedRun === 1 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(1)}
          disabled={isWicket || !isNewBall}
        >
          1
        </button>
        <button
          className={`${buttonClasses} ${selectedRun === 2 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(2)}
          disabled={isWicket || !isNewBall}
        >
          2
        </button>
        <button
          className={`${buttonClasses} ${selectedRun === 3 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(3)}
          disabled={isWicket || !isNewBall}
        >
          3
        </button>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <button
          className={`${buttonClasses} ${selectedRun === 4 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(4)}
          disabled={isWicket || !isNewBall}
        >
          4
        </button>
        <button
          className={`${buttonClasses} ${selectedRun === 6 ? selectedClasses : ""}`}
          onClick={() => handleRunSelect(6)}
          disabled={isWicket || !isNewBall}
        >
          6
        </button>
        <button
          className={`${buttonClasses} ${isWicket ? selectedClasses : ""} col-span-2`}
          onClick={handleWicketSelect}
          disabled={!isNewBall}
        >
          Wicket
        </button>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          className={`${buttonClasses} ${selectedExtra === 'Wide' ? selectedClasses : ""}`}
          onClick={() => handleExtraSelect('Wide')}
          disabled={isWicket || !isNewBall}
        >
          Wide
        </button>
        <button
          className={`${buttonClasses} ${selectedExtra === 'Noball' ? selectedClasses : ""}`}
          onClick={() => handleExtraSelect('Noball')}
          disabled={isWicket || !isNewBall}
        >
          Noball
        </button>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          className={`${buttonClasses} ${selectedExtra === 'Bye' ? selectedClasses : ""}`}
          onClick={() => handleExtraSelect('Bye')}
          disabled={isWicket || !isNewBall}
        >
          Bye
        </button>
        <button
          className={`${buttonClasses} ${selectedExtra === 'Legbye' ? selectedClasses : ""}`}
          onClick={() => handleExtraSelect('Legbye')}
          disabled={isWicket || !isNewBall}
        >
          Legbye
        </button>
      </div>

      {/* Fifth Row */}
      <div className="grid grid-cols-1">
        <button
          className={buttonClasses}
          onClick={handleNewBall}
          disabled={isNewBall}  // Disable when a ball is active
        >
          New Ball
        </button>
      </div>

      {/* Done Button */}
      {isNewBall && (
        <div className="grid grid-cols-1 mt-4">
          <button
            className={buttonClasses}
            onClick={handleDone}
            disabled={!isNewBall || (!selectedRun && !selectedExtra && !isWicket)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreButtons;
