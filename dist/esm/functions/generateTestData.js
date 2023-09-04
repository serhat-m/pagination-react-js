/**
 *
 * @param numberOfEntries Number of entries
 * @param cb Callback function which returns data
 * @returns Array with dummy data
 */
function generateTestData(numberOfEntries, cb) {
    var dataList = [];
    for (var i = 1; i <= numberOfEntries; i++) {
        dataList.push(cb(i));
    }
    return dataList;
}
export default generateTestData;
