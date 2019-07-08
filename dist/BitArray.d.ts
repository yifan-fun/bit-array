export declare const enum BIT {
    ON = 1,
    OFF = 0
}
export declare class BitArray {
    readonly buffer: ArrayBuffer;
    private byteArray;
    readonly length: number;
    constructor(bitLength: number);
    private validateIndex;
    get(index: number): BIT;
    set(index: number, value: BIT): void;
}
export default BitArray;
