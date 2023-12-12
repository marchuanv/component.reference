import { Type, randomUUID } from "../../registry.mjs";
export class PrimitiveType extends Type {
    /**
     * @param { String } name
     * @param { String } Id
     * @param { Object } nativeType
    */
    constructor(name, Id, nativeType) {
        if (nativeType === String) {
            super(name, Id, String, '');
        } else if (nativeType === Number) {
            super(name, Id, Number, 0);
        } else if (nativeType === Boolean) {
            super(name, Id, Boolean, false);
        } else if (nativeType === BigInt) {
            super(name, Id, BigInt, 0);
        } else {
            throw new Error('nativeType is not a primitive data type');
        }
    }
    /**
     * @returns { PrimitiveType }
    */
    static get String() {
        return string;
    }
    /**
     * @returns { PrimitiveType }
    */
    static get Number() {
        return number;
    }
    /**
     * @returns { PrimitiveType }
    */
    static get Boolean() {
        return boolean;
    }
    /**
     * @returns { PrimitiveType }
    */
    static get BigInt() {
        return bigInt;
    }
}

const stringId = randomUUID();
const string = new PrimitiveType('string', stringId, String);

const numberId = randomUUID();
const number = new PrimitiveType('number', numberId, Number);

const booleanId = randomUUID();
const boolean = new PrimitiveType('boolean', booleanId, Boolean);

const bigIntId = randomUUID();
const bigInt = new PrimitiveType('number', bigIntId, BigInt);