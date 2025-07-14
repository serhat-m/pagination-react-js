React Pagination Hook, which is lightweight, fast and easy to use.

# Live Demo

https://serhat-m.github.io/pagination-react-js

# Example

Fully customizable pagination example:

```tsx
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
        aria-current={active}
        aria-label={label}
      >
        {children}
      </button>
    </li>
  )
}

const PaginatedTable = () => {
  const dataList = useMemo(
    () =>
      Array.from({ length: 500 }, (_, index) => ({
        id: index,
        name: `Test ${index}`,
        gender: index % 2 ? "Female" : "Male",
        position: `Position ${index}`,
        email: `test${index}@test.com`,
      })),
    [],
  )

  const { records, pagination, setActivePage, setRecordsPerPage } = usePagination({
    activePage: 1,
    recordsPerPage: 10,
    totalRecordsLength: dataList.length,
    offset: 2,
    navCustomPageSteps: { prev: 3, next: 3 },
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })

  function updateActivePage(pageNumber: number | null) {
    if(pageNumber) setActivePage(pageNumber)
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

      {pagination && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <PaginationItem label={`Goto first page ${pagination.firstPage}`} onClick={() => updateActivePage(pagination.firstPage)}>
              &laquo;
            </PaginationItem>

            <PaginationItem label={`Goto previous page ${pagination.previousPage}`} onClick={() => updateActivePage(pagination.previousPage)}>
              &lsaquo;
            </PaginationItem>

            <PaginationItem
              label={`Goto first page ${pagination.firstPage}`}
              active={pagination.firstPage === pagination.activePage}
              onClick={() => updateActivePage(pagination.firstPage)}
            >
              {pagination.firstPage}
            </PaginationItem>

            {pagination.customPreviousPage && (
              <PaginationItem label={`Goto page ${pagination.customPreviousPage}`} onClick={() => updateActivePage(pagination.customPreviousPage)}>
                &middot;&middot;&middot;
              </PaginationItem>
            )}

            {pagination.pageNumbers.map((paginationNumber) => {
              const isFirstOrLastPage = paginationNumber === pagination.firstPage || paginationNumber === pagination.lastPage

              return isFirstOrLastPage ? null : (
                <PaginationItem
                  label={`Goto page ${paginationNumber}`}
                  key={paginationNumber}
                  active={paginationNumber === pagination.activePage}
                  onClick={() => updateActivePage(paginationNumber)}
                >
                  {paginationNumber}
                </PaginationItem>
              )
            })}

            {pagination.customNextPage && (
              <PaginationItem label={`Goto page ${pagination.customNextPage}`} onClick={() => updateActivePage(pagination.customNextPage)}>
                &middot;&middot;&middot;
              </PaginationItem>
            )}

            {pagination.firstPage !== pagination.lastPage && (
              <PaginationItem
                label={`Goto last page ${pagination.lastPage}`}
                active={pagination.lastPage === pagination.activePage}
                onClick={() => updateActivePage(pagination.lastPage)}
              >
                {pagination.lastPage}
              </PaginationItem>
            )}

            <PaginationItem label={`Goto next page ${pagination.nextPage}`} onClick={() => updateActivePage(pagination.nextPage)}>
              &rsaquo;
            </PaginationItem>

            <PaginationItem label={`Goto last page ${pagination.lastPage}`} onClick={() => updateActivePage(pagination.lastPage)}>
              &raquo;
            </PaginationItem>
          </ul>
        </nav>
      )}

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

![pagination-overview.svg](https://raw.githubusercontent.com/serhat-m/pagination-react-js/refs/heads/main/docs/pagination-overview.svg)

## `type TFnOptions`

```tsx
export type TFnOptions = {
  activePage: number
  recordsPerPage: number
  totalRecordsLength: number
  offset: number
  navCustomPageSteps?: { prev?: number; next?: number }
  permanentFirstNumber?: boolean
  permanentLastNumber?: boolean
}
```

## `type TPaginationData`

```tsx
export type TPaginationData = {
  readonly records: {
    perPage: number
    indexOfFirst: number
    indexOfLast: number
  }
  readonly pagination: {
    activePage: number
    firstPage: number
    lastPage: number
    previousPage: number | null
    nextPage: number | null
    customPreviousPage: number | null
    customNextPage: number | null
    pageNumbers: number[]
  } | null
  readonly setActivePage: (pageNumber: number) => void
  readonly setRecordsPerPage: (recordsPerPage: number) => void
}
```