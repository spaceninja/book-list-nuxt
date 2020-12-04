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
.alert {
  border: 1px solid currentColor;
  padding: 0.5rem;
}

.alert--error {
  color: red;
}
</style>
