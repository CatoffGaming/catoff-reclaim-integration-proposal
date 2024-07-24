const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const ongoingBalance = extractedParameters.ongoingTransactionsBalance;
  const closingBalance = extractedParameters.closingBalance;

  console.log("The Ongoing Balance of your Groww account is:", ongoingBalance);
  console.log("The Closing Balance of your Groww account is:", closingBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    ongoingBalance,
    proof[0]
  );
};
