const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processChessDotComData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const username = extractedParameters.user;
  console.log('Username is: ', username);

  // Fetch stats from Chess.com API
  const apiUrl = `https://api.chess.com/pub/player/${username}/stats`;
  try {
    const response = await axios.get(apiUrl);
    const stats = response.data;

    const { chess_rapid } = stats;
    
    console.log('Chess Rapid Wins, Loses and Draws:');
    console.log(`  Wins: ${chess_rapid?.record?.win}`);
    console.log(`  Losses: ${chess_rapid?.record?.loss}`);
    console.log(`  Draws: ${chess_rapid?.record?.draw}`);

    const lastUpdateTimeStamp = proof[0].claimData.timestampS;

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      stats,
      proof[0]
    );
  } catch (error) {
    console.error(`Failed to fetch stats for user ${username}:`, error);
    throw new Error(`Failed to fetch stats for user ${username}`);
  }
};
