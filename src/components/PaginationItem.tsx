import { MouseEvent } from "react"

interface PaginationItem {
  children: string | number
  onClick: (e: MouseEvent<HTMLLIElement>) => void
  className?: string
  activeClassName?: string
  active?: boolean
}

const PaginationItem = ({ children, onClick, className, activeClassName, active }: PaginationItem) => {
  return (
    <li
      className={
        !className && !activeClassName
          ? undefined
          : `${className ? className : ""}${className && activeClassName ? " " : ""}${active && activeClassName ? activeClassName : ""}`
      }
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export default PaginationItem
