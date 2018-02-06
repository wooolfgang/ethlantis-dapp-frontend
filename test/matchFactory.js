const MatchFactory = artifacts.require('MatchFactory');
const Web3 = require('web3');

/* eslint-disable no-undef ,no-plusplus */

const web3 = new Web3();

contract('MatchFactory', (accounts) => {
  let matchFactory;
  const owner = accounts[0];

  const FIELD_ID = 0;
  const FIELD_STARTTIME = 1;
  const FIELD_MATCHID = 2;
  const FIELD_TEAMA = 3;
  const FIELD_TEAMB = 4;
  const FIELD_GAMETYPE = 5;
  const FIELD_WITHDRAWABLE = 7;
  const FIELD_CANCELED = 7;
  const FIELD_BETTABLE = 8;

  describe('addMatch', () => {
    it('Should add a new match', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const matchInfo = await matchFactory.getMatchInfo(1, 'Dota2');
      const matchCount = await matchFactory.getMatchesCount.call();

      assert.equal(matchCount.toNumber(), 1, 'Adds a new match to the matches array');
      assert.equal(matchInfo[0].toNumber(), 0, 'The id of the first created match should be 0');
    });

    it('Should return error on addMatch when not called by contract owner', async () => {
      matchFactory = await MatchFactory.deployed();
      const res = await matchFactory.addMatch(1517462168, 2, 'Dignitas', 'Potato', 'Dota2', { from: accounts[1] });
      assert.isUndefined(res.receipt.event, 'No NewMatch event on receipt');
    });
  });

  describe('cancelMatch', () => {
    const matchId = 3;
    const gameType = 'Dota2';
    it('Should cancel the match', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, matchId, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.cancelMatch(matchId, gameType);
      const match = await matchFactory.getMatchInfo(matchId, gameType);
      const withdrawable = match[FIELD_WITHDRAWABLE];
      const canceled = match[FIELD_CANCELED];
      const bettable = match[FIELD_BETTABLE];
      assert.equal(withdrawable, true, 'Withdrawable should be true');
      assert.equal(canceled, true, 'Canceled should be true');
      assert.equal(bettable, false, 'Bettable should be false');
    });
  });

  describe('getMatchInfo', () => {
    it('Returns the match info', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 123, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.addMatch(1517462169, 221, 'Navi', 'Alliance', 'Dota2', { from: owner });
      const id = await matchFactory.getMatchId(123, 'Dota2');
      const match = await matchFactory.getMatchInfo(123, 'Dota2');

      const actual = {
        id: match[FIELD_ID].toNumber(),
        startTime: match[FIELD_STARTTIME].toNumber(),
        matchId: match[FIELD_MATCHID].toNumber(),
        teamA: web3.utils.hexToUtf8(match[FIELD_TEAMA]),
        teamB: web3.utils.hexToUtf8(match[FIELD_TEAMB]),
        gameType: web3.utils.hexToUtf8(match[FIELD_GAMETYPE]),
        withdrawable: match[FIELD_WITHDRAWABLE],
        canceled: match[FIELD_CANCELED],
        bettable: match[FIELD_BETTABLE],
      };

      const expected = {
        id: id.toNumber(),
        startTime: 1517462168,
        matchId: 123,
        teamA: 'Dignitas',
        teamB: 'Potato',
        gameType: 'Dota2',
        withdrawable: false,
        canceled: false,
        bettable: true,
      };

      assert.deepEqual(actual, expected, 'It should equal the number 1');
    });
  });

  describe('getMatchResults', () => {
    it('Returns the match results', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 12, 'Dignitas', 'Potato', 'LoL', { from: owner });
      const matchResults = await matchFactory.getMatchResults(12, 'LoL');
      const id = await matchFactory.getMatchId(12, 'LoL');

      const actual = {
        id: matchResults[0].toNumber(),
        winner: web3.utils.hexToUtf8(matchResults[1]),
        teamATotalBets: matchResults[2].toNumber(),
        teamBTotalBets: matchResults[3].toNumber(),
      };

      const expected = {
        id: id.toNumber(),
        winner: '',
        teamATotalBets: 0,
        teamBTotalBets: 0,
      };

      assert.deepEqual(actual, expected, 'It should return the correct match results');
    });
  });

  describe('getMatchesInfo', () => {
    it('Returns an array of matches with Match info fields', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 8888, 'Awesome', 'League of Awesome', 'LoL', { from: owner });
      await matchFactory.addMatch(1517462168, 9999, 'Yeah', 'Yo', 'LoL', { from: owner });
      const matchCount = await matchFactory.getMatchesCount();
      const lastTwoMatches = [matchCount - 2, matchCount - 1];
      const res = await matchFactory.getMatchesInfo(lastTwoMatches);

      const matchesActual = [];

      for (let i = 0; i < lastTwoMatches.length; i++) {
        const match = {
          id: res[0][i].toNumber(),
          startTime: res[1][i].toNumber(),
          matchId: res[2][i].toNumber(),
          teamA: web3.utils.hexToUtf8(res[3][i]),
          teamB: web3.utils.hexToUtf8(res[4][i]),
          gameType: web3.utils.hexToUtf8(res[5][i]),
        };
        matchesActual.push(match);
      }

      matchesExpected = [
        {
          id: matchCount - 2,
          matchId: 8888,
          startTime: 1517462168,
          teamA: 'Awesome',
          teamB: 'League of Awesome',
          gameType: 'LoL',
        },
        {
          id: matchCount - 1,
          matchId: 9999,
          startTime: 1517462168,
          teamA: 'Yeah',
          teamB: 'Yo',
          gameType: 'LoL',
        },
      ];

      assert.deepEqual(matchesActual, matchesExpected, 'Function should return the correct matches');
    });
  });
});

