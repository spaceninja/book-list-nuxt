<template>
  <div>
    <h2>Add a Book</h2>
    <BookEdit @save="saveBook" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
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
