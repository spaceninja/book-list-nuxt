<template>
  <form>
    <fieldset>
      <legend>Filter by:</legend>
      <div>
        <input
          id="purchased"
          :checked="purchased"
          type="checkbox"
          name="purchased"
          @change="toggleFilter"
        />
        <label for="purchased">Purchased</label>
      </div>
      <div>
        <input
          id="prioritize"
          :checked="prioritize"
          type="checkbox"
          name="prioritize"
          @change="toggleFilter"
        />
        <label for="prioritize">Prioritize</label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Sort by:</legend>
      <label for="sort">
        <select id="sort" name="sort">
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </label>
    </fieldset>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      filterBy: (state) => state.books.filterBy,
    }),
    prioritize() {
      return this.filterBy.includes('prioritize');
    },
    purchased() {
      return this.filterBy.includes('purchased');
    },
  },
  methods: {
    ...mapActions('books', ['addFilter', 'removeFilter']),
    toggleFilter(event) {
      event.target.checked
        ? this.addFilter(event.target.name)
        : this.removeFilter(event.target.name);
    },
  },
};
</script>
