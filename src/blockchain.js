const CryptoJS = require("crypto-js");

class Block{
    constructor(index,hash,previousHash, timestamp, data){
        this.index=index;
        this.hash=hash;
        this.previousHash=previousHash;
        this.timestamp=timestamp;
        this.data=data;
    }
}

const genesisBlock =new Block(
    0,
    "FE07233409A171DC33DFED14F1068C9B165D5E6E1227C11B2BAA580E7AEDB4EA",
    null,
    1536951097992,
    "This is the genesis!!"
);

let blockchain =[genesisBlock]

const getLastBlock =() => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() /1000;

const createHash = (index, previousHash,timestamp,data) =>
    CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString();

const createNewBlock = data =>{
    const previousHash = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(
        newBlockIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );

    const newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );
    return newBlock;
};

const getblocksHash = (Block) => createHash(Block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock,latestBlock) =>{
    if(latestBlock.index +1 !== candidateBlock.index){
        console.log("The candidate block dosent have a valid index");
        return false;
    } else if(latestBlock.hash !== candidateBlock.previousHash){
        console.log("The previousHash of the candidate block is not the hash of the latest block");
        return false;
    } else if (getblocksHash(candidateBlock) !== candidateBlock.hash){
        console.log("The hash of this block is invalid");
        return false;
    }
    return true;
};

const isNewStructuredValid = block =>{
    return(
        typeof block.index ==="number" &&
        typeof block.hash ==="string" &&
        typeof block.previousHash ==="string" &&
        typeof block.timestamp ==="number" &&
        typeof block.data === "string"
    );
};
