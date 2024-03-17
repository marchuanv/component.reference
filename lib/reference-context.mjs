import { Reference, ReferenceId, Reflection, Store, TypeRegister } from "../registry.mjs";
const secureContext = {};
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
        const { typeName, type } = typeRegister.get();
        const classExtensions = Reflection.getExtendedClasses(type);
        if (!classExtensions.find(x => x === Reference)) {
            throw new Error(`${typeName} does not extend the ${Reference.name} class.`);
        }
        if (singleton) {
            const Id = new ReferenceId({ typeRegister, Id: '37147098-066f-4ba7-bf17-2c83d8c88b19' });
            super({ Id }, secureContext);
            super.set({ Id, singleton, typeRegister }, secureContext);
        } else {
            const Id = new ReferenceId({ typeRegister, Id: refId.toString() });
            super({ Id }, secureContext);
            super.set({ Id, singleton, typeRegister }, secureContext);
        }
        Object.freeze(this);
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.extended;
    }
    /**
     * @returns { { Id: ReferenceId, singleton: Boolean, typeRegister: TypeRegister } }
    */
    get() {
        return super.get(secureContext);
    }
    set() {
        throw new Error(`can't change reference context.`);
    }
}