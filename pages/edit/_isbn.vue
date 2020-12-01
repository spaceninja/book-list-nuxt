<template>
  <div>
    <h2>Edit a Book: {{ $route.params.isbn }}</h2>
    <BookEdit v-if="book" @save="saveBook" />
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
    saveBook() {
      this.$store.dispatch('saveBook', this.book);
    },
  },
};
</script>
