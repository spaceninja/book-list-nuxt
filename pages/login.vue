<template>
  <div v-if="!isLoggedIn">
    <Auth />
    <h1>Sign In</h1>
    <p>We only accept social auth here:</p>
    <button @click="signInWithGitHub">Sign in with GitHub</button>
  </div>
  <div v-else>You are logged in.</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async signInWithGitHub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider();
      // You can add or remove more scopes here:
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      await this.$fire.auth.signInWithPopup(provider);
      // WHY doesn't this work?
      this.$router.push('/profile');
    },
  },
};
</script>
