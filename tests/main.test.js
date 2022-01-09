import {main} from '../interface.js'

test('properly returns the most used cookie from the input date', () => {
    expect(
        main(['node', 'most_active_cookie', 'cookie_log.csv', '-d', '2018-12-09'])
    ).toEqual(["AtY0laUfhglK3lC7"])
})

test('properly returns the most used cookie from the input date', () => {
    expect(
        main(['node', 'most_active_cookie', 'test_log.csv', '-d', '2018-12-07'])
    ).toEqual(["AtY0laUfhglK3lC7"])
})

test('properly returns multiple cookies from the input date', () => {
    expect(
        main(['node', 'most_active_cookie', 'cookie_log.csv', '-d', '2018-12-08'])
    ).toEqual(["SAZuXPGUrfbcn5UA", "4sMM2LxV07bPJzwf", "fbcn5UAVanZf6UtG"])
})

test('properly throws an error when the input date does not exist in the log', () => {
    expect(() =>
        main(['node', 'most_active_cookie', 'cookie_log.csv', '-d', '2018-12-10'])
    ).toThrow('Input Date was not present in CSV file')
})

test('properly returns the first index of the desired date when the date is in the middle of the list', () => {
    expect(
        main(['node', 'most_active_cookie', 'cookie_log.csv', '-d', '2018-12-09'])
    ).toEqual(["AtY0laUfhglK3lC7"])
})