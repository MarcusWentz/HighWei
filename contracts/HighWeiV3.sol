// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract HighWei is ChainlinkClient {

  using Chainlink for Chainlink.Request;
  AggregatorV3Interface internal priceFeed;

  uint public state; //Storage slot 0x00, 32 bytes.
  uint public timeOpened; //Storage slot 0x01, 32 bytes.
  uint public tollBridgeVerrazanoEZpassCarPennies; //Storage slot 0x02, 32 bytes.
  address public Owner; // Storage slot 0x03, 20 bytes.

    constructor() {
      Owner = msg.sender;
      setChainlinkToken(address(0x326C977E6efc84E512bB9C30f76E30c160eD06FB)); //MUMBAI ADDRESS FOR CHAINLINK API CONSUMER
      priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); //MATIC/USD on Polygon Testnet Mumbai network.
    }

    modifier onlyOwner() {
        require(msg.sender == Owner);
        _;
    }

     function feeInPenniesUSDinMatic() public view returns (uint) {
        (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        return (tollBridgeVerrazanoEZpassCarPennies*uint( (10**24) / price ))/(100);
    }

    function openServoGate() public payable {
        require(feeInPenniesUSDinMatic() > 0 && msg.value == feeInPenniesUSDinMatic());
        state = 1;
        timeOpened = block.timestamp;
    }

    function closeServoGate() public onlyOwner {
        require(block.timestamp >= timeOpened + 15);
        state = 0;
        timeOpened = 0;
    }

  function uintAdapterCall() public returns (bytes32 requestId) {
    Chainlink.Request memory request;
    request = buildChainlinkRequest("0fd94256e7e146188a1a7e0c0a54588a", address(this), this.fulfillUint.selector);
    request.add("type", "uint");
    request.add("js", "return 999");
    return sendChainlinkRequestTo(0xAC442d76EeC61518D2112eeB67620Cbf05D6f746, request, 1000000000000000000);
  }

  function fulfillUint(bytes32 _requestId, uint reply) public recordChainlinkFulfillment(_requestId) {
    tollBridgeVerrazanoEZpassCarPennies = reply;
  }

}
