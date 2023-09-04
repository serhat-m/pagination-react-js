import React from "react"
import generateTestData from "./functions/generateTestData"
import Pagination from "./components/Pagination"
import usePagination from "./hooks/usePagination"

const App = () => {
  const { currentPage, entriesPerPage, entries } = usePagination(1, 10)

  // Generate dummy data
  const dataList = generateTestData(700, (i) => ({
    id: i,
    name: `Test ${i}`,
    gender: i % 2 ? "Female" : "Male",
    position: `Position ${i}`,
    email: `test${i}@test.com`,
  }))

  return (
    <div className="container">
      <header className="mb-2">
        <div className="select-wrapper max-elements">
          <label htmlFor="max-elements">Entries per page:</label>
          <select
            name="max-elements"
            id="max-elements"
            onChange={(e) => {
              currentPage.set(1)
              entriesPerPage.set(Number(e.target.value))
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={dataList.length}>All</option>
          </select>
        </div>
        <span>Showing {`${entries.indexOfFirst + 1}-${entries.indexOfLast} of ${dataList.length}`}</span>
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
            {dataList.slice(entries.indexOfFirst, entries.indexOfLast).map((entry, i) => {
              return (
                <tr key={i}>
                  <td className="table-id">{entry.id}</td>
                  <td className="table-name">{entry.name}</td>
                  <td className="table-gender">{entry.gender}</td>
                  <td className="table-position">{entry.position}</td>
                  <td className="table-email">{entry.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={dataList.length}
        currentPage={{ get: currentPage.get, set: currentPage.set }}
        offset={2}
        classNames={{
          wrapper: "pagination m-auto mt-2",
          item: "pagination-item",
          itemActive: "pagination-item-active",
          navPrev: "pagination-item nav-item",
          navNext: "pagination-item nav-item",
          navStart: "pagination-item nav-item",
          navEnd: "pagination-item nav-item",
          navPrevCustom: "pagination-item",
          navNextCustom: "pagination-item",
        }}
        showFirstNumberAlways={true}
        showLastNumberAlways={true}
        navStart="&#171;"
        navEnd="&#187;"
        navPrev="&#x2039;"
        navNext="&#x203a;"
        navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
        navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
      />
    </div>
  )
}

export default App
