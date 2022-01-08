import process from 'process';
import fs from 'fs'

let CSVFilename = process.argv[2]

//Read in CSV file data using filesystem
let data = fs.readFileSync(CSVFilename, 'utf8').split(/\r?\n/)

//Split each line of the CSV file into two usable chunks: The cookie code, and the date it was generated
data = data.map(item => item.split(','))

//We are concerned only with the date that the cookie was generated, therefore we can reduce the timestamp to contain information only relevant to the Year, Month, and Day of the cookie
data.forEach(index => {
    index[1] = index[1].split('T')[0].split('-')
})


console.log(data)