import Time from "./time.js";

export default class UIController {
    setTimeForm = null;
    btnTimeForm = null;
    targetTime = null;
    wakeUpTimeField = null;
    setTimeBtn = null;

    sleepTimeObject = null;

    get hiddenClassName() {
        return 'hidden';
    }

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
        for (const section of sections) {
            let element = document.querySelector(section.domSelector);
            if (element === null) {
                console.log(`Error: element ${section.domSelector} not found`);
                continue;
            }

            element.innerText = Time.getHumanTimeFromDate(section.target);
        }

        this.targetTime.innerText = target.toString();
        this.wakeUpTimeField.value = target.toString();
    }

    updateTargetTime(sleepTimeObject, wakeUpTimeField, timeForm)
    {
        sleepTimeObject.targetTime = Time.getFromString(wakeUpTimeField.value);
        this.closeTimeForm(timeForm);
    }
}

