<template>
  <Auth v-if="!isLoggedIn" />
  <Alert v-else>You are logged in.</Alert>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['isLoggedIn']),
};
</script>
