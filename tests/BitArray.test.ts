import {BitArray, BIT} from '../src/BitArray';

let bitArray = new BitArray(1024 * 1024 * 8 + 1) //1M + 1

describe('bit-array:create', () => {
    test('create normal bit array', () => {
        expect(bitArray.length).toBe(8388609);
        expect(bitArray.buffer.byteLength).toBe(1048577);
    })
})

describe('bit-array:function', () => {
    test('get value of bit array', () => {
        expect(bitArray.get(0)).toBe(0)
        expect(bitArray.get(4)).toBe(0)
        expect(bitArray.get(5)).toBe(0)
    })

    test('get value of bit array out of range', () => {
        expect(() => {
            bitArray.get(8388610)
        }).toThrow()
        expect(() => {
            bitArray.get(1.2)
        }).toThrow()
        expect(() => {
            bitArray.get(-11)
        }).toThrow()
    })

    test('set value of bit array', () => {
        bitArray.set(0, BIT.ON)
        expect(bitArray.get(0)).toBe(1)
        expect(bitArray.get(4)).toBe(0)
    })
})