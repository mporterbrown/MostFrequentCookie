let date1 = [ '2018', '12', '07' ]
let date2 = [ '2018', '11', '31' ]
let dateArray = [[ '2018', '12', '31' ],[ '2018', '12', '31' ],[ '2018', '12', '31' ],[ '2018', '12', '12' ],[ '2018', '12', '06' ],[ '2018', '11', '31' ],[ '2018', '11', '31' ],[ '2018', '11', '31' ],[ '2018', '11', '16' ],[ '2018', '11', '06' ],[ '2018', '09', '31' ],[ '2018', '09', '12' ],[ '2018', '09', '12' ],[ '2018', '09', '04' ],[ '2018', '08', '27' ],[ '2018', '08', '21' ],[ '2018', '08', '21' ],[ '2018', '07', '12' ],[ '2018', '07', '03' ]]
//Method to compare two dates. Used in the findDateBinarySearch method.
const dateIsGreaterThan = (date1, date2) => {
    let yearFirst = parseInt(date1[0]), yearSecond = parseInt(date2[0])
    let monthFirst = parseInt(date1[1]), monthSecond = parseInt(date2[1])
    let dayFirst = parseInt(date1[2]), daySecond = parseInt(date2[2])

    if (yearFirst > yearSecond) {
        return true
    } else if (yearFirst === yearSecond && monthFirst > monthSecond) {
        return true
    } else if (yearFirst === yearSecond && monthFirst === monthSecond && dayFirst > daySecond) {
        return true
    } 
    return false
}

//Simple method to compare two dates. Returns true if they are equal.
const datesAreEqual = (date1, date2) => {
    let yearFirst = parseInt(date1[0]), yearSecond = parseInt(date2[0])
    let monthFirst = parseInt(date1[1]), monthSecond = parseInt(date2[1])
    let dayFirst = parseInt(date1[2]), daySecond = parseInt(date2[2])
    if (yearFirst === yearSecond && monthFirst === monthSecond && dayFirst === daySecond) return true
    return false
}

// Searches for a specific date in a list in O(logN) time.
const firstDateOccurence = (array, date) => {
    if (datesAreEqual(array[0][1], date)) return 0
    let start = 0
    let end = array.length -1
    while (end >= start) {
        let mid = Math.floor(start + (end - start) /2)
        if ((datesAreEqual(date, array[mid][1]))) {
            if (datesAreEqual(array[mid-1][1], date)) {
                end = mid - 1
            } else {
                return mid;
            }
        } else if (!dateIsGreaterThan(date, array[mid][1])){
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return -1
}

export  {dateIsGreaterThan, datesAreEqual, firstDateOccurence}