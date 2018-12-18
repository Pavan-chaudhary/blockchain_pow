
const sha256 = require('sha256');
const currentNodrUrl = process.argv[3];
function Blockchain(){
    this.chain = [];
    this.pendingTransactions = []; //This is known as a constructor function
    
    this.currentNodrUrl = currentNodrUrl;
    this.networkNodes = [];

    this.createNewBlock(242,'0','0');
}


Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash) //Used to assign a common variable,function to all blocks of Blockchain
{
  const newBlock={
     index:this.chain.length+1,
     timestamp:Date.now(),
     transactions:this.pendingTransactions,
     nonce:nonce,
     hash:hash,
     previousBlockHash:previousBlockHash
  };
 
  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
	return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction = function(amount,sender,recipient){
	const newTransaction ={
		amount:amount,
		sender:sender,
		recipient:recipient
	};
	this.pendingTransactions.push(newTransaction);

	return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce){
   const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
   const hash = sha256(dataAsString);
   return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
	 "use strict";
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce); 
	while(hash.substring(0,4) !== '0000'){
     nonce++;
     hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
	}
	return nonce;
}
module.exports = Blockchain;