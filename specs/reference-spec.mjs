import { GUID, Reference } from '../registry.mjs';
import { Animal } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when create a reference for the ${Animal.mane} class`, () => {
        let animalRef = null;
        beforeAll(() => {
            animalRef = new Reference('animal', Animal);
        });
        it(`should have equality when constructing references of the same ${Animal.name} class`, () => {
            const animal1 = animalRef.construct(new GUID({ name: 'dog' }));
            const animal2 = animalRef.construct(new GUID({ name: 'dog' }));

            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);

            expect(animal1).toBe(animal2);
        });
        it(`should not have equality when constructing references of the same ${Animal.name} class`, () => {
            const animal1 = animalRef.construct(new GUID({ name: 'dog1' }));
            const animal2 = animalRef.construct(new GUID({ name: 'dog2' }));

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