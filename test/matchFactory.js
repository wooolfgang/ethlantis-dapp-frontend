/* eslint-disable no-undef ,no-plusplus */

const MatchFactory = artifacts.require('MatchFactory');

contract('MatchFactory', async (accounts) => {
  const owner = accounts[0];
  let matchFactory;

  const FIELD_ID = 0;
  const FIELD_STARTTIME = 1;
  const FIELD_MATCHID = 2;
  const FIELD_TEAMA = 3;
  const FIELD_TEAMB = 4;
  const FIELD_GAMETYPE = 5;
  const FIELD_WITHDRAWABLE = 7;
  const FIELD_CANCELED = 7;
  const FIELD_BETTABLE = 8;

  beforeEach('Setup new contract before each test', async () => {
    matchFactory = await MatchFactory.new(owner);
  });

  describe('addMatch', () => {
    it('Should add a new match', async () => {
      const time = Date.now() + 360000;
      await matchFactory.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const matchInfo = await matchFactory.getMatchInfo(1, 'Dota2');
      const matchCount = await matchFactory.getMatchesCount.call();
      assert.equal(matchCount.toNumber(), 1, 'Adds a new match to the matches array');
      assert.equal(matchInfo[0].toNumber(), 0, 'The id of the first created match should be 0');
    });

    it('Should return error on addMatch when not called by contract owner', async () => {
      const time = Date.now() + 360000;
      const res = await matchFactory.addMatch(time, 2, 'Dignitas', 'Potato', 'Dota2', { from: accounts[1] });
      assert.equal(web3.toDecimal(res.receipt.status), 0, 'No NewMatch event on receipt');
    });
  });

  describe('cancelMatch', () => {
    it('Should cancel the match', async () => {
      const matchId = 3;
      const gameType = 'Dota2';
      const time = Date.now() + 360000;

      await matchFactory.addMatch(time, matchId, 'Dignitas', 'Potato', 'Dota2', { from: owner });
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
      const time = Date.now() + 360000;

      await matchFactory.addMatch(time, 123, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.addMatch(time, 221, 'Navi', 'Alliance', 'Dota2', { from: owner });
      const id = await matchFactory.getMatchId(123, 'Dota2');
      const match = await matchFactory.getMatchInfo(123, 'Dota2');

      const actual = {
        id: match[FIELD_ID].toNumber(),
        startTime: match[FIELD_STARTTIME].toNumber(),
        matchId: match[FIELD_MATCHID].toNumber(),
        teamA: web3.toUtf8(match[FIELD_TEAMA]),
        teamB: web3.toUtf8(match[FIELD_TEAMB]),
        gameType: web3.toUtf8(match[FIELD_GAMETYPE]),
        withdrawable: match[FIELD_WITHDRAWABLE],
        canceled: match[FIELD_CANCELED],
        bettable: match[FIELD_BETTABLE],
      };

      const expected = {
        id: id.toNumber(),
        startTime: time,
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
      const time = Date.now() + 360000;

      await matchFactory.addMatch(time, 12, 'Dignitas', 'Potato', 'LoL', { from: owner });
      const matchResults = await matchFactory.getMatchResults(12, 'LoL');
      const id = await matchFactory.getMatchId(12, 'LoL');

      const actual = {
        id: matchResults[0].toNumber(),
        winner: web3.toUtf8(matchResults[1]),
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
      const time = Date.now() + 360000;

      await matchFactory.addMatch(time, 8888, 'Awesome', 'League of Awesome', 'LoL', { from: owner });
      await matchFactory.addMatch(time, 9999, 'Yeah', 'Yo', 'LoL', { from: owner });
      const matchCount = await matchFactory.getMatchesCount();
      const lastTwoMatches = [matchCount - 2, matchCount - 1];
      const res = await matchFactory.getMatchesInfo(lastTwoMatches);

      const matchesActual = [];

      for (let i = 0; i < lastTwoMatches.length; i++) {
        const match = {
          id: res[0][i].toNumber(),
          startTime: res[1][i].toNumber(),
          matchId: res[2][i].toNumber(),
          teamA: web3.toUtf8(res[3][i]),
          teamB: web3.toUtf8(res[4][i]),
          gameType: web3.toUtf8(res[5][i]),
        };
        matchesActual.push(match);
      }

      matchesExpected = [
        {
          id: matchCount - 2,
          matchId: 8888,
          startTime: time,
          teamA: 'Awesome',
          teamB: 'League of Awesome',
          gameType: 'LoL',
        },
        {
          id: matchCount - 1,
          matchId: 9999,
          startTime: time,
          teamA: 'Yeah',
          teamB: 'Yo',
          gameType: 'LoL',
        },
      ];

      assert.deepEqual(matchesActual, matchesExpected, 'Function should return the correct matches');
    });
  });
});

