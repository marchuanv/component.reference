import { Type, Reference, ReferenceContext, ReferenceId, TypeRegister, ReferenceStack, Store } from '../registry.mjs';
import { Animal, Dog, Food, NonReferenceClass } from './index.mjs';
class TestTypeRegistry extends TypeRegister {
     constructor(typeRegisterId, type) {
        new Type(type);
        super(typeRegisterId, type);
     }
}
const dogTypeRegister = new TestTypeRegistry(null, Dog);
const animalTypeRegister = new TestTypeRegistry(null, Animal);
const nonReferenceClassTypeRegister = new TestTypeRegistry(null, NonReferenceClass);
const foodTypeRegister = new TestTypeRegistry(null, Food);
const stringTypeRegister = new TestTypeRegistry(null, String);
describe('Reference Specifiction Test: ', () => {
    describe(`when constructing a ${Dog.name} reference given default reference context`, () => {
        it('should have equality and return different reference data', () => {
            try {
                const contextA = new ReferenceContext(dogTypeRegister);
                const contextB = new ReferenceContext(dogTypeRegister);

                const dogA = new Dog(contextA);
                const dogB = new Dog(contextB);

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
    describe(`when constructing a ${Dog.name} and ${Food} reference given default reference context`, () => {
        it('should be able to build a reference from the reference stack', () => {
            try {
                const dogContextRefId = new ReferenceId();
                const foodContextRefId = new ReferenceId();
                const dogContext = new ReferenceContext(dogTypeRegister, false, dogContextRefId);
                const foodContext = new ReferenceContext(foodTypeRegister, false, foodContextRefId);
                const origDog = new Dog(dogContext);
                const origFood = new Food(foodContext);
                const referenceStack = new ReferenceStack();
                {
                    let { typeRegId } = referenceStack.get(Dog);
                    const refContext = new ReferenceContext(new TestTypeRegistry(typeRegId), false, dogContextRefId);
                    const dog = new Dog(refContext);
                    expect(origDog).toBe(dog);
                }
                {
                    let { typeRegId } = referenceStack.get(Food);
                    const refContext = new ReferenceContext(new TestTypeRegistry(typeRegId), false, foodContextRefId);
                    const food = new Food(refContext);
                    expect(origFood).toBe(food);
                }
            } catch (error) {
                console.log(error);
                fail('did not expect any errors.');
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given a singleton reference context`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const refContext = new ReferenceContext(dogTypeRegister, true);

                const dogA = new Dog(refContext);
                const dogB = new Dog(refContext);

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
    describe(`when constructing a ${Dog.name} reference given a ${Animal.name} target class and a singleton reference context`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const refContext = new ReferenceContext(animalTypeRegister, true);

                const dogA = new Dog(refContext);
                const dogB = new Dog(refContext);

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
    describe(`when constructing a ${Dog.name} reference given a ${Dog.name} target in a non-singleton reference context and a reference Id`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const commonRefId = new ReferenceId();
                const refContextA = new ReferenceContext(animalTypeRegister, false, commonRefId);
                const refContextB = new ReferenceContext(animalTypeRegister, false, commonRefId);

                const dogA = new Dog(refContextA);
                const dogB = new Dog(refContextB);

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
    describe(`when constructing a primitive type given a ${String.name} target in a non-singleton reference context and a reference Id`, () => {
        it('should have equality and retrieve the same reference data', () => {
            try {
                const commonRefId = new ReferenceId();
                const refContextA = new ReferenceContext(stringTypeRegister, false, commonRefId);
                const refContextB = new ReferenceContext(stringTypeRegister, false, commonRefId);

                const dogA = new Dog(refContextA);
                const dogB = new Dog(refContextB);

                dogA.set({ message: 'same reference data' });

                expect(dogA).toBeDefined();
                expect(dogA).not.toBeNull();
                expect(dogA).toBeInstanceOf(Reference);
                expect(dogA.targetClass).toBeDefined();
                expect(dogA.targetClass).not.toBeNull();
                expect(dogA.targetClass).toBe(String);
                expect(dogA.Id).toBeDefined();
                expect(dogA.Id).not.toBeNull();

                expect(dogB).toBeDefined();
                expect(dogB).not.toBeNull();
                expect(dogB).toBeInstanceOf(Reference);
                expect(dogB.targetClass).toBeDefined();
                expect(dogB.targetClass).not.toBeNull();
                expect(dogB.targetClass).toBe(String);
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
    describe(`when constructing a ${Dog.name} reference given a ${Food.name} reference class in the reference context`, () => {
        it('should not raise an error', () => {
            try {
                new Dog(new ReferenceContext(foodTypeRegister));
            } catch (error) {
                console.log(error);
                fail('did not expect any errors.');
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given a ${NonReferenceClass.name}  target class in the reference context`, () => {
        it('should raise an error', () => {
            try {
                new Dog(new ReferenceContext(nonReferenceClassTypeRegister));
                fail('expected an error');
            } catch (error) {
                console.log(error);
                expect(error.message).toBe(`${NonReferenceClass.name} does not extend the ${Reference.name} class.`);
            }
        });
    });
    describe(`when constructing a ${Dog.name} reference given the target class is not a class in the reference context`, () => {
        let error = null;
        beforeAll(() => {
            try {
                new Dog(new ReferenceContext({}));
            } catch (err) {
                error = err;
            }
        });
        it('should raise an error', () => {
            expect(error.message).toBe('The typeRegister argument is null, undefined or not a TypeRegister type.');
        });
    });
});