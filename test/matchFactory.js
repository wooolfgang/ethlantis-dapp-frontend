const MatchFactory = artifacts.require('MatchFactory');
const Web3 = require('web3');

/* eslint-disable no-undef */

const web3 = new Web3();

contract('MatchFactory', (accounts) => {
  let matchFactory;
  const owner = accounts[0];

  describe('addMatch', () => {
    it('Should add a new match', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(123, 1517462168, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const matchCount = await matchFactory.getMatchesCount.call();
      assert.equal(matchCount.toNumber(), 1, 'Adds a new match to the matches array');
    });

    it('Should return error on addMatch when not called by contract owner', async () => {
      matchFactory = await MatchFactory.deployed();
      const res = await matchFactory.addMatch(123, 1517462168, 'Dignitas', 'Potato', 'Dota2', { from: accounts[1] });
      assert.isUndefined(res.receipt.event, 'No NewMatch event on receipt');
    });
  });

  describe('cancelMatch', () => {
    const matchId = 123;
    const gameType = 'Dota2';
    it('Should cancel the match', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(123, 1517462168, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.cancelMatch(matchId, gameType);
      const match = await matchFactory.getMatchInfo(matchId, gameType);
      const withdrawable = match[6];
      const canceled = match[7];
      const bettable = match[8];
      assert.equal(withdrawable, true, 'Withdrawable should be true');
      assert.equal(canceled, true, 'Canceled should be true');
      assert.equal(bettable, false, 'Bettable should be false');
    });
  });

  describe('getMatchInfo', () => {
    it('Returns the correct match on getMatch call', async () => {
      matchFactory = await MatchFactory.deployed();
      await matchFactory.addMatch(123, 1517462168, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchFactory.addMatch(221, 1517462169, 'Navi', 'Alliance', 'Dota2', { from: owner });
      const match = await matchFactory.getMatchInfo(123, 'Dota2');

      const actual = {
        matchId: match[0].toNumber(),
        startTime: match[1].toNumber(),
        teamA: web3.utils.hexToUtf8(match[2]),
        teamB: web3.utils.hexToUtf8(match[3]),
        gameType: web3.utils.hexToUtf8(match[4]),
        winner: web3.utils.hexToUtf8(match[5]),
        withdrawable: match[6],
        canceled: match[7],
        bettable: match[8],
      };

      const expected = {
        matchId: 123,
        startTime: 1517462168,
        teamA: 'Dignitas',
        teamB: 'Potato',
        gameType: 'Dota2',
        winner: '',
        withdrawable: false,
        canceled: false,
        bettable: true,
      };

      assert.deepEqual(actual, expected, 'It should equal the number 1');
    });
  });
});

