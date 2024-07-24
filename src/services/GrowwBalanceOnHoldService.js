const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const balanceOnHold = extractedParameters.balanceOnHold;
  const balanceOnHoldForStocks = extractedParameters.balanceOnHoldForStocks;

  console.log("The Balance On Hold of your Groww account is:", balanceOnHold);
  console.log("The Balance On Hold For Stocks of your Groww account is:", balanceOnHoldForStocks);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    balanceOnHold,
    proof[0]
  );
};
