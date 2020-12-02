<template>
  <div>
    <ol v-if="books">
      <BookCard v-for="book in books" :key="book.isbn" v-bind="book" />
    </ol>
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
