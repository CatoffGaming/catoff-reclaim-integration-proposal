| proposal | title                          | description                                                        | author                    | discussions-to | status | type        | category | created    | requires |
|----------|--------------------------------|--------------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-15  | Human Benchmark Number Memory Service | Integration with Human Benchmark to verify Number Memory Test Score | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-08-10 |          |

## Title

Human Benchmark Number Memory Service Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The focus of this service is on retrieving and processing the Number Memory Test score from Human Benchmark. This service allows users to verify their memory strength by recalling a sequence of numbers on the Catoff platform.

## External APIs Needed

- **Human Benchmark API**: As Human Benchmark does not offer a public API for accessing Number Memory Test scores, this integration will involve data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Validate the Number Memory Test score on a user's Human Benchmark account.
2. **Challenge Participation**: Enable users to join challenges that require proof of their Number Memory Test score from Human Benchmark.
3. **Memory Test Benchmarking**: Assess users' memory strength based on their Number Memory Test score.

## Data Provider

- **Name**: Human Benchmark Number Memory Test
- **Hash Value**: 0xa8f3d9b7c4e9f8d7c9e7b5c3a8e9d9f7c8e7f9b9d9f8e7c9f7e9f9d8c7f8e7b8

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark Number Memory Test integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkNumberMemoryService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const numberMemoryScore = extractedParameters.numberMemoryScore;

  console.log("The Number Memory test score on your Human Benchmark is:", numberMemoryScore);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    numberMemoryScore,
    proof[0]
  );
};
