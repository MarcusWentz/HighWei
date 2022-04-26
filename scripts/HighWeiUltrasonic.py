import RPi.GPIO as GPIO
import time

from web3 import Web3
import json
import os

GPIO.setmode(GPIO.BCM)
GPIO_TRIGGER = 18
GPIO_ECHO = 24
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

infura_rinkeby_testnet_url_API =  str(os.environ['rinkebyInfuraAPIKey']);
devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);
web3 = Web3(Web3.HTTPProvider(infura_rinkeby_testnet_url_API))
Contract_At_Address= web3.toChecksumAddress("0xDA6a9bf11ab5d0F630F6c8417948B1B81E7Da94a");
abi_Contract = json.loads('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"servoStateChange","type":"event"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closeServoGate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeInPenniesUSDinMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"reply","type":"uint256"}],"name":"fulfillUint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oneBlockPassedSinceOpened","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openServoGate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"servoState","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeOpened","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tollPennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uintAdapterCall","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]')
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);
 
def distance():
    GPIO.output(GPIO_TRIGGER, True)
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)
    StartTime = time.time()
    StopTime = time.time()
    
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
        
    TimeElapsed = StopTime - StartTime
    distance = (TimeElapsed * 34300) / 2
 
    return distance
    
def closeServoGateWeb3Tx():
	print(contract_Call.functions.storedData().call());

	tx = {
	    'nonce':  web3.eth.getTransactionCount("0xc1202e7d42655F23097476f6D48006fE56d38d4f")       ,
	    'to': Contract_At_Address, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
	    'gas': 50000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
	    'gasPrice': web3.toWei('20', 'gwei'), # https://etherscan.io/gastracker
    	    'data': contract_Call.encodeABI(fn_name='closeServoGate')
	}
	
	signed_tx = web3.eth.account.signTransaction(tx, devTestnetPrivateKey)
	print(web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction)))

if __name__ == '__main__':
    try:
        while True:
            dist = distance()
            if(dist < 30 and contract_Call.functions.storedData().call() != 0):
            	closeServoGateWeb3Tx()
            	time.sleep(15)
            	print("MOTION DETECTED! WEB3 TX SENT. WAITING 15 SECONDS FOR BLOCK TO CONFIRM BEFORE CHECKING AGAIN.")
            print ("Measured Distance = %.1f cm" % dist)
            time.sleep(1)
 
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()
