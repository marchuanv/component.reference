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
        if (context === null || context === undefined || !(context instanceof ReferenceContext)) {
            throw new Error(`The context argument is null, undefined or not a ${ReferenceContext.name} type.`);
        }
        const { typeRegister, Id } = context.get();
        const { typeName, type } = typeRegister.get();
        const referenceClassExtensions = Reflection.getExtendedClasses(new.target)
            .filter(x => x !== Store && x !== GUID && x !== Reference);
        if (!referenceClassExtensions.find(x => x === type)) {
            if (!Reflection.isPrimitiveType(type)) {
                const isAnotherReference = Reflection.getExtendedClasses(type).some(x => x === Reference); //References another reference
                if (!isAnotherReference) {
                    throw new Error(`${typeName} does not extend the ${Reference.name} class.`);
                }
            }
        }
        super({ context }, secureContext);
        Object.freeze(this);
        if (!super.get(secureContext)) {
            super.set({
                Id,
                typeRegister,
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
        const { typeRegister } = super.get(secureContext);
        const { type } = typeRegister.get();
        return type;
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