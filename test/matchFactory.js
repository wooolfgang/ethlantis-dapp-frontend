/* eslint-disable no-undef ,no-plusplus, no-unused-vars */
const matchHash = (matchId, gameType) => matchId + gameType;

const MatchFactory = artifacts.require('MatchFactory');

contract('MatchFactory', async (accounts) => {
  const owner = accounts[0];
  let matchFactory;

  const FIELD_TEAMA_BETS = 0;
  const FIELD_TEAMB_BETS = 1;
  const FIELD_STARTTIME = 2;
  const FIELD_MATCHID = 3;
  const FIELD_ID = 4;
  const FIELD_TEAMA = 5;
  const FIELD_TEAMB = 6;
  const FIELD_GAMETYPE = 7;
  const FIELD_WINNER = 8;
  const FIELD_WITHDRAWABLE = 9;
  const FIELD_CANCELED = 10;
  const FIELD_BETTABLE = 11;

  beforeEach('Setup new contract before each test', async () => {
    matchFactory = await MatchFactory.new(owner);
  });

  describe('addMatch', () => {
    it('Should add a new match', async () => {
      const time = Date.now() + 360000;
      await matchFactory.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      const id = await matchFactory.hashToMatchId(matchHash(1, 'Dota2'));
      const matchInfo = await matchFactory.matches.call(id);
      const matchCount = await matchFactory.getMatchesCount.call();
      assert.equal(matchCount.toNumber(), 1, 'Adds a new match to the matches array');
      assert.equal(matchInfo[FIELD_ID].toNumber(), 0, 'The id of the first created match should be 0');
    });

    it('Should return the correct id of the match', async () => {
      const time = Date.now() + 36000;
      await matchFactory.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      const id = await matchFactory.hashToMatchId(matchHash(1, 'Dota2'));
      assert.equal(0, id, 'Id should equal to zero');
    });

    it('Should return error on addMatch when not called by contract owner', async () => {
      const time = Date.now() + 360000;
      let res;
      try {
        res = await matchFactory.addMatch(time, 2, 'Dignitas', 'Potato', 'Dota2', matchHash(2, 'Dota2'), { from: accounts[1] });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should throw error when matchHash has already been set to a certain match', async () => {
      const time = Date.now() + 360000;
      let res;
      try {
        res = await matchFactory.addMatch(time, 3, 'Dignitas', 'Potato', 'Dota2', matchHash(3, 'Dota2'), { from: owner });
        res = await matchFactory.addMatch(time, 3, 'Dignitas', 'Potato', 'Dota2', matchHash(3, 'Dota2'), { from: owner });
        res = await matchFactory.addMatch(time, 3, 'Dignitas', 'Potato', 'Dota2', matchHash(3, 'Dota2'), { from: owner });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });
  });


  describe('cancelMatch', () => {
    it('Should cancel the match', async () => {
      const matchId = 3;
      const time = Date.now() + 360000;
      await matchFactory.addMatch(time, matchId, 'Dignitas', 'Potato', 'Dota2', matchHash(matchId, 'Dota2'), { from: owner });
      await matchFactory.cancelMatch(matchHash(matchId, 'Dota2'));
      const id = await matchFactory.hashToMatchId.call(matchHash(matchId, 'Dota2'));
      const match = await matchFactory.matches.call(id);
      const withdrawable = match[FIELD_WITHDRAWABLE];
      const canceled = match[FIELD_CANCELED];
      const bettable = match[FIELD_BETTABLE];
      assert.equal(withdrawable, true, 'Withdrawable should be true');
      assert.equal(canceled, true, 'Canceled should be true');
      assert.equal(bettable, false, 'Bettable should be false');
    });
  });

  describe('getMatchesInfo', () => {
    it('Returns an array of matches with Match info fields', async () => {
      const time = Date.now() + 360000;

      await matchFactory.addMatch(time, 8888, 'Awesome', 'League of Awesome', 'LoL', matchHash(8888, 'Lol'), { from: owner });
      await matchFactory.addMatch(time, 9999, 'Yeah', 'Yo', 'LoL', matchHash(9999, 'Lol'), { from: owner });
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

