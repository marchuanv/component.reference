import { GUID, Type } from '../registry.mjs';
const references = new WeakMap();
let lock = false;
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { String } refName reference name
     * @returns { Reference }
    */
    constructor(namespace, target, refName) {
        Object.freeze(this);
        const type = new Type(namespace, target);
        const Id = new GUID({ typeId: type.toString(), refName });
        if (references.has(Id)) {
            return references.get(Id);
        } else {
            if (!lock) {
                references.set(Id, this);
                references.set(this, { Id, target, instance: null });
            }
        }
    }
    toString() {
        const { Id } = references.get(this);
        return Id.toString();
    }
    /**
     * @param { Array<Object> } args
    */
    construct(args = []) {
        const ref = references.get(this);
        const { target } = ref;
        if (ref.instance) {
            return ref.instance;
        } else {
            ref.instance = Reflect.construct(target, args);
            return ref.instance;
        }
    }
    /**
     * gets a reference based on the criteria.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { String } refName reference name
     * @returns { Reference }
    */
    static get(namespace, target, refName) {
        lock = true;
        const ref = new Reference(namespace, target, refName);
        lock = false;
        if (references.has(ref)) {
            return ref;
        } else {
            throw new Error(`reference not found for: ${JSON.stringify({ namespace, Class: target.name, refName })}`);
        }
    }
}