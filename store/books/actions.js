/* eslint-disable no-throw-literal */
import { firebaseAction } from 'vuexfire';

export default {
  setActiveBook({ commit }, book) {
    console.log('SET ACTIVE BOOK', book && book.title);
    commit('SET_ACTIVE_BOOK', book);
  },

  unSetActiveBook({ commit }) {
    console.log('UNSET ACTIVE BOOK');
    commit('UNSET_ACTIVE_BOOK');
  },

  async deleteBook({ commit, state }) {
    const book = state.selectedBook;
    try {
      await this.$fire.database.ref(`books/${book.isbn}`).remove();
      console.log('DELETED BOOK', book && book.title);
    } catch (e) {
      console.error(e);
    }
  },

  async saveBook({ commit, state }) {
    const book = state.selectedBook;
    try {
      await this.$fire.database.ref(`books/${book.isbn}`).set(book);
      console.log('SAVED BOOK', book && book.title);
    } catch (e) {
      console.error(e);
    }
  },

  async saveBooks({ commit, state }, books) {
    try {
      await this.$fire.database.ref('books').set(books);
      console.log('SAVED BOOKS', books);
    } catch (e) {
      console.error(e);
    }
  },

  bind: firebaseAction(function ({ bindFirebaseRef }) {
    console.log('BIND BOOKS', process.server ? 'SERVER' : 'CLIENT');
    return bindFirebaseRef('allBooks', this.$fire.database.ref('books'), {
      wait: true,
    });
  }),

  unbind: firebaseAction(function ({ unbindFirebaseRef }) {
    console.log('UNBIND BOOKS');
    unbindFirebaseRef('allBooks', false);
  }),
};
