<template>
  <div>
    <h2>Delete Book</h2>
    <p>Are you sure you want to delete this book?</p>
    <BookCard v-bind="selectedBook" />
    <button type="button" @click="confirmDelete">Yes</button>
    <NuxtLink to="/">No</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({ selectedBook: (state) => state.books.selectedBook }),
  },
  methods: {
    confirmDelete() {
      this.$emit('delete');
    },
  },
};
</script>
