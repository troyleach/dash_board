import { getDayOfTheWeek } from '../../../src/utils/dateHelpers';
// for some reason my test runner does not work => yarn ut
// I also have to two test commands this sucks

describe('getDayOfTheWeek', () => {
  it('Should return monday from a date string', () => {
    const result = getDayOfTheWeek('2020-11-16')
    expect(result).toBe('Monday');
  });

  it('Should return monday from a date object', () => {
    const date = new Date('2020-11-16')
    // const date = new Date('11-16-2020')
    const result = getDayOfTheWeek(date)
    expect(result).toEqual('Monday');
  });

  it('Should return argument error for random text', () => {
    // Really should be using TS
    const date = new Date('abc')
    expect(() => {
      getDayOfTheWeek(date)
    }).toThrow('You must provide a date string or date object');
  });
});