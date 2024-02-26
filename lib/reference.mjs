import { GUID, RefId, Type } from '../registry.mjs';
export class Reference extends Type {
    /**
     * Creates an instance of Reference.
     * @param { Object | class } target - The target class or object
     * @param { RefId } refId reference Id
     * @returns { Reference }
    */
    constructor(target, refId) {
        const targetClass = new.target;
        if (targetClass === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (!(refId instanceof RefId)) {
            throw new Error(`refId argument is not an instance of ${GUID.name}`);
        }
        super(target);
        Object.freeze(this);
        if (targetClass === GetRef) {
            return;
        }
        if (targetClass === HasRef) {
            return;
        }
        const Class = super.type;
        let refValue = super.get({ refId });
        refValue = (refValue !== null && refValue !== undefined) ? refValue : (target instanceof Class ? target : null);
        super.set({ refId }, refValue);
    }
    /**
     * @param { RefId } refId reference Id
     * @param { Array<Object> } args
    */
    instance(refId, args = []) {
        if (!(refId instanceof GUID)) {
            throw new Error(`refId argument is not an instance of ${GUID.name}`);
        }
        let instance = super.get({ refId });
        if (instance === null) {
            instance = Reflect.construct(super.type, args);
            super.set({ refId }, instance);
        }
        return instance;
    }
    /**
     * get a reference.
     * @param { Object | class } target - The target class
     * @param { RefId } refId reference Id
     * @returns { Reference }
    */
    static get(target, refId) {
        if (!Reference.has(target, refId)) {
            throw new Error(`reference not found for: ${JSON.stringify({ Class: target.name, refId: refId.toString() })}`);
        }
        return new GetRef(target, refId);
    }
    /**
     * check if reference exist
     * @param { Object | class } target - The target class
     * @param { RefId } refId reference Id
     * @returns { Boolean }
    */
    static has(target, refId) {
        const ref = new HasRef(target, refId);
        const instance = ref.get({ refId });
        return instance !== undefined;
    }
}
class GetRef extends Reference { }
class HasRef extends Reference { }