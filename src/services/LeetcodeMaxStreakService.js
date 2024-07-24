const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLeetcodeData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const maxStreak = extractedParameters.streak;

  console.log("The Maximum Streak on your Leetcode is:", maxStreak);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    maxStreak,
    proof[0]
  );
};
