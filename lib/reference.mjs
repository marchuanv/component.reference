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
        super.set(this, secureContext);
    }
    /**
     * @template T
     * @param { T } Class
     * @returns { T }
    */
    get(Class) {
        if (typeof Class !== 'function' || !Class.prototype || typeof Class.constructor !== 'function') {
            throw new Error('Class argument must be a class');
        }
        return super.get(secureContext);
    }
    set() {
        throw new Error(`can't set a reference`);
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
