import React from 'react';
import { afterAll, assert, beforeAll, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { LearningListPage } from '../src/routes/learnings/listPage/LearningListPage';
import { LocaleContext } from '../src/i18n/LocaleContext';
import { LoaderFunction, LoaderFunctionArgs, RouterProvider, createMemoryRouter, defer } from 'react-router-dom';
import i18n from 'i18next';
import { LoaderResponse, PAGE_SIZE } from '../src/routes/learnings/listPage/loaders';

const localeContextValue = { currentLocale: 'en', isLoading: false, setLocale: () => Promise.resolve() } as const;

const learningTitlePrefix = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
  'twentieth',
];

const learnings = learningTitlePrefix.map((prefix, index) => ({
  id: index,
  title: `${prefix} learning`,
  createdAt: new Date().toISOString(),
}));

const mockLearningsLoader = vi.fn();

const learningLoaderImpl = (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const titleFilter = searchParams.get('title') || '';
  const page = searchParams.get('page') || 0;
  const skip = +page * PAGE_SIZE;
  const filteredLearnings = learnings.filter((l) => new RegExp(titleFilter, 'i').test(l.title));
  const pageResults = filteredLearnings.slice(skip, skip + PAGE_SIZE);
  return defer({
    learningsPromise: Promise.resolve({
      learnings: pageResults,
      totalCount: filteredLearnings.length,
    }),
  } as LoaderResponse);
};

const emptyResultLearningLoaderImpl = () => {
  return defer({
    learningsPromise: Promise.resolve({
      learnings: [],
      totalCount: 0,
    }),
  } as LoaderResponse);
};

const getRouterWithLoader = (loader: LoaderFunction) =>
  createMemoryRouter(
    [
      {
        path: '/learnings',
        loader: loader,
        element: (
          <LocaleContext.Provider value={localeContextValue}>
            <LearningListPage />
          </LocaleContext.Provider>
        ),
      },
    ],
    { initialEntries: ['/learnings'] },
  );

const totalUnfilteredPages = Math.ceil(learnings.length / PAGE_SIZE);

describe('learning list page', () => {
  describe('with learnings returned by the loader', () => {
    beforeAll(() => {
      mockLearningsLoader.mockImplementation(learningLoaderImpl);
      render(<RouterProvider router={getRouterWithLoader(mockLearningsLoader)} />);
    });

    afterAll(() => {
      mockLearningsLoader.mockReset();
      cleanup();
    });

    it('lists the learnings that fit on a page', async () => {
      const elems = await screen.findAllByText(new RegExp(`(${learningTitlePrefix.join('|')}) learning`));
      expect(elems.length).toBe(PAGE_SIZE);
    });

    describe('pagination', () => {
      assert(totalUnfilteredPages === 2, 'pagination tests expect two pages in total'); // Note: fragile, will break if PAGE_SIZE changes.

      it('shows correct pagination state', async () => {
        const pageText = await screen.findByTestId('pagination-page');
        const expectedPage = 1;
        expect(pageText.textContent).toMatch(`${expectedPage} / ${totalUnfilteredPages}`);
      });

      it('previous page button is disabled if on first page', async () => {
        const previousButton = await screen.findByTestId('pagination-button-previous');
        expect(previousButton).toHaveProperty('disabled', true);
      });

      it('next page button is enabled if on first page', async () => {
        const nextButton = await screen.findByTestId('pagination-button-next');
        expect(nextButton).toHaveProperty('disabled', false);
      });

      it('can load next page', async () => {
        const nextButton = await screen.findByTestId('pagination-button-next');
        fireEvent.click(nextButton);
        const expectedPage = 2;
        const pageText = await screen.findByTestId('pagination-page');
        expect(pageText.textContent).toMatch(`${expectedPage} / ${totalUnfilteredPages}`);
      });

      it('calls loader with page in search query', () => {
        const expectedPageNumber = 1; // 0 based pagination -> page 1 in logic == page 2 in UI.
        expect(mockLearningsLoader.mock.lastCall[0].request.url).toMatch('page=' + expectedPageNumber);
      });

      it('next page button is disabled if on last page', async () => {
        const nextButton = await screen.findByTestId('pagination-button-next');
        expect(nextButton).toHaveProperty('disabled', true);
      });

      it('previous button is enabled if not on first page', async () => {
        const previousButton = await screen.findByTestId('pagination-button-previous');
        expect(previousButton).toHaveProperty('disabled', false);
      });
    });

    describe('filtering', () => {
      beforeAll(async () => {
        const searchInputField = await screen.findByTestId('title-search');
        fireEvent.change(searchInputField, { target: { value: 'first learning' } });
      });

      it('calls loader with title in search query', () => {
        expect(mockLearningsLoader.mock.lastCall[0].request.url).toMatch('title=first+learning');
      });

      it('returns to first page', async () => {
        const pageText = await screen.findByTestId('pagination-page');
        expect(pageText.textContent).toMatch(`1 /`);
      });

      it('lists only the learnings having matching title', async () => {
        const elems = await screen.findAllByText(new RegExp(`(${learningTitlePrefix.join('|')}) learning`));
        expect(elems.length).toBe(1);
      });

      it('updates pagination to match the learning count', async () => {
        const pageText = await screen.findByTestId('pagination-page');
        expect(pageText.textContent).toMatch(`1 / 1`);
      });
    });
  });

  describe('with no learnings returned by the loader', () => {
    beforeAll(() => {
      mockLearningsLoader.mockImplementation(emptyResultLearningLoaderImpl);
      render(<RouterProvider router={getRouterWithLoader(mockLearningsLoader)} />);
    });

    afterAll(() => {
      cleanup();
    });

    it('shows empty list message', async () => {
      const elem = await screen.findByTestId('empty-list-message');
      expect(elem.textContent).toMatch(i18n.t('learningListPage.emptyListMessage'));
    });

    it('shows page count of 0 / 0', async () => {
      const elem = await screen.findByTestId('pagination-page');
      expect(elem.textContent).toMatch('0 / 0');
    });
  });
});
