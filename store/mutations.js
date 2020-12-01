import { vuexfireMutations } from 'vuexfire';
import { updateField } from 'vuex-map-fields';
import initialState from './state';

export default {
  ...vuexfireMutations,
  updateField,

  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_ACTIVE_BOOK: (state, book) => {
    state.book = book;
  },

  SET_AUTH_USER: (state, { authUser }) => {
    console.log('SET AUTH USER', authUser.email);
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    };
  },
};
