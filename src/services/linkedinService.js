const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const postImpressions = extractedParameters.Post_Impressions;

  const username = proof[0].claimData.owner;

  console.log(`Post Impressions for user ${username}: ${postImpressions}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    parseInt(postImpressions, 10),
    proof[0]
  );
};
