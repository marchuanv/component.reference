import { Reference, ReferenceOptions } from '../registry.mjs';
import { Animal, Dog, Food } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when constructing a ${Dog.name} reference given default reference options`, () => {
        let dogA = null;
        let dogB = null;
        beforeAll(() => {
            dogA = new Dog();
            dogB = new Dog();
        });
        it('should have equality', () => {
            expect(dogA).toBeDefined();
            expect(dogA).not.toBeNull();
            expect(dogA).toBeInstanceOf(Reference);
            expect(dogB).toBeDefined();
            expect(dogB).not.toBeNull();
            expect(dogB).toBeInstanceOf(Reference);
            expect(dogA).not.toBe(dogB);
        });
        it('should get different references', () => {
            const instanceA = dogA.get(Dog);
            const instanceB = dogB.get(Dog);
            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA).toBeInstanceOf(Dog);
            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB).toBeInstanceOf(Dog);
            expect(instanceA).not.toBe(instanceB);
        });
    });
    describe(`when constructing a ${Dog.name} reference given singleton reference options`, () => {
        let dogA = null;
        let dogB = null;
        beforeAll(() => {
            const refOptions = new ReferenceOptions();
            refOptions.isSingleton = true;
            dogA = new Dog(refOptions);
            dogB = new Dog(refOptions);
        });
        it('should have equality', () => {
            expect(dogA).toBeDefined();
            expect(dogA).not.toBeNull();
            expect(dogA).toBeInstanceOf(Reference);
            expect(dogB).toBeDefined();
            expect(dogB).not.toBeNull();
            expect(dogB).toBeInstanceOf(Reference);
            expect(dogA).toBe(dogB);
        });
        it('should get the same reference', () => {
            const instanceA = dogA.get(Dog);
            const instanceB = dogB.get(Dog);
            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA).toBeInstanceOf(Dog);
            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB).toBeInstanceOf(Dog);
            expect(instanceA).toBe(instanceB);
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${Animal.name} target class and a singleton reference options`, () => {
        let dogA = null;
        let dogB = null;
        beforeAll(() => {
            const refOptions = new ReferenceOptions();
            refOptions.targetClass = Animal;
            refOptions.isSingleton = true;
            dogA = new Dog(refOptions);
            dogB = new Dog(refOptions);
        });
        it('should get the same reference', () => {
            const instanceA = dogA.get(Dog);
            const instanceB = dogB.get(Dog);
            expect(instanceA).toBeDefined();
            expect(instanceA).not.toBeNull();
            expect(instanceA).toBeInstanceOf(Dog);
            expect(instanceB).toBeDefined();
            expect(instanceB).not.toBeNull();
            expect(instanceB).toBeInstanceOf(Dog);
            expect(instanceA).toBe(instanceB);
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