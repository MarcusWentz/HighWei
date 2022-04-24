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

function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

function enableMetamaskOnMumbai() {
  getAccount();
  if(window.ethereum.networkVersion != 80001){
    alert("You are not on the Mumbai Testnet! Please switch to Rinkeby and refresh page.")
  }
}

//When the page is opened check for error handling issues.
detectMetamaskInstalled()

//Connect to Metamask.
const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnMumbai()
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)
}

//Make Metamask the client side Web3 provider. Needed for tracking live events.
const web3 = new Web3(window.ethereum)
//Now build the contract with Web3.
const contractAddress_JS = '0xDA6a9bf11ab5d0F630F6c8417948B1B81E7Da94a'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"servoStateChange","type":"event"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeServoGate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeInPenniesUSDinMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"reply","type":"uint256"}],"name":"fulfillUint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oneBlockPassedSinceOpened","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openServoGate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"servoState","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeOpened","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tollPennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uintAdapterCall","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

function getLatestState() {

  contractDefined_JS.methods.servoState().call((err, servoStateResult) => {
    console.log("SERVO " + servoStateResult)
    document.getElementById("servoStateDOM").innerHTML = (servoStateResult == 0) ? "Closed (0)" : "Open (1)"
  });

  contractDefined_JS.methods.tollPennies().call((err, tollFeeResult) => {
    console.log("TOLL " + tollFeeResult);
    document.getElementById("tollPenniesDOM").innerHTML = "$" + tollFeeResult/100
  });

  contractDefined_JS.methods.feeInPenniesUSDinMatic().call((err, feeinPenniesMaticResult) => {
    console.log("feeinPenniesMatic " + feeinPenniesMaticResult);
    document.getElementById("feeinPenniesMaticResultDOM").innerHTML = feeinPenniesMaticResult/(10**18) + " MATIC"
  });
}

getLatestState();

contractDefined_JS.events.servoStateChange({ //Get the latest event. Once the event is triggered, website will update value.
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log(eventResult)
     //Get latest Scale_Fee after event.
     contractDefined_JS.methods.ScaleFee_State().call((err, ScaleFee) => {
     document.getElementById("getValueScale_FeeSmartContract").innerHTML = "Scale_Fee = " + (ScaleFee>>3)/10 + "%"
     })
     //Check if anything was sold live on the page.
     getLatestState()
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
