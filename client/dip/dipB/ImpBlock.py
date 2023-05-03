# Python program to create Blockchain

### Devs: not a transfer coin, because we can easily make one in solidity (exept if you just want to separate). This blockchain should be able to track fiat currency transfer and validate them
#for example: users transfer funds with their respective Visa or mastercard api already setup in the app. These transactions are verify and then nfts are transfer using the iet.sol oracle

# For timestamp
import datetime
 
# Calculating the hash
# in order to add digital
# fingerprints to the blocks
import hashlib
 
# To store data
# in our blockchain
import json
 
# Flask is for creating the web
# app and jsonify is for
# displaying the blockchain
from flask import Flask, jsonify
 
 
class Blockchain:
 
    # This function is created
    # to create the very first
    # block and set its hash to "0"
    def __init__(self):
        self.chain = []
        self.create_block(proof=1, previous_hash='0')
 
    # This function is created
    # to add further blocks
    # into the chain


    # the blocks are use to store transactions that are verified
    # the proof statement will be replace by an id of confirmation containing the pseudonym of the sender and the receiver 
    # it will also be public to see how the transaction is validate and in what currency
    # method of validation can be added as features. 
    # method needed: crypto is automatically verificated with the $credits. Direct Fiat currency transfer will be 
    # validate using our visa and mastercard tracker which will emit a different proof than crypto on the chain
    def create_block(self, proof, previous_hash):
        block = {'index': len(self.chain) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'previous_hash': previous_hash}
        self.chain.append(block)
        return block
 
    # This function is created
    # to display the previous block
    def print_previous_block(self):
        return self.chain[-1]
 
    # This is the function for proof of work
    # and used to successfully mine the block
    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
 
        while check_proof is False:
            hash_operation = hashlib.sha256(
                str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:5] == '00000':
                check_proof = True
            else:
                new_proof += 1
 
        return new_proof
    
    #proof of transaction // replacement to proof of work in the DIP
    def proof_of_transaction(self):
        # while mining, miner give their compute power in order to validate transactions
        # so, to set checkproof to True, all the transactions must be validated using one of our methods
        # methods can incorport visa transfert, master card transfer, bank transfer, a transfer coin for crypto, ethereum and bitcoin. As long as it can be validated and create a new proof 
        # using a imperial approoved proof protocol. Then information is comunicated to the smart contract using oracle and/or transfer coin
        pass
 
    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()
 
    def chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
 
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != self.hash(previous_block):
                return False
 
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(
                str(proof**2 - previous_proof**2).encode()).hexdigest()
 
            if hash_operation[:5] != '00000':
                return False
            previous_block = block
            block_index += 1
 
        return True
 
 
# Creating the Web
# App using flask
app = Flask(__name__)
 
# Create the object
# of the class blockchain
blockchain = Blockchain()
 
###verify an order using tracking money transfer

#validate using api
def validate_transaction():
    pass

def get_transaction_state(block_number):
    #return jsonify res of a certain block
    pass

# Mining a new block ==> create a new order

#proof of work replace with proof of transaction which validate the money transfer
 
@app.route('/mine_block', methods=['GET'])
def mine_block():
    previous_block = blockchain.print_previous_block()
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof, previous_hash)
 
    response = {'message': 'A block is MINED',
                'index': block['index'],
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash']}
 
    return jsonify(response), 200
 
# Display blockchain in json format
 
 
@app.route('/get_chain', methods=['GET'])
def display_chain():
    response = {'chain': blockchain.chain,
                'length': len(blockchain.chain)}
    return jsonify(response), 200
 
# Check validity of blockchain
 
 
@app.route('/valid', methods=['GET'])
def valid():
    valid = blockchain.chain_valid(blockchain.chain)
 
    if valid:
        response = {'message': 'The Blockchain is valid.'}
    else:
        response = {'message': 'The Blockchain is not valid.'}
    return jsonify(response), 200
 
 
# Run the flask server locally
app.run(host='127.0.0.1', port=5000)