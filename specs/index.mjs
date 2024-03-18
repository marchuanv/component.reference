import { Specs } from '../registry.mjs';
export { Property } from './classes/property.mjs';
export { Animal } from './classes/animal.mjs';
export { Dog } from './classes/dog.mjs';
export { Food } from './classes/food.mjs';
export { NonReferenceClass } from './classes/non-reference-class.mjs';
const specs = new Specs(60000, './');
specs.run();
