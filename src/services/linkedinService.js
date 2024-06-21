const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const followers = extractedParameters.Followers.replace(/,/g, '');

  const username = proof[0].claimData.owner;

  console.log(`Followers for user ${username}: ${followers}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    parseInt(followers, 10),
    proof[0]
  );
};
