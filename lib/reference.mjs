import { Namespace, ReferenceOptions } from '../registry.mjs';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
export class Reference extends Namespace {
    /**
     * holds a reference to inherited classes. i.e. singleton or new instance
     * @param { Object | class } target - The target class or object
     * @param { ReferenceOptions } options reference options
     * @returns { Reference }
    */
    constructor(target, options = new ReferenceOptions()) {
        if (new.target === Reference) {
            throw new Error(`${Reference.name} is an abstract class`);
        }
        if (options !== null && options !== undefined && !(options instanceof ReferenceOptions)) {
            throw new Error(`options argument is not of type ${ReferenceOptions.name}`);
        }
        if (target === null || target === undefined) {
            throw new Error(`The target argument is null or undefined.`);
        }
        let Class = null;
        if (typeof target === 'function' && target.prototype) {
            Class = target;
        } else if (typeof target === 'object' && target.constructor && target.constructor.toString().startsWith('class')) {
            Class = target.constructor;
        } else {
            throw new Error('target argument must be a class or an object');
        }
        let namespace = `${Reference.namespace}.${Class.name}`;
        const { isSingleton } = options;
        if (!isSingleton) {
            const uniqueName = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals]
            });
            namespace = `${namespace}.${uniqueName}`;
        }
        super(namespace);
        Object.freeze(this);
    }
    /**
     * @returns { String }
    */
    static get namespace() {
        return 'component.types';
    }
}