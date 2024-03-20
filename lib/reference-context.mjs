import { Reference, ReferenceId, Reflection, Store, TypeRegister } from "../registry.mjs";
const secureContext = {};
const schema = {
    Id: 'object',
    typeRegister: 'object'
};
export class ReferenceContext extends Store {
    /**
     * @param { TypeRegister } typeRegister
     * @param { Boolean } singleton
     * @param { ReferenceId } refId
    */
    constructor(typeRegister, singleton = false, refId = new ReferenceId()) {
        if (typeRegister === null || typeRegister === undefined || !(typeRegister instanceof TypeRegister)) {
            throw new Error(`The typeRegister argument is null, undefined or not a ${TypeRegister.name} type.`);
        }
        if (refId === null || refId === undefined || !(refId instanceof ReferenceId)) {
            throw new Error(`The refId argument is null, undefined or not a ${ReferenceId.name} type.`);
        }
        const { typeName, type } = typeRegister;
        const classExtensions = Reflection.getExtendedClasses(type);
        if (!classExtensions.find(x => x === Reference)) {
            if (!Reflection.isPrimitiveType(type)) {
                throw new Error(`${typeName} does not extend the ${Reference.name} class.`);
            }
        }
        let Id = refId.toString();
        if (singleton) {
            Id = '37147098-066f-4ba7-bf17-2c83d8c88b19';
        }
        Id = new ReferenceId({ typeRegister, Id });
        super({ Id }, secureContext, schema);
        if (!this.exists) {
            super.set({ Id, typeRegister }, secureContext);
        }
        Object.freeze(this);
    }
    /**
     *@returns { ReferenceId }
    */
    get Id() {
        const { Id } = super.get(secureContext);
        return Id;
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended;
    }
    /**
     * @returns { TypeRegister }
    */
    get() {
        const { typeRegister } = super.get(secureContext);
        return typeRegister;
    }
    set() {
        throw new Error(`can't change reference context.`);
    }
    /**
     * @returns { Boolean } checks if the typeRegister exist and that the store is not empty
    */
    get exists() {
        if (super.isEmpty) {
            return false;
        }
        const { typeRegister } = super.get(secureContext);
        return typeRegister !== null && typeRegister !== undefined && typeRegister instanceof TypeRegister;
    }
}