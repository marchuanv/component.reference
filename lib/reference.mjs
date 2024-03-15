import {
    GUID,
    ReferenceOptions,
    Reflection,
    Store,
    randomUUID
} from '../registry.mjs';
const secureContext = {};
export class Reference extends Store {
    /**
     * holds data related to objects that inherited from the Reference class.
     * @param { ReferenceOptions } options reference options
     * @returns { Reference }
    */
    constructor(options = new ReferenceOptions()) {
        let originalTarget = new.target
        let Class = originalTarget;
        if (Class === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (options !== null && options !== undefined && !(options instanceof ReferenceOptions)) {
            throw new Error(`options argument is not of type ${ReferenceOptions.name}`);
        }
        const { isSingleton, targetClass } = options;
        const referenceClassExtensions = Reflection.getExtendedClasses(originalTarget)
            .filter(x => x !== Store && x !== GUID && x !== Reference);
        if (targetClass) {
            if (referenceClassExtensions.find(x => x === targetClass)) {
                Class = targetClass;
            } else {
                throw new Error(`option: targetClass does not extend the ${Reference.name} class.`);
            }
        }
        let Id = Class.name;
        if (!isSingleton) {
            Id = `${Id}.${randomUUID()}`;
        }
        super({ Id }, secureContext);
        Object.freeze(this);
        if (!super.get(secureContext)) {
            super.set({
                Id,
                targetClass: Class,
                obj: null,
                extended: referenceClassExtensions
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