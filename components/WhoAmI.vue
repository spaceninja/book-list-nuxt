<template>
  <div v-if="isLoggedIn">
    You are <NuxtLink to="/profile">logged in</NuxtLink> as
    <Gravatar :email="authUser.email" align="center" />
    {{ authUser.email }}.
    <button type="button" @click="logout">Log Out</button>
  </div>
  <div v-else>
    You are logged out.
    <NuxtLink to="/login">Log In</NuxtLink>
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
        alert(e);
      }
    },
  },
};
</script>
