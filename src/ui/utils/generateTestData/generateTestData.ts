/**
 * Generates an array of dummy data using a callback function.
 *
 * @template Record - The type of the records.
 * @param {number} numberOfRecords - Number of records to generate.
 * @param cb - Callback to create each record, receives the index (1-based).
 * @returns Array of generated records.
 */
export function generateTestData<Record>(numberOfRecords: number, cb: (i: number) => Record): Record[] {
  const dataList = []

  for (let i = 1; i <= numberOfRecords; i++) {
    dataList.push(cb(i))
  }

  return dataList
}
