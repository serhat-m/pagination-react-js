import { it, expect } from "vitest"
import generateTestData from "../generateTestData"

it("should generate correct test data", () => {
  const result = generateTestData(2, (i) => ({
    id: i,
    name: `Test ${i}`,
  }))

  expect(result).toEqual([
    { id: 1, name: "Test 1" },
    { id: 2, name: "Test 2" },
  ])
})
