import {firstDateOccurence} from '../dateMethods.js'

let data = [
    [ 'AtY0laUfhglK3lC7', [ '2018', '12', '09' ] ],
    [ 'SAZuXPGUrfbcn5UA', [ '2018', '12', '09' ] ],
    [ '5UAVanZf6UtGyKVS', [ '2018', '12', '09' ] ],
    [ 'AtY0laUfhglK3lC7', [ '2018', '12', '09' ] ],
    [ 'SAZuXPGUrfbcn5UA', [ '2018', '12', '08' ] ],
    [ '4sMM2LxV07bPJzwf', [ '2018', '12', '08' ] ],
    [ 'fbcn5UAVanZf6UtG', [ '2018', '12', '08' ] ],
    [ '4sMM2LxV07bPJzwf', [ '2018', '12', '07' ] ],
    [ 'AtY0laUfhglK3lC7', [ '2018', '12', '07' ] ],
    [ 'SAZuXPGUrfbcn5UA', [ '2018', '12', '06' ] ],
    [ '4sMM2LxV07bPJzwf', [ '2018', '12', '05' ] ],
    [ 'fbcn5UAVanZf6UtG', [ '2018', '12', '02' ] ],
    [ '4sMM2LxV07bPJzwf', [ '2018', '12', '01' ] ],
  ]

test('properly returns the first index of the desired date when the date is at the beginning of the list', () => {
    expect(
        firstDateOccurence(data, [ '2018', '12', '09' ])
    ).toBe(0)
})

test('properly returns the first index of the desired date when the date is in the middle of the list', () => {
    expect(
        firstDateOccurence(data, [ '2018', '12', '07' ])
    ).toBe(7)
})

test('properly returns the first index of the desired date when the date is in the middle of the list', () => {
    expect(
        firstDateOccurence(data, [ '2018', '12', '08' ])
    ).toBe(4)
})

test('properly returns the first index of the desired date when the date is at the end of the list', () => {
    expect(
        firstDateOccurence(data, [ '2018', '12', '01' ])
    ).toBe(12)
})

test('properly returns -1 when the date cannot be found in the data array', () => {
    expect(
        firstDateOccurence(data, [ '2018', '11', '06' ])
    ).toBe(-1)
})

