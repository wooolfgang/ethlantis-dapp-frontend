/* eslint-disable no-undef ,no-plusplus */

const MatchBetting = artifacts.require('MatchBetting');

contract('MatchBetting', (accounts) => {
  let matchBetting;
  const owner = accounts[0];
  const weiFactor = 10 ** 18;

  describe('bet', () => {
    it('Should add ether to the contract address', async () => {
      matchBetting = await MatchBetting.deployed();
      const time = Date.now() + 120000;
      await matchBetting.addMatch(time, 1, 'Dignitas', 'Potato', 'Dota2', { from: owner });
      await matchBetting.bet(1, 'Dota2', 'Dignitas', { from: owner, value: web3.toWei('0.05') });
      const res = await web3.eth.getBalance(MatchBetting.address);
      assert.equal(res.toNumber(), 0.05 * (10 ** 18), 'Balance should equal the amount deposited by user');
    });

    it('Should update the totalBets of the team', async () => {
      matchBetting = await MatchBetting.deployed();
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
      matchBetting = await MatchBetting.deployed();
    });
  });
});
