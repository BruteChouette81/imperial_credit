


// test deploy
(async () => {
    try {
        console.log('Running deployWithWeb3 script...')
        
        const contractName = 'credit' // Change this for other contract
        const constructorArgs = []    // Put constructor args (if any) here for your contract
    
        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
        const artifactsPath = `../bin/${contractName}.json` // Change this for different path

        const metadata = JSON.parse(artifactsPath)
        //get current browser account
        const accounts = await web3.eth.getAccounts()
        console.log(accounts[0])
    
        let contract = new web3.eth.Contract(metadata.abi)
    
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
    }
  })()