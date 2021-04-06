import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/vue';
import AppButton from '@/components/AppButton.vue';
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
      stubs: { Alert: true, AppButton },
      store: { actions },
    });
    getByText(/You are logged out/);
    await fireEvent.click(getByRole('button', { name: /sign in/i }));
    expect(actions.signInWithGitHub).toHaveBeenCalled();
  });

  it('dispatches signOut action when logged in', async () => {
    const { getByText, getByRole } = render(WhoAmI, {
      computed: {
        isLoggedIn: () => true,
        authUser: () => authUser,
      },
      stubs: { Alert: true, AppButton, Gravatar: true },
      store: { actions },
    });
    getByText(/You are logged in/);
    await fireEvent.click(getByRole('button', { name: /log out/i }));
    expect(actions.signOut).toHaveBeenCalled();
  });
});
