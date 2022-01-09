import {dateIsGreaterThan} from '../dateMethods.js'

test(`properly returns true if date1's year is greater than date2's year`, () => {
    expect(
        dateIsGreaterThan(['2020', '09', '08'], ['2018', '09', '08'])
    ).toBe(true)
})

test(`properly returns true if date1's year is equal to date2's year, and date1's month is greater than date2's month`, () => {
    expect(
        dateIsGreaterThan(['2020', '09', '08'], ['2020', '07', '08'])
    ).toBe(true)
})

test(`properly returns true if date1's year is equal to date2's year, date1's month is equal to date2's month, and date1's day is greater than date2's day`, () => {
    expect(
        dateIsGreaterThan(['2020', '09', '23'], ['2020', '09', '08'])
    ).toBe(true)
})

test(`properly returns false if date1's year is not greater than date2's year`, () => {
    expect(
        dateIsGreaterThan(['2008', '09', '08'], ['2018', '09', '08'])
    ).toBe(false)
})

test(`properly returns false if date1's year is equal to date2's year, and date1's month is not greater than date2's month`, () => {
    expect(
        dateIsGreaterThan(['2020', '09', '08'], ['2020', '11', '08'])
    ).toBe(false)
})

test(`properly returns false if date1's year is equal to date2's year, date1's month is equal to date2's month, and date1's day is not greater than date2's day`, () => {
    expect(
        dateIsGreaterThan(['2020', '09', '23'], ['2020', '09', '27'])
    ).toBe(false)
})