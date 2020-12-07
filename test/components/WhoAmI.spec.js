import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import WhoAmI from '@/components/WhoAmI.vue';

const authUser = { email: 'test@example.com' };
const actions = {
  signOut: jest.fn(),
  signInWithGitHub: jest.fn(),
};

describe('WhoAmI.vue', () => {
  it('dispatches signIn action when logged out', async () => {
    const { getByText, getByRole } = render(WhoAmI, {
      computed: { isLoggedIn: () => false },
      store: { actions },
    });
    getByText(/You are logged out/);
    await fireEvent.click(getByRole('button'));
    expect(actions.signInWithGitHub).toHaveBeenCalled();
  });

  it('dispatches signOut action when logged in', async () => {
    const { getByText, getByRole } = render(WhoAmI, {
      computed: {
        isLoggedIn: () => true,
        authUser: () => authUser,
      },
      stubs: ['Gravatar'],
      store: { actions },
    });
    getByText(/You are logged in/);
    await fireEvent.click(getByRole('button'));
    expect(actions.signOut).toHaveBeenCalled();
  });
});
