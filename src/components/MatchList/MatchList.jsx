import React, { Fragment } from 'react';
import MatchCard from '../MatchCard';

const MatchList = ({ matches }) => (
  <Fragment>
    {
      matches.map(match => <MatchCard key={match.matchId} match={match} />)
    }
  </Fragment>
);

export default MatchList;

