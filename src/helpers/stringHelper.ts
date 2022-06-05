import { DateHelper, Duration } from './dateHelper'
import { Address } from '../interfaces/CarWasher'

const forEachWord = (fn: (a: string) => string, str: string, joinCharacter = ' '): string => {
    return str
        .split(' ')
        .map(fn)
        .join(joinCharacter)
}

const capitalize = (str: string): string => {
    return forEachWord((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }, str)
}

const labelize = (str: string): string => {
    return forEachWord((str) => {
        return str.toLowerCase()
    }, str, '_')
        .replaceAll(/\W/ig, '')
}

const formatWorkTime = ({ start, end }: Duration): string => {
    return `${ DateHelper.convertToString(start) }-${ DateHelper.convertToString(end) }`
}

const formatAddress = ({ street, house }: Address): string => {
    return `${ street }, ${ house }`
}

const formatPhoneNumber = (number: string) => {
    const cleaned = ('' + number).replace(/\D/g, '')
    const match = cleaned.match(/(\d)(\d{3})(\d{3})(\d{4})/)
    if (match) {
        return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
    }
    return null
}

const StringHelper = {
    capitalize,
    labelize,
    formatAddress,
    formatWorkTime,
    formatPhoneNumber,
}

export default StringHelper