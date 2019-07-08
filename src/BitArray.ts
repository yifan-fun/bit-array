import * as _debug from 'debug'
const debug = _debug(`my-app:bit-array`)

export const enum BIT {
    ON = 0b1,
    OFF = 0b0
}
const BYTE_LENGTH = 8;

export class BitArray {
    readonly buffer: ArrayBuffer;
    private byteArray: Uint8Array;
    readonly length: number;

    constructor(bitLength: number) {
        this.length = bitLength;
        debug(`creating bit array length: ${bitLength}`);
        try {
            this.buffer = new ArrayBuffer(Math.ceil(bitLength / BYTE_LENGTH));
            debug(`creating bit array arrayBuffer byteLength: ${this.buffer.byteLength}`);
        } catch(e) {
            throw new Error("malloc buffer fail.");
        }

        try {
            this.byteArray = new Uint8Array(this.buffer)
            debug(`creating bit array unit8Array length: ${this.byteArray.length}`);
        } catch(e) {
            throw new Error("convert buffer to unit8array fail. May be an array too large, or it may be out of memory.");
        }
    }

    private validateIndex(index: number) {
        if (!Number.isInteger(index)){
            throw new TypeError("bit array index must be integer");
        } else if (index < 0) {
            throw new RangeError("bit array index must >= 0");
        } else if (index >= this.length) {
            throw new RangeError("bit array index out of length range");
        }
    }

    get(index: number): BIT {
        this.validateIndex(index);

        let offset = Math.floor(index / BYTE_LENGTH);
        let byteIndex = index % BYTE_LENGTH;

        let bit: BIT = (this.byteArray[offset] >> byteIndex) & BIT.ON

        debug(`get bit array index: ${index}, value: ${bit}`);
        return bit;
    }

    set(index: number, value: BIT) {
        this.validateIndex(index);

        let offset = Math.floor(index / BYTE_LENGTH);
        let byteIndex = index % BYTE_LENGTH;

        debug(`set bit array index: ${index}, value: ${value}`);
        if (value === BIT.ON) {
            this.byteArray[offset] |= (BIT.ON << byteIndex);
        } else if (value === BIT.OFF) {
            this.byteArray[offset] &= (~ (BIT.ON << byteIndex));
        } else {
            throw new RangeError('bit array set value must be number 0 or 1')
        }
    }
}

export default BitArray;
