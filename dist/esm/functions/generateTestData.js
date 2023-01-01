/**
 *
 * @param numberOfEntries Number of entries
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
function generateTestData(numberOfEntries, cb) {
    const dataList = [];
    for (let i = 1; i <= numberOfEntries; i++) {
        dataList.push(cb(i));
    }
    return dataList;
}
export default generateTestData;
