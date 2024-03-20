import { Reference } from "../../registry.mjs";
export class Animal extends Reference {
    /**
     * @returns { Number }
    */
    get vaccinationYears() {
        return super.get({ vaccinationYears: value }, Number);
    }
}
