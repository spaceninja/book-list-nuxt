<template><img :src="emailHash" alt="" width="24" height="24" /></template>

<script>
import crypto from 'crypto';
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  computed: {
    emailHash() {
      return `https://www.gravatar.com/avatar/${this.hash(this.email)}`;
    },
  },
  methods: {
    hash(string) {
      return crypto
        .createHash('md5')
        .update(string.trim().toLowerCase())
        .digest('hex');
    },
  },
};
</script>
