<template>
  <form class="sort-controls">
    <fieldset class="filter-list">
      <legend class="sr-only">Filter by:</legend>
      <div class="filter-list__item filter-list__item--purchased">
        <input
          id="purchased"
          class="filter-list__checkbox"
          :checked="purchased"
          type="checkbox"
          name="purchased"
          @change="toggleFilter"
        />
        <label class="filter-list__label" for="purchased">Purchased</label>
      </div>
      <div class="filter-list__item filter-list__item--prioritize">
        <input
          id="prioritize"
          class="filter-list__checkbox"
          :checked="prioritize"
          type="checkbox"
          name="prioritize"
          @change="toggleFilter"
        />
        <label class="filter-list__label" for="prioritize">Prioritize</label>
      </div>
    </fieldset>
    <div class="sort">
      <label for="sort" class="sort__label">Sort by:</label>
      <select
        id="sort"
        class="sort__control"
        name="sort"
        @change="setSortMethod"
      >
        <option
          v-for="option in sortOptions"
          :key="option.firstBy"
          :value="option.firstBy"
          :selected="option.firstBy === sortMethod"
        >
          {{ option.display }}
        </option>
      </select>
    </div>
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
    sortMethod() {
      return this.sortBy.firstBy;
    },
  },
  methods: {
    ...mapActions('books', ['addFilter', 'removeFilter', 'setSort']),
    toggleFilter(event) {
      event.target.checked
        ? this.addFilter(event.target.name)
        : this.removeFilter(event.target.name);
    },
    setSortMethod(event) {
      this.setSort(this.sortOptions[event.target.value]);
    },
  },
};
</script>

<style lang="scss">
$color_purchased: rgba(0, 128, 0, 0.33);
$color_prioritized: rgba(255, 0, 0, 0.33);

.sort-controls {
  align-items: center;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.5em;
  }

  @media screen and (min-width: 640px) {
    flex-direction: row;

    > * + * {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
}

.filter-list {
  border: none;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.filter-list__item {
  align-items: center;
  display: flex;
  line-height: 1;
  margin: 0;
  padding: 0;

  + .filter-list__item {
    margin-left: 1em;
  }

  &::before {
    background: gray;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 0.75em;
    margin-right: 0.33em;
    width: 0.75em;
  }
}

.filter-list__checkbox {
  margin-right: 0.33em;
}

.filter-list__item--purchased {
  &::before {
    background: $color_purchased;
  }
}

.filter-list__item--prioritize {
  &::before {
    background: $color_prioritized;
  }
}

.sort__label {
  margin-right: 0.33em;
}
</style>
