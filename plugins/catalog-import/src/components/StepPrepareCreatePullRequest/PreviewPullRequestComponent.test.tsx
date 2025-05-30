/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { renderInTestApp } from '@backstage/test-utils';
import { makeStyles } from '@material-ui/core/styles';
import { screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { PreviewPullRequestComponent } from './PreviewPullRequestComponent';

const useStyles = makeStyles({
  displayNone: {
    display: 'none',
  },
});

describe('<PreviewPullRequestComponent />', () => {
  it('renders without exploding', async () => {
    await renderInTestApp(
      <PreviewPullRequestComponent
        title="My Title"
        description="My **description**"
      />,
    );

    const title = screen.getByText('My Title');
    const description = screen.getByText('description', { selector: 'strong' });
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(description).toBeInTheDocument();
    expect(description).toBeVisible();
  });

  it('renders card with custom styles', async () => {
    const { result } = renderHook(() => useStyles());

    await renderInTestApp(
      <PreviewPullRequestComponent
        title="My Title"
        description="My **description**"
        classes={{ card: result.current.displayNone }}
      />,
    );

    const title = screen.getByText('My Title');
    const description = screen.getByText('description', { selector: 'strong' });
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    // FIXME: https://github.com/testing-library/jest-dom/issues/444
    // expect(title).not.toBeVisible();
    // expect(description).not.toBeVisible();

    const card = title.closest(`.${result.current.displayNone}`);
    expect(card).toBeInTheDocument();
    expect(description.closest(`.${result.current.displayNone}`)).toBe(card);
  });

  it('renders with custom styles', async () => {
    const { result } = renderHook(() => useStyles());

    await renderInTestApp(
      <PreviewPullRequestComponent
        title="My Title"
        description="My **description**"
        classes={{ cardContent: result.current.displayNone }}
      />,
    );

    const title = screen.getByText('My Title');
    const description = screen.getByText('description', { selector: 'strong' });
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(description).toBeInTheDocument();
    expect(description).not.toBeVisible();
  });
});
