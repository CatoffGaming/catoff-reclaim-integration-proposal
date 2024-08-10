| proposal | title                           | description                                                    | author                    | discussions-to | status | type        | category | created    | requires |
|----------|---------------------------------|----------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-12  | Human Benchmark Aim Trainer     | Integration with Human Benchmark to verify Aim Trainer Score   | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Human Benchmark Aim Trainer Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The integration focuses on retrieving and processing the Aim Trainer Score from Human Benchmark, allowing users to verify their performance on the Catoff platform. This will enable users to utilize their Aim Trainer Score data for various challenges and verifications on Catoff.

## External APIs Needed

- **Human Benchmark API**: Currently, Human Benchmark doesn't provide a public API for accessing Aim Trainer scores, so this integration will use data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Verify the Aim Trainer Score on a user's Human Benchmark account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their Aim Trainer Score on Human Benchmark.
3. **Performance Benchmarking**: Validate users' reflex and aiming performance based on their Aim Trainer Score.

## Data Provider

- **Name**: Human Benchmark Aim Trainer
- **Hash Value**: 0x9f83e4a3b5a9a71c3e6b6a9c8e8a9b6d2f8a4b6a9e8b6c8e7e9f9f7b6e8a9f8a

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkAimTrainerService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const aimScore = extractedParameters.aimScore;

  console.log("The Aim Trainer Score on your Human Benchmark is:", aimScore);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    aimScore,
    proof[0]
  );
};
