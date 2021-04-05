<template>
  <div>
    <AppButton @click="loadSampleBooks">Load Sample Books</AppButton>
    <AppButton @click="loadInitBooks">Load Init Books</AppButton>
    <AppButton @click="emptyBookList">Empty Book List</AppButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import initBooks from '../example/init-books';
import sampleBooks from '../example/sample-books';

export default {
  methods: {
    ...mapActions('books', ['saveBooks']),
    async loadSampleBooks() {
      await this.saveBooks(sampleBooks);
      this.$router.push('/');
    },
    async loadInitBooks() {
      await this.saveBooks(initBooks);
      this.$router.push('/');
    },
    async emptyBookList() {
      await this.saveBooks({});
      this.$router.push('/');
    },
  },
};
</script>
