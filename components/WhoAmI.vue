<template>
  <div v-if="isLoggedIn">
    You are logged in as
    <Gravatar :email="authUser.email" align="center" />
    {{ authUser.email }}.
    <button type="button" @click="signOut">Log Out</button>
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
