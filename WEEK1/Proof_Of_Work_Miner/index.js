const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // mempool is a place for miners to keep those transactions before adding them to a block.
    mempool.push(transaction);
}

function mine() {
    const transactions = [];
    // pull transactions off the mempool and include them in the block
    // in an array called transactions
    // MAX_TRANSACTIONS is a specific block size limit that cannot be exceeded
    while(transactions.length < MAX_TRANSACTIONS && mempool.length > 0){
        transactions.push(mempool.pop())
    }
    // id: create a new block with a unique identifier
    const block = { id: blocks.length, transactions}
    block.nonce = 0;
    let hash;
    while(true){
        hash = SHA256(JSON.stringify(block)).toString();
        if(BigInt(`0x${hash}`) < TARGET_DIFFICULTY){
            break;
        }
        block.nonce++;
    }
    blocks.push({ ...block, hash});
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};