/**
 *
 * @param numberOfEntries Number of entries
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
declare function generateTestData<Entry>(numberOfEntries: number, cb: (i: number) => Entry): Entry[];
export default generateTestData;
