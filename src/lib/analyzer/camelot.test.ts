import {Camelot, isCamelotKey} from './index'

describe('isCamelotKey', () => {
    test('returns true for valid Camelot keys', () => {
        expect(isCamelotKey('1A')).toBe(true)
        expect(isCamelotKey('12B')).toBe(true)
        expect(isCamelotKey('13B')).toBe(false)
        expect(isCamelotKey('12C')).toBe(false)
    })
})

describe('camelotFromString', () => {
    test('returns null for invalid Camelot keys', () => {
        const input = '13B'
        expect(Camelot.FromString(input)).toBeNull();
    })

    test('returns Camelot object for valid Camelot keys', () => {
        const input = '1A'
        const expected = {
            key: '1A',
            number: 1,
            letter: 'A'
        }
        expect(Camelot.FromString(input)).toEqual(expected);
    })
})