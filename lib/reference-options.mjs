import { TypeOptions } from '../registry.mjs';
let typeOptions = new TypeOptions();
export class ReferenceOptions {
    /**
     * @returns { TypeOptions }
    */
    get typeOptions() {
        return typeOptions;
    }
}