<template>
  <header class="header">
    <h1 class="header__logo">
      <NuxtLink to="/">Reading List</NuxtLink>
    </h1>
    <SortControls class="header__sort" />
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * + * {
    margin-top: 0.5em;
  }

  @media screen and (min-width: 640px) {
    flex-direction: row;

    > * + * {
      margin-top: 0;
    }
  }
}

.header__logo {
  font-weight: 400;
  margin: 0;

  @media screen and (min-width: 768px) {
    font-size: 3em;
    font-weight: 200;
  }

  @media screen and (min-width: 1024px) {
    font-size: 4em;
    font-weight: 100;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
