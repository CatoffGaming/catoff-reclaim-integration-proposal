const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const chimpScore = extractedParameters.chimpScore;

  console.log("The Chimp Test Score on your Human Benchmark is:", chimpScore);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    chimpScore,
    proof[0]
  );
};
