const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processZomatoData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const numberOfOrders = extractedParameters.ordersCount;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  console.log('Total Number of orders are: ', numberOfOrders);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'username', 
    numberOfOrders,
    proof[0]
  );
};
