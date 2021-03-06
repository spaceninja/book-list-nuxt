<template>
  <div>
    <AppHeader />
    <main>
      <Nuxt />
    </main>
    <AppFooter />
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
      await this.$store.dispatch('books/bind');
      console.log('BIND BOOKS COMPLETE', process.server ? 'SERVER' : 'CLIENT');
      this.$store.dispatch('books/unbind');
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
      await this.$store.dispatch('books/bind');
      console.log('BIND BOOKS COMPLETE', process.server ? 'SERVER' : 'CLIENT');
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="scss">
//
// Variables
//
$color_purchased: rgba(0, 128, 0, 0.33);
$color_prioritized: rgba(255, 0, 0, 0.33);
$color_warning: #ffc;
$color_danger: #fcc;

// button colors
$color_blue: #007bff;
$color_dark_blue: #0069d9;
$color_secondary: #6c757d;
$color_secondary_dark: #5a6268;

// material grays
$color_white: #fff;
$color_gray_050: #fafafa;
$color_gray_100: #f5f5f5;
$color_gray_200: #eee;
$color_gray_300: #e0e0e0;
$color_gray_400: #bdbdbd;
$color_gray_500: #9e9e9e;
$color_gray_600: #757575;
$color_gray_700: #616161;
$color_gray_800: #424242;
$color_gray_900: #212121;
$color_black: #161616;

// alpha transparencies
$color_overlay: rgba(255, 255, 255, 0.75);
$color_overlay_dark: rgba(0, 0, 0, 0.75);
$color_shadow1: rgba(0, 0, 0, 0.12);
$color_shadow2: rgba(0, 0, 0, 0.24);

:root {
  --color-page-bg: #{$color_gray_050};
  --color-text: #{$color_gray_800};
  --color-headline-text: #{$color_gray_900};
  --color-book-bg: #{$color_white};
  --color-rating-bg: #{$color_gray_050};
  --color-recommendation-bg: #{$color_gray_100};
  --color-overlay-bg: #{$color_overlay};
  --color-modal-bg: #{$color_white};
  --color-input-bg: #{$color_white};
  --color-input-append-bg: #{$color_gray_100};
  --color-input-border: #{$color_gray_300};
  --color-button-text: #{$color_white};
  --font-weight-default: 100;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-page-bg: #{$color_black};
    --color-text: #{$color_gray_400};
    --color-headline-text: #{$color_gray_300};
    --color-book-bg: #{$color_gray_900};
    --color-rating-bg: #{$color_gray_800};
    --color-recommendation-bg: #{$color_gray_800};
    --color-overlay-bg: #{$color_overlay_dark};
    --color-modal-bg: #{$color_gray_900};
    --color-input-bg: #{$color_gray_900};
    --color-input-append-bg: #{$color_gray_800};
    --color-input-border: #{$color_gray_600};
    --color-button-text: #{$color_white};
    --font-weight-default: 300;
  }
}

//
// Base Styles
//
* {
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: var(--font-weight-default);
  line-height: 1.4;

  @media screen and (min-width: 480px) {
    font-size: 14px;
  }
}

body {
  background: var(--color-page-bg);
  color: var(--color-text);
  padding: 1em;
}

p {
  margin-top: 0;
}

blockquote {
  margin: 0;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
