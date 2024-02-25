import { RefId, Reference } from '../registry.mjs';
import { Animal, Dog } from './index.mjs';
class AnimalReference extends Reference {}
describe('Reference Specifiction Test: ', () => {
    describe(`when creating references for the ${Dog.name} instance given a target object and refId`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        let refId = null;
        beforeAll(() => {
            refId = new RefId();
            const dog = new Dog();
            animalRef1 = new AnimalReference(dog, refId);
            animalRef2 = new AnimalReference(dog, refId);
        });
        it('should have equality', () => {
            const animal1 = animalRef1.instance(refId);
            const animal2 = animalRef2.instance(refId);
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given the same target class and reference Id`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        let refId = null;
        beforeAll(() => {
            refId = new RefId();
            animalRef1 = new AnimalReference(Animal, refId);
            animalRef2 = new AnimalReference(Animal, refId);
        });
        it('should have equality when constructing', () => {
            const animal1 = animalRef1.instance(refId);
            const animal2 = animalRef2.instance(refId);
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} class given the same target class but different reference Id's`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        let refId1 = null;
        let refId2 = null;
        beforeAll(() => {
            refId1 = new RefId();
            animalRef1 = new AnimalReference(Animal, refId1);
            refId2 = new RefId();
            animalRef2 = new AnimalReference(Animal, refId2);
        });
        it('should not have equality when constructing', () => {
            const animal1 = animalRef1.instance(refId1);
            const animal2 = animalRef2.instance(refId2);
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).not.toBe(animal2);
        });
    });
    describe(`when creating references for the ${Animal.name} and ${Dog.name} classes given different target classes but the same refId`, () => {
        let animalRef1 = null;
        let animalRef2 = null;
        let refId = null;
        beforeAll(() => {
            refId = new RefId();
            animalRef1 = new AnimalReference(Animal, refId);
            animalRef2 = new AnimalReference(Dog, refId);
        });
        it('should not have equality', () => {
            const animal1 = animalRef1.instance(refId);
            const animal2 = animalRef2.instance(refId);
            expect(animal1).toBeDefined();
            expect(animal1).not.toBeNull();
            expect(animal1).toBeInstanceOf(Animal);
            expect(animal2).toBeDefined();
            expect(animal2).not.toBeNull();
            expect(animal2).toBeInstanceOf(Animal);
            expect(animal1).not.toBe(animal2);
        });
    });
    describe(`when getting an existing reference for the ${Animal.name} class given a target class and refId`, () => {
        let ref = null;
        let getRef = null;
        beforeAll(() => {
            const Class = Animal;
            const refId = new RefId();
            ref = new AnimalReference(Class, refId);
            getRef = Reference.get(Class, refId);
        });
        it('should return a reference', () => {
            expect(getRef).toBeDefined();
            expect(getRef).not.toBeNull();
            expect(getRef).toBeInstanceOf(Reference);
        });
        it('should be the same reference', () => {
            expect(ref).toBe(getRef);
        });
    });
    describe(`when checking if a reference exist for the ${Animal.name} class given a class and reference Id`, () => {
        let error = null;
        let Class = null;
        let refId = null;
        let exists = false;
        beforeAll(() => {
            Class = Animal;
            refId = new RefId();
            new AnimalReference(Animal, refId);
            refId = new RefId();
            exists = Reference.has(Animal, refId);
        });
        it('should return true', () => {
            expect(exists).toBeTrue();
        });
    });
    describe(`when getting a reference that does not exist for the ${Animal.name} class given a class and reference Id`, () => {
        let error = null;
        let Class = null;
        let refId = null;
        beforeAll(() => {
            try {
                Class = Animal;
                refId = new RefId();
                Reference.get(Animal, refId);
            } catch (err) {
                error = err;
            }
        });
        it('should raise an error', () => {
            expect(error).toBeDefined();
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(`reference not found for: ${JSON.stringify({ Class: Class.name, refId: refId.toString() })}`);
        });
    });
});