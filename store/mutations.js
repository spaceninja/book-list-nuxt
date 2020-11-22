/* eslint-disable no-console */
import initialState from './state';

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    console.log('SET AUTH USER', authUser);
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    };
  },
};
