import { Dispatch, SetStateAction, Fragment, ReactNode } from "react"
import generateNumArr from "../functions/generateNumArr"
import PaginationItem from "./PaginationItem"

export interface Pagination {
  entriesPerPage: number
  totalEntries: number
  currentPage: { get: number; set: Dispatch<SetStateAction<number>> }
  offset: number
  classNames?: {
    wrapper?: string
    item?: string
    itemActive?: string
    navStart?: string
    navEnd?: string
    navPrev?: string
    navNext?: string
    navPrevCustom?: string
    navNextCustom?: string
  }
  showFirstNumberAlways?: true
  showLastNumberAlways?: true
  navStart?: ReactNode
  navEnd?: ReactNode
  navPrev?: ReactNode
  navNext?: ReactNode
  navPrevCustom?: { steps: number; content: ReactNode }
  navNextCustom?: { steps: number; content: ReactNode }
}

const Pagination = ({
  entriesPerPage,
  totalEntries,
  currentPage,
  offset,
  classNames,
  showFirstNumberAlways,
  showLastNumberAlways,
  navStart,
  navEnd,
  navPrev,
  navNext,
  navPrevCustom,
  navNextCustom,
}: Pagination) => {
  function generatePagination(pageNumbers: number[], currentPage: Pagination["currentPage"], offset?: number) {
    if (offset === undefined) {
      return pageNumbers.map((pageNumber) => {
        return (
          <PaginationItem
            key={pageNumber}
            onClick={() => currentPage.set(pageNumber)}
            className={classNames?.item}
            activeClassName={classNames?.itemActive}
            active={pageNumber === currentPage.get}
          >
            {pageNumber}
          </PaginationItem>
        )
      })
    } else {
      const firstNumber = pageNumbers[0]
      const lastNumber = pageNumbers[pageNumbers.length - 1]
      const offsetNumbers = generateNumArr(1, offset)
      const offsetToHideStart = 1 + offset // Example: 1 2 3 4 5 6 7 8 -> offset 3, 1 element in the middle -> Result 4 -> hide from 5
      const offsetToHideEnd = 1 + offset // offsetToHideStart reversed
      const maxOffsetStart = firstNumber + offset * 2 + (showFirstNumberAlways ? 1 : 0) // Example: 1 2 3 4 5 6 7 8 -> 1 element at the beginning, 1 element in the middle, offset 3*2=6 (before and after the middle number) -> Result 8
      const maxOffsetEnd = lastNumber - offset * 2 - (showLastNumberAlways ? 1 : 0) // maxOffsetStart reversed

      return (
        <Fragment>
          {firstNumber && lastNumber ? (
            <Fragment>
              {showFirstNumberAlways && (
                <PaginationItem
                  key={firstNumber}
                  onClick={() => currentPage.set(firstNumber)}
                  className={classNames?.item}
                  activeClassName={classNames?.itemActive}
                  active={firstNumber === currentPage.get}
                >
                  {firstNumber}
                </PaginationItem>
              )}
              {navPrevCustom && currentPage.get > offsetToHideStart + 1 && (
                <li
                  onClick={() =>
                    currentPage.get - navPrevCustom.steps >= firstNumber
                      ? currentPage.set(currentPage.get - navPrevCustom.steps)
                      : currentPage.set(firstNumber)
                  }
                  className={classNames?.navPrevCustom ? classNames.navPrevCustom : undefined}
                >
                  {navPrevCustom.content}
                </li>
              )}
              {pageNumbers.map((pageNumber) => {
                let numberIsDisabled = false
                if ((pageNumber === firstNumber && showFirstNumberAlways) || (pageNumber === lastNumber && showLastNumberAlways)) {
                  numberIsDisabled = true
                }

                if (!numberIsDisabled && pageNumber !== currentPage.get) {
                  let showNumber = false

                  for (const offsetNumber of offsetNumbers) {
                    if (currentPage.get - offsetNumber === pageNumber) {
                      showNumber = true
                    } else if (currentPage.get + offsetNumber === pageNumber) {
                      showNumber = true
                    } else if (pageNumber <= maxOffsetStart && pageNumber > currentPage.get - offsetToHideStart) {
                      showNumber = true
                    } else if (pageNumber >= maxOffsetEnd && currentPage.get > lastNumber - offsetToHideEnd) {
                      showNumber = true
                    }

                    if (showNumber) {
                      break
                    }
                  }

                  if (showNumber) {
                    return (
                      <PaginationItem key={pageNumber} onClick={() => currentPage.set(pageNumber)} className={classNames?.item}>
                        {pageNumber}
                      </PaginationItem>
                    )
                  }

                  return null
                } else if (!numberIsDisabled && pageNumber === currentPage.get) {
                  return (
                    <PaginationItem
                      key={pageNumber}
                      onClick={() => currentPage.set(pageNumber)}
                      className={classNames?.item}
                      activeClassName={classNames?.itemActive}
                      active={pageNumber === currentPage.get}
                    >
                      {pageNumber}
                    </PaginationItem>
                  )
                } else {
                  return null
                }
              })}
              {navNextCustom && currentPage.get <= lastNumber - offsetToHideEnd - 1 && (
                <li
                  onClick={() =>
                    currentPage.get + navNextCustom.steps <= lastNumber
                      ? currentPage.set(currentPage.get + navNextCustom.steps)
                      : currentPage.set(lastNumber)
                  }
                  className={classNames?.navNextCustom ? classNames.navNextCustom : undefined}
                >
                  {navNextCustom.content}
                </li>
              )}
              {showLastNumberAlways && lastNumber !== firstNumber && (
                <PaginationItem
                  key={lastNumber}
                  onClick={() => currentPage.set(lastNumber)}
                  className={classNames?.item}
                  activeClassName={classNames?.itemActive}
                  active={lastNumber === currentPage.get}
                >
                  {lastNumber}
                </PaginationItem>
              )}
            </Fragment>
          ) : null}
        </Fragment>
      )
    }
  }

  const pageNumbers = generateNumArr(1, Math.ceil(totalEntries / entriesPerPage))

  return (
    <ul className={classNames?.wrapper}>
      {navStart && pageNumbers.length > 1 && (
        <li className={classNames?.navStart ? classNames.navStart : undefined} onClick={() => currentPage.set(1)}>
          {navStart}
        </li>
      )}
      {navPrev && pageNumbers.length > 1 && (
        <li
          className={classNames?.navPrev ? classNames.navPrev : undefined}
          onClick={() => currentPage.get > 1 && currentPage.set(currentPage.get - 1)}
        >
          {navPrev}
        </li>
      )}
      {generatePagination(pageNumbers, currentPage, offset)}
      {navNext && pageNumbers.length > 1 && (
        <li
          className={classNames?.navNext ? classNames.navNext : undefined}
          onClick={() => currentPage.get < pageNumbers.length && currentPage.set(currentPage.get + 1)}
        >
          {navNext}
        </li>
      )}
      {navEnd && pageNumbers.length > 1 && (
        <li
          className={classNames?.navEnd ? classNames.navEnd : undefined}
          onClick={() => currentPage.set(pageNumbers[pageNumbers.length - 1] as number)}
        >
          {navEnd}
        </li>
      )}
    </ul>
  )
}

export default Pagination
