import { Reference, ReferenceId, Reflection, Store } from "../registry.mjs";
const secureContext = {};
export class ReferenceContext extends Store {
    /**
     * @param { class } targetClass
     * @param { Boolean } singleton
     * @param { ReferenceId } refId
    */
    constructor(targetClass, singleton = false, refId = new ReferenceId()) {
        if (new.target !== ReferenceContext) {
            throw new Error(`${ReferenceContext} is a sealed class`);
        }
        if (refId === null || refId === undefined || (refId && !(refId instanceof ReferenceId))) {
            throw new Error(`The refId argument is null, undefined or not a ${ReferenceId.name} type.`);
        }
        if (!Reflection.isClass(targetClass)) {
            throw new Error('The targetClass argument is not a class.');
        }
        const classExtensions = Reflection.getExtendedClasses(targetClass);
        if (!classExtensions.find(x => x === Reference)) {
            throw new Error(`${targetClass.name} does not extend the ${Reference.name} class.`);
        }
        if (singleton) {
            const Id = new ReferenceId({ targetClass, Id: '37147098-066f-4ba7-bf17-2c83d8c88b19' });
            super({ Id }, secureContext);
            super.set({ Id, singleton, targetClass }, secureContext);
        } else {
            const Id = new ReferenceId({ targetClass, Id: refId.toString() });
            super({ Id }, secureContext);
            super.set({ Id, singleton, targetClass }, secureContext);
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
     * @returns { { Id: ReferenceId, singleton: Boolean, targetClass: class } }
    */
    get() {
        return super.get(secureContext);
    }
    set() {
        throw new Error(`can't change reference context.`);
    }
}