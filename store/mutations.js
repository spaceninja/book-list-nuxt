import { vuexfireMutations } from 'vuexfire';
import { updateField } from 'vuex-map-fields';

const emptyBook = {
  title: '',
  series: '',
  authorFirst: '',
  authorLast: '',
  rating: '',
  length: '',
  isbn: '',
  release: '',
  thumbnail: '',
  textSnippet: '',
  source: '',
  note: '',
  purchased: false,
  prioritize: false,
};

export default {
  ...vuexfireMutations,
  updateField,

  SET_ACTIVE_BOOK: (state, book) => {
    state.book = { ...emptyBook, ...book };
  },

  UNSET_ACTIVE_BOOK: (state) => {
    state.book = {};
  },

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
