import {validateDate} from '../dateMethods.js'

test("properly throws no error when date is valid", () => {
    expect(() => {validateDate(['2018', '09', '07'])}).not.toThrow()
})

test("throws correct error when date is missing values", () => {
    expect(() => {validateDate(['2018', '09'])}).toThrow("Invalid Input Date: Must contain Year-Month-Day");
});

test("throws correct error when empty string gets passed as value", () => {
    expect(() => {validateDate(['2018', '09', ''])}).toThrow(`Invalid Input Date: Missing an argument -> ${['2018', '09' ,'']}`);
});

test("throws correct error when input date has a non integer character", () => {
    expect(() => {validateDate(['2018', '09', '2y'])}).toThrow(`Invalid Input Date: Some date elements contained characters that were not numbers -> ${['2018', '09', '2y']}`);
});

test("throws correct error when input date's year is not 4 characters", () => {
    expect(() => {validateDate(['201', '09', '21'])}).toThrow('Invalid Input Date: Year must be 4 characters long');
});

test("throws correct error when input date's year is not 4 characters", () => {
    expect(() => {validateDate(['20113', '09', '21'])}).toThrow('Invalid Input Date: Year must be 4 characters long');
});

test("throws correct error when input date's month is not 2 characters", () => {
    expect(() => {validateDate(['2018', '2', '21'])}).toThrow('Invalid Input Date: Month must be 2 characters long (Example: 2018-*09*-24');
});

test("throws correct error when input date's month is not 2 characters", () => {
    expect(() => {validateDate(['2018', '213', '21'])}).toThrow('Invalid Input Date: Month must be 2 characters long (Example: 2018-*09*-24');
});

test("throws correct error when input date's day is not 2 characters", () => {
    expect(() => {validateDate(['2018', '12', '2'])}).toThrow('Invalid Input Date: Day must be 2 characters long (Example: 2018-09-*04*');
});

test("throws correct error when input date's day is not 2 characters", () => {
    expect(() => {validateDate(['2018', '12', '213'])}).toThrow('Invalid Input Date: Day must be 2 characters long (Example: 2018-09-*04*');
});

test("throws correct error when input date's month does not fall within 1 to 12", () => {
    expect(() => {validateDate(['2018', '13', '21'])}).toThrow('Invalid Input Date: Month must be between 1 and 12');
});

test("throws correct error when input date's day is higher than corresponding date's month allows (31 day months)", () => {
    expect(() => {validateDate(['2018', '12', '32'])}).toThrow(`Invalid Input Date: Month ${'12'} cannot have more than 31 days`);
});

test("throws correct error when input date's day is higher than corresponding date's month allows (30 day months)", () => {
    expect(() => {validateDate(['2018', '09', '31'])}).toThrow(`Invalid Input Date: Month ${'09'} cannot have more than 30 days`);
});

test("throws correct error when input date's day is higher than corresponding date's month allows (Feb)", () => {
    expect(() => {validateDate(['2018', '02', '29'])}).toThrow(`Invalid Input Date: Month ${'02'} cannot have more than 28 days`);
});

test("throws correct error when input date's day is higher than corresponding date's month allows (Feb Leap Year)", () => {
    expect(() => {validateDate(['2020', '02', '30'])}).toThrow(`Invalid Input Date: Month ${'02'} (Leap Year!) cannot have more than 29 days`);
});

test("properly throws no error when Feb. 29th is the input date on a leap year", () => {
    expect(() => {validateDate(['2020', '02', '29'])}).not.toThrow();
});







