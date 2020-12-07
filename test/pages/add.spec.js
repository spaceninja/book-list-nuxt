import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import AddPage from '@/pages/Add.vue';

const actions = {
  saveBook: jest.fn(),
  setActiveBook: jest.fn(),
};

const stubs = {
  BookEdit: {
    template: '<div data-testid="book-edit" />',
  },
};

describe('pages/add.vue', () => {
  it('shows add form if logged in', () => {
    const { getByTestId } = render(AddPage, {
      store: { actions },
      computed: { isLoggedIn: () => true },
      stubs,
    });
    getByTestId('book-edit');
  });

  it('hides add form if logged out', () => {
    const { queryByTestId } = render(AddPage, {
      store: { actions },
      computed: { isLoggedIn: () => false },
      stubs,
    });
    expect(queryByTestId('book-edit')).not.toBeInTheDocument();
  });
});
