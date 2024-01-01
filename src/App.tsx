import React from "react"
import generateTestData from "./functions/generateTestData"
import { usePagination } from "./hooks/usePagination"

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

const App = () => {
  const dataList = generateTestData(500, (i) => ({
    id: i,
    name: `Test ${i}`,
    gender: i % 2 ? "Female" : "Male",
    position: `Position ${i}`,
    email: `test${i}@test.com`,
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
    <div className="container">
      <header className="mb-2">
        <div className="select-wrapper max-elements">
          <label htmlFor="max-elements">Records per page:</label>
          <select
            name="max-elements"
            id="max-elements"
            onChange={(e) => {
              setActivePage(1)
              setRecordsPerPage(Number(e.target.value))
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={dataList.length}>All</option>
          </select>
        </div>
        <span>Showing {`${records.indexOfFirst + 1}-${records.indexOfLast + 1} of ${dataList.length}`}</span>
      </header>

      <div className="example-table">
        <table>
          <thead>
            <tr>
              <th title="Id" className="table-id">
                Id
              </th>
              <th title="Name" className="table-name">
                Name
              </th>
              <th title="Gender" className="table-gender">
                Gender
              </th>
              <th title="Position" className="table-position">
                Position
              </th>
              <th title="E-Mail" className="table-email">
                E-Mail
              </th>
            </tr>
          </thead>
          <tbody>
            {/* + 1 is added to indexOfLast, because the end is not included in slice */}
            {dataList.slice(records.indexOfFirst, records.indexOfLast + 1).map((record, i) => {
              return (
                <tr key={i}>
                  <td className="table-id">{record.id}</td>
                  <td className="table-name">{record.name}</td>
                  <td className="table-gender">{record.gender}</td>
                  <td className="table-position">{record.position}</td>
                  <td className="table-email">{record.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="pagination m-auto mt-2">
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

export default App
