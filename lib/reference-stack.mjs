import { GUID, Reflection, Store, TypeRegisterId } from "../registry.mjs";
class ReferenceStackId extends GUID { }
const referenceStackId = new ReferenceStackId();
const secureContext = {};
export class ReferenceStack extends Store {
    constructor() {
        if (new.target !== ReferenceStack) {
            throw new Error(`${ReferenceStack.name} is a sealed class.`);
        }
        super({ referenceStackId }, secureContext);
        if (!super.get(secureContext)) {
            super.set([], secureContext);
        }
    }
    /**
     * @returns { Array<class> }
    */
    get extended() {
        return super.get(secureContext).filter(x => x !== ReferenceStack);
    }
    /**
     * @param { class } type
     * @param { TypeRegisterId } typeRegId
     * @returns { { type: class, typeRegId: TypeRegisterId } } Cycle. i.e. remove from the top of the stack and add to the bottom
    */
    get(type = null, typeRegId = null) {
        const stack = super.get(secureContext);
        let top = stack.shift();
        let started = top;
        while (top) {
            if (top.type === type || top.typeRegId === typeRegId) {
                return top;
            }
            stack.push(top);
            top = stack.shift();
            if (top === started) {
                break;
            }
        }
        throw new Error(`type or typeRegId not found.`);
    }
    /**
     * @param { class } type
     * @param { class } typeRegId
    */
    set(type, typeRegId) {
        if ( !(Reflection.isClass(type) || Reflection.isPrimitiveType(type)) || !typeRegId || !(typeRegId instanceof TypeRegisterId)) {
            throw new Error(`The type argument is not a class or refId is null, undefined or not an instance of ${TypeRegisterId.name}`);
        }
        const stack = super.get(secureContext);
        stack.unshift({ type, typeRegId });
    }
}