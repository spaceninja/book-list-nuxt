import { vuexfireMutations } from 'vuexfire';
import { updateField } from 'vuex-map-fields';

export default {
  ...vuexfireMutations,
  updateField,

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    };
  },

  UNSET_AUTH_USER: (state) => {
    state.authUser = null;
  },
};
