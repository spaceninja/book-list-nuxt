<template>
  <div v-if="isLoggedIn">
    You are logged in as
    <Gravatar :email="authUser.email" align="center" />
    {{ authUser.email }}.
    <button type="button" @click="logout">Log Out</button>
  </div>
  <div v-else>
    You are logged out.
    <button type="button" @click="signInWithGitHub">Sign in with GitHub</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        console.error(e);
      }
    },
    async signInWithGitHub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider();
      try {
        // You can add or remove more scopes here:
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        await this.$fire.auth.signInWithPopup(provider);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
