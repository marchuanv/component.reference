import { GUID, Type } from '../registry.mjs';
const references = new WeakMap();
let lock = false;
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { GUID } instanceId reference Id
     * @param { Object } instance
     * @returns { Reference }
    */
    constructor(namespace, target, instanceId, instance = null) {
        const targetClass = new.target;
        if (targetClass !== Reference) {
            throw new Error(`${Reference.name} is a sealed class`);
        }
        // Check if namespace is provided and is a string
        if (typeof namespace !== 'string' || namespace.trim() === '') {
            throw new Error('Namespace must be a non-empty string');
        }
        // Check if target is provided and is a class
        if (!(typeof target === 'function' && target.prototype)) {
            throw new Error('Target must be a class');
        }
        // Check if instanceId is provided and is an instance of GUID
        if (!(instanceId instanceof GUID)) {
            throw new Error('InstanceId must be an instance of GUID');
        }
        Object.freeze(this);
        const type = new Type(namespace, target);
        const Id = new GUID({
            Id: type.toString(),
            refId: instanceId.toString()
        });
        if (references.has(Id)) {
            return references.get(Id);
        } else {
            if (!lock) {
                references.set(Id, this);
                references.set(this, { Id, target, instance });
            }
        }
    }
    /**
     * @returns { GUID }
    */
    get Id() {
        const { Id } = references.get(this);
        return Id;
    }
    toString() {
        return this.Id.toString();
    }
    /**
     * @param { Array<Object> } args
    */
    get(args = []) {
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
     * get or create a reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { GUID } instanceId reference Id
     * @returns { Reference }
    */
    static get(namespace, target, instanceId) {
        lock = true;
        const ref = new Reference(namespace, target, instanceId);
        lock = false;
        if (references.has(ref)) {
            return ref;
        } else {
            throw new Error(`reference not found for: ${JSON.stringify({ namespace, Class: target.name, refId: instanceId.toString() })}`);
        }
    }
}