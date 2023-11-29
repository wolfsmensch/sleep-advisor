export default class Time {
    constructor(hours, minutes)
    {
        this.hours = Number(hours);
        this.minutes = Number(minutes);
    }

    toString()
    {
        return String(this.hours).padStart(2, '0') + ':' + String(this.minutes).padStart(2, '0');
    }

    get msec()
    {
        return (((this.hours * 60 * 60) + (this.minutes * 60)) * 1000);
    }

    static getHumanTimeFromDate(date)
    {
        return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    }

    static getFromString(stringDate)
    {
        const [hoursText, minutesText] = stringDate.split(':');
        return new Time(hoursText, minutesText);
    }
}