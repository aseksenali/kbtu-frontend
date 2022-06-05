declare global {
    interface Date {
        toTime(): Time
    }
}

// eslint-disable-next-line no-extend-native
Date.prototype.toTime = function (): Time {
    return { hours: this.getHours(), minutes: this.getMinutes() }
}

type Duration = {
    start: Time,
    end: Time
}

type Time = {
    hours: number,
    minutes: number
}

const add = (first: Time, second: Time): Time => {
    const minutes = first.minutes + second.minutes
    const addHours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return { hours: first.hours + second.hours + addHours, minutes: remainingMinutes }
}

const isBetween = (time: Time, { start, end }: Duration): boolean => {
    if (time.hours >= start.hours && time.hours < end.hours) return true
    if (time.hours === start.hours) return time.minutes >= start.minutes
    if (time.hours === end.hours) return time.minutes < end.minutes
    return false
}

const divideOnWindows = (interval: Time, duration: Duration) => {
    let current = duration.start
    const intervals = [] as Time[]
    while (isBetween(current, duration)) {
        intervals.push(current)
        current = add(current, interval)
    }
    return intervals
}

const contains = (arr: Time[], time: Time): boolean => arr.some(value => value.hours === time.hours && value.minutes === time.minutes)

const getEmptyWindows = (interval: Time, workTime: Duration, reservations: Time[]): Time[] =>
    divideOnWindows(interval, workTime).filter(interval => !contains(reservations, interval))

const isMorning = (time: Time): boolean => isBetween(time, {
    start: { hours: 5, minutes: 0 },
    end: { hours: 12, minutes: 0 },
})
const isAfternoon = (time: Time): boolean => isBetween(time, {
    start: { hours: 12, minutes: 0 },
    end: { hours: 18, minutes: 0 },
})
const isEvening = (time: Time): boolean => isBetween(time, {
    start: { hours: 18, minutes: 0 },
    end: { hours: 24, minutes: 0 },
})

const convertToString = (time: Time): string => {
    return (time.hours >= 10 ? time.hours : '0' + time.hours) + ':' + (time.minutes >= 10 ? time.minutes : '0' + time.minutes)
}

const now = (): Time => {
    const now = new Date()
    return now.toTime()
}

export const DateHelper = {
    isBetween,
    convertToString,
    now,
    divideOnWindows,
    getEmptyWindows,
    isMorning,
    isAfternoon,
    isEvening,
}

export default Time
export type { Duration }
