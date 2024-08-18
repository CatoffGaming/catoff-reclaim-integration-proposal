| proposal | title                          | description                                                        | author                    | discussions-to | status | type        | category | created    | requires |
|----------|--------------------------------|--------------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-16  | Human Benchmark Verbal Memory Service | Integration with Human Benchmark to verify Verbal Memory Test Score | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-08-10 |          |

## Title

Human Benchmark Verbal Memory Service Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The focus of this service is on retrieving and processing the Verbal Memory Test score from Human Benchmark. This service allows users to verify their verbal memory capabilities by recalling words on the Catoff platform.

## External APIs Needed

- **Human Benchmark API**: As Human Benchmark does not offer a public API for accessing Verbal Memory Test scores, this integration will involve data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Validate the Verbal Memory Test score on a user's Human Benchmark account.
2. **Challenge Participation**: Enable users to join challenges that require proof of their Verbal Memory Test score from Human Benchmark.
3. **Memory Test Benchmarking**: Assess users' verbal memory strength based on their Verbal Memory Test score.

## Data Provider

- **Name**: Human Benchmark Verbal Memory Test
- **Hash Value**: 0xb7d8c9f8e7d9f8e7c9b8e7c9f7d8e7b8e7c9f8e7d8c9f7e9f7c8e7b8d9c8f7

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark Verbal Memory Test integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkVerbalMemoryService.js`**

```javascript
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
