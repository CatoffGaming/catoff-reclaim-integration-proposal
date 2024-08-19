| proposal | title                            | description                                                            | author                    | discussions-to | status | type        | category | created    | requires |
|----------|----------------------------------|------------------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-17  | Human Benchmark Sequence Memory Service | Integration with Human Benchmark to verify Sequence Memory Test Score | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-08-10 |          |

## Title

Human Benchmark Sequence Memory Service Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The focus of this service is on retrieving and processing the Sequence Memory Test score from Human Benchmark. This service allows users to verify their sequence memory capabilities by recalling sequences on the Catoff platform.

## External APIs Needed

- **Human Benchmark API**: As Human Benchmark does not offer a public API for accessing Sequence Memory Test scores, this integration will involve data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Validate the Sequence Memory Test score on a user's Human Benchmark account.
2. **Challenge Participation**: Enable users to join challenges that require proof of their Sequence Memory Test score from Human Benchmark.
3. **Memory Test Benchmarking**: Assess users' sequence memory strength based on their Sequence Memory Test score.

## Data Provider

- **Name**: Human Benchmark Sequence Memory Test
- **Hash Value**: 0xa9d2f9e7b9d2f9e7c9b8e7c9d2f9e7c9b8e7d2f9e7d9c9b8

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark Sequence Memory Test integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkSequenceMemoryService.js`**

```javascript
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
