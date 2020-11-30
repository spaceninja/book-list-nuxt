<template>
  <div>
    <h2>Edit a Book: {{ $route.params.isbn }}</h2>
    <BookEdit v-if="book" v-bind="book" />
    <div v-else>Book not found</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['books']),
    book() {
      return this.books.find((book) => book.isbn === this.$route.params.isbn);
    },
  },
};
</script>
