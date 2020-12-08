<template>
  <div v-if="isLoggedIn">
    <BookDelete v-if="book && book.isbn" @delete="handleDelete" />
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
    ...mapActions(['deleteBook', 'setActiveBook']),
    async handleDelete() {
      await this.deleteBook(this.book);
      this.$router.push('/');
    },
  },
};
</script>
