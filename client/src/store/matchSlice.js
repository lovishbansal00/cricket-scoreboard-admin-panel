import { createSlice } from '@reduxjs/toolkit';

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    matchId: null,
    inningId: null,
    overId: null,
    battingTeamId: null,
    bowlingTeamId: null,
    strikerBatsmanId: null, // New
    nonStrikerBatsmanId: null, // New
    bowlerId: null, // New
    ballId: null, // New
  },
  reducers: {
    setMatchId: (state, action) => {
      state.matchId = action.payload;
    },
    setInningId: (state, action) => {
      state.inningId = action.payload;
    },
    setOverId: (state, action) => {
      state.overId = action.payload;
    },
    setBattingTeamId: (state, action) => {
      state.battingTeamId = action.payload;
    },
    setBowlingTeamId: (state, action) => {
      state.bowlingTeamId = action.payload;
    },
    setStrikerBatsmanId: (state, action) => {
      state.strikerBatsmanId = action.payload;
    },
    setNonStrikerBatsmanId: (state, action) => {
      state.nonStrikerBatsmanId = action.payload;
    },
    setBowlerId: (state, action) => {
      state.bowlerId = action.payload;
    },
    setBallId: (state, action) => {
      state.ballId = action.payload;
    },
  },
});

// Export actions
export const {
  setMatchId,
  setInningId,
  setOverId,
  setBattingTeamId,
  setBowlingTeamId,
  setStrikerBatsmanId,
  setNonStrikerBatsmanId,
  setBowlerId,
  setBallId,
} = matchSlice.actions;

// Export the reducer
export default matchSlice.reducer;
