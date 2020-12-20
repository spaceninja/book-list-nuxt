/* eslint-disable no-throw-literal */
import { firebaseAction } from 'vuexfire';

export default {
  async nuxtServerInit({ dispatch }, ctx) {
    if (this.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.';
    }

    if (ctx.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.';
    }

    if (ctx.app.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.';
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      console.log(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      );

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      });
    }
  },

  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      console.log('UNSET AUTH USER');
      commit('UNSET_AUTH_USER');
      return;
    }
    console.log('SET AUTH USER', authUser.email);
    commit('SET_AUTH_USER', { authUser });
  },

  async signOut() {
    console.log('LOG OUT');
    try {
      await this.$fire.auth.signOut();
      console.log('LOGGED OUT');
    } catch (e) {
      console.error(e);
    }
  },

  async signInWithGitHub() {
    console.log('LOG IN');
    const provider = new this.$fireModule.auth.GithubAuthProvider();
    try {
      // You can add or remove more scopes here:
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      await this.$fire.auth.signInWithPopup(provider);
      console.log('LOGGED IN');
    } catch (e) {
      console.error(e);
    }
  },

  setActiveBook({ commit }, book) {
    console.log('SET ACTIVE BOOK', book && book.title);
    commit('SET_ACTIVE_BOOK', book);
  },

  unSetActiveBook({ commit }) {
    console.log('UNSET ACTIVE BOOK');
    commit('UNSET_ACTIVE_BOOK');
  },

  async deleteBook({ commit, state }) {
    const book = state.books.selectedBook;
    try {
      await this.$fire.database.ref(`books/${book.isbn}`).remove();
      console.log('DELETED BOOK', book && book.title);
    } catch (e) {
      console.error(e);
    }
  },

  async saveBook({ commit, state }) {
    const book = state.books.selectedBook;
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

  bindBooks: firebaseAction(function ({ bindFirebaseRef }) {
    console.log('BIND BOOKS', process.server ? 'SERVER' : 'CLIENT');
    return bindFirebaseRef('books.allBooks', this.$fire.database.ref('books'), {
      wait: true,
    });
  }),

  unbindBooks: firebaseAction(function ({ unbindFirebaseRef }) {
    console.log('UNBIND BOOKS');
    unbindFirebaseRef('books.allBooks', false);
  }),
};
