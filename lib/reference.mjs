import { GUID, Type } from '../registry.mjs';
const references = new WeakMap();
const unlockId = new GUID({ description: 'this guid is to indicate if a constructor should finish creating a Type' });
references.set(unlockId);
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { Object | class } target - The target class
     * @param { GUID } refId reference Id
     * @returns { Reference }
    */
    constructor(namespace, target, refId) {
        const targetClass = new.target;
        if (targetClass !== Reference) {
            throw new Error(`${Reference.name} is a sealed class`);
        }
        // Check if namespace is provided and is a string
        if (typeof namespace !== 'string' || namespace.trim() === '') {
            throw new Error('Namespace must be a non-empty string');
        }
        // Check if refId is provided and is an instance of GUID
        if (!(refId instanceof GUID)) {
            throw new Error('InstanceId must be an instance of GUID');
        }
        Object.freeze(this);
        const type = new Type(namespace, target);
        const Class = type.type;
        const Id = new GUID({
            Id: type.toString(),
            refId: refId.toString()
        });
        const instanceId = new GUID({
            Id: Id.toString(),
            refId: refId.toString()
        });
        if (references.has(Id)) {
            return references.get(Id);
        }
        if (references.has(unlockId)) {
            if (target instanceof Class) {
                references.set(instanceId, target);
            } else {
                references.set(instanceId, null);
            }
            references.set(Id, this);
            references.set(this, { Id, instanceId, Class });
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
        const { Class, instanceId } = ref;
        let instance = references.get(instanceId);
        if (instance) {
            return instance;
        } else {
            instance = Reflect.construct(Class, args);
            references.delete(instanceId);
            references.set(instanceId, instance);
            return instance;
        }
    }
    /**
     * get or create a reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { Object | class } target - The target class
     * @param { GUID } refId reference Id
     * @returns { Reference }
    */
    static get(namespace, target, refId) {
        references.delete(unlockId);
        const ref = new Reference(namespace, target, refId);
        references.set(unlockId);
        if (references.has(ref)) {
            return ref;
        } else {
            const type = new Type(namespace, target);
            throw new Error(`reference not found for: ${JSON.stringify({ namespace, Class: type.name, refId: refId.toString() })}`);
        }
    }
    /**
     * check if reference exist.
     * @param { String } namespace - The namespace string for the reference.
     * @param { class } target - The target class
     * @param { GUID } refId reference Id
     * @returns { Boolean }
    */
    static has(namespace, target, refId) {
        references.delete(unlockId);
        const ref = new Reference(namespace, target, refId);
        references.set(unlockId);
        return references.has(ref);
    }
}