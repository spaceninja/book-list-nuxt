<template>
  <div>
    <header>
      <h1>
        <NuxtLink to="/">Reading List</NuxtLink>
      </h1>
    </header>
    <hr />
    <main>
      <Nuxt />
    </main>
    <hr />
    <footer>
      <WhoAmI />
    </footer>
  </div>
</template>

<script>
export default {
  /** Get data on Server Side: */
  async fetch({ app, store }) {
    if (process.browser) return;
    try {
      // Binds it on server side then unbind again to avoid memory leaks on the server.
      await store.dispatch('bindBooks');
      console.log('BIND BOOKS COMPLETE');
      store.dispatch('unbindBooks');
    } catch (e) {
      console.error(e);
    }
  },
  /**  Bind Vuexfire on client-side: */
  async created() {
    try {
      await this.$store.dispatch('bindBooks');
      console.log('BIND BOOKS COMPLETE');
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
}
</style>
