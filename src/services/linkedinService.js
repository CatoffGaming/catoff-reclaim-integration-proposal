const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const postImpressions = extractedParameters.Post_Impressions;
  const profileViews = extractedParameters.Profile_Views;
  const searchAppearances = extractedParameters.Search_Appearances;
  const username = proof[0].claimData.owner;

  console.log(`Post Impressions for user ${username} : ${postImpressions}`);
  console.log(`Profile Views for user ${username} : ${profileViews}`);
  console.log(`Search Appearances for user ${username} : ${searchAppearances}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    profileViews,
    proof[0]
  );
};
