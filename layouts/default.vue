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
  /** Get Data on Server Side: */
  async fetch() {
    if (process.browser) return;
    console.log('SSR', process.server);
    try {
      // Bind Vuexfire on server side, then unbind to avoid server memory leaks.
      await this.$store.dispatch('bindBooks');
      console.log('BIND BOOKS COMPLETE', process.server ? 'SERVER' : 'CLIENT');
      this.$store.dispatch('unbindBooks');
    } catch (e) {
      console.error(e);
    }
  },
  /** Get Data on Client Side: */
  async created() {
    if (process.server) return;
    console.log('CLIENT', process.client);
    try {
      // Bind Vuexfire on client side
      await this.$store.dispatch('bindBooks');
      console.log('BIND BOOKS COMPLETE', process.server ? 'SERVER' : 'CLIENT');
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
