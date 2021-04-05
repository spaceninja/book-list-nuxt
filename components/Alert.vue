<template>
  <div class="alert" :class="{ 'alert--error': isError }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
$color_warning: #ffc;
$color_danger: #fcc;

.alert {
  border: 1px solid currentColor;
  margin: 1em 0;
  padding: 0.25em 1em 0.5em;
}

.alert--warning {
  background: $color_warning;
}

.alert--error {
  background: $color_danger;
}
</style>
