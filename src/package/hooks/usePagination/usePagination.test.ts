import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { usePagination } from "./usePagination"

describe("functional cases", () => {
  it("should return correct record index values on current page update", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.records.indexOfFirst).toBe(0)
    expect(result.current.records.indexOfLast).toBe(9)

    act(() => {
      result.current.setActivePage(4)
    })

    expect(result.current.records.indexOfFirst).toBe(30)
    expect(result.current.records.indexOfLast).toBe(39)
  })

  it("should return correct record index values on records per page and current page update", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.records.indexOfFirst).toBe(0)
    expect(result.current.records.indexOfLast).toBe(9)

    act(() => {
      result.current.setRecordsPerPage(50)
    })

    expect(result.current.records.indexOfFirst).toBe(0)
    expect(result.current.records.indexOfLast).toBe(49)

    act(() => {
      result.current.setActivePage(3)
    })

    expect(result.current.records.indexOfFirst).toBe(100)
    expect(result.current.records.indexOfLast).toBe(149)
  })

  it("should return correct record values if recordsPerPage > totalRecordsLength", () => {
    const {
      result: {
        current: { records },
      },
    } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 5000,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(records.indexOfFirst).toBe(0)
    expect(records.indexOfLast).toBe(499)
  })

  it("should return correct record values if recordsPerPage = totalRecordsLength", () => {
    const {
      result: {
        current: { records },
      },
    } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 500,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(records.indexOfFirst).toBe(0)
    expect(records.indexOfLast).toBe(499)
  })

  it("should return correct page navigation values", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pageNumbers.previousPage).toBe(false)
    expect(result.current.pageNumbers.nextPage).toBe(2)

    act(() => {
      result.current.setActivePage(result.current.pageNumbers.lastPage)
    })

    expect(result.current.pageNumbers.previousPage).toBe(49)
    expect(result.current.pageNumbers.nextPage).toBe(false)

    act(() => {
      result.current.setActivePage(20)
    })

    expect(result.current.pageNumbers.previousPage).toBe(19)
    expect(result.current.pageNumbers.nextPage).toBe(21)
  })

  it("should return correct custom page navigation values", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pageNumbers.customPreviousPage).toBe(false)
    expect(result.current.pageNumbers.customNextPage).toBe(4)

    act(() => {
      result.current.setActivePage(result.current.pageNumbers.lastPage)
    })

    expect(result.current.pageNumbers.customPreviousPage).toBe(47)
    expect(result.current.pageNumbers.customNextPage).toBe(false)

    act(() => {
      result.current.setActivePage(20)
    })

    expect(result.current.pageNumbers.customPreviousPage).toBe(17)
    expect(result.current.pageNumbers.customNextPage).toBe(23)
  })

  it("should return correct first and last page number", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pageNumbers.firstPage).toBe(1)
    expect(result.current.pageNumbers.lastPage).toBe(50)
  })

  it("should return correct current page number and setter", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pageNumbers.activePage).toBe(1)

    act(() => {
      result.current.setActivePage(4)
    })

    expect(result.current.pageNumbers.activePage).toBe(4)
  })

  it("should return correct records per page number and setter", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.records.perPage).toBe(10)

    act(() => {
      result.current.setRecordsPerPage(50)
    })

    expect(result.current.records.perPage).toBe(50)
  })

  it("should return correct page offset numbers", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 500,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pageNumbers.navigation).toEqual([1, 2, 3, 4, 5, 6, 7])

    act(() => {
      result.current.setActivePage(7)
    })

    expect(result.current.pageNumbers.navigation).toEqual([4, 5, 6, 7, 8, 9, 10])
  })
})
