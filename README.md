React Pagination Hook, which is lightweight, fast and easy to use.

# Live Demo

https://serhat-m.github.io/pagination-react-js

# Example

This is an example of fully customizable pagination:

```tsx
import { usePagination, generateTestData } from "pagination-react-js"

type PaginationItemProps = {
  children: React.ReactNode
  label: React.ComponentProps<"button">["aria-label"]
  active?: boolean
  onClick: React.ComponentProps<"button">["onClick"]
}

const PaginationItem = ({ children, label, active, onClick }: PaginationItemProps) => {
  return (
    <li>
      <button
        type="button"
        className={["pagination-item", active ? "pagination-item-active" : undefined].filter((value) => value).join(" ")}
        onClick={onClick}
        aria-current={active ?? "page"}
        aria-label={label}
      >
        {children}
      </button>
    </li>
  )
}

const Pagination = () => {
  const dataList = generateTestData(700, (i) => ({
    id: `Id${i}`,
    name: `Name${i}`,
  }))

  const { records, pageNumbers, setActivePage, setRecordsPerPage } = usePagination({
    activePage: 1,
    recordsPerPage: 10,
    totalRecordsLength: dataList.length,
    offset: 2,
    navCustomPageSteps: { prev: 3, next: 3 },
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })

  function updateActivePage(pageNumber: number | false) {
    pageNumber && setActivePage(pageNumber)
  }

  return (
    <div>
      <table>
        <tbody>
          {dataList.slice(records.indexOfFirst, records.indexOfLast + 1).map((record) => {
            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <nav aria-label="Page navigation">
        <ul className="pagination">
          <PaginationItem label={`Goto first page ${pageNumbers.firstPage}`} onClick={() => updateActivePage(pageNumbers.firstPage)}>
            &laquo;
          </PaginationItem>

          <PaginationItem label={`Goto previous page ${pageNumbers.previousPage}`} onClick={() => updateActivePage(pageNumbers.previousPage)}>
            &lsaquo;
          </PaginationItem>

          <PaginationItem
            label={`Goto first page ${pageNumbers.firstPage}`}
            active={pageNumbers.firstPage === pageNumbers.activePage}
            onClick={() => updateActivePage(pageNumbers.firstPage)}
          >
            {pageNumbers.firstPage}
          </PaginationItem>

          {pageNumbers.customPreviousPage && (
            <PaginationItem label={`Goto page ${pageNumbers.customPreviousPage}`} onClick={() => updateActivePage(pageNumbers.customPreviousPage)}>
              &middot;&middot;&middot;
            </PaginationItem>
          )}

          {pageNumbers.navigation.map((navigationNumber) => {
            const isFirstOrLastPage = navigationNumber === pageNumbers.firstPage || navigationNumber === pageNumbers.lastPage

            return isFirstOrLastPage ? null : (
              <PaginationItem
                label={`Goto page ${navigationNumber}`}
                key={navigationNumber}
                active={navigationNumber === pageNumbers.activePage}
                onClick={() => updateActivePage(navigationNumber)}
              >
                {navigationNumber}
              </PaginationItem>
            )
          })}

          {pageNumbers.customNextPage && (
            <PaginationItem label={`Goto page ${pageNumbers.customNextPage}`} onClick={() => updateActivePage(pageNumbers.customNextPage)}>
              &middot;&middot;&middot;
            </PaginationItem>
          )}

          {pageNumbers.firstPage !== pageNumbers.lastPage && (
            <PaginationItem
              label={`Goto last page ${pageNumbers.lastPage}`}
              active={pageNumbers.lastPage === pageNumbers.activePage}
              onClick={() => updateActivePage(pageNumbers.lastPage)}
            >
              {pageNumbers.lastPage}
            </PaginationItem>
          )}

          <PaginationItem label={`Goto next page ${pageNumbers.nextPage}`} onClick={() => updateActivePage(pageNumbers.nextPage)}>
            &rsaquo;
          </PaginationItem>

          <PaginationItem label={`Goto last page ${pageNumbers.lastPage}`} onClick={() => updateActivePage(pageNumbers.lastPage)}>
            &raquo;
          </PaginationItem>
        </ul>
      </nav>
    </div>
  )
}
```

## Example CSS

```css
:root {
  font-size: 16px;
  --border-size: 0.125rem;
  --border-radius: 0.3rem;
  --color-gray: #e1e4e7;
  --color-active: #0a7ea3;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  list-style-type: none;
  padding: 0.5rem 0.625rem;
  border: var(--border-size) solid var(--color-gray);
  border-radius: var(--border-radius);
  user-select: none;
}

.pagination-item {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
}

.pagination-item:hover {
  cursor: pointer;
  background-color: var(--color-gray);
}

.pagination-item-active {
  color: white;
  background-color: var(--color-active);
  pointer-events: none;
}
```

# API

## `usePagination(options: TFnOptions): TPaginationData`

![pagination.svg](https://github-production-user-asset-6210df.s3.amazonaws.com/51929566/293516615-212f7044-29de-41d6-a1ab-85143dde8e7f.svg)

## `type TFnOptions`

```tsx
type TFnOptions = {
  activePage: number // initial active page number
  recordsPerPage: number // initial records per page
  totalRecordsLength: number // data list length
  offset: number // amount of numbers before and after the active number
  navCustomPageSteps?: { prev?: number; next?: number } // step size of the user-defined navigation
  permanentFirstNumber?: boolean // offset adjustment for permanent first number
  permanentLastNumber?: boolean // offset adjustment for permanent last number
}
```

## `type TPaginationData`

```tsx
type TPaginationData = {
  readonly records: {
    perPage: number // number of records per page
    indexOfFirst: number // index of first record
    indexOfLast: number // index of last record
  }
  readonly pageNumbers: {
    activePage: number // active page number
    firstPage: number // first page number
    lastPage: number // last page number
    previousPage: number | false // previous page number
    nextPage: number | false // next page number
    customPreviousPage: number | false // custom previous page number
    customNextPage: number | false // custom next page number
    navigation: number[] // array of navigation numbers
  }
  readonly setActivePage: (pageNumber: number) => void // function to update the active page
  readonly setRecordsPerPage: (recordsPerPage: number) => void // function to update the records per page
}
```
