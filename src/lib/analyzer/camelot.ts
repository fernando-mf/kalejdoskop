import {containNumber} from '../../utils/math'

export const CAMELOT_MIN = 1
export const CAMELOT_MAX = 12

type CamelotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type CamelotLetter = 'A' | 'B'
export type CamelotKey = `${CamelotNumber}${CamelotLetter}`

const CAMELOT_REGEX = /^([1-9]|10|11|12)([AB])$/

export function isCamelotKey(s: string): s is CamelotKey {
    return CAMELOT_REGEX.test(s);
}

export class Camelot {
    key: CamelotKey
    number: CamelotNumber
    letter: CamelotLetter

    constructor(key: CamelotKey) {
        const match = key.match(CAMELOT_REGEX)!

        this.key = key
        this.number = parseInt(match[1]) as CamelotNumber
        this.letter = match[2] as CamelotLetter
    }

    static FromString(key: string): Camelot | null {
        if (!isCamelotKey(key)) {
            return null
        }

        return new Camelot(key)
    }

    isMinor(): boolean {
        return this.letter === 'A'
    }
}

export function camelotKeyToMinor(camelot: Camelot): CamelotKey {
    return `${camelot.number}A`
}

export function camelotKeyToMajor(camelot: Camelot): CamelotKey {
    return `${camelot.number}B`
}

export function camelotKeyAdd(camelot: Camelot, n: number, targetLetter?: CamelotLetter): CamelotKey {
    const num = containNumber(camelot.number + n, CAMELOT_MIN, CAMELOT_MAX) as CamelotNumber
    const letter = targetLetter ?? camelot.letter
    return `${num}${letter}`
}