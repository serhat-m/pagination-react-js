/**
 *
 * @param numberOfEntries Number of entries
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
function generateTestData<Entry>(numberOfEntries: number, cb: (i: number) => Entry): Entry[] {
  const dataList = []

  for (let i = 1; i <= numberOfEntries; i++) {
    dataList.push(cb(i))
  }

  return dataList
}

export default generateTestData
