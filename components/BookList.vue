<template>
  <div>
    <ol v-if="sortedAndFilteredBooks && hasBooks">
      <BookCard
        v-for="book in sortedAndFilteredBooks"
        :key="book.isbn"
        v-bind="book"
        :is-editable="true"
      />
    </ol>
    <Alert v-else>
      There are no books in the list yet. Why don’t you add one?
    </Alert>
    <NuxtLink v-if="isLoggedIn" to="/add">Add Book</NuxtLink>
    <NuxtLink v-if="isLoggedIn" to="/reset">Reset Books</NuxtLink>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({
      allBooks: (state) => state.books.allBooks,
      sortBy: (state) => state.books.sortBy,
      filterBy: (state) => state.books.filterBy,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      getSortedAndFilteredBooks: 'books/getSortedAndFilteredBooks',
    }),
    sortedAndFilteredBooks() {
      return this.getSortedAndFilteredBooks(this.filterBy, this.sortBy);
    },
    hasBooks() {
      return Object.keys(this.sortedAndFilteredBooks).length;
    },
  },
};
</script>
