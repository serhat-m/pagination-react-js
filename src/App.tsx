import type React from "react"
import { usePagination } from "./package"
import { generateTestData } from "./package/utils"

import {
  headerStyle,
  mainStyle,
  maxElementsSelectStyle,
  paginationItemActiveStyle,
  paginationItemStyle,
  paginationStyle,
  paginationWrapperStyle,
} from "./ui/styles/App.css"
import {
  tableBodyRowStyle,
  tableCellStyle,
  tableHeadStyle,
  tableHeaderCellStyle,
  tableStyle,
  tableWrapperStyle,
} from "./ui/styles/components/Table.css"
import { selectStyle } from "./ui/styles/components/select.css"
import { light } from "./ui/styles/themes"
import { joinClassNames } from "./ui/utils/joinClassNames/joinClassNames"

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
        className={joinClassNames(paginationItemStyle, active && paginationItemActiveStyle)}
        onClick={onClick}
        aria-current={active ?? "page"}
        aria-label={label}
      >
        {children}
      </button>
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
    <div className={light}>
      <header className={headerStyle}>
        <div className={maxElementsSelectStyle}>
          <label htmlFor="max-elements">Records per page:</label>
          <select
            className={selectStyle}
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

      <main className={mainStyle}>
        <div className={tableWrapperStyle}>
          <table className={tableStyle}>
            <thead className={tableHeadStyle}>
              <tr>
                <th title="Id" className={tableHeaderCellStyle}>
                  Id
                </th>
                <th title="Name" className={tableHeaderCellStyle}>
                  Name
                </th>
                <th title="Gender" className={tableHeaderCellStyle}>
                  Gender
                </th>
                <th title="Position" className={tableHeaderCellStyle}>
                  Position
                </th>
                <th title="E-Mail" className={tableHeaderCellStyle}>
                  E-Mail
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.slice(records.indexOfFirst, records.indexOfLast + 1).map((record) => (
                <tr key={record.id} className={tableBodyRowStyle}>
                  <td className={tableCellStyle}>{record.id}</td>
                  <td className={tableCellStyle}>{record.name}</td>
                  <td className={tableCellStyle}>{record.gender}</td>
                  <td className={tableCellStyle}>{record.position}</td>
                  <td className={tableCellStyle}>{record.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className={paginationWrapperStyle} aria-label="Table navigation">
          <ul className={paginationStyle}>
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
      </main>
    </div>
  )
}

export default App
