const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants');
const { Reclaim } = require('@reclaimprotocol/js-sdk');



exports.verifyFitnessChallenge = async (userId, providerId, challengeData) => {
  const providerName = RECLAIM_PROVIDER_ID[providerId];
  const reclaimAppID = RECLAIM_APP_ID[providerName];
  const reclaimAppSecret = process.env[`${providerName}_SECRET`];

  try {
    console.log("Application ID:", reclaimAppID);
    const reclaimClient = new Reclaim.ProofRequest(reclaimAppID);
    await reclaimClient.buildProofRequest(providerId);
    reclaimClient.setSignature(await reclaimClient.generateSignature(reclaimAppSecret));
    const { requestUrl: signedUrl } = await reclaimClient.createVerificationRequest();

    // Begin the session to handle the verification response
    await reclaimClient.startSession({
      onSuccessCallback: async proof => {
        console.log(`Successful verification callback with proof for ${providerName}: ${JSON.stringify(proof)}`);

        // Process the fitness challenge data using a function similar to processTwitterData
        const processedData = await processFitnessChallengeData(proof, providerName, challengeData);
        console.log(`Processed data: ${JSON.stringify(processedData)}`);
      },
      onFailureCallback: error => {
        console.error(`Verification failed for userId: ${userId}, provider: ${providerName}`, error);
      },
    });

    return { signedUrl, challengeData };
  } catch (error) {
    console.error(`Failed to verify fitness challenge for userId: ${userId}`, error);
    throw error;
  }
};

const processFitnessChallengeData = async (proof, providerName, challengeData) => {
  // Extract challenge data from the proof, similar to extracting tweet views
  const activityLevel = JSON.parse(proof[0].claimData.context).extractedParameters.activityLevel;
  const activityValue = activityLevel.match(/steps=\\"([\d,]+)/)[1].replace(/,/g, '');

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  // Construct the response similar to how Twitter data is processed
  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    proof[0].claimData.user,
    parseInt(activityValue, 10),
    proof[0]
  );
};
