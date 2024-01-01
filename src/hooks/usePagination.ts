import { useState } from "react"
import generateNumArr from "../functions/generateNumArr"
import { getOffsetNumbers } from "../functions/getOffsetNumbers"

export type TPaginationData = {
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
    pageNumbers: {
      activePage,
      firstPage,
      lastPage,
      previousPage: activePage > firstPage ? activePage - 1 : false,
      nextPage: activePage < lastPage ? activePage + 1 : false,
      customPreviousPage:
        navCustomPageSteps?.prev && activePage - navCustomPageSteps.prev >= firstPage + 1 ? activePage - navCustomPageSteps.prev : false,
      customNextPage:
        navCustomPageSteps?.next && activePage + navCustomPageSteps.next <= lastPage - 1 ? activePage + navCustomPageSteps.next : false,
      navigation: pageOffsetNumbers,
    },
    setRecordsPerPage: (recordsPerPage) => {
      setRecordsPerPage(recordsPerPage)
    },
    setActivePage: (pageNumber) => {
      setActivePage(pageNumber)
    },
  }
}
