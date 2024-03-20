import {
    GUID,
    ReferenceContext,
    ReferenceId,
    Reflection,
    Store
} from '../registry.mjs';
const secureContext = {};
const schema = {
    Id: 'object',
    typeRegister: 'object',
    data: 'object',
    extended: 'array'
};
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
        const { Id } = context;
        const typeRegister = context.get();
        const { typeName, type } = typeRegister;
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
        super({ context }, secureContext, schema);
        Object.freeze(this);
        if (!this.exists) {
            super.set({
                Id,
                typeRegister,
                data: null,
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
     * @template T
     * @param { T } prototype class or type prototype
     * @returns { T } data
    */
    get(prototype) {
        const { data } = super.get(secureContext);
        if (Reflection.typeMatch(prototype, data)) {
            return data;
        }
        throw new Error(`The data type does not match the prototype argument.`);
    }
    /**
     * @param { Object } data
    */
    set(data) {
        const store = super.get(secureContext);
        store.data = data;
    }
    /**
     * @returns { class }
    */
    get type() {
        const { typeRegister } = super.get(secureContext);
        const { type } = typeRegister;
        return type;
    }
    /**
     * @returns { String }
    */
    get typeName() {
        const { typeRegister } = super.get(secureContext);
        const { typeName } = typeRegister;
        return typeName;
    }
    /**
     * @returns { ReferenceId }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
    /**
     * @returns { Boolean }
    */
    get exists() {
        if (super.isEmpty) {
            return false;
        }
        const { typeRegister, extended } = super.get(secureContext);
        if (typeRegister === null || typeRegister === undefined || extended === null || extended === undefined) {
            return false;
        }
        return true;
    }
}