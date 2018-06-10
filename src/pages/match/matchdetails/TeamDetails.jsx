import React, { Fragment } from 'react';
import TeamDetail from './TeamDetail';

const TeamDetails = ({
  match, chosenTeam, chooseTeam, hasPlaced,
}) =>
  (
    <Fragment>
      <TeamDetail
        name={match.teamA}
        bets={match.teamATotalBets}
        chosen={chosenTeam === match.teamA}
        percentage={match.teamAPercentage}
        chooseTeam={chooseTeam}
        hasPlaced={hasPlaced}
      />
      <TeamDetail
        name={match.teamB}
        bets={match.teamBTotalBets}
        chosen={chosenTeam === match.teamB}
        percentage={match.teamBPercentage}
        chooseTeam={chooseTeam}
        hasPlaced={hasPlaced}
      />
    </Fragment>
  );

export default TeamDetails;
