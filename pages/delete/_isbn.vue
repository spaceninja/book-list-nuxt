<template>
  <div>
    <h2>Delete a Book: {{ $route.params.isbn }}</h2>
    <BookDelete v-if="book" @delete="deleteBook" />
    <div v-else>Book not found</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['book']),
    ...mapGetters(['getBookByIsbn']),
  },
  mounted() {
    // When the page mounts, set the active book to the current ISBN
    this.$store.dispatch(
      'setActiveBook',
      this.getBookByIsbn(this.$route.params.isbn)
    );
  },
  methods: {
    async deleteBook() {
      await this.$store.dispatch('deleteBook', this.book);
      this.$router.push('/');
    },
  },
};
</script>
