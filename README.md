React Pagination Hook, which is lightweight, fast and easy to use.

# Live Demo

https://serhat-m.github.io/pagination-react-js

# Example

This is an example of fully customizable pagination:

```tsx
import { usePagination, generateTestData } from "pagination-react-js"

type PaginationItemProps = {
  children: React.ReactNode
  label: React.ComponentProps<"li">["aria-label"]
  active?: boolean
  onClick?: React.ComponentProps<"li">["onClick"]
  rel?: React.ComponentProps<"li">["rel"]
}

const PaginationItem = ({ children, label, active, onClick, rel }: PaginationItemProps) => {
  return (
    <li
      className={["pagination-item", active ? "pagination-item-active" : undefined].filter((value) => value).join(" ")}
      aria-current={active ?? "page"}
      aria-label={label}
      rel={rel}
      onClick={onClick}
    >
      {children}
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

      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="pagination">
          <PaginationItem
            label={`Goto first page ${pageNumbers.firstPage}`}
            rel="first"
            onClick={() => updateActivePage(pageNumbers.firstPage)}
          >
            &laquo;
          </PaginationItem>

          <PaginationItem
            label={`Goto previous page ${pageNumbers.previousPage}`}
            rel="prev"
            onClick={() => updateActivePage(pageNumbers.previousPage)}
          >
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
            <PaginationItem
              label={`Goto page ${pageNumbers.customPreviousPage}`}
              onClick={() => updateActivePage(pageNumbers.customPreviousPage)}
            >
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

          <PaginationItem
            label={`Goto next page ${pageNumbers.nextPage}`}
            rel="next"
            onClick={() => updateActivePage(pageNumbers.nextPage)}
          >
            &rsaquo;
          </PaginationItem>

          <PaginationItem
            label={`Goto last page ${pageNumbers.lastPage}`}
            rel="last"
            onClick={() => updateActivePage(pageNumbers.lastPage)}
          >
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
  --border-size: 2px;
  --border-radius: 5px;
  --color-gray: #e1e4e7;
  --color-active: #0a7ea3;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 7px;
  width: fit-content;
  list-style-type: unset;
  border: var(--border-size) solid var(--color-gray);
  padding: 8px 10px;
  border-radius: var(--border-radius);
  user-select: none;
}

.pagination-item {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
}

.pagination-item:hover {
  cursor: pointer;
  background-color: var(--color-gray);
  transition: background-color 0.1s linear;
}

.pagination-item-active {
  color: white;
  background-color: var(--color-active);
  pointer-events: none;
  transition: background-color 0.1s linear;
}
```

# API

## `usePagination(options: TFnOptions): TPaginationData`

![pagination.svg](https://github-production-user-asset-6210df.s3.amazonaws.com/51929566/293516615-212f7044-29de-41d6-a1ab-85143dde8e7f.svg)

```tsx
type TFnOptions = {
  activePage: number
  recordsPerPage: number
  totalRecordsLength: number
  offset: number
  navCustomPageSteps?: { prev?: number; next?: number }
  permanentFirstNumber?: boolean
  permanentLastNumber?: boolean
}

type TPaginationData = {
  readonly records: {
    perPage: number
    indexOfFirst: number
    indexOfLast: number
  }
  readonly pageNumbers: {
    activePage: number
    firstPage: number
    lastPage: number
    previousPage: number | false
    nextPage: number | false
    customPreviousPage: number | false
    customNextPage: number | false
    navigation: number[]
  }
  readonly setActivePage: (pageNumber: number) => void
  readonly setRecordsPerPage: (recordsPerPage: number) => void
}
```

### `TFnOptions`

- `activePage` initial active page number
- `recordsPerPage` initial records per page
- `totalRecordsLength` data list length
- `offset` amount of numbers before and after the active number
- `navCustomPageSteps` step size of the user-defined navigation
- `permanentFirstNumber` offset adjustment for permanent first number
- `permanentLastNumber` offset adjustment for permanent last number

### `TPaginationData`

**`records`**

- `perPage` number of records per page
- `indexOfFirst` index of first record
- `indexOfLast` index of last record

**`pageNumbers`**

- `activePage` active page number
- `firstPage` first page number
- `lastPage` last page number
- `previousPage` previous page number
- `nextPage` next page number
- `customPreviousPage` custom previous page number
- `customNextPage` custom next page number
- `navigation` array of navigation numbers

**`setActivePage: (pageNumber: number) => void`**

Function to update the active page

**`setRecordsPerPage: (recordsPerPage: number) => void`**

Function to update the records per page
