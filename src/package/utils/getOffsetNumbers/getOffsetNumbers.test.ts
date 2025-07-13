import { describe, expect, it } from "vitest"
import { getOffsetNumbers } from "./getOffsetNumbers"

const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const firstNumber = pageNumbers[0]
const lastNumber = pageNumbers[pageNumbers.length - 1]

describe("missing values", () => {
  it("should return empty array if firstNumber is missing", () => {
    const activeNumber = 8

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber: undefined,
      lastNumber,
      activeNumber,
      offset: 1,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [],
    })
  })

  it("should return empty array if lastNumber is missing", () => {
    const activeNumber = 8

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber: undefined,
      activeNumber,
      offset: 1,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [],
    })
  })
})

describe("offset odd (1)", () => {
  const offset = 1

  describe("missing offset", () => {
    // Example: Offset: 3, Current page: 1
    // With these settings there is no possible offset before page 1 -> [] 1 [2 3 4]. The goal is to always return (offset * 2 + activeNumber) values -> In this case 1 [2 3 4] [6 7 8]

    it("should extend missing offset numbers correctly on first page", () => {
      const activeNumber = 1

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [1, 2, 3],
      })
    })

    it("should extend missing offset numbers correctly on last page", () => {
      const activeNumber = 20

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [18, 19, 20],
      })
    })
  })

  it("should return correct values", () => {
    const activeNumber = 8

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [7, 8, 9],
    })
  })

  it("should return correct values on permanent first number and additional offset not exceeded", () => {
    const activeNumber = 2

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentFirstNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [1, 2, 3, 4],
    })
  })

  it("should return correct values on permanent first number and additional offset exceeded", () => {
    const activeNumber = 3

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentFirstNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [2, 3, 4],
    })
  })

  it("should return correct values on permanent last number and additional offset not exceeded", () => {
    const activeNumber = 19

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentLastNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [17, 18, 19, 20],
    })
  })

  it("should return correct values on permanent last number and additional offset exceeded", () => {
    const activeNumber = 18

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentLastNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [17, 18, 19],
    })
  })

  it("should return correct values without permanent number and additional offset", () => {
    const activeNumber = 15

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [14, 15, 16],
    })
  })
})

describe("offset even (2)", () => {
  const offset = 2

  describe("missing offset", () => {
    // Example: Offset: 3, Current page: 1
    // With these settings there is no possible offset before page 1 -> [] 1 [2 3 4]. The goal is to always return (offset * 2 + activeNumber) values -> In this case 1 [2 3 4] [6 7 8]

    it("should extend missing offset numbers correctly on first page", () => {
      const activeNumber = 1

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [1, 2, 3, 4, 5],
      })
    })

    it("should extend missing offset numbers correctly on second page", () => {
      const activeNumber = 2

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [1, 2, 3, 4, 5],
      })
    })

    it("should extend missing offset numbers correctly on last page", () => {
      const activeNumber = 20

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [16, 17, 18, 19, 20],
      })
    })

    it("should extend missing offset numbers correctly on second last page", () => {
      const activeNumber = 19

      const result = getOffsetNumbers({
        pageNumbers,
        firstNumber,
        lastNumber,
        activeNumber,
        offset,
      })

      expect(result).toEqual({
        pageOffsetNumbers: [16, 17, 18, 19, 20],
      })
    })
  })

  it("should return correct values", () => {
    const activeNumber = 8

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [6, 7, 8, 9, 10],
    })
  })

  it("should return correct values on permanent first number and additional offset not exceeded", () => {
    const activeNumber = 2

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentFirstNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [1, 2, 3, 4, 5, 6],
    })
  })

  it("should return correct values on permanent first number and additional offset exceeded", () => {
    const activeNumber = 4

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentFirstNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [2, 3, 4, 5, 6],
    })
  })

  it("should return correct values on permanent last number and additional offset not exceeded", () => {
    const activeNumber = 19

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentLastNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [15, 16, 17, 18, 19, 20],
    })
  })

  it("should return correct values on permanent last number and additional offset exceeded", () => {
    const activeNumber = 17

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
      permanentLastNumber: true,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [15, 16, 17, 18, 19],
    })
  })

  it("should return correct values without permanent number and additional offset", () => {
    const activeNumber = 15

    const result = getOffsetNumbers({
      pageNumbers,
      firstNumber,
      lastNumber,
      activeNumber,
      offset,
    })

    expect(result).toEqual({
      pageOffsetNumbers: [13, 14, 15, 16, 17],
    })
  })
})
