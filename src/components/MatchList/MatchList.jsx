import React, { Fragment } from 'react';
import MatchBox from '../MatchBox/MatchBox';

const MatchList = ({ matches }) => (
  <Fragment>
    {
      matches.map(match => <MatchBox key={match.matchId} {...match} />)
    }
  </Fragment>
);

export default MatchList;

