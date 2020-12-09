<template>
  <div>
    <ol v-if="allBooks">
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
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';
const { mapState: mapBookState } = createNamespacedHelpers('books');

export default {
  computed: {
    ...mapBookState(['allBooks']),
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
