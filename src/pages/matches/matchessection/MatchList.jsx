import React, { Fragment } from 'react';
import MatchCard from './matchlist/MatchCard';
import { getHash } from '../../../utils/';

const MatchList = ({ matches }) => (
  <Fragment>
    {
      (matches && matches.length > 0) &&
      matches.map(match => <MatchCard key={getHash(match.matchId, match.gameType)} match={match} />)
    }
  </Fragment>
);

export default MatchList;

