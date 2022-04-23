// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract HighWei is ChainlinkClient, KeeperCompatibleInterface {

  using Chainlink for Chainlink.Request;
  AggregatorV3Interface internal priceFeed;

  uint public timeOpened; //Storage slot 0x00, 32/32, 32 bytes bytes.
  uint public tollPennies; //Storage slot 0x01, 32/32 bytes. MTA toll for Verrazano Bridge (Truck: Two Axle) in Pennies.
  address public Owner; // Storage slot 0x02, 20/32 , 20 bytes.
  uint96 public servoState; //Storage slot 0x02, 32/32 , 12 bytes.

    constructor() {
      Owner = msg.sender;
      setChainlinkToken(address(0x326C977E6efc84E512bB9C30f76E30c160eD06FB)); //MUMBAI ADDRESS FOR CHAINLINK API CONSUMER
      priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); //MATIC/USD on Polygon Testnet Mumbai network.
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_FUNCTION.");
        _;
    }

     function feeInPenniesUSDinMatic() public view returns (uint) {
        (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        return tollPennies*uint( (10**24) / price );
    }

    function openServoGate() public payable {
        require(msg.value == feeInPenniesUSDinMatic() && msg.value != 0 , "MATCH_FEE_AND_FEE_NOT_ZERO_TO_OPEN.");
        servoState = 1;
        timeOpened = block.timestamp;
    }

    function closeServoGate() public onlyOwner { //Called by sensors (Ultrasonic or Keepers).
        servoState = 0;
        timeOpened = 0;
    }

    function checkUpkeep(bytes calldata) external override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = oneBlockPassedSinceOpened();
    } 

    function performUpkeep(bytes calldata) external override {
        closeServoGate();
    }

  function uintAdapterCall() public returns (bytes32 requestId) {
    Chainlink.Request memory request;
    request = buildChainlinkRequest("b54577060dbc4ea7b37225913c011821", address(this), this.fulfillUint.selector);
    request.add("type", "uint");
    request.add("js", "const puppeteer = require('puppeteer'); const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks', { waitUntil: 'networkidle2' }); const featureArticle = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))[0]; const text = await page.evaluate(el => { return el.textContent}, featureArticle); await browser.close(); console.log(text.slice(10,text.length)*100); return BigInt(text.slice(10,text.length)*100); ");
    return sendChainlinkRequestTo(0xe67382D1FC23E9B2C29de36810D5C8b2Ae021704, request, 1000000000000000000);
  }

  function fulfillUint(bytes32 _requestId, uint reply) public recordChainlinkFulfillment(_requestId) {
    tollPennies = reply;
  }

  function oneBlockPassedSinceOpened() public view returns(bool) {
    return (block.timestamp >= (timeOpened + 15));
  }

}
