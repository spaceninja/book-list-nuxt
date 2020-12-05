<template>
  <li>
    <i>{{ title }}</i> by {{ authorFirst }} {{ authorLast }}, {{ length }}pp,
    {{ rating }}
    <span v-if="isLoggedIn && isEditable">
      <NuxtLink :to="`/edit/${isbn}`">edit</NuxtLink>
      <NuxtLink :to="`/delete/${isbn}`">delete</NuxtLink>
    </span>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      default: null,
    },
    authorFirst: {
      type: String,
      required: true,
    },
    authorLast: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    textSnippet: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    prioritize: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
