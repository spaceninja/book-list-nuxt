<template>
  <div v-if="isLoggedIn">
    <div v-if="selectedBook && selectedBook.isbn">
      <BookEdit @save="handleSave" />
      <AppButton @click="handleReset">Back to Search Results</AppButton>
    </div>
    <BookLookup v-else @load="handleLoad" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({ selectedBook: (state) => state.books.selectedBook }),
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    // When the page mounts, empty the active book object
    this.setActiveBook({});
  },
  methods: {
    ...mapActions('books', ['saveBook', 'setActiveBook']),
    async handleSave() {
      await this.saveBook(this.selectedBook);
      this.$router.push('/');
    },
    handleLoad(book) {
      console.log('LOOKUP BOOK', book);
      this.setActiveBook(book);
    },
    handleReset() {
      this.setActiveBook({});
    },
  },
};
</script>
