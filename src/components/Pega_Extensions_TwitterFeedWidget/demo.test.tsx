import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom';

import * as DemoStories from './demo.stories';

const { Default } = composeStories(DemoStories);

test('renders TwitterFeedWidget and displays loading state, then loads tweets', async () => {
  render(<Default />);
  
  // 1. Initial state should be loading
  expect(screen.getByLabelText('Loading Twitter Feed...')).toBeVisible();

  // 2. Wait for the mocked API calls to resolve
  await waitFor(() => {
    // The loading message should disappear
    expect(screen.queryByLabelText('Loading Twitter Feed...')).not.toBeInTheDocument();
  }, { timeout: 2000 }); // Increase timeout since we added setTimeout to our mock

  // 3. Verify that the correct heading is rendered
  expect(await screen.findByText('Latest Company News')).toBeVisible();

  // 4. Verify that tweets are rendered from the mock data
  // We check for parts of the text because #Constellation is wrapped in a span
  expect(screen.getByText(/Just built a new custom component/)).toBeVisible();
  expect(screen.getByText('#Constellation')).toBeVisible();
  expect(screen.getByText('ConstellationDev')).toBeVisible();
  expect(screen.getByText('@pega_master')).toBeVisible();
});
