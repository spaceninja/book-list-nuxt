<template>
  <Auth v-if="!isLoggedIn" />
  <div v-else>You are logged in.</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['isLoggedIn']),
};
</script>
