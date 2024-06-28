const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processSwiggyData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const lastOrderPrice = extractedParameters.lastOrderPrice;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  console.log('Last Order Price is: ', lastOrderPrice);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'username', 
    lastOrderPrice,
    proof[0]
  );
};
