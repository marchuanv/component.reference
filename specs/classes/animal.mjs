import { Reference, ReferenceOptions } from "../../registry.mjs";
import { Property } from "../index.mjs";
export class Animal extends Reference {
    /**
     * @param { ReferenceOptions } options 
    */
    constructor(options = new ReferenceOptions()) {
        super(options);
    }
    /**
     * @returns { String }
    */
    get type() {
        return Property.get({ type: null }, String);
    }
    /**
     * @param { String } value
    */
    set type(value) {
        Property.set({ type: value }, String);
    }
    /**
     * @returns { Array<String> }
    */
    get vaccinationYears() {
        return Property.get({ vaccinationYears: value }, Number);
    }
}
