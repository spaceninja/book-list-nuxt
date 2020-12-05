<template>
  <div>
    <h2>Delete Book</h2>
    <p>Are you sure you want to delete this book?</p>
    <BookCard v-bind="book" />
    <button type="button" @click="confirmDelete">Yes</button>
    <NuxtLink to="/">No</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
  },
  methods: {
    confirmDelete() {
      this.$emit('delete');
    },
  },
};
</script>
