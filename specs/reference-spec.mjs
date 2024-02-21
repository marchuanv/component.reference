import { Reference } from '../registry.mjs';
import { Animal } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when creating references for the ${Animal.name} class given the same namespace and reference names`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            animalRef1 = new Reference('animal', Animal, 'dog');
            animalRef2 = new Reference('animal', Animal, 'dog');
        });
        it('should have equality when constructing', () => {
            const animal1 = animalRef1.construct();
            const animal2 = animalRef2.construct();
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given the same namespace but different reference names`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            animalRef1 = new Reference('animal', Animal, 'dog1');
            animalRef2 = new Reference('animal', Animal, 'dog2');
        });
        it('should not have equality when constructing', () => {
            const animal1 = animalRef1.construct();
            const animal2 = animalRef2.construct();

            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);

            expect(animal1).not.toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given different namespaces but the same reference names`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            animalRef1 = new Reference('animal.cat', Animal, 'dog');
            animalRef2 = new Reference('animal.dog', Animal, 'dog');
        });
        it('should not have equality', () => {
            const animal1 = animalRef1.construct();
            const animal2 = animalRef2.construct();

            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);

            expect(animal1).not.toBe(animal2);
        });
    });
});