import { GUID, Reference } from '../registry.mjs';
import { Animal, Dog } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when creating references for the same instance of the ${Animal.name} class given the same namespace and reference Id's`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            const refId = new GUID({ name: 'dog' });
            const dog = new Dog();
            animalRef1 = new Reference('animal', dog, refId);
            animalRef2 = new Reference('animal', dog, refId);
        });
        it('should have equality', () => {
            const animal1 = animalRef1.get();
            const animal2 = animalRef2.get();
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given the same namespace and reference Id's`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            const refId = new GUID({ name: 'dog' });
            animalRef1 = new Reference('animal', Animal, refId);
            animalRef2 = new Reference('animal', Animal, refId);
        });
        it('should have equality when constructing', () => {
            const animal1 = animalRef1.get();
            const animal2 = animalRef2.get();
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given the same namespace but different reference Id's`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            const refId1 = new GUID({ name: 'dog1' });
            animalRef1 = new Reference('animal', Animal, refId1);
            const refId2 = new GUID({ name: 'dog2' });
            animalRef2 = new Reference('animal', Animal, refId2);
        });
        it('should not have equality when constructing', () => {
            const animal1 = animalRef1.get();
            const animal2 = animalRef2.get();

            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);

            expect(animal1).not.toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given different namespaces but the same reference Id's`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        beforeAll(() => {
            const refId = new GUID({ name: 'dog' });
            animalRef1 = new Reference('animal.cat', Animal, refId);
            animalRef2 = new Reference('animal.dog', Animal, refId);
        });
        it('should not have equality', () => {
            const animal1 = animalRef1.get();
            const animal2 = animalRef2.get();

            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);

            expect(animal1).not.toBe(animal2);
        });
    });
    describe(`when getting an existing reference for the ${Animal.name} class given a namespace, Class and reference Id`, () => {
        let ref = null;
        beforeAll(() => {
            const namespace = 'animal.cat';
            const Class = Animal;
            const refId = new GUID({ name: 'cat1' });
            new Reference(namespace, Class, refId);
            ref = Reference.get(namespace, Class, refId);
        });
        it('should return a reference', () => {
            expect(ref).toBeDefined();
            expect(ref).not.toBeNull();
            expect(ref).toBeInstanceOf(Reference);
        });
    });
    describe(`when getting a reference that does not exist for the ${Animal.name} class given a namespace, Class and reference Id`, () => {
        let error = null;
        let namespace = null;
        let Class = null;
        let refId = null;
        beforeAll(() => {
            namespace = 'animal.cat';
            Class = Animal;
            refId = new GUID({ name: 'cat1' });
            new Reference(namespace, Animal, refId);
            try {
                refId = new GUID({ name: 'cat2' });
                Reference.get(namespace, Animal, refId);
            } catch (err) {
                error = err;
            }
        });
        it('should raise an error', () => {
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(`reference not found for: ${JSON.stringify({ namespace, Class: Class.name, refId: refId.toString() })}`);
        });
    });
});