import { Reference, ReferenceOptions } from '../registry.mjs';
import { Animal, Dog } from './index.mjs';
describe('Reference Specifiction Test: ', () => {
    describe(`when creating ${Dog.name} references given default reference options`, () => {
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
    });
    describe(`when creating ${Dog.name} references given singleton reference options`, () => {
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
    });
});