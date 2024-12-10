import { expect, it } from "vitest"
import { joinClassNames } from "./joinClassNames"

it("should return a valid class name", () => {
  const result = joinClassNames("one", "two")
  expect(result).toBe("one two")
})

it("should return a valid class name, if 'false', 'null' and 'undefined' is provided", () => {
  const result = joinClassNames("one", "two", false, null, undefined)
  expect(result).toBe("one two")
})

it("should throw an error if no argument was provided", () => {
  const result = () => {
    joinClassNames()
  }

  expect(result).toThrowError()
})
