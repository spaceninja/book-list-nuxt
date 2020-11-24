/* eslint-disable no-console, no-throw-literal */
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

    console.log(
      'NUXT SERVER INIT',
      !!ctx.res,
      !!ctx.res.locals,
      !!ctx.res.locals.user
    );

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      console.info(
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
      commit('RESET_STORE');
      return;
    }
    console.log('AuthStateChangedAction', authUser);
    commit('SET_AUTH_USER', { authUser });
  },

  bindBooks: firebaseAction(async function ({ bindFirebaseRef }) {
    console.log('BIND BOOKS');
    await bindFirebaseRef('books', this.$fire.database.ref('books'), {
      wait: true,
    });
  }),

  unbindBooks: firebaseAction(function ({ unbindFirebaseRef }) {
    unbindFirebaseRef('books', false);
  }),
};
