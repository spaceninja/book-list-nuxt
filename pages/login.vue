<template>
  <div>
    <h1>Sign In</h1>
    <p>We only accept social auth here:</p>
    <button @click="signInWithGitHub">Sign in with GitHub</button>
  </div>
</template>

<script>
export default {
  layout: 'basic',
  components: {},
  methods: {
    async signInWithGitHub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider();
      // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      await this.$fire.auth.signInWithPopup(provider);
      this.$router.push('/profile');
    },
  },
};
</script>
