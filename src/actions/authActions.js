import * as types from '../constants/ActionTypes';
import client from '../client';

export const setUser = payload => ({
  payload,
  type: types.SET_AUTHENTICATED_USER,
});

export const authenticate = () =>
  async (dispatch) => {
    try {
      const token = await client.authenticate();
      const payload = await client.passport.verifyJWT(token.accessToken);
      const user = await client.service('api/users').get(payload.userId);
      dispatch(setUser(user));
    } catch (e) {
      console.log(e);
    }
  };

export const signinWithMetamask = (signature, publicAddress, email, username) =>
  async (dispatch) => {
    try {
      const token = await client.authenticate({
        signature,
        publicAddress,
        email,
        username,
        strategy: 'local',
      });
      const payload = await client.passport.verifyJWT(token.accessToken);
      const user = await client.service('api/users').get(payload.userId);
      dispatch(setUser(user));
    } catch (e) {
      console.log(e);
    }
  };

export const signup = (email, username) =>
  async (dispatch, getState) => {
    const { web3 } = getState().web3;
    const publicAddress = (await getState().web3.web3.eth.getCoinbase()).toLowerCase();

    if (!publicAddress) throw new Error('No user in metamask');

    const users = (await client.service('api/users').find({ query: { publicAddress } })).data;
    let user = users[0];

    if (users.length === 0) {
      user = await client.service('api/users').create({ publicAddress });
    } else {
      web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${user.nonce}`), user.publicAddress,
        (err, signature) => {
          if (err) throw new Error(err);
          dispatch(signinWithMetamask(signature, user.publicAddress, email, username));
        },
      );
    }
  };
