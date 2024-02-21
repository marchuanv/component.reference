import { GUID, Type } from '../registry.mjs';
const instances = new WeakMap();
const references = new WeakMap();
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
    */
    constructor(namespace, target) {
        Object.freeze(this);
        let type = new Type(namespace, target);
        if (references.has(type)) {
            return references.get(type);
        } else {
            references.set(type, this);
            references.set(this, { target, type });
        }
    }
    /**
     * @param { GUID } Id
     * @param { Array<Object> } args
    */
    construct(Id, args = []) {
        const { target } = references.get(this);
        if (instances.has(Id)) {
            return instances.get(Id);
        } else {
            const instance = Reflect.construct(target, args);
            instances.set(Id, instance);
            return instance;
        }
    }
}