/* eslint-disable no-console */
import { vuexfireMutations } from 'vuexfire';
import initialState from './state';

export default {
  ...vuexfireMutations,

  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    console.log('SET AUTH USER', authUser.email);
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    };
  },
};
