<template>
  <div>
    <ul>
      <li v-for="book in books" :key="book.isbn">
        <i>{{ book.title }}</i> by {{ book.authorFirst }} {{ book.authorLast }}
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';

export default {
  /** Get data on Server Side: */
  async fetch({ app, store }) {
    if (process.browser) return;
    try {
      // Binds it on server side then unbind again to avoid memory leaks on the server.
      await store.dispatch('bindBooks');
      store.dispatch('unbindBooks');
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    ...mapState(['books']),
  },
  /**  Bind Vuexfire on client-side: */
  async mounted() {
    try {
      await this.$store.dispatch('bindBooks');
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async writeToRealtimeDb() {
      const messageRef = this.$fire.database.ref('books');
      try {
        await messageRef.set({
          message: 'Nuxt-Fire with Firebase Realtime Database rocks!',
        });
      } catch (e) {
        alert(e);
        return;
      }
      alert('Success.');
    },
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref('books');
      try {
        const snapshot = await messageRef.once('value');
        console.log(snapshot.val());
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
