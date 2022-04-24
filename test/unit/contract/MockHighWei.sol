// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HighWei {

  uint public timeOpened; //Storage slot 0x00, 32/32, 32 bytes bytes.
  uint public tollPennies; //Storage slot 0x01, 32/32 bytes. MTA toll for Verrazano Bridge (Truck: Two Axle) in Pennies.
  address public Owner; // Storage slot 0x02, 20/32 , 20 bytes.
  uint96 public servoState; //Storage slot 0x02, 32/32 , 12 bytes.

  event servoStateChange();

    constructor() {
      Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_FUNCTION.");
        _;
    }

     function feeInPenniesUSDinMatic() public view returns (uint) {
        return tollPennies*7000000000000000;
    }

    function openServoGate() public payable {
        require(msg.value == feeInPenniesUSDinMatic() && msg.value != 0 , "MATCH_FEE_AND_FEE_NOT_ZERO_TO_OPEN.");
        servoState = 1;
        timeOpened = block.timestamp;
        emit servoStateChange();
    }

    function closeServoGate() public onlyOwner { //Called by sensors (Ultrasonic or Keepers).
        servoState = 0;
        timeOpened = 0;
        emit servoStateChange();
    }

    function uintAdapterCall() public {
        tollPennies = 300;
    }

  function oneBlockPassedSinceOpened() public view returns(bool) {
    return (servoState == 1 && block.timestamp >= (timeOpened + 15));
  }

}
