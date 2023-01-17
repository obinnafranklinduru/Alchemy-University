const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const key = publicKey.slice(1);
    const hashKey = keccak256(key);
    const address = hashKey.slice(-20);
    return address
}

module.exports = getAddress;