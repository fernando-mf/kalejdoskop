import {analyze, AnalyzerResult} from './analyzer'
import {CamelotKey} from "./camelot";

describe('analyze', () => {
    test('analyzes minor keys - 8A', () => {
        const input: CamelotKey = '8A'
        const expected: AnalyzerResult = {
            perfectMatch: ['8A', '7B'],
            moodChange: '11B',
            energyBoost: {
                low: ['8B', '9A'],
                moderate: ['5A'],
                high: ['10A', '3A']
            },
            energyDrop: {
                low: ['7A'],
                moderate: ['11A'],
                high: ['6A', '1A']
            }
        }

        expect(analyze(input)).toEqual(expected)
    })

    test('analyzes minor keys - 11A', () => {
        const input: CamelotKey = '11A'
        const expected: AnalyzerResult = {
            perfectMatch: ['11A', '10B'],
            moodChange: '2B',
            energyBoost: {
                low: ['11B', '12A'],
                moderate: ['8A'],
                high: ['1A', '6A']
            },
            energyDrop: {
                low: ['10A'],
                moderate: ['2A'],
                high: ['9A', '4A']
            }
        }

        expect(analyze(input)).toEqual(expected)
    })

    test('analyzes major keys - 1B', () => {
        const input: CamelotKey = '1B'
        const expected: AnalyzerResult = {
            perfectMatch: ['1B', '2A'],
            moodChange: '10A',
            energyBoost: {
                low: ['2B'],
                moderate: ['10B'],
                high: ['3B', '8B']
            },
            energyDrop: {
                low: ['1A', '12B'],
                moderate: ['4B'],
                high: ['11B', '6B']
            }
        }

        expect(analyze(input)).toEqual(expected)
    })

    test('analyzes major keys - 9B', () => {
        const input: CamelotKey = '9B'
        const expected: AnalyzerResult = {
            perfectMatch: ['9B', '10A'],
            moodChange: '6A',
            energyBoost: {
                low: ['10B'],
                moderate: ['6B'],
                high: ['11B', '4B']
            },
            energyDrop: {
                low: ['9A', '8B'],
                moderate: ['12B'],
                high: ['7B', '2B']
            }
        }

        expect(analyze(input)).toEqual(expected)
    })
})