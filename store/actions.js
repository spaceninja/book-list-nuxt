export default {
  async nuxtServerInit({ dispatch }, ctx) {
    if (this.$fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
      );
    }

    if (ctx.$fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
      );
    }

    if (ctx.app.$fire.auth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
      );
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const {
        allClaims: claims,
        idToken: token,
        ...authUser
      } = ctx.res.locals.user;

      console.log(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims,
        'Token:',
        token
      );

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
        token,
      });
    }
  },

  onAuthStateChanged({ commit }, { authUser, claims }) {
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
};
