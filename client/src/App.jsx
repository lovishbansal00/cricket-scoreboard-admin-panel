import React, { useEffect } from "react";
import HeaderTabs from "./components/HeaderTabs";
import PlayerSelectors from "./components/PlayerSelectors";
import ScoreButtons from "./components/ScoreButtons";
import TeamScorecard from "./components/TeamScorecard";
import PlayerScorecard from "./components/PlayerScorecard";
import CommentaryList from "./components/CommentartyList";
import { useDispatch } from "react-redux";
import {
  setMatchId,
  setInningId,
  setOverId,
  setBattingTeamId,
  setBowlingTeamId,
} from "./store/matchSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  // Fetch match details from the backend
  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        console.log("test");
        const response = await axios.get(
          "http://localhost:8000/api/match-details/get"
        );
        const matchDetails = response.data;

        // Dispatch actions to store the match details
        dispatch(setMatchId(matchDetails.matchId));
        dispatch(setInningId(matchDetails.inningId));
        dispatch(setOverId("over1"));
        dispatch(setBattingTeamId(matchDetails.battingTeamId));
        dispatch(setBowlingTeamId(matchDetails.bowlingTeamId));
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [dispatch]);

  return (
    <div className="mx-auto p-4">
      <HeaderTabs className="mb-4" />
      <div className="flex">
        <div className="w-2/3">
          <PlayerSelectors className="p-4" />
          <ScoreButtons className="p-4" />
        </div>
        <div className="w-1/3">
          <TeamScorecard className="p-4" />
          <PlayerScorecard className="p-4" />
        </div>
      </div>
      <CommentaryList className="mt-4" />
    </div>
  );
}

export default App;
