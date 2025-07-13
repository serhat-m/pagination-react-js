import { describe, expect, it } from "vitest"
import { generateNumArr } from "./generateNumArr"

describe("generateNumArr", () => {
  it("should generate an array of numbers in a certain range", () => {
    const result = generateNumArr(1, 5)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it("should return a single-element array when start equals end", () => {
    const result = generateNumArr(3, 3)
    expect(result).toEqual([3])
  })

  it("should return an empty array when start is greater than end", () => {
    const result = generateNumArr(5, 1)
    expect(result).toEqual([])
  })

  it("should handle negative ranges correctly", () => {
    const result = generateNumArr(-3, 2)
    expect(result).toEqual([-3, -2, -1, 0, 1, 2])
  })

  it("should handle zero range correctly", () => {
    const result = generateNumArr(0, 0)
    expect(result).toEqual([0])
  })

  it("should return an empty array when range is completely negative and invalid", () => {
    const result = generateNumArr(-1, -5)
    expect(result).toEqual([])
  })
})
