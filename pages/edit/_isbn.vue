<template>
  <div v-if="isLoggedIn">
    <BookEdit v-if="book && book.isbn" @save="handleSave" />
    <Alert v-else :is-error="true">Book not found.</Alert>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
    ...mapGetters(['getBookByIsbn', 'isLoggedIn']),
  },
  mounted() {
    // When the page mounts, set the active book to the current ISBN
    this.setActiveBook(this.getBookByIsbn(this.$route.params.isbn));
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
