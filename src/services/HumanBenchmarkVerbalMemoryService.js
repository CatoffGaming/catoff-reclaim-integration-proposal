const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const verbalMemoryScore = extractedParameters.verbalMemoryScore;

  console.log("The Verbal Memory test score on your Human Benchmark is:", verbalMemoryScore);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    verbalMemoryScore,
    proof[0]
  );
};
