| proposal | title                          | description                                                        | author                    | discussions-to | status | type        | category | created    | requires |
|----------|--------------------------------|--------------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-14  | Human Benchmark Words Per Minute | Integration with Human Benchmark to verify Words Per Minute Score | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Human Benchmark Words Per Minute Integration

## Introduction

This proposal outlines the integration of Human Benchmark as a data provider for the Catoff-Reclaim integration project. The integration focuses on retrieving and processing the Words Per Minute (WPM) score from Human Benchmark, enabling users to verify their typing speed on the Catoff platform. Users will be able to utilize their WPM data for various challenges and verifications.

## External APIs Needed

- **Human Benchmark API**: Currently, Human Benchmark does not provide a public API for accessing Words Per Minute scores, so this integration will rely on data extraction methods from the Human Benchmark app/web.

## Use Cases

1. **User Verification**: Verify the Words Per Minute (WPM) score on a user's Human Benchmark account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their WPM score on Human Benchmark.
3. **Typing Speed Benchmarking**: Validate users' typing abilities based on their WPM score.

## Data Provider

- **Name**: Human Benchmark Words Per Minute
- **Hash Value**: 0x9f83e5b4c7a9b72c4e7b7c9d9e9b8d7e3f9b5d8c9f7c8d7e8f9f8e7b9f9b9d9f

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Human Benchmark integration. The full implementation should follow the service file template.

**`services/HumanBenchmarkWordsPerMinuteService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processHumanBenchmarkData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const wordsPerMinute = extractedParameters.wordsPerMinute;

  console.log("The Words Per Minute on your Human Benchmark is:", wordsPerMinute);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    wordsPerMinute,
    proof[0]
  );
};
