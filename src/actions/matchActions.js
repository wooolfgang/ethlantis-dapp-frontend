import * as types from '../constants/ActionTypes';

export const addMatches = matches => ({
  type: types.MATCHES_ADD,
  matches,
});

export const getMatches = (web3, matchBetting, matchCountFromLatest) => async (dispatch) => {
  let matchesCount = await matchBetting.getMatchesCount();
  matchesCount = matchesCount.toNumber();

  if (matchCountFromLatest > matchesCount) {
    matchCountFromLatest = matchesCount; // eslint-disable-line no-param-reassign
  }

  const matchIndexes = [];

  for (let i = matchesCount - 1; i >= matchesCount - matchCountFromLatest; i -= 1) {
    matchIndexes.push(i);
  }

  const matchesInfo = await matchBetting.getMatchesInfo(matchIndexes);
  const matchesStatus = await matchBetting.getMatchesStatus(matchIndexes);
  const matchesResult = await matchBetting.getMatchesResult(matchIndexes);
  const matches = matchesInfo.concat(matchesStatus).concat(matchesResult);
  const newMatches = [];

  for (let i = 0; i < matches[0].length; i += 1) {
    const newMatch = {};
    for (let j = 0; j < matches.length; j += 1) {
      switch (j) {
        case 0:
          newMatch.id = matches[j][i].toNumber();
          break;
        case 1:
          newMatch.startTime = matches[j][i].toNumber();
          break;
        case 2:
          newMatch.matchId = matches[j][i].toNumber();
          break;
        case 3:
          newMatch.teamA = web3.utils.toAscii(matches[j][i]).replace(/\u0000/g, '');
          break;
        case 4:
          newMatch.teamB = web3.utils.toAscii(matches[j][i]).replace(/\u0000/g, '');
          break;
        case 5:
          newMatch.gameType = web3.utils.toAscii(matches[j][i]).replace(/\u0000/g, '');
          break;
        case 6:
          newMatch.withdrawable = matches[j][i];
          break;
        case 7:
          newMatch.canceled = matches[j][i];
          break;
        case 8:
          newMatch.bettable = matches[j][i];
          break;
        case 9:
          newMatch.winner = web3.utils.toAscii(matches[j][i]).replace(/\u0000/g, '');
          break;
        case 10:
          newMatch.teamATotalBets = matches[j][i].toNumber();
          break;
        case 11:
          newMatch.teamBTotalBets = matches[j][i].toNumber();
          break;
        default:
          return;
      }
    }
    newMatches.push(newMatch);
  }
  dispatch(addMatches(newMatches));
};
