import * as types from '../constants/ActionTypes';
import { getBetPercentage } from '../utils';

export const addMatches = matches => ({
  type: types.MATCHES_ADD,
  matches,
});

export const addMatchesFetching = payload => ({
  type: types.MATCHES_ADD_FETCHING,
  payload,
});

export const getMatches = matchCountFromLatest => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;

  if (!contract || !web3) throw new Error('No contract or web3 found');

  dispatch(addMatchesFetching(true));

  let matchesCount = await contract.getMatchesCount();
  matchesCount = matchesCount.toNumber();

  if (matchCountFromLatest > matchesCount) {
    matchCountFromLatest = matchesCount; // eslint-disable-line no-param-reassign
  }

  const matchIndexes = [];

  for (let i = matchesCount - 1; i >= matchesCount - matchCountFromLatest; i -= 1) {
    matchIndexes.push(i);
  }

  const matchesInfo = await contract.getMatchesInfo(matchIndexes);
  const matchesStatus = await contract.getMatchesStatus(matchIndexes);
  const matchesResult = await contract.getMatchesResult(matchIndexes);
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

    const teamABets = matches[10][i].toNumber();
    const teamBBets = matches[11][i].toNumber();
    const total = teamABets + teamBBets;

    newMatch.teamAPercentage = getBetPercentage(teamABets, total);
    newMatch.teamBPercentage = getBetPercentage(teamBBets, total);
    newMatches.push(newMatch);
  }

  dispatch(addMatches(newMatches));
  dispatch(addMatchesFetching(false));
};

export const getMatch = matchId => async (dispatch, getState) => {
  const { contract, web3 } = getState().web3;

  if (contract && web3) {
    const res = await contract.matches.call(matchId);

    const teamABets = Number(web3.utils.fromWei(`${res[0].toNumber()}`));
    const teamBBets = Number(web3.utils.fromWei(`${res[1].toNumber()}`));
    const total = teamABets + teamBBets;

    const match = {
      teamATotalBets: Number(teamABets),
      teamBTotalBets: Number(teamBBets),
      teamAPercentage: getBetPercentage(teamABets, total),
      teamBPercentage: getBetPercentage(teamBBets, total),
      startTime: res[2].toNumber(),
      matchId: res[3].toNumber(),
      id: res[4].toNumber(),
      teamA: web3.utils.toAscii(res[5]).replace(/\u0000/g, ''),
      teamB: web3.utils.toAscii(res[6]).replace(/\u0000/g, ''),
      gameType: web3.utils.toAscii(res[7]).replace(/\u0000/g, ''),
      winner: web3.utils.toAscii(res[8]).replace(/\u0000/g, ''),
      withdrawable: res[9],
      canceled: res[10],
      bettable: res[11],
    };
    return match;
  }
  throw new Error('No instance of web3 or contract');
};
