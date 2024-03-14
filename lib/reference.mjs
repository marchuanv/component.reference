import crypto from 'node:crypto';
import { ReferenceOptions, Store } from '../registry.mjs';
const secureContext = {};
export class Reference extends Store {
    /**
     * holds a reference to an instance. i.e. singleton or new instance
     * @param { ReferenceOptions } options reference options
     * @returns { Reference }
    */
    constructor(options = new ReferenceOptions()) {
        const target = new.target;
        if (target === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (options !== null && options !== undefined && !(options instanceof ReferenceOptions)) {
            throw new Error(`options argument is not of type ${ReferenceOptions.name}`);
        }
        let Class = target;
        const { isSingleton, targetClass } = options;
        if (targetClass) {
            if (isClass(targetClass)) {
                Class = targetClass;
            } else {
                throw new Error(`options: targetClass is not a class`);
            }
        }
        let Id = Class.name;
        if (!isSingleton) {
            Id = `${Id}.${crypto.randomUUID()}`;
        }
        super({ Id }, secureContext);
        Object.freeze(this);
        if (!(this instanceof Class)) {
            throw new Error(`${Class.name} does not extend ${target.name}`);
        }
        if (!super.get(secureContext)) {
            super.set({
                Id,
                targetClass: Class,
                obj: null
            }, secureContext);
        }
    }
    /**
     * @returns { Object }
    */
    get() {
        const { obj } = super.get(secureContext);
        return obj;
    }
    /**
     * @param { Object } value
    */
    set(value) {
        const store = super.get(secureContext);
        store.obj = value;
    }
    /**
     * the class that was targeted when Reference was constructed
     * @returns { class }
    */
    get targetClass() {
        const { targetClass } = super.get(secureContext);
        return targetClass;
    }
    /**
     * The Reference Id
     * @returns { String }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
}
function isClass(obj) {
    const isCtorClass = obj.constructor
        && obj.constructor.toString().substring(0, 5) === 'class'
    if (obj.prototype === undefined) {
        return isCtorClass
    }
    const isPrototypeCtorClass = obj.prototype.constructor
        && obj.prototype.constructor.toString
        && obj.prototype.constructor.toString().substring(0, 5) === 'class'
    return isCtorClass || isPrototypeCtorClass
}
