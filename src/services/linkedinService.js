const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const searchAppearances = extractedParameters.Search_Appearances;

  const username = proof[0].claimData.owner;

  console.log(`Search Appearances for user ${username}: ${searchAppearances}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,                              
    username,
    parseInt(searchAppearances, 10),
    proof[0]
  );
};
