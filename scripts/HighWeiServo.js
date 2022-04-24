const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.rinkebyWebSocketSecureEventsInfuraAPIKey //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0xaf3310ec212eCBA069149239F954F1281fDa836B'
const contractABI_JS =
[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"valueChangeEventWenjs","type":"uint256"}],"name":"setValueUpdatedViaWebjs","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const servoAnalogPin = 22;
const timeMilliSec = 1000;
const pulseWidthMin = 0.05;
const pulseWidthMax = 0.35;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function checkValueLatest() { //get() contract value,
	contractDefined_JS.methods.storedData().call((err, servoStateValue) => {
		if(servoStateValue == 1){
			console.log("OPEN GATE!" )
			piblaster.setPwm(servoAnalogPin, pulseWidthMax);
		} else {
			console.log("CLOSE GATE!" )
			piblaster.setPwm(servoAnalogPin, pulseWidthMin);
		}
	})
 	await timeout(timeMilliSec)
}

console.log("Contract starting value:")
checkValueLatest();

contractDefined_JS.events.setValueUpdatedViaWebjs({ //Subscribe to event.
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log("EVENT DETECTED! NEW STATE VALUE: ")
   checkValueLatest();  //Call the get function to get the most accurate present state for the value.
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
