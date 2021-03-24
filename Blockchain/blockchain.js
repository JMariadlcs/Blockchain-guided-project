const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, precedingHash = " ") {
    // TODO: Crear el constructor para el nuevo bloque
    	this.index = index;
    	this.timestamp = timestamp;
    	this.data = data;
    	this.precedingHash = precedingHash;
    	this.hash  = this.computeHash(); //To include unique hash
    	this.nonce = 0; //Will be used in proof of work method

  }

  computeHash() {

    // TODO: Creemos un hash
    return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class Blockchain {
  constructor() {
    // TODO: Crear el constructor para la nueva cadena.
    this.blockchain = [this.startGenesisBlock()]; //Each time the blockchain is initializated it will ad the genesesis block
    this.difficulty = 4; //difficulty level for our initial blockchain
  }

  startGenesisBlock() {
    return new Block(0, "24/03/2020", "Inicial Block by Jose Maria", "0");
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {

    // TODO: Agrega el nuevo bloque a la cadena
    newBlock.precedingHash = this.obtainLatestBlock().hash; //We obtain hash from latest block on our blockchain
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let newBlockchain = new Blockchain(); //We instanciate the blockchain 
newBlockchain.addNewBlock(new Block(1, "03/24/2021", {Message: "Second Block on chain"})); //We add a new created block to our blockchain

newBlockchain.addNewBlock(new Block(2, "03/24/2021", {Message: "Third Block on chain"})); //We add a new created block to our blockchain
  

console.log(JSON.stringify(newBlockchain, null, 4));

// TODO: Verificar si nuestra cadena es válida
console.log(newBlockchain.checkChainValidity());