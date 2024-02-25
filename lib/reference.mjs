import { GUID, Type } from '../registry.mjs';
export class Reference extends Type {
    /**
     * Creates an instance of Reference.
     * @param { Object | class } target - The target class or object
     * @param { GUID } refId reference Id
     * @returns { Reference }
    */
    constructor(target, refId) {
        const targetClass = new.target;
        if (targetClass === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (!(refId instanceof GUID)) {
            throw new Error(`refId argument is not an instance of ${GUID.name}`);
        }
        super(target);
        Object.freeze(this);
        const Class = super.type;
        if (target instanceof Class) {
            super.set({ refId }, target);
        } else {
            super.set({ refId }, null);
        }
    }
    /**
     * @param { GUID } refId reference Id
     * @param { Array<Object> } args
    */
    instance(refId, args = []) {
        let instance = super.get({ refId });
        if (instance == undefined) {
            instance = Reflect.construct(super.type, args);
            super.set({ refId }, instance);
        }
        return instance;
    }
    /**
     * get or create a reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { Object | class } target - The target class
     * @param { GUID } refId reference Id
     * @returns { Reference }
    */
    static get(namespace, target, refId) {
        return new Reference(namespace, target, refId);
    }
}