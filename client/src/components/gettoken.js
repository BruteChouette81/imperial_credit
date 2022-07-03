const Moralis = require("moralis/node");

//https://admin.moralis.io/dapps/details/185461
const serverUrl = "https://a7p1zeaqvdrv.usemoralis.com:2053/server";
const appId = "N4rINlnVecuzRFow0ONUpOWeSXDQwuErGQYikyte";
const masterKey = "ctP77IRXmuuWvPaubv7OZVvMNk4M9lmbZoqX7heB";

async function web3API() {
    await Moralis.start({ serverUrl, appId,masterKey });
  
    const price = await Moralis.Web3API.token.getTokenPrice({
      address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      chain: "bsc",
    });
    console.log(price);
    return price;
};
  
price = web3API();