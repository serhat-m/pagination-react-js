/**
 *
 * @param numberOfRecords Number of records
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
declare function generateTestData<Record>(numberOfRecords: number, cb: (i: number) => Record): Record[];
export default generateTestData;
