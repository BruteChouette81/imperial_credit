const fs = require('fs');
const Web3 = require('web3')

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
//run an ethereum node on localhost try to connect to one 

// test deploy
(async () => {
    try {
        console.log('Running deployWithWeb3 script...')
        
        const contractName = 'credit' // Change this for other contract
        const constructorArgs = []    // Put constructor args (if any) here for your contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        fs.readFile(`../bin/${contractName}.json`, 'utf8', (err, data) => {

            if (err) {
                console.log(`Error reading file from disk: ${err}`);
            } else {

                // parse JSON string to JSON object
                var metadata = JSON.parse(data);
            }
        });

        //get current browser account
        const accounts = await web3.eth.getAccounts()
        console.log("account" + accounts[0]) //my eth account 
            
        let contract = new web3.eth.Contract(metadata.abi)//  const contractInstance = web3.eth.contract(abi).at(contractAddress);
            
        contract = contract.deploy({
            data: metadata.data.bytecode.object,
            arguments: constructorArgs   
        })
            
        const newContractInstance = await contract.send({
            from: accounts[0],
            gas: 1500000,
            gasPrice: '30000000000'
        })
        console.log('Contract deployed at address: ', newContractInstance.options.address)


        newContractInstance.methods.totalSupply().call({from: accounts[0]}, function(error, result){ 
            if (error) {
                console.log(error);
            }
            else {
                console.log("Results: ", result);
            }
        });


    } catch (e) {
        console.log(e.message)
        console.log("error message")
    }
  })()