import React, { Fragment } from 'react';
import Team from './Team';

const TeamsContainer = ({ match, chosenTeam, chooseTeam }) => (
  <Fragment>
    <Team
      name={match.teamA}
      bets={match.teamATotalBets}
      totalBets={match.teamATotalBets + match.teamBTotalBets}
      chosen={chosenTeam === match.teamA}
      chooseTeam={chooseTeam}
    />
    <Team
      name={match.teamB}
      bets={match.teamBTotalBets}
      totalBets={match.teamATotalBets + match.teamBTotalBets}
      chosen={chosenTeam === match.teamB}
      chooseTeam={chooseTeam}
    />
  </Fragment>
);

export default TeamsContainer;
