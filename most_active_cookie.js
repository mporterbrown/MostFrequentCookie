import process from 'process'
import fs from 'fs'
import {datesAreEqual, firstDateOccurence, validateDate} from './dateMethods.js' 

//Ensure program was run with all necessary command-line arguments
if (process.argv.length < 5) throw new Error('Missing CL Arguments: Example command-line arguments -> node most_active_cookie cookie_log.csv -d 2018-12-08')

//Store necessary command-line arguments
let CSVFilename = process.argv[2]
let dateOfConcern = process.argv[4].split('-')

//Make sure input CSV is valid
let filetype = CSVFilename.split('.')[1]
if (filetype !== 'csv') throw new Error('Invalid filetype: Must be a .csv file')

//Make sure input date is valid
validateDate(dateOfConcern)

//Read in CSV file data using filesystem and split each line of the CSV file into two usable chunks: The cookie code, and the date it was generated
let data = fs.readFileSync(CSVFilename, 'utf8').split('\n').map(item=> item.split(','))

//We are concerned only with the date when the cookie was generated, therefore we can reduce the timestamp to contain information only relevant to the Year, Month, and Day of the cookie
data.forEach(index => {
    //Gets rid of any blank lines in CSV file
    if (!(index[0] === '')) index[1] = index[1].split('T')[0].split('-')
})

//Remove first index of data which contains "['cookie', ['timestamp']]"
data.shift()

//Initialize map to store count for each cookie code
let cookieLabels = new Map()

//Returns the index of the first occurence of the desired date
//Since csv timestamps are sorted, binary search can be used
let firstOccurence = firstDateOccurence(data, dateOfConcern)
if (firstOccurence < 0) throw new Error ('Input Date was not present in CSV file')

//Initialize max to correspond to the max number of times any cookie has occured on a specific date
let max = 0

//Store the maximum occuring cookie/s in this array to later be logged
let finalCookies = []

//Iterate through all of the logged cookies for the given date. Maintain a count of the cookie codes that appear for the date.
//Return the cookie codes that have the maximum number of entries (Can be multiple with same number of entries)
while (firstOccurence < data.length && datesAreEqual(data[firstOccurence][1], dateOfConcern)) {
    if (cookieLabels.has(data[firstOccurence][0])) {
        cookieLabels.set(data[firstOccurence][0], cookieLabels.get(data[firstOccurence][0]) + 1)

        if (cookieLabels.get(data[firstOccurence][0]) === max) {
            finalCookies.push(data[firstOccurence][0])
        }
        if (cookieLabels.get(data[firstOccurence][0]) > max) {
            max = cookieLabels.get(data[firstOccurence][0])
            finalCookies = [data[firstOccurence][0]]
        }
    } else {
        cookieLabels.set(data[firstOccurence][0], 1)
        if (cookieLabels.get(data[firstOccurence][0]) >= max) {
            finalCookies.push(data[firstOccurence][0])
            max = cookieLabels.get(data[firstOccurence][0])
        }
    }
    firstOccurence++
}

//Finally, log the cookies to the console on separate lines
for (let cookie of finalCookies) console.log(cookie)