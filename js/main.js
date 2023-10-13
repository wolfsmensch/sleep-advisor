addEventListener('DOMContentLoaded', onStart );

class Time {
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
}

const prepSections = [
    {
        domSelector: '#card-blue-filter .time',
        time: new Time(2,10),
    },
    {
        domSelector: '#card-lights .time',
        time: new Time(1,40),
    },
    {
        domSelector: '#card-ventilate .time',
        time: new Time(0,55),
    },
    {
        domSelector: '#card-go-sleep .time',
        time: new Time(0,40),
    },
];

const sleepDuration = new Time(8,0);

function onStart()
{
    console.log('Started');

    window.targetTime = new Time(8,0);

    let fieldGoSleep = document.querySelector('#target-wakeup-time .time');
    
    updateSleepTimeSections(prepSections, targetTime, sleepDuration, fieldGoSleep);
}

function calculateSectionsTargetTime(sections, target, duration)
{
    let wakeupTime = new Date();
    wakeupTime.setHours(target.hours, target.minutes, 0);

    let goSleepTime = new Date();
    goSleepTime.setTime(wakeupTime.getTime() - duration.msec);

    for(const key in sections)
    {
        sections[key].target = new Date();
        sections[key].target.setTime(goSleepTime.getTime() - sections[key].time.msec);
    }
}

function displaySectionsTargetTime(sections)
{
    for(const section of sections)
    {
        let element = document.querySelector(section.domSelector);
        if (element === null)
        {
            console.log(`Error: element ${section.domSelector} not found`);
            continue;
        }

        element.innerText = Time.getHumanTimeFromDate(section.target);
    }
}

function updateSleepTimeSections(sections, target, duration, fieldGoSleep)
{
    fieldGoSleep.innerText = target.toString();

    calculateSectionsTargetTime(sections, target, duration);
    displaySectionsTargetTime(sections);
}