import { GUID, Type } from '../registry.mjs';
export class Reference extends Type {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { Object | class } target - The target class or object
     * @returns { Reference }
    */
    constructor(namespace, target) {
        const targetClass = new.target;
        if (targetClass === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        super(namespace, target);
        Object.freeze(this);
        const Class = Type.get(target.name);
        if (target instanceof Class) {
            super.set({ name: 'instance' }, target);
        } else {
            super.set({ name: 'instance' }, null);
        }
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