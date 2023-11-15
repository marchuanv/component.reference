import { EventEmitter } from './registry.mjs';
const privateBag = new WeakMap();
export class Properties {
    constructor() {
        privateBag.set(this, {
            bag: new Map(),
            event: new EventEmitter()
        });
        Object.seal(this);
    }
    /**
     * @param { Function } callback
    */
    onSet(propertyName, callback) {
        const { event } = privateBag.get(this);
        event.on(propertyName, ({ bag, value }) => {
            const newValue = callback(value);
            if (newValue !== undefined) {
                bag.set(propertyName, newValue);
            }
        });
    }
    /**
     * @param { Function } callback
    */
    onceSet(propertyName, callback) {
        const { event } = privateBag.get(this);
        event.once(propertyName, ({ bag, value }) => {
            const newValue = callback(value);
            if (newValue !== undefined) {
                bag.set(propertyName, newValue);
            }
        });
    }
    /**
     * @param { String } propertyName
     * @param { Object } propertyValue
    */
    set(propertyName, propertyValue) {
        const { bag, event } = privateBag.get(this);
        bag.set(propertyName, propertyValue);
        event.emit(propertyName, { bag, value: propertyValue });
    }
    /**
     * @template T
     * @param { String } propertyName
     * @param { T } type
     * @returns { T }
    */
    get(propertyName, type) {
        const { bag } = privateBag.get(this);
        return bag.get(propertyName);
    }
    deserialise() {

    }
    serialise() {
        const { bag } = privateBag.get(this);
        const keys = bag.keys();
        const serialised = {};
        for (const key of keys) {
            const value = bag.get(key);
            const type = typeof value;
            if (type === 'string' || type === 'number' || type === 'boolean') {
                serialised[key] = value;
            } else {
                if (value instanceof Properties) {
                    const serialisedStr = value.serialise();
                    serialised[key] = JSON.parse(serialisedStr);
                } else {
                    throw new Error(`failed to deserialse ${key} object`);
                }
            }
        }
        return JSON.stringify(serialised);
    }
}