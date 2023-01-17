const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.data = data;
    }
    
    toHash() {
        return SHA256(this.data + this.previousHash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [new Block()];
    }

    addBlock(block) {
        // block - a parameterized instance of the Block object
        // block: make a new key called "previousHash"
        // previousHash stores hash of the previous block. 
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }

    // isValid checks each block's previousHash field and making sure that 
    // it is equal to the hash of the block before it
    isValid() {
        for(let i = this.chain.length - 1; i > 0; i--) {
            const block = this.chain[i];
            const prev = this.chain[i - 1];
            if(block.previousHash.toString() !== prev.toHash().toString()) {
                return false;
            }
        }
        return true;
    }
}