import type React from "react"
import { useMemo } from "react"
import { usePagination } from "./package"
import {
  headerStyle,
  mainStyle,
  maxElementsSelectStyle,
  paginationItemActiveStyle,
  paginationItemStyle,
  paginationStyle,
  paginationWrapperStyle,
} from "./ui/styles/App.css"
import { selectStyle } from "./ui/styles/components/select.css"
import {
  tableBodyRowStyle,
  tableCellStyle,
  tableHeaderCellStyle,
  tableHeadStyle,
  tableStyle,
  tableWrapperStyle,
} from "./ui/styles/components/Table.css"
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
        aria-current={active}
        aria-label={label}
      >
        {children}
      </button>
    </li>
  )
}

const App = () => {
  const dataList = useMemo(
    () =>
      Array.from({ length: 500 }, (_, index) => ({
        id: index,
        name: `Test ${index}`,
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
                  <td className={tableCellStyle}>{record.position}</td>
                  <td className={tableCellStyle}>{record.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && (
          <nav className={paginationWrapperStyle} aria-label="Table navigation">
            <ul className={paginationStyle}>
              <PaginationItem label={`Goto first page ${pagination.firstPage}`} onClick={() => updateActivePage(pagination.firstPage)}>
                &laquo;
              </PaginationItem>

              <PaginationItem
                label={`Goto previous page ${pagination.previousPage}`}
                onClick={() => updateActivePage(pagination.previousPage)}
              >
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
                <PaginationItem
                  label={`Goto page ${pagination.customPreviousPage}`}
                  onClick={() => updateActivePage(pagination.customPreviousPage)}
                >
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
                <PaginationItem
                  label={`Goto page ${pagination.customNextPage}`}
                  onClick={() => updateActivePage(pagination.customNextPage)}
                >
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
      </main>
    </div>
  )
}

// biome-ignore lint/style/noDefaultExport: Entrypoint
export default App
