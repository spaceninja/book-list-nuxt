<template>
  <div v-if="isLoggedIn">
    <h2>User Profile</h2>
    <p>This page is only for you.</p>
    <p>Your e-mail is {{ authUser.email }}</p>
  </div>
  <Alert v-else>You are logged out.</Alert>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  middleware: 'auth',
  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
