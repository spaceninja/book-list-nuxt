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
        <select id="sort" v-model="sortMethod" name="sort">
          <option
            v-for="option in sortOptions"
            :key="option.firstBy"
            :value="option.firstBy"
            :selected="option.firstBy === sortMethod"
          >
            {{ option.display }}
          </option>
        </select>
      </label>
    </fieldset>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      sortOptions: {
        title: {
          display: 'Title',
          firstBy: 'title',
          firstByOrder: 'ascending',
          thenBy: 'authorLast',
          thenByOrder: 'ascending',
        },
        series: {
          display: 'Series',
          firstBy: 'series',
          firstByOrder: 'ascending',
          thenBy: 'title',
          thenByOrder: 'ascending',
        },
        authorLast: {
          display: 'Author',
          firstBy: 'authorLast',
          firstByOrder: 'ascending',
          thenBy: 'series',
          thenByOrder: 'ascending',
        },
        rating: {
          display: 'Rating',
          firstBy: 'rating',
          firstByOrder: 'descending',
          thenBy: 'length',
          thenByOrder: 'ascending',
        },
        length: {
          display: 'Length',
          firstBy: 'length',
          firstByOrder: 'ascending',
          thenBy: 'rating',
          thenByOrder: 'descending',
        },
      },
    };
  },
  computed: {
    ...mapState({
      filterBy: (state) => state.books.filterBy,
      sortBy: (state) => state.books.sortBy,
    }),
    prioritize() {
      return this.filterBy.includes('prioritize');
    },
    purchased() {
      return this.filterBy.includes('purchased');
    },
    sortMethod: {
      get() {
        return this.sortBy.firstBy;
      },
      set() {
        this.setSort(this.sortOptions[event.target.value]);
      },
    },
  },
  methods: {
    ...mapActions('books', ['addFilter', 'removeFilter', 'setSort']),
    toggleFilter(event) {
      event.target.checked
        ? this.addFilter(event.target.name)
        : this.removeFilter(event.target.name);
    },
  },
};
</script>
