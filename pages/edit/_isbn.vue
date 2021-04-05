<template>
  <div v-if="isLoggedIn">
    <BookEdit v-if="selectedBook && selectedBook.isbn" @save="handleSave" />
    <Alert v-else :is-error="true">Book not found.</Alert>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({ selectedBook: (state) => state.books.selectedBook }),
    ...mapGetters(['isLoggedIn']),
    ...mapGetters('books', ['getBookByIsbn']),
  },
  mounted() {
    // When the page mounts, set the active book to the current ISBN
    this.setActiveBook(this.getBookByIsbn(this.$route.params.isbn));
  },
  methods: {
    ...mapActions('books', ['saveBook', 'setActiveBook']),
    async handleSave() {
      console.log('SAVE');
      await this.saveBook(this.selectedBook);
      console.log('ROUTER');
      this.$router.push('/');
    },
  },
};
</script>
