pragma solidity ^0.4.24;
import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "./stringUtils.sol";
import "./Ownable.sol";

contract DataSource is usingOraclize, Ownable {
  event LogInfo(string log);

  mapping (bytes32 => uint256) queryIdToMatchId;

  constructor() public {
    owner = msg.sender;

    // Only use this for local development
    OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
  }

  function() public {
    revert();
  }

  using stringUtils for *;

  function __callback(bytes32 _queryId, string _result) public {
    require(msg.sender == oraclize_cbAddress());
    require(queryIdToMatchId[_queryId] != 0);

    Match storage m = matches[0];

    m.withdrawable = true;
    m.bettable = false;
    m.winner = stringUtils.stringToBytes32(_result);

    delete queryIdToMatchId[_queryId];
  }

  function getMatchWinner(string _matchId, string _gameType ) payable public {
    if (oraclize_getPrice("URL") > address(this).balance) {
      emit LogInfo("Not enough funds for oraclize query");
    } else {
      emit LogInfo("Oraclize query was sent, checking answer");

      if (_gameType.toSlice().equals("DOTA2".toSlice())) {
        //example query must be json(https://ethlantis-bridge.herokuapp.com/api/dota/12345).matchWinner

        string memory query1 = "json(https://ethlantis-bridge.herokuapp.com/api/dota/".toSlice().concat(_matchId.toSlice());
        string memory finalQuery = query1.toSlice().concat(").matchWinner".toSlice());

        bytes32 queryId = oraclize_query("URL", finalQuery);
        queryIdToMatchId[queryId] = parseInt(_matchId);
      }
    }
  }
}