import { Reference, ReferenceOptions } from '../registry.mjs';
import { Animal, Dog, Food } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when constructing a ${Dog.name} reference given default reference options`, () => {
        it('should have equality and return different references', () => {

            const dogA = new Dog();
            const dogB = new Dog();

            expect(dogA).toBeDefined();
            expect(dogA).not.toBeNull();
            expect(dogA).toBeInstanceOf(Reference);
            expect(dogB).toBeDefined();
            expect(dogB).not.toBeNull();
            expect(dogB).toBeInstanceOf(Reference);
            expect(dogA).not.toBe(dogB);

            const instanceA = dogA.get();
            const instanceB = dogB.get();

            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA.targetClass).toBe(Dog);
            expect(instanceA.Id).toBeDefined();
            expect(instanceA.Id).not.toBeNull();
            expect(instanceA.data).toBeDefined();
            expect(instanceA.data).not.toBeNull();

            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB.targetClass).toBe(Dog);
            expect(instanceB.Id).toBeDefined();
            expect(instanceB.Id).not.toBeNull();
            expect(instanceB.data).toBeDefined();
            expect(instanceB.data).not.toBeNull();

            expect(instanceA.Id).not.toBe(instanceB.Id);
        });
    });
    describe(`when constructing a ${Dog.name} reference given singleton reference options`, () => {
        it('should have equality and retrieve the same reference data', () => {

            const refOptions = new ReferenceOptions();
            refOptions.isSingleton = true;

            const dogA = new Dog(refOptions);
            const dogB = new Dog(refOptions);

            expect(dogA).toBeDefined();
            expect(dogA).not.toBeNull();
            expect(dogA).toBeInstanceOf(Reference);
            expect(dogB).toBeDefined();
            expect(dogB).not.toBeNull();
            expect(dogB).toBeInstanceOf(Reference);
            expect(dogA).toBe(dogB);

            const instanceA = dogA.get();
            const instanceB = dogB.get();

            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA.targetClass).toBe(Dog);
            expect(instanceA.Id).toBeDefined();
            expect(instanceA.Id).not.toBeNull();
            expect(instanceA.data).toBeDefined();
            expect(instanceA.data).not.toBeNull();

            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB.targetClass).toBe(Dog);
            expect(instanceB.Id).toBeDefined();
            expect(instanceB.Id).not.toBeNull();
            expect(instanceB.data).toBeDefined();
            expect(instanceB.data).not.toBeNull();

            expect(instanceA.Id).toBe(instanceB.Id);
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${Animal.name} target class and a singleton reference options`, () => {
        it('should have equality and retrieve the same reference data', () => {

            const refOptions = new ReferenceOptions();
            refOptions.targetClass = Animal;
            refOptions.isSingleton = true;

            const dogA = new Dog(refOptions);
            const dogB = new Dog(refOptions);

            expect(dogA).toBeDefined();
            expect(dogA).not.toBeNull();
            expect(dogA).toBeInstanceOf(Reference);
            expect(dogB).toBeDefined();
            expect(dogB).not.toBeNull();
            expect(dogB).toBeInstanceOf(Reference);
            expect(dogA).toBe(dogB);

            const instanceA = dogA.get();
            const instanceB = dogB.get();

            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA.targetClass).toBe(Animal);
            expect(instanceA.Id).toBeDefined();
            expect(instanceA.Id).not.toBeNull();
            expect(instanceA.data).toBeDefined();
            expect(instanceA.data).not.toBeNull();

            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB.targetClass).toBe(Animal);
            expect(instanceB.Id).toBeDefined();
            expect(instanceB.Id).not.toBeNull();
            expect(instanceB.data).toBeDefined();
            expect(instanceB.data).not.toBeNull();

            expect(instanceA.Id).toBe(instanceB.Id);
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${Food.name} target class`, () => {
        let error = null;
        beforeAll(() => {
            try {
                const refOptions = new ReferenceOptions();
                refOptions.targetClass = Food;
                refOptions.isSingleton = true;
                new Dog(refOptions);
            } catch (err) {
                error = err;
            }
        });
        it('should raise an error', () => {
            expect(error.message).toBe(`${Food.name} does not extend ${Dog.name}`);
        });
    });
    describe(`when constructing a ${Dog.name} reference given the target class is not a class`, () => {
        let error = null;
        beforeAll(() => {
            try {
                const refOptions = new ReferenceOptions();
                refOptions.targetClass = {};
                refOptions.isSingleton = true;
                new Dog(refOptions);
            } catch (err) {
                error = err;
            }
        });
        it('should raise an error', () => {
            expect(error.message).toBe(`options: targetClass is not a class`);
        });
    });
});