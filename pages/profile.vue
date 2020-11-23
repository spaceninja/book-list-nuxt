<template>
  <div v-if="isLoggedIn">
    <h1>User Profile</h1>
    <p>This page is only for you.</p>
    <p>Your e-mail is {{ authUser.email }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>You are logged out</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  middleware: 'auth',
  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    async logout() {
      await this.$fire.auth.signOut();
      this.$router.push('/login');
    },
  },
};
</script>
