const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const availableBalance = extractedParameters.availableBalance;

  console.log("THe available balance of your Groww account is: ", availableBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt', 
    availableBalance,
    proof[0]
  );
};
