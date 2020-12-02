<template>
  <div>
    <h2>Are you sure you want to delete this book?</h2>
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
