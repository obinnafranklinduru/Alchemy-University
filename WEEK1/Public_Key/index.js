const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

function hashMessage(message){
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

function signMessage(message){
    const message = hashMessage(message);
    return secp.sign(message, PRIVATE_KEY, {recovered: true});
}

function recoveryKey(message, signature, recoveryBit){
    const message = hashMessage(message);
    return secp.recoverPublicKey(message, signature, recoveryBit);
}

function getAddress(publicKey) {
    const key = publicKey.slice(1);
    const hashKey = keccak256(key);
    const address = hashKey.slice(-20);
    return address
}

module.exports = {
    getAddress,
    recoveryKey,
    signMessage, 
};