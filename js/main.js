import UIController from "./ui.js";
import Time from "./time.js";
import SleepTime from "./sleep-time.js";
import storage from "./storage.js";

const uiController = new UIController(
    '#set-time',
    '#show-time-form',
    '#target-wakeup-time .time',
    '#wakeup-time',
    '#set-time-btn'
    );

const sleepTime = new SleepTime(
    storage.hasTargetTime() ? Time.getFromString(storage.targetTime) : new Time(8, 0),
    new Time(8, 30),
    (uiController.updateTimeSections).bind(uiController)
    );

uiController.sleepTimeObject = sleepTime;