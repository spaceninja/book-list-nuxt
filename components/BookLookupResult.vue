<template>
  <li>
    <img :src="thumbnail" alt="" height="32" />
    {{ title }} by {{ author }}: {{ pageCount }}pp, {{ averageRating }}
    <button @click="$emit('load', book)">Add this Book</button>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    authors: {
      type: Array,
      default: () => [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    imageLinks: {
      type: Object,
      default: () => {},
    },
    industryIdentifiers: {
      type: Array,
      default: () => [],
    },
    pageCount: {
      type: Number,
      default: 0,
    },
    publishedDate: {
      type: String,
      default: '',
    },
    searchInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    thumbnail() {
      return this.imageLinks?.thumbnail;
    },
    isbn() {
      const isbn10 = this.industryIdentifiers.find((obj) => {
        return obj.type === 'ISBN_10';
      });
      return isbn10?.identifier || this.industryIdentifiers[0].identifier;
    },
    author() {
      return this.authors[0];
    },
    firstName() {
      return this.author.split(' ').slice(0, -1).join(' ');
    },
    lastName() {
      return this.author.split(' ').slice(-1).join(' ');
    },
    textSnippet() {
      return this.searchInfo?.textSnippet;
    },
    book() {
      return {
        title: this.title,
        authorFirst: this.firstName,
        authorLast: this.lastName,
        rating: this.averageRating,
        length: this.pageCount,
        isbn: this.isbn,
        release: this.publishedDate,
        thumbnail: this.thumbnail,
        textSnippet: this.description,
        note: this.textSnippet,
      };
    },
  },
};
</script>
