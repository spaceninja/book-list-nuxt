import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SortControls from '@/components/SortControls.vue';

const actions = {
  addFilter: jest.fn(),
  removeFilter: jest.fn(),
  setSort: jest.fn(),
};

const store = {
  modules: {
    books: {
      namespaced: true,
      actions,
      state: {
        sortBy: {
          firstBy: 'rating',
          firstByOrder: 'descending',
          thenBy: 'length',
          thenByOrder: 'ascending',
        },
        filterBy: ['purchased'],
      },
    },
  },
};

describe('SortControls.vue', () => {
  it('can set and unset a filter', async () => {
    const { getByLabelText } = render(SortControls, {
      computed: {
        sortBy: () => store.modules.books.state.sortBy,
        filterBy: () => store.modules.books.state.filterBy,
        isLoggedIn: () => true,
      },
      store,
    });

    // uncheck purchased and remove the filter from state
    await userEvent.click(getByLabelText('Purchased'));
    expect(actions.removeFilter).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      'purchased'
    );

    // check purchased and add the filter to state
    await userEvent.click(getByLabelText('Purchased'));
    expect(actions.addFilter).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      'purchased'
    );
  });

  it('can change the sort method', async () => {
    const { getByLabelText } = render(SortControls, {
      computed: {
        sortBy: () => store.modules.books.state.sortBy,
        filterBy: () => store.modules.books.state.filterBy,
        isLoggedIn: () => true,
      },
      store,
    });

    // select a new sort method and save the sort object to state
    await userEvent.selectOptions(getByLabelText('Sort by:'), 'series');
    expect(actions.setSort).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      {
        display: 'Series',
        firstBy: 'series',
        firstByOrder: 'ascending',
        thenBy: 'title',
        thenByOrder: 'ascending',
      }
    );
  });
});
