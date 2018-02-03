const MatchFactory = artifacts.require('MatchFactory');
const Web3 = require('web3');

/* eslint-disable no-undef */

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
      await matchFactory.addMatch(1517462168, 123, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const matchCount = await matchFactory.getMatchesCount.call();
      assert.equal(matchCount.toNumber(), 1, 'Adds a new match to the matches array');
    });

    it('Should return error on addMatch when not called by contract owner', async () => {
      matchFactory = await MatchFactory.deployed();
      const res = await matchFactory.addMatch(1517462168, 123, 'Dignitas', 'Potato', 'Dota2', { from: accounts[1] });
      assert.isUndefined(res.receipt.event, 'No NewMatch event on receipt');
    });
  });

  describe('cancelMatch', () => {
    const matchId = 123;
    const gameType = 'Dota2';
    it('Should cancel the match', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 123, 'Dignitas', 'Potato', 'Dota2', { from: owner });
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
    it('Returns the correct match on getMatchInfo call', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(1517462168, 123, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.addMatch(1517462169, 221, 'Navi', 'Alliance', 'Dota2', { from: owner });
      const id = await matchFactory.getMatchId(221, 'Dota2');
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
});

