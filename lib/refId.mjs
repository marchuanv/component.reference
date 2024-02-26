import { GUID } from '../registry.mjs';
export class RefId extends GUID {
   /**
    * Constructs a new RefId.
    * @param { Object } metadata - Metadata object.
    * @returns { RefId } - A new RefId instance.
   */
   constructor(metadata = null) {
      super(metadata);
   }
}