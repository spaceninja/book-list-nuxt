<template>
  <div v-if="isLoggedIn">
    <BookEdit @save="handleSave" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    // When the page mounts, empty the active book object
    this.setActiveBook({});
  },
  methods: {
    ...mapActions(['saveBook', 'setActiveBook']),
    async handleSave() {
      await this.saveBook(this.book);
      this.$router.push('/');
    },
  },
};
</script>
