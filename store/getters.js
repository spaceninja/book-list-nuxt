import { getField } from 'vuex-map-fields';

export default {
  getField,

  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null;
    } catch {
      return false;
    }
  },
};
