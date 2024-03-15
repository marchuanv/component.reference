import {
    GUID,
    ReferenceContext,
    Reflection,
    Store
} from '../registry.mjs';
const secureContext = {};
export class Reference extends Store {
    /**
     * holds data related to objects that inherited from the Reference class.
     * @param { ReferenceContext } context reference context
     * @returns { Reference }
    */
    constructor(context) {
        if (new.target === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (context === null || context === undefined || (context && !(context instanceof ReferenceContext))) {
            throw new Error(`The context argument is null or not a ${ReferenceContext.name} type.`);
        }
        const { targetClass, Id } = context.get();
        const referenceClassExtensions = Reflection.getExtendedClasses(new.target)
            .filter(x => x !== Store && x !== GUID && x !== Reference);
        if (!referenceClassExtensions.find(x => x === targetClass)) {
            throw new Error(`${targetClass.name} does not extend the ${Reference.name} class.`);
        }
        super({ context }, secureContext);
        Object.freeze(this);
        if (!super.get(secureContext)) {
            super.set({
                Id,
                targetClass,
                obj: null,
                extended: referenceClassExtensions
            }, secureContext);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        const { extended } = super.get(secureContext);
        return extended;
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