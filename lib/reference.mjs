import { GUID } from '../registry.mjs';
const referenceMap = new WeakMap();
/**
 * Represents a reference with a unique identifier and associated other references.
 * @class
 */
export class Reference {
    /**
     * Creates an instance of Reference.
     * @param { String } namespace - The namespace string for the reference.
     * @param { GUID|null } parentReferenceId - The ID of the parent reference. Defaults to null.
     * @throws { Error } Throws an error if parentReferenceId is not a GUID or null.
     */
    constructor(namespace, parentReferenceId = null) {
        Object.freeze(this);
        if (!namespace) {
            throw new Error('The namespace argument is null, undefined or empty.');
        }
        if (typeof namespace !== 'string') {
            throw new Error('The namespace argument is not a string.');
        }
        if (parentReferenceId !== null && !(parentReferenceId instanceof GUID)) {
            throw new Error('The parent reference ID must be a GUID or null.');
        }
        const Id = new GUID({ namespace });
        const found = Reference.find(namespace);
        if (found) {
            parentReferenceId = found.Id;
        }
        // Create the reference
        const referenceData = { Id, associatedReferenceIds: [], namespace };
        // Store the reference in the central map
        referenceMap.set(Id, referenceData);
        referenceMap.set(this, referenceData);
        if (parentReferenceId === null) {
            // If parentReferenceId is null, create the root reference
            if (!referenceMap.has(Reference)) {
                referenceMap.set(Reference, referenceData);
            }
            ({ Id: parentReferenceId } = referenceMap.get(Reference));
        } else {
            if (!referenceMap.has(parentReferenceId)) {
                throw new Error('Parent reference not found in the reference map.');
            }
        }
        // Associate with the parent reference bidirectionally if parentReferenceId is not null
        const parentReferenceData = referenceMap.get(parentReferenceId);
        parentReferenceData.associatedReferenceIds.push(Id);
        referenceData.associatedReferenceIds.push(parentReferenceData.Id);
    }
    /**
     * Gets the unique identifier of the reference.
     * @returns {GUID}
     */
    get Id() {
        const { Id } = referenceMap.get(this);
        return Id;
    }
    /**
     * Gets the namespace of the reference.
     * @returns {String}
     */
    get namespace() {
        const { namespace } = referenceMap.get(this);
        return namespace;
    }
    /**
     * Checks if the reference is associated with a given ID.
     * @param {GUID} id - The ID to check association with.
     * @returns {boolean} True if the reference is associated with the given ID, otherwise false.
     */
    isAssociatedWith(id) {
        const referenceData = referenceMap.get(this);
        return referenceData.associatedReferenceIds.some(guid => guid === id);
    }
    /**
     * Returns an iterator for iterating over all reference IDs, except the root reference ID.
     * @returns {Iterable<Reference>}
     */
    static *nextRef() {
        const visitedIds = new Set();
        const { Id } = referenceMap.get(Reference) || {};
        if (!visitedIds.has(Id)) {
            visitedIds.add(Id);
            const ref = referenceMap.get(Id);
            if (ref) {
                yield ref;
            }
        }
        if (Id) {
            const rootReferenceId = Id;
            const queue = [rootReferenceId]; // Start with root reference ID in the queue
            while (queue.length > 0) {
                const currentId = queue.shift();
                const currentReferenceData = referenceMap.get(currentId);
                if (currentReferenceData) {
                    for (const childId of currentReferenceData.associatedReferenceIds) {
                        if (!visitedIds.has(childId)) {
                            queue.push(childId);
                            visitedIds.add(childId);
                            if (childId !== rootReferenceId) {
                                const ref = referenceMap.get(childId);
                                if (ref) {
                                    yield ref;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Finds a reference based on a namespace using the nextRef iterator.
     * @param { String } namespace - The namespace to search for.
     * @returns {Reference|null} A reference that matches the provided namespace, or null if no match is found.
     */
    static find(namespace) {
        if (!namespace) { // If the namespace argument is empty, undefined or null
            return null;
        }
        if (typeof namespace !== 'string') { // If the namespace is not a string
            throw new Error('The namespace argument is not a string');
        }
        const expectedId = new GUID({ namespace });
        return Array.from(Reference.nextRef()).find(ref => ref.Id === expectedId);
    }
}