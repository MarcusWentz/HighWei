// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract HighWei {

  AggregatorV3Interface internal priceFeed;

  uint public state; //Storage slot 0x00, 32 bytes.
  uint public timeOpened; //Storage slot 0x01, 32 bytes.
  uint public tollBridgeVerrazanoEZpassCar; //Storage slot 0x02, 32 bytes.
  address public Owner; // Storage slot 0x03, 20 bytes.


    constructor() {
      Owner = msg.sender;
      priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); //MATIC/USD on Polygon Testnet Mumbai network.
      tollBridgeVerrazanoEZpassCar = 100; //Placeholder value, use Adapter.js for this.
    }

    modifier onlyOwner() {
        require(msg.sender == Owner);
        _;
    }

     function feeInPenniesUSDinMatic() public view returns (uint) {
        (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        return (tollBridgeVerrazanoEZpassCar*uint( (10**24) / price ))/(100);
    }

    function openServoGate() public payable {
        require(msg.value == tollBridgeVerrazanoEZpassCar);
        state = 1;
        timeOpened = block.timestamp;
    }

    function closeServoGate() public onlyOwner {
        require(block.timestamp >= timeOpened + 15);
        state = 0;
        timeOpened = 0;
    }

}
