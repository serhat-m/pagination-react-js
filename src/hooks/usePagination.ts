import { useState, Dispatch, SetStateAction } from "react"
interface PaginationData {
  readonly currentPage: {
    readonly get: number
    readonly set: Dispatch<SetStateAction<number>>
  }
  readonly entriesPerPage: {
    readonly get: number
    readonly set: Dispatch<SetStateAction<number>>
  }
  readonly entries: {
    readonly indexOfFirst: number
    readonly indexOfLast: number
  }
}

/**
 *
 * @param initialPage Initial active page number
 * @param maxEntriesPerPage Maximum number of entries per page
 */
function usePagination(initialPage: number, maxEntriesPerPage: number): PaginationData {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [entriesPerPage, setEntriesPerPage] = useState(maxEntriesPerPage)
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage

  return {
    currentPage: { get: currentPage, set: setCurrentPage },
    entriesPerPage: { get: entriesPerPage, set: setEntriesPerPage },
    entries: { indexOfFirst: indexOfFirstEntry, indexOfLast: indexOfLastEntry },
  }
}

export default usePagination
