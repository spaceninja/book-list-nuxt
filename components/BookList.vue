<template>
  <div>
    <ul>
      <li v-for="book in books" :key="book.isbn">
        <i>{{ book.title }}</i> by {{ book.authorFirst }} {{ book.authorLast }}
        <NuxtLink :to="`/edit/${book.isbn}`">edit</NuxtLink>
      </li>
    </ul>
    <NuxtLink to="/add">Add Book</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['books']),
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
