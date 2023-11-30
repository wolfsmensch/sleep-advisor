class Storage {
    static targetTimeKey = 'target-time';

    _targetTime = null;

    get targetTime()
    {
        return this._targetTime;
    }

    set targetTime(value)
    {
        this._targetTime = value;
        localStorage.setItem(Storage.targetTimeKey, value);
    }

    constructor()
    {
        this._targetTime = localStorage.getItem(Storage.targetTimeKey);
    }

    hasTargetTime()
    {
        return this.targetTime !== null;
    }
}

export default new Storage();