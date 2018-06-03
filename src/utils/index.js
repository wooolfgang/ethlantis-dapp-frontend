import * as images from '../assets/images';

export const getHash = (matchId, gameType) => matchId.toString() + gameType.toString();

export const getMatchBackgroundImage = (gameType) => {
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

export const getMatchBackground = (gameType) => {
  const type = gameType.toUpperCase();
  switch (type) {
    case 'LOL':
      return 'linear-gradient(#21d484, #313563)';
    case 'DOTA2':
      return 'linear-gradient(#ab5962, #323162)';
    case 'CSGO':
      return 'linear-gradient(#9e8089, #822818)';
    default:
      return null;
  }
};

export const getTeamIcon = teamName => teamName;

