// import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';

import * as DemoStories from './demo.stories';

const { Default } = composeStories(DemoStories);

test('renders PegaExtensionsPasswordInputEnhanced', async () => {
  render(<Default />);
  expect(await screen.findByText('Password')).toBeVisible();
  expect(await screen.findByText('Enter a password with one uppercase letter and one special character')).toBeVisible();

  const textInputElement = (screen.getByTestId('PasswordID') as HTMLInputElement);
  expect(textInputElement.value).toBe('demo');
  expect(textInputElement).toHaveAttribute('type', 'password');
});
