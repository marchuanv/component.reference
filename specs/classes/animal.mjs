import { Property } from "./property.mjs";
export class Animal {
    /**
     * @returns { String }
    */
    get type() {
        return Property.get({ type: null }, String, Animal);
    }
    /**
     * @param { String } value
    */
    set type(value) {
        Property.set({ type: value }, String, Animal);
    }
    /**
     * @returns { Array<String> }
    */
    get vaccinationYears() {
        return Property.get({ vaccinationYears: value }, Number, Animal);
    }
    /**
     * @template T
     * @param { T } type
     * @returns { T }
    */
    animalType(type) {
    }
}
