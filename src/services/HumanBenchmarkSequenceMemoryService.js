const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const sequenceMemoryScore = extractedParameters.sequenceMemoryScore;

  console.log("The Sequence Memory test score on your Human Benchmark is:", sequenceMemoryScore);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    sequenceMemoryScore,
    proof[0]
  );
};
