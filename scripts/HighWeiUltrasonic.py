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
Contract_At_Address= web3.toChecksumAddress("0xaf3310ec212eCBA069149239F954F1281fDa836B");
abi_Contract = json.loads('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"valueChangeEventWenjs","type":"uint256"}],"name":"setValueUpdatedViaWebjs","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
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
