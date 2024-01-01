import { it, expect } from "vitest"
import generateNumArr from "../generateNumArr"

it("should generate an array of numbers in a certain range", () => {
  const loopStart = 1
  const loopEnd = 5

  const result = generateNumArr(loopStart, loopEnd)

  expect(result).toEqual([1, 2, 3, 4, 5])
})
