import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import FormInput from '@/components/FormInput.vue';

describe('FormInput.vue', () => {
  it('renders a text input', () => {
    const { getByRole } = render(FormInput, {
      props: {
        label: 'text',
      },
    });
    expect(getByRole('textbox')).toContainHTML('<input');
  });

  it('renders a textarea', () => {
    const { getByRole } = render(FormInput, {
      props: {
        label: 'textarea',
        type: 'textarea',
      },
    });
    expect(getByRole('textbox')).toContainHTML('<textarea');
  });

  it('renders a checkbox', () => {
    const { getByRole } = render(FormInput, {
      props: {
        label: 'checkbox',
        type: 'checkbox',
      },
    });
    getByRole('checkbox');
  });

  it('renders prepend, append, help text', () => {
    const { getByText } = render(FormInput, {
      props: {
        label: 'extras',
        prepend: 'prepend',
        append: 'append',
        help: 'help',
      },
    });
    getByText('prepend');
    getByText('append');
    getByText('help');
  });

  it('renders with a unique ID', () => {
    /* eslint-disable testing-library/render-result-naming-convention */
    const alpha = render(FormInput, { props: { label: 'alpha' } });
    const beta = render(FormInput, { props: { label: 'beta' } });
    /* eslint-enable */
    const alphaId = alpha.getByLabelText('alpha').id;
    const betaId = beta.getByLabelText('beta').id;
    expect(alphaId).not.toMatch(betaId);
  });
});
