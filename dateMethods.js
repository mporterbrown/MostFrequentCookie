/**
 * Method to ensure input date is a valid date
 * @param {string} date
 * @return {bool: date is valid} 
 */
const validateDate = (date) => {
    //Check that input date contains year-month-day, and that they each consist of only digits
    if (date.length !== 3) throw new Error('Invalid Input Date: Must contain Year-Month-Day')
    for (let member of date) {
        if (!(parseInt(member) == member)) {
            if (member === '') {
                throw new Error(`Invalid Input Date: Missing an argument -> ${date}`)
            } else {
                throw new Error (`Invalid Input Date: Some date elements contained characters that were not numbers -> ${date}`)
            }
        }
    }
    //Arrays to group months by number of days
    let thirtyOneDayMonths = ['01', '03', '05', '07', '08', '10', '12']
    let thirtyDayMonths = ['04', '06', '09', '11'] 

    //Year must be 4 characters long (program will work for next ~ 8000 years)
    if (date[0].length !== 4) throw new Error('Invalid Input Date: Year must be 4 characters long')

    //Month must always be 2 characters (single digit months will have leading 0's)
    if (date[1].length !== 2) throw new Error('Invalid Input Date: Month must be 2 characters long (Example: 2018-*09*-24')

    //Day must always be 2 characters (single digit days will have leading 0's)
    if (date[2].length !== 2) throw new Error('Invalid Input Date: Day must be 2 characters long (Example: 2018-09-*04*') 

    //Month must always correspond to one of the 12 months
    if (parseInt(date[1]) > 12 || parseInt(date[1]) < 1) throw new Error('Invalid Input Date: Month must be between 1 and 12')

    //Account for differences in number of days between different months (and leap years!)
    if (thirtyOneDayMonths.includes(date[1]) && date[2] > 31) throw new Error (`Invalid Input Date: Month ${date[1]} cannot have more than 31 days`)
    if (thirtyDayMonths.includes(date[1]) && date[2] > 30) throw new Error (`Invalid Input Date: Month ${date[1]} cannot have more than 30 days`)
    if (date[1] === '02' && parseInt(date[0]) % 4 === 0) {
        if (date[2] > 29 ) throw new Error(`Invalid Input Date: Month ${date[1]} (Leap Year!) cannot have more than 29 days`) 
    } else if (date[1] === '02' && date[2] > 28) throw new Error (`Invalid Input Date: Month ${date[1]} cannot have more than 28 days`)
}

/**
 * Method to compare two dates. Used in the firstDateOccurence method.
 * @param {string} date1
 * @param {string} date2
 * @return {string: More Recent Date} 
 */
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

/**
 * Simple method to compare two dates. Returns true if they are equal.
 * @param {string} date1
 * @param {string} date2
 * @return {bool}
 */
const datesAreEqual = (date1, date2) => {
    let yearFirst = parseInt(date1[0]), yearSecond = parseInt(date2[0])
    let monthFirst = parseInt(date1[1]), monthSecond = parseInt(date2[1])
    let dayFirst = parseInt(date1[2]), daySecond = parseInt(date2[2])
    if (yearFirst === yearSecond && monthFirst === monthSecond && dayFirst === daySecond) return true
    return false
}

/**
 * @param {string[][]} data
 * @param {string} targetDate
 * @return {int (index of first occurence of targetDate)}
 */
// Searches for a specific date using Binary Search
const firstDateOccurence = (data, targetDate) => {
    if (datesAreEqual(data[0][1], targetDate)) return 0
    let start = 0
    let end = data.length -1
    while (end >= start) {
        let mid = Math.floor(start + (end - start) /2)
        if ((datesAreEqual(targetDate, data[mid][1]))) {
            if (datesAreEqual(data[mid-1][1], targetDate)) {
                end = mid - 1
            } else {
                return mid;
            }
        } else if (!dateIsGreaterThan(targetDate, data[mid][1])){
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return -1
}

export  {dateIsGreaterThan, datesAreEqual, firstDateOccurence, validateDate}
