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
     * @returns { TypeRegister } remove from the top of the stack and add to the bottom
    */
    get() {
        const stack = super.get(secureContext);
        const top = stack.shift();
        stack.push(top);
        return top;
    }
    /**
     * @param { TypeRegister } register add to the top of the stack
    */
    set(register) {
        const stack = super.get(secureContext);
        stack.unshift(register);
    }
}