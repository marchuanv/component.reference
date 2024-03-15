import { Reference, ReferenceOptions } from '../registry.mjs';
import { Animal, Dog, Food } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when constructing a ${Dog.name} reference given default reference options`, () => {
        it('should have equality and return different reference data', () => {
            try {
                const dogA = new Dog();
                const dogB = new Dog();

                dogA.set({ message: 'different reference data' });
                dogB.set({ message: 'different reference data' });

                expect(dogA).toBeDefined();
                expect(dogA).not.toBeNull();
                expect(dogA).toBeInstanceOf(Reference);
                expect(dogA.targetClass).toBeDefined();
                expect(dogA.targetClass).not.toBeNull();
                expect(dogA.targetClass).toBe(Dog);
                expect(dogA.Id).toBeDefined();
                expect(dogA.Id).not.toBeNull();

                expect(dogB).toBeDefined();
                expect(dogB).not.toBeNull();
                expect(dogB).toBeInstanceOf(Reference);
                expect(dogB.targetClass).toBeDefined();
                expect(dogB.targetClass).not.toBeNull();
                expect(dogB.targetClass).toBe(Dog);
                expect(dogB.Id).toBeDefined();
                expect(dogB.Id).not.toBeNull();

                expect(dogA.Id).not.toBe(dogB.Id);
                expect(dogA).not.toBe(dogB);

                const data1 = dogA.get();
                const data2 = dogB.get();

                expect(data1).toBeDefined();
                expect(data1).not.toBeNull();

                expect(data2).toBeDefined();
                expect(data2).not.toBeNull();

                expect(data1).not.toBe(data2);
            } catch (error) {
                console.log(error);
                fail('did not expect any errors.');
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given singleton reference options`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const refOptions = new ReferenceOptions();
                refOptions.isSingleton = true;

                const dogA = new Dog(refOptions);
                const dogB = new Dog(refOptions);

                dogA.set({ message: 'same reference data' });

                expect(dogA).toBeDefined();
                expect(dogA).not.toBeNull();
                expect(dogA).toBeInstanceOf(Reference);
                expect(dogA.targetClass).toBeDefined();
                expect(dogA.targetClass).not.toBeNull();
                expect(dogA.targetClass).toBe(Dog);
                expect(dogA.Id).toBeDefined();
                expect(dogA.Id).not.toBeNull();

                expect(dogB).toBeDefined();
                expect(dogB).not.toBeNull();
                expect(dogB).toBeInstanceOf(Reference);
                expect(dogB.targetClass).toBeDefined();
                expect(dogB.targetClass).not.toBeNull();
                expect(dogB.targetClass).toBe(Dog);
                expect(dogB.Id).toBeDefined();
                expect(dogB.Id).not.toBeNull();

                expect(dogA.Id).toBe(dogB.Id);
                expect(dogA).toBe(dogB);

                const data1 = dogA.get();
                const data2 = dogB.get();

                expect(data1).toBeDefined();
                expect(data1).not.toBeNull();

                expect(data2).toBeDefined();
                expect(data2).not.toBeNull();

                expect(data1).toBe(data2);
            } catch (error) {
                console.log(error);
                fail('did not expect any errors.');
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${Animal.name} target class and a singleton reference options`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const refOptions = new ReferenceOptions();
                refOptions.targetClass = Animal;
                refOptions.isSingleton = true;

                const dogA = new Dog(refOptions);
                const dogB = new Dog(refOptions);

                dogA.set({ message: 'same reference data' });

                expect(dogA).toBeDefined();
                expect(dogA).not.toBeNull();
                expect(dogA).toBeInstanceOf(Reference);
                expect(dogA.targetClass).toBeDefined();
                expect(dogA.targetClass).not.toBeNull();
                expect(dogA.targetClass).toBe(Animal);
                expect(dogA.Id).toBeDefined();
                expect(dogA.Id).not.toBeNull();

                expect(dogB).toBeDefined();
                expect(dogB).not.toBeNull();
                expect(dogB).toBeInstanceOf(Reference);
                expect(dogB.targetClass).toBeDefined();
                expect(dogB.targetClass).not.toBeNull();
                expect(dogB.targetClass).toBe(Animal);
                expect(dogB.Id).toBeDefined();
                expect(dogB.Id).not.toBeNull();

                expect(dogA.Id).toBe(dogB.Id);
                expect(dogA).toBe(dogB);

                const data1 = dogA.get();
                const data2 = dogB.get();

                expect(data1).toBeDefined();
                expect(data1).not.toBeNull();

                expect(data2).toBeDefined();
                expect(data2).not.toBeNull();

                expect(data1).toBe(data2);
            } catch (error) {
                console.log(error);
                fail('did not expect any errors.');
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${Food.name} target class`, () => {
        it('should raise an error', () => {
            try {
                const refOptions = new ReferenceOptions();
                refOptions.targetClass = Food;
                refOptions.isSingleton = true;
                new Dog(refOptions);
                fail('expected an error');
            } catch (error) {
                console.log(error);
                expect(error.message).toBe(`option: targetClass does not extend the Reference class.`);
            }
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
            expect(error.message).toBe(`option: targetClass does not extend the Reference class.`);
        });
    });
});