const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const profileViews = extractedParameters.Profile_Views;

  const username = proof[0].claimData.owner;

  console.log(`Profile Views for user ${username}: ${profileViews}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    parseInt(profileViews, 10),
    proof[0]
  );
};
