<template>
  <div v-if="isLoggedIn">
    <p>
      You are logged in as
      <Gravatar :email="authUser.email" align="center" />
      {{ authUser.email }}.
      <button type="button" @click="signOut">Log Out</button>
    </p>
    <Alert>Remember: hard refresh will break your authentication!</Alert>
  </div>
  <div v-else>
    You are logged out.
    <button type="button" @click="signInWithGitHub">Sign in with GitHub</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['signOut', 'signInWithGitHub']),
  },
};
</script>
