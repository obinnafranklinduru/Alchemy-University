const getAddress = require('./index');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");
const signMessage = require('./index');
const recover = require('./index');


describe('Recover Key', () => {
    it('should recover the public key from a signed message', async () => {
        const [sig, recoveryBit] = await signMessage('hello world');

        const publicKey = secp.getPublicKey(PRIVATE_KEY);

        const recovered = await recover('hello world', sig, recoveryBit);

        assert.equal(toHex(recovered), toHex(publicKey));
    });
});

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";

describe('Get Address', () => {
    it('should get the address from a public key', async () => {
        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        
        const address = toHex(getAddress(publicKey));

        assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
    });
});