let accounts = [];
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask"

function detectMetamaskInstalled(){
  try{
     ethereum.isMetaMask
  }
  catch(missingMetamask) {
     alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page!")
  }
}

detectMetamaskInstalled()

function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

function enableMetamaskOnMumbai() {
  getAccount();
  if(window.ethereum.networkVersion != 80001){
    alert("You are not on the Mumbai Testnet! Please switch to Mumbai (Chain ID 80001) and refresh page.")
  }
}

const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnMumbai()
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)
}

const web3 = new Web3(window.ethereum)
const contractAddress_JS = '0x9a1c81fFBD62beba2084C0c9738D07e4c8896eF3'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"servoStateChange","type":"event"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeServoGate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeInPenniesUSDinMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"reply","type":"uint256"}],"name":"fulfillUint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oneBlockPassedSinceOpened","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openServoGate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"servoState","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeOpened","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tollPennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uintAdapterCall","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

const chainlinkERC20MumbaiAddress_JS = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const chainlinkERC20MumbaiABI_JS =
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
const chainlinkERC20MumbaiAddressDefined_JS = new web3.eth.Contract(chainlinkERC20MumbaiABI_JS, chainlinkERC20MumbaiAddress_JS)

document.getElementById("contractAddressDOM").innerHTML = "Contract Address " + contractAddress_JS

function getLatestState() {

  contractDefined_JS.methods.servoState().call((err, servoStateResult) => {
    if(servoStateResult === undefined){
      alert("Install Metamask and connect to Mumbai to see smart contract state values.")
      document.getElementById("servoStateDOM").innerHTML = "NaN"
    } else{
      console.log("SERVO " + servoStateResult)
      document.getElementById("servoStateDOM").innerHTML = (servoStateResult == 0) ? "Closed (0)" : "Open (1)"
    }
  });

  contractDefined_JS.methods.tollPennies().call((err, tollFeeResult) => {
    console.log("TOLL " + tollFeeResult);
    document.getElementById("tollPenniesDOM").innerHTML = "$" + (tollFeeResult/100).toFixed(2)
  });

  contractDefined_JS.methods.feeInPenniesUSDinMatic().call((err, feeinPenniesMaticResult) => {
    console.log("feeinPenniesMatic " + feeinPenniesMaticResult);
    document.getElementById("feeinPenniesMaticResultDOM").innerHTML = feeinPenniesMaticResult/(10**18) + " MATIC"
  });

  chainlinkERC20MumbaiAddressDefined_JS.methods.balanceOf(contractAddress_JS).call((err, contractLINKbalanceResult) => {
    console.log("Contract LINK balance " + contractLINKbalanceResult);
    document.getElementById("contractLINKbalanceDOM").innerHTML = contractLINKbalanceResult/(10**18) + " LINK"
  });

}

getLatestState();

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

const openGatePayMATICTx = document.querySelector('#openGatePayMATIC');
openGatePayMATICTx.addEventListener('click', () => {
  checkAddressMissingMetamask()

  contractDefined_JS.methods.servoState().call((err, servoStateResult) => {
    if(servoStateResult > 0){
      alert("The gate is already open.")
    }
    else {
      contractDefined_JS.methods.feeInPenniesUSDinMatic().call((err, feeinPenniesMaticResult) => {
          ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: accounts[0],
                  to: contractAddress_JS,
                  data: contractDefined_JS.methods.openServoGate().encodeABI(),
                  value: web3.utils.toHex(feeinPenniesMaticResult)
                  },
              ],
            })
            .then(async (txHash) => { //Infura does not support WSS Mumbai yet for events, so refresh DOM element after 20 seconds worst case.
              await timeout(20000)
              console.log(txHash)
              web3.eth.getTransactionReceipt(txHash).then(console.log);
              contractDefined_JS.methods.servoState().call((err, servoStateResult) => {
                  console.log("SERVO " + servoStateResult)
                  document.getElementById("servoStateDOM").innerHTML = (servoStateResult == 0) ? "Closed (0)" : "Open (1)"
              });
            })
            .catch((error) => console.error);
      })
    }
  })

});

const chainlinkAPIrequestTollDataTx = document.querySelector('#chainlinkAPIrequestTollData');
chainlinkAPIrequestTollDataTx.addEventListener('click', () => {
  checkAddressMissingMetamask()

  chainlinkERC20MumbaiAddressDefined_JS.methods.balanceOf(contractAddress_JS).call((err, contractLINKbalanceResult) => {
    if(contractLINKbalanceResult < 1*10**18){
      alert("Send 1 LINK to the contract address then try again.")
    }
    else {
      contractDefined_JS.methods.feeInPenniesUSDinMatic().call((err, feeinPenniesMaticResult) => {
          ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: accounts[0],
                  to: contractAddress_JS,
                  data: contractDefined_JS.methods.uintAdapterCall().encodeABI(),
                  },
              ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
      })
    }
  })

});
