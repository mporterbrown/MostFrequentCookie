import process from 'process'
import fs from 'fs'
import {datesAreEqual, firstDateOccurence} from './dateMethods.js'

//Store necessary command-line arguments 
let CSVFilename = process.argv[2]
let dateOfConcern = process.argv[4].split('-')

//Read in CSV file data using filesystem and split each line of the CSV file into two usable chunks: The cookie code, and the date it was generated
let data = fs.readFileSync(CSVFilename, 'utf8').split('\n').map(item=> item.split(','))

//We are concerned only with the date when the cookie was generated, therefore we can reduce the timestamp to contain information only relevant to the Year, Month, and Day of the cookie
data.forEach(index => {
    index[1] = index[1].split('T')[0].split('-')
})

//Get rid of the first index containing 'cookie', 'timestamp'
data.shift()

let cookieLabels = new Map()

//Returns the index of the first occurence of the desired date
let firstOccurence = firstDateOccurence(data, dateOfConcern)

//Initialize max to correspond to the number of times the cookie/s that occurs most has been seen
let max = 0

//Store the maximum occuring cookie/s in this array to later be logged
let finalCookies = []

//Iterate throuigh all of the logged cookies for the given date. Maintain a count of the cookie codes that appear for the date.
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

