<template>
  <div>
    <ol v-if="books">
      <BookCard v-for="book in books" :key="book.isbn" v-bind="book" />
    </ol>
    <Alert v-else>
      There are no books in the list yet. Why don’t you add one?
    </Alert>
    <NuxtLink to="/add">Add Book</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['books']),
  },
};
</script>
