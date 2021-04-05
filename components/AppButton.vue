<!--
  App Button

  This component determines whether to use `nuxt-link` or a `button` element
  based on whether a `to` parameter is passed in.

  This is useful to ensure we're using the correct element based on whether
  it links to a destination or not.

  see: https://thoughts.codegram.com/create-a-reusable-button-with-vue-dynamic-components/
-->

<template>
  <NuxtLink v-if="to" :to="to" class="button">
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="$attrs.type || 'button'"
    class="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
$color_blue: #007bff;
$color_dark_blue: #0069d9;
$color_secondary: #6c757d;
$color_secondary_dark: #5a6268;

.button {
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  padding: 0.375em 0.75em;

  + .button {
    margin-left: 1em;
  }
}

.button__icon {
  color: transparent;
  text-shadow: 0 0 var(--color-button-text);
  transform: scale(-1, 1);
}

.button--sm {
  font-size: 14px;
}

.button--icon-only {
  border-radius: 50%;
  font-size: 12px;
  height: 2.75em;
  padding: 0;
  width: 2.75em;
}

.button--primary {
  background: $color_blue;
  color: var(--color-button-text);

  &:hover,
  &:focus {
    background: $color_dark_blue;
  }
}

.button--secondary {
  background: $color_secondary;
  color: var(--color-button-text);

  &:hover,
  &:focus {
    background: $color_secondary_dark;
  }
}
</style>
