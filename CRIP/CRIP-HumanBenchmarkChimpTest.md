| proposal | title                           | description                                                    | author                    | discussions-to | status | type        | category | created    | requires |
|----------|---------------------------------|----------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-13  | Human Benchmark Chimp Test      | Integration with Human Benchmark to verify Chimp Test Score    | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Human Benchmark Chimp Test Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The integration focuses on retrieving and processing the Chimp Test Score from Human Benchmark, enabling users to verify their performance on the Catoff platform. Users will be able to utilize their Chimp Test Score data for various challenges and verifications.

## External APIs Needed

- **Human Benchmark API**: Currently, Human Benchmark does not provide a public API for accessing Chimp Test scores, so this integration will rely on data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Verify the Chimp Test Score on a user's Human Benchmark account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their Chimp Test Score on Human Benchmark.
3. **Cognitive Benchmarking**: Validate users' cognitive abilities based on their Chimp Test Score.

## Data Provider

- **Name**: Human Benchmark Chimp Test
- **Hash Value**: 0x8f93e4a3c5a9a71c3e6b6a9c8e8a9b6d2f8a4b6a9e8b6c8e7e9f9f7b6e8a9f8b

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkChimpTestService.js`**

```javascript
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
