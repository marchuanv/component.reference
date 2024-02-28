export class ReferenceOptions {
    constructor() {
        this._isSingleton = false;
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
}