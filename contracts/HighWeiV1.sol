// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HighWei {

  uint public state; //Storage slot 0x00, 32 bytes.
  uint public timeOpened; //Storage slot 0x01, 32 bytes.
  uint public tollBridgeVerrazanoEZpassCar; //Storage slot 0x02, 32 bytes.
  address public Owner; // Storage slot 0x03, 20 bytes.

  constructor() {
    Owner = msg.sender;
    tollBridgeVerrazanoEZpassCar = 100; //Placeholder value, use Adapter.js for this.
  }

  modifier onlyOwner() {
      require(msg.sender == Owner);
      _;
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
