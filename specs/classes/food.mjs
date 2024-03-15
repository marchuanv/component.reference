import { Reference } from '../../registry.mjs';
import {
    Property
} from '../index.mjs';
export class Food extends Reference {
    /**
     * @returns { String }
    */
    get name() {
        return Property.get({ name: null }, String);
    }
    /**
     * @param { String } value
    */
    set name(value) {
        Property.set({ name: value }, String);
    }
    /**
     * @returns { Boolean }
    */
    get isAdultFood() {
        return Property.get({ isAdultFood: null }, Boolean);
    }
    /**
     * @param { Boolean } value
    */
    set isAdultFood(value) {
        Property.set({ isAdultFood: value }, Boolean);
    }
}