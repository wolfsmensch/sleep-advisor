import Time from "./time.js";
import storage from "./storage.js";

export default class SleepTime {
    prepSections = [
        {
            domRoot: '#card-blue-filter .time',
            domSelector: '#card-blue-filter .time .time-value',
            time: new Time(2, 10),
        },
        {
            domRoot: '#card-lights .time',
            domSelector: '#card-lights .time .time-value',
            time: new Time(1, 40),
        },
        {
            domRoot: '#card-ventilate .time',
            domSelector: '#card-ventilate .time .time-value',
            time: new Time(0, 55),
        },
        {
            domRoot: '#card-go-sleep .time',
            domSelector: '#card-go-sleep .time .time-value',
            time: new Time(0, 40),
        },
    ];

    _targetTime = null;
    _sleepDuration = null;
    
    get targetTime()
    {
        return this._targetTime;
    }

    set targetTime(time)
    {
        this._targetTime = time;
        storage.targetTime = time.toString();
        this.calculateSectionsTargetTime();
    }

    get sleepDuration()
    {
        return this._sleepDuration;
    }

    set sleepDuration(duration)
    {
        this._sleepDuration = duration;
        this.calculateSectionsTargetTime();
    }

    updateCallback = null;

    constructor(
        target = new Time(8, 0), 
        duration = new Time(8, 0),
        updateCallback = null,
    )
    {
        this._targetTime = target;
        this._sleepDuration = duration;
        this.updateCallback = updateCallback;

        this.calculateSectionsTargetTime();
    }

    calculateSectionsTargetTime() {
        let wakeupTime = new Date();
        wakeupTime.setHours(this.targetTime.hours, this.targetTime.minutes, 0);

        let goSleepTime = new Date();
        goSleepTime.setTime(wakeupTime.getTime() - this.sleepDuration.msec);

        for (const key in this.prepSections) {
            this.prepSections[key].target = new Date();
            this.prepSections[key].target.setTime(goSleepTime.getTime() - this.prepSections[key].time.msec);
            this.prepSections[key].target.setDate((new Date()).getDate());  // Фиксим смещение даты на вчерашний день
        }

        this.updateCallback(this.prepSections, this.targetTime);
    }
}