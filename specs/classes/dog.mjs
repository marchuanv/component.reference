import {
    Animal,
    Food,
    Property
} from '../index.mjs';
export class Dog extends Animal {
    /**
     * @returns { String }
    */
    get name() {
        return Property.get({ name: null }, String, Dog);
    }
    /**
     * @param { String } value
    */
    set name(value) {
        Property.set({ name: value }, String, Dog);
    }
    /**
     * @returns { Number }
    */
    get age() {
        return Property.get({ age: null }, Number, Dog);
    }
    /**
     * @param { Number } value
    */
    set age(value) {
        Property.set({ age: value }, Number, Dog);
    }
    /**
     * @returns { Number }
    */
    get weight() {
        return Property.get({ weight: null }, Number, Dog);
    }
    /**
     * @param { Number } value
    */
    set weight(value) {
        Property.set({ weight: value }, Number, Dog);
    }
    /**
     * @returns { Food }
    */
    get food() {
        return Property.get({ food: null }, Food, Dog);
    }
    /**
     * @param { Food } value
    */
    set food(value) {
        Property.set({ food: value }, Food, Dog);
    }
    /**
     * @param { Number } meters
    */
    walk(meters) {

    }
    /**
     * @returns { Boolean }
    */
    isExhausted() {

    }
}