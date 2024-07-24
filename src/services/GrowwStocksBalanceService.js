const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const stocksBalance = extractedParameters.stocksAvailableBalance;

  console.log("The Stocks Balance of your Groww account is:", stocksBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    stocksBalance,
    proof[0]
  );
};
