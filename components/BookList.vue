<template>
  <div>
    <ol v-if="allBooks && Object.keys(allBooks).length">
      <BookCard
        v-for="book in allBooks"
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
    ...mapState({ allBooks: (state) => state.books.allBooks }),
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
