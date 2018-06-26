pragma solidity ^0.4.24;
import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "./Ownable.sol";

contract DataSource is usingOraclize, Ownable {
  event LogInfo(string log);

  mapping (bytes32 callbackId => bytes32 matchHash) callbackIdToMatchHash;

  constructor() public {
    owner = msg.sender;

    // Only use this for local development
    OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
  }

  function() public {
    revert();
  }

  function _callback(bytes32 _id, string _result) public {
    require(msg.sender == oraclize_cbAddress());

  }

  using stringUtils for *;

  function getMatchWinner(uint _matchId, bytes32 _gameType ) payable public {
    if (oraclize_getPrice("URL") > address(this).balance) {
      emit LogInfo("Not enough funds for oraclize query");
    } else {
      emit LogInfo("Oraclize query was sent, checking answer");
      oraclize_query("URL", "api path here");
      callbackIdToMatchHash();
    }
  }
}