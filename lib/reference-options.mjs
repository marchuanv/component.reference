export class ReferenceOptions {
    constructor() {
        this._isSingleton = false;
        this._targetClass = null;
    }
    /**
     * @returns { Boolean }
    */
    get isSingleton() {
        return this._isSingleton;
    }
    /**
     * @param { Boolean } value
    */
    set isSingleton(value) {
        this._isSingleton = value;
    }
    /**
     * @returns { class }
    */
    get targetClass() {
        return this._targetClass;
    }
    /**
     * @param { class } value
    */
    set targetClass(value) {
        this._targetClass = value;
    }
}