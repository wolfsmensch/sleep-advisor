import Time from "./time.js";

export default class UIController {
    static get RemainingTimeSelector()
    {
        return '.remaining-time';
    }

    setTimeForm = null;
    btnTimeForm = null;
    targetTime = null;
    wakeUpTimeField = null;
    setTimeBtn = null;

    sleepTimeObject = null;

    get hiddenClassName() {
        return 'hidden';
    }

    sleepTimeSections = null;

    constructor(
        timeFormQuery,
        btnTimeFormQuery,
        targetTimeQuery,
        wakeUpTimeFieldQuery,
        setTimeBtnQuery,
        sleepTimeObject = null,
        ) 
    {
        this.setTimeForm = document.querySelector(timeFormQuery);
        this.btnTimeForm = document.querySelector(btnTimeFormQuery);
        this.targetTime = document.querySelector(targetTimeQuery);
        this.wakeUpTimeField = document.querySelector(wakeUpTimeFieldQuery);
        this.setTimeBtn = document.querySelector(setTimeBtnQuery);

        this.sleepTimeObject = sleepTimeObject;

        this.initEventListeners();

        window.setInterval(
            (this.updateRemainingTimeSections).bind(this),
            (1000 * 30)
            );
    }

    initEventListeners() {
        this.btnTimeForm.addEventListener('click', () => { this.showTimeForm(this.setTimeForm) });
        this.setTimeForm.querySelector('.btn.close').addEventListener('click', () => { this.closeTimeForm(this.setTimeForm) });
        this.setTimeBtn.addEventListener('click', () => {
            this.updateTargetTime(this.sleepTimeObject, this.wakeUpTimeField, this.setTimeForm);
        });
    }

    showTimeForm(timeForm) {
        timeForm.classList.remove(this.hiddenClassName);
    }

    closeTimeForm(timeForm) {
        timeForm.classList.add(this.hiddenClassName);
    }

    updateTimeSections(sections, target) {
        this.sleepTimeSections = sections;

        for (const section of sections) {
            let element = document.querySelector(section.domSelector);
            if (element === null) {
                console.log(`Error: element ${section.domSelector} not found`);
                continue;
            }

            element.innerText = Time.getHumanTimeFromDate(section.target);
        }

        this.updateRemainingTimeSections();

        this.targetTime.innerText = target.toString();
        this.wakeUpTimeField.value = target.toString();
    }

    updateTargetTime(sleepTimeObject, wakeUpTimeField, timeForm)
    {
        sleepTimeObject.targetTime = Time.getFromString(wakeUpTimeField.value);
        this.closeTimeForm(timeForm);
    }

    updateRemainingTimeSections()
    {
        const currentTime = moment(Date.now());

        console.log('updateRemainingTimeSections');

        // Если еще неизвестны временные секции
        if (this.sleepTimeSections == null)
        {
            const sections = document.querySelectorAll(`.time ${UIController.RemainingTimeSelector}`);
            for(const section of sections)
            {
                section.innerText = '';
            }

            return;
        }
        
        // Если время секций известно
        for(const section of this.sleepTimeSections)
        {
            const targetTime = moment(section.target.getTime());
            const timeDiff = moment.duration( targetTime.diff(currentTime) );

            const querySelector = `${section.domRoot} ${UIController.RemainingTimeSelector}`;
            const remainingElement = document.querySelector(querySelector);
            if ( remainingElement === null )
            {
                console.log(`Error: element ${querySelector} not found`);
                continue;
            }

            remainingElement.innerText = (new Time(timeDiff.hours(), timeDiff.minutes())).toString();
        }
    }
}

