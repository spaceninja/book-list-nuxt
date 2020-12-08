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
      computed: { isLoggedIn: () => true },
      store: { actions },
      stubs,
    });
    getByTestId('book-edit');
  });

  it('hides add form if logged out', () => {
    const { queryByTestId } = render(AddPage, {
      computed: { isLoggedIn: () => false },
      store: { actions },
      stubs,
    });
    expect(queryByTestId('book-edit')).not.toBeInTheDocument();
  });

  it('can save book', async () => {
    const { getByRole, getByLabelText } = render(AddPage, {
      computed: { isLoggedIn: () => true },
      mocks: { $router },
      store: { actions },
      stubs: { BookEdit, FormInput },
    });

    // mounted lifecycle hook sets book to empty
    expect(actions.setActiveBook).toHaveBeenCalled();

    // fill out the form
    const isbn = getByLabelText('ISBN');
    const title = getByLabelText('Title');
    const authorFirst = getByLabelText('Author First Name');
    const authorLast = getByLabelText('Author Last Name');
    const rating = getByLabelText('Rating');
    const length = getByLabelText('Length');
    await Promise.all([
      /* eslint-disable testing-library/await-fire-event */
      fireEvent.update(isbn, book.isbn),
      fireEvent.update(title, book.title),
      fireEvent.update(authorFirst, book.authorFirst),
      fireEvent.update(authorLast, book.authorLast),
      fireEvent.update(rating, book.rating),
      fireEvent.update(length, book.length),
    ]);

    // save action trigger
    await fireEvent.click(getByRole('button'));
    expect(actions.saveBook).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });
});
