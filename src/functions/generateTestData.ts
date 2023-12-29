/**
 *
 * @param numberOfRecords Number of records
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
function generateTestData<Record>(numberOfRecords: number, cb: (i: number) => Record): Record[] {
  const dataList = []

  for (let i = 1; i <= numberOfRecords; i++) {
    dataList.push(cb(i))
  }

  return dataList
}

export default generateTestData
