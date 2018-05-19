import * as images from '../assets/images';

export const getHash = (matchId, gameType) => matchId + gameType;

export const getMatchBackground = (gameType) => {
  const type = gameType.toUpperCase();
  switch (type) {
    case 'LOL':
      return images.LOL_BG;
    case 'DOTA2':
      return images.DOTA_BG;
    case 'CSGO':
      return images.CSGO_BG;
    default:
      return null;
  }
};

export const getTeamIcon = teamName => teamName;

