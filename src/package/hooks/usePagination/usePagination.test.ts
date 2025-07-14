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

    expect(result.current.pagination?.previousPage).toBeNull()
    expect(result.current.pagination?.nextPage).toBe(2)

    act(() => {
      const lastPage = result.current.pagination?.lastPage
      lastPage && result.current.setActivePage(lastPage)
    })

    expect(result.current.pagination?.previousPage).toBe(49)
    expect(result.current.pagination?.nextPage).toBeNull()

    act(() => {
      result.current.setActivePage(20)
    })

    expect(result.current.pagination?.previousPage).toBe(19)
    expect(result.current.pagination?.nextPage).toBe(21)
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

    expect(result.current.pagination?.customPreviousPage).toBeNull()
    expect(result.current.pagination?.customNextPage).toBe(4)

    act(() => {
      const lastPage = result.current.pagination?.lastPage
      lastPage && result.current.setActivePage(lastPage)
    })

    expect(result.current.pagination?.customPreviousPage).toBe(47)
    expect(result.current.pagination?.customNextPage).toBeNull()

    act(() => {
      result.current.setActivePage(20)
    })

    expect(result.current.pagination?.customPreviousPage).toBe(17)
    expect(result.current.pagination?.customNextPage).toBe(23)
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

    expect(result.current.pagination?.firstPage).toBe(1)
    expect(result.current.pagination?.lastPage).toBe(50)
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

    expect(result.current.pagination?.activePage).toBe(1)

    act(() => {
      result.current.setActivePage(4)
    })

    expect(result.current.pagination?.activePage).toBe(4)
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

    expect(result.current.pagination?.pageNumbers).toEqual([1, 2, 3, 4, 5, 6, 7])

    act(() => {
      result.current.setActivePage(7)
    })

    expect(result.current.pagination?.pageNumbers).toEqual([4, 5, 6, 7, 8, 9, 10])
  })

  it("should throw an error when totalRecordsLength is negative", () => {
    expect(() =>
      renderHook(() =>
        usePagination({
          activePage: 1,
          recordsPerPage: 10,
          totalRecordsLength: -5,
          offset: 2,
        }),
      ),
    ).toThrow("totalRecordsLength cannot be negative")
  })

  it("should throw an error when recordsPerPage is zero", () => {
    expect(() =>
      renderHook(() =>
        usePagination({
          activePage: 1,
          recordsPerPage: 0,
          totalRecordsLength: 100,
          offset: 2,
        }),
      ),
    ).toThrow("recordsPerPage must be greater than zero")
  })

  it("should throw an error when recordsPerPage is negative", () => {
    expect(() =>
      renderHook(() =>
        usePagination({
          activePage: 1,
          recordsPerPage: -10,
          totalRecordsLength: 100,
          offset: 2,
        }),
      ),
    ).toThrow("recordsPerPage must be greater than zero")
  })

  it("should throw an error when activePage is less than 1", () => {
    expect(() =>
      renderHook(() =>
        usePagination({
          activePage: 0,
          recordsPerPage: 10,
          totalRecordsLength: 100,
          offset: 2,
        }),
      ),
    ).toThrow("activePage must be at least 1")
  })

  it("should return null for pageNumbers when there are no records", () => {
    const { result } = renderHook(() =>
      usePagination({
        activePage: 1,
        recordsPerPage: 10,
        totalRecordsLength: 0,
        offset: 3,
        navCustomPageSteps: { prev: 3, next: 3 },
      }),
    )

    expect(result.current.pagination).toBeNull()
  })
})
