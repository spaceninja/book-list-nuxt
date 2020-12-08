import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import AddPage from '@/pages/add.vue';
import BookEdit from '@/components/BookEdit.vue';
import FormInput from '@/components/FormInput.vue';

jest.mock('vuex-map-fields', () => ({
  getterType: jest.fn(),
  mapFields: jest.fn(),
}));

const $router = {
  push: jest.fn(),
};

const actions = {
  saveBook: jest.fn(),
  setActiveBook: jest.fn(),
};

const stubs = {
  BookEdit: {
    template: '<div data-testid="book-edit" />',
  },
};

const book = {
  title: 'Book Title',
  authorFirst: 'John',
  authorLast: 'Doe',
  rating: 5,
  length: 1,
  isbn: '123',
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

  test('can save book', async () => {
    const { getByRole, getByLabelText } = render(AddPage, {
      store: { actions },
      computed: { isLoggedIn: () => true },
      stubs: {
        BookEdit,
        FormInput,
      },
      mocks: {
        $router,
      },
    });

    // mounted lifecycle hook sets book to empty
    expect(actions.setActiveBook).toHaveBeenCalled();

    // fill out the form
    const isbn = getByLabelText('ISBN');
    await fireEvent.update(isbn, book.isbn);
    const title = getByLabelText('Title');
    await fireEvent.update(title, book.title);
    const authorFirst = getByLabelText('Author First Name');
    await fireEvent.update(authorFirst, book.authorFirst);
    const authorLast = getByLabelText('Author Last Name');
    await fireEvent.update(authorLast, book.authorLast);
    const rating = getByLabelText('Rating');
    await fireEvent.update(rating, book.rating);
    const length = getByLabelText('Length');
    await fireEvent.update(length, book.length);

    // save action trigger
    await fireEvent.click(getByRole('button'));
    expect(actions.saveBook).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });
});
