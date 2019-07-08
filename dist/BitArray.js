"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _debug = require("debug");
const debug = _debug(`my-app:bit-array`);
const BYTE_LENGTH = 8;
class BitArray {
    constructor(bitLength) {
        this.length = bitLength;
        debug(`creating bit array length: ${bitLength}`);
        try {
            this.buffer = new ArrayBuffer(Math.ceil(bitLength / BYTE_LENGTH));
            debug(`creating bit array arrayBuffer byteLength: ${this.buffer.byteLength}`);
        }
        catch (e) {
            throw new Error("malloc buffer fail.");
        }
        try {
            this.byteArray = new Uint8Array(this.buffer);
            debug(`creating bit array unit8Array length: ${this.byteArray.length}`);
        }
        catch (e) {
            throw new Error("convert buffer to unit8array fail. May be an array too large, or it may be out of memory.");
        }
    }
    validateIndex(index) {
        if (!Number.isInteger(index)) {
            throw new Error("bit array index must be integer");
        }
        else if (index < 0) {
            throw new Error("bit array index must >= 0");
        }
        else if (index >= this.length) {
            throw new Error("bit array index out of length range");
        }
    }
    get(index) {
        this.validateIndex(index);
        let offset = Math.floor(index / BYTE_LENGTH);
        let byteIndex = index % BYTE_LENGTH;
        let bit = (this.byteArray[offset] >> byteIndex) & 1 /* ON */;
        debug(`get bit array index: ${index}, value: ${bit}`);
        return bit;
    }
    set(index, value) {
        this.validateIndex(index);
        let offset = Math.floor(index / BYTE_LENGTH);
        let byteIndex = index % BYTE_LENGTH;
        if (value === 1 /* ON */) {
            this.byteArray[offset] |= (1 /* ON */ << byteIndex);
        }
        else {
            this.byteArray[offset] &= (~(1 /* ON */ << byteIndex));
        }
        debug(`set bit array index: ${index}, value: ${value}`);
    }
}
exports.BitArray = BitArray;
exports.default = BitArray;
