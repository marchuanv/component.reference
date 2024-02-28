let isSingleton = false;
export class ReferenceOptions {
    /**
     * @returns { Boolean }
    */
     get isSingleton() {
        return isSingleton;
    }
    /**
     * @param { Boolean } value
    */
     set isSingleton(value) {
        isSingleton = value;
    }
}