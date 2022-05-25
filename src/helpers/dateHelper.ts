declare global {
    interface Date {
        toTime(): Time
    }
}

// eslint-disable-next-line no-extend-native
Date.prototype.toTime = function (): Time {
    return {hours: this.getHours(), minutes: this.getMinutes()}
}

type Duration = {
    start: Time,
    end: Time
}

type Time = {
    hours: number,
    minutes: number
}

const isBetween = (time: Time, {start, end}: Duration): boolean => {
    if (time.hours > start.hours && time.hours < end.hours) return true;
    if (time.hours === start.hours) return time.minutes > start.minutes;
    if (time.hours === end.hours) return time.minutes < end.minutes;
    return false;
}


const convertToString = (time: Time): string => {
    return (time.hours >= 10 ? time.hours : '0' + time.hours) + ":" + (time.minutes >= 10 ? time.minutes : '0' + time.minutes)
}

const now = (): Time => {
    const now = new Date()
    return now.toTime();
}

export const DateHelper = {isBetween, convertToString, now}

export default Time
export type {Duration}
