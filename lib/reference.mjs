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
/**
 * Represents a reference object that holds data related to objects that inherit from the Reference class.
 * @extends Store
 */
export class Reference extends Store {
    /**
     * Constructs a new Reference object.
     * @param {ReferenceContext} context - The reference context.
     * @throws {Error} Throws an error if called directly on the Reference class, or if context is null, undefined, or not an instance of ReferenceContext.
     * @returns {Reference} A new Reference object.
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
        const extended = Reflection.getExtendedClasses(new.target)
            .filter(x => x !== Store && x !== GUID && x !== Reference);
        if (!extended.find(x => x === type)) {
            if (!Reflection.isPrimitiveType(type)) {
                const isAnotherReference = Reflection.getExtendedClasses(type).some(x => x === Reference); //References another reference
                if (!isAnotherReference) {
                    throw new Error(`${typeName} does not extend the ${Reference.name} class.`);
                }
            }
        }
        super({ context }, secureContext, schema, { Id, typeRegister, data: {}, extended });
        Object.freeze(this);
    }

    /**
     * Gets the array of extended classes.
     * @returns {Array<Class>} The array of extended classes.
     */
    get extended() {
        const { extended } = super.get(secureContext);
        return extended;
    }

    /**
     * Gets the data matching the prototype.
     * @template T
     * @param {T} prototype - The class or type prototype.
     * @throws {Error} Throws an error if the data type does not match the prototype.
     * @returns {T} The data matching the prototype.
     */
    get(prototype) {
        const { data } = super.get(secureContext);
        if (Reflection.typeMatch(prototype, data)) {
            return data;
        }
        throw new Error(`The data type does not match the prototype argument.`);
    }

    /**
     * Sets the data.
     * @param {Object} data - The data to be set.
     */
    set(data) {
        const store = super.get(secureContext);
        store.data = data;
    }

    /**
     * Gets the type.
     * @returns {Class} The type.
     */
    get type() {
        const { typeRegister } = super.get(secureContext);
        const { type } = typeRegister;
        return type;
    }

    /**
     * Gets the type name.
     * @returns {String} The type name.
     */
    get typeName() {
        const { typeRegister } = super.get(secureContext);
        const { typeName } = typeRegister;
        return typeName;
    }

    /**
     * Gets the reference ID.
     * @returns {ReferenceId} The reference ID.
     */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
}
