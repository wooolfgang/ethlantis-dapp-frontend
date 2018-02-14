/* eslint-disable no-undef ,no-plusplus */

const MatchBetting = artifacts.require('MatchBetting');

contract('MatchBetting', async (accounts) => {
  let matchBetting;
  const owner = accounts[0];
  const weiFactor = 10 ** 18;

  beforeEach('Setup new contract before each test', async () => {
    matchBetting = await MatchBetting.new(owner);
  });

  describe('bet', () => {
    it('Should add ether to the contract address', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchBetting.bet(1, 'Dota2', 'Dignitas', { from: owner, value: web3.toWei('0.05') });
      const res = await web3.eth.getBalance(matchBetting.address);
      assert.equal(res.toNumber(), 0.05 * (10 ** 18), 'Balance should equal the amount deposited by user');
    });

    it('Should update the totalBets of the team', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const prev = await matchBetting.getMatchResults(1, 'Dota2');
      await matchBetting.bet(1, 'Dota2', 'Dignitas', { from: owner, value: web3.toWei('1.33') });
      const after = await matchBetting.getMatchResults(1, 'Dota2');
      const teamAPrev = prev[2].toNumber();
      const teamBPrev = prev[3].toNumber();
      const teamAAfter = after[2].toNumber();
      const teamBAfter = after[3].toNumber();
      const expected = teamAPrev + (1.33 * weiFactor);
      assert.equal(expected, teamAAfter, 'Should add totalbets on teamA');
      assert.equal(teamBPrev, teamBAfter, 'Team B should stay the same');
    });

    it('Should update the balance of the user in the match', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const prev = await matchBetting.getUserBet(1, 'Dota2', 'Dignitas');
      await matchBetting.bet(1, 'Dota2', 'Dignitas', { from: owner, value: web3.toWei('0.005') });
      const after = await matchBetting.getUserBet(1, 'Dota2', 'Dignitas');
      const expected = prev.toNumber() + (0.005 * weiFactor);
      assert.equal(expected, after.toNumber(), 'Should add bet balance of user');
    });

    it('Should not add bet when it is below the minimum bet allowed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const res = await matchBetting.bet(1, 'Dota2', 'Potato', { from: accounts[1], value: web3.toWei('0.003') });
      assert.equal(web3.toDecimal(res.receipt.staus), 0, 'Transaction should not go through');
    });

    it('Should not add bet when it is above maximum bet allowed', async () => {
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      const res = await matchBetting.bet(1, 'Dota2', 'Potato', { from: owner, value: web3.toWei('29') });
      assert.equal(web3.toDecimal(res.receipt.staus), 0, 'Transaction should not go through');
    });
  });
});
