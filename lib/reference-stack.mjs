import { GUID, Store, TypeRegister } from "../registry.mjs";
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
     * @returns { TypeRegister }
    */
    get() {
        const stack = super.get(secureContext);
        return stack.shift();
    }
    /**
     * @param { TypeRegister } register reference register context
    */
    set(register) {
        const stack = super.get(secureContext);
        stack.unshift(register);
    }
}