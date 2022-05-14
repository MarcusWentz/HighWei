// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract HighWei is ChainlinkClient {

  using Chainlink for Chainlink.Request;

  uint public tollPennies; 

  constructor() {
    setChainlinkToken(address(0x326C977E6efc84E512bB9C30f76E30c160eD06FB)); //MUMBAI ADDRESS FOR CHAINLINK API CONSUMER
  }

  function ipfsContentIdentifierJavascriptCodeRequest() public returns (bytes32 requestId) {
    Chainlink.Request memory request;
    request = buildChainlinkRequest("b54577060dbc4ea7b37225913c011821", address(this), this.fulfillUint.selector);
    request.add("type", "uint");
    request.add("cid", "bafybeigvfcksysrsazvghy3l3wvpho4mzacyi7ty7mwidexoacp4nplwba");
    return sendChainlinkRequestTo(0xe67382D1FC23E9B2C29de36810D5C8b2Ae021704, request, 1000000000000000000);
  }

  function fulfillUint(bytes32 _requestId, uint reply) public recordChainlinkFulfillment(_requestId) {
    tollPennies = reply;
  }

}

