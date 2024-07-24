const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const withdrawableBalance = extractedParameters.withdrawableBalance;

  console.log("The Withdrawable Balance of your Groww account is:", withdrawableBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    withdrawableBalance,
    proof[0]
  );
};
