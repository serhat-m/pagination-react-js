import { useState } from "react"
import { generateNumArr, getOffsetNumbers } from "../../utils"

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

export type TFnOptions = {
  activePage: number
  recordsPerPage: number
  totalRecordsLength: number
  offset: number
  navCustomPageSteps?: { prev?: number; next?: number }
  permanentFirstNumber?: boolean
  permanentLastNumber?: boolean
}

export function usePagination({
  activePage: initialActivePage,
  recordsPerPage: initialRecordsPerPage,
  totalRecordsLength,
  offset,
  navCustomPageSteps,
  permanentFirstNumber,
  permanentLastNumber,
}: TFnOptions): TPaginationData {
  const [activePage, setActivePage] = useState(initialActivePage)
  const [recordsPerPage, setRecordsPerPage] = useState(initialRecordsPerPage)
  const indexOfLastRecord = (recordsPerPage > totalRecordsLength ? totalRecordsLength : activePage * recordsPerPage) - 1
  const indexOfFirstRecord = recordsPerPage > indexOfLastRecord ? 0 : indexOfLastRecord - recordsPerPage + 1

  if (totalRecordsLength < 0) {
    throw new Error("totalRecordsLength cannot be negative")
  }

  if (recordsPerPage <= 0) {
    throw new Error("recordsPerPage must be greater than zero")
  }

  if (activePage <= 0) {
    throw new Error("activePage must be at least 1")
  }

  const pageNumbers = generateNumArr(1, Math.ceil(totalRecordsLength / recordsPerPage))

  const firstPage = pageNumbers[0]
  const lastPage = pageNumbers[pageNumbers.length - 1]

  const { pageOffsetNumbers } = getOffsetNumbers({
    pageNumbers,
    firstNumber: firstPage,
    lastNumber: lastPage,
    activeNumber: activePage,
    offset,
    permanentFirstNumber,
    permanentLastNumber,
  })

  return {
    records: {
      perPage: recordsPerPage,
      indexOfFirst: indexOfFirstRecord,
      indexOfLast: indexOfLastRecord,
    },
    pagination:
      firstPage && lastPage
        ? {
            activePage,
            firstPage,
            lastPage,
            previousPage: activePage > firstPage ? activePage - 1 : null,
            nextPage: activePage < lastPage ? activePage + 1 : null,
            customPreviousPage:
              navCustomPageSteps?.prev && activePage - navCustomPageSteps.prev >= firstPage + 1
                ? activePage - navCustomPageSteps.prev
                : null,
            customNextPage:
              navCustomPageSteps?.next && activePage + navCustomPageSteps.next <= lastPage - 1
                ? activePage + navCustomPageSteps.next
                : null,
            pageNumbers: pageOffsetNumbers,
          }
        : null,
    setRecordsPerPage: (recordsPerPage) => {
      setRecordsPerPage(recordsPerPage)
    },
    setActivePage: (pageNumber) => {
      setActivePage(pageNumber)
    },
  }
}
