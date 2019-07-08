## Installation
``` shell
    npm i bit-array-buffer
```
## JavaScript Bit Array Library with ArrayBuffer

This library contains a JavaScript implementation of bit arrays. The library supports:

* create by arrayBuffer and init by unit8Array
* getting and setting

The bit array is continuous. The following example shows how to set and get individual bits within the array:
``` typescript
    /* typescript */
    import {BIT, BitArray} from 'bit-array-buffer';

    a = new BitArray(32);
    a.set(0, BIT.ON);
    a.set(31, BIT.OFF);
```
``` javascript
    /* javascript */
    import BitArray from 'bit-array-buffer';
    a = new BitArray(32);
    a.set(0, 1;
    a.set(31, 0);
```

