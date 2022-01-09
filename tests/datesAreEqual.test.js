import {datesAreEqual} from '../dateMethods.js'

test('properly returns true if two dates are equal', () => {
    expect(
        datesAreEqual(['2018', '09', '08'], ['2018', '09', '08'])
    ).toBe(true)
})

test('properly returns false if two dates are not equal', () => {
    expect(
        datesAreEqual(['2018', '09', '08'], ['2012', '09', '08'])
    ).toBe(false)
})

test('properly returns false when inputs are incorrect', () => {
    expect(
        datesAreEqual('2014', ['2018', '09', '08'])
    ).toBe(false)
})