<template>
  <div>
    <h2>Edit a Book: {{ $route.params.isbn }}</h2>
    <BookEdit v-if="book.isbn" @save="saveBook" />
    <Alert v-else :is-error="true">Book not found.</Alert>
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
    async saveBook() {
      await this.$store.dispatch('saveBook', this.book);
      this.$router.push('/');
    },
  },
};
</script>
