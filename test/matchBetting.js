/* eslint-disable no-undef ,no-plusplus */
const matchHash = require('../src/utils/utils');

const MatchBetting = artifacts.require('MatchBetting');

contract('MatchBetting', async (accounts) => {
  let matchBetting;
  const owner = accounts[0];
  const weiFactor = 10 ** 18;
  const FIELD_TEAMA_BETS = 0;
  const FIELD_TEAMB_BETS = 1;

  beforeEach('Setup new contract before each test', async () => {
    matchBetting = await MatchBetting.new(owner);
  });

  describe('bet', () => {
    it('Should add ether to the contract address', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Dignitas', { from: owner, value: web3.toWei('0.05') });
      const res = await web3.eth.getBalance(matchBetting.address);
      assert.equal(res.toNumber(), 0.05 * (10 ** 18), 'Balance should equal the amount deposited by user');
    });

    it('Should update the totalBets of the team', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      const id = await matchBetting.hashToMatchId(matchHash(1, 'Dota2'));
      const prev = await matchBetting.matches.call(id);
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Dignitas', { from: owner, value: web3.toWei('1.33') });
      const after = await matchBetting.matches.call(id);
      const teamAPrev = prev[FIELD_TEAMA_BETS].toNumber();
      const teamBPrev = prev[FIELD_TEAMB_BETS].toNumber();
      const teamAAfter = after[FIELD_TEAMA_BETS].toNumber();
      const teamBAfter = after[FIELD_TEAMB_BETS].toNumber();
      const expected = teamAPrev + (1.33 * weiFactor);
      assert.equal(expected, teamAAfter, 'Should add totalbets on teamA');
      assert.equal(teamBPrev, teamBAfter, 'Team B should stay the same');
    });

    it('Should update the balance of the user in the match', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      const prev = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Dignitas');
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Dignitas', { from: owner, value: web3.toWei('0.005') });
      const after = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Dignitas');
      const expected = prev.toNumber() + (0.005 * weiFactor);
      assert.equal(expected, after.toNumber(), 'Should add bet balance of user');
    });

    it('Should not add bet when it is below the minimum bet allowed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      let res;
      try {
        res = await matchBetting.bet(matchHash(1, 'Dota2'), 'Potato', { from: accounts[1], value: web3.toWei('0.003') });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });

    it('Should not add bet when it is above maximum bet allowed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      let res;
      try {
        res = await matchBetting.bet(matchHash(1, 'Dota2'), 'Potato', { from: accounts[1], value: web3.toWei('31') });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });
  });

  describe('changeTeam', () => {
    it('Should change the teamTotalBet value based on the team changed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Dignitas', { from: owner, value: web3.toWei('.12') });
      const id = await matchBetting.hashToMatchId.call(matchHash(1, 'Dota2'));
      const beforeSwap = await matchBetting.matches.call(id);
      await matchBetting.changeTeam(matchHash(1, 'Dota2'), 'Potato');
      const afterSwap = await matchBetting.matches.call(id);

      beforeSwapTeamA = beforeSwap[FIELD_TEAMA_BETS].toNumber();
      beforeSwapTeamB = beforeSwap[FIELD_TEAMB_BETS].toNumber();
      afterSwapTeamA = afterSwap[FIELD_TEAMA_BETS].toNumber();
      afterSwapTeamB = afterSwap[FIELD_TEAMB_BETS].toNumber();

      assert.equal(beforeSwapTeamA, 0.12 * weiFactor);
      assert.equal(beforeSwapTeamB, 0);
      assert.equal(afterSwapTeamA, 0);
      assert.equal(afterSwapTeamB, 0.12 * weiFactor);
    });

    it('Should change the user bet value based on the team changed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Potato', { from: owner, value: web3.toWei('.12') });
      const beforeSwapTeamA = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Dignitas');
      const beforeSwapTeamB = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Potato');
      await matchBetting.changeTeam(matchHash(1, 'Dota2'), 'Dignitas');
      const afterSwapTeamA = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Dignitas');
      const afterSwapTeamB = await matchBetting.getUserBet(matchHash(1, 'Dota2'), 'Potato');

      assert.equal(beforeSwapTeamA.toNumber(), 0);
      assert.equal(beforeSwapTeamB.toNumber(), 0.12 * weiFactor);
      assert.equal(afterSwapTeamA.toNumber(), 0.12 * weiFactor);
      assert.equal(afterSwapTeamB.toNumber(), 0);
    });

    it('Should not transact when team "changed" is the same as previous', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', matchHash(1, 'Dota2'), { from: owner });
      await matchBetting.bet(matchHash(1, 'Dota2'), 'Potato', { from: owner, value: web3.toWei('.12') });
      let res;
      try {
        res = await matchBetting.changeTeam(matchHash(1, 'Dota2'), 'Potato');
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });
  });

  describe('setFee', () => {
    it('Should set the new fee percentage', async () => {
      await matchBetting.setFee(2);
      const res = await matchBetting.feePercentage.call();
      assert.equal(res.toNumber(), 2);
    });

    it('Should not exceed maximum fee percentage allowed', async () => {
      let res;
      try {
        res = await matchBetting.setFee('7');
      } catch (e) {
        res = e;
      }
      const fee = await matchBetting.feePercentage.call();
      assert(res instanceof Error);
      assert.equal(fee, 3);
    });

    it('Should not transact if not called by owner', async () => {
      let res;
      try {
        res = await matchBetting.setFee(2, { from: accounts[1] });
      } catch (e) {
        res = e;
      }
      assert(res instanceof Error);
    });
  });
});
