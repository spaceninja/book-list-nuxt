<template>
  <div v-if="isLoggedIn">
    <BookEdit @save="saveBook" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    // When the page mounts, empty the active book object
    this.$store.dispatch('setActiveBook', {});
  },
  methods: {
    async saveBook() {
      await this.$store.dispatch('saveBook', this.book);
      this.$router.push('/');
    },
  },
};
</script>
