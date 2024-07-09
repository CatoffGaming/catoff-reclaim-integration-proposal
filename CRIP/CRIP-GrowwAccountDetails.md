| proposal | title                   | description                                         | author                    | discussions-to | status | type        | category | created    | requires |
|----------|-------------------------|-----------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-4   | Groww Account Data      | Integration with Groww to verify user account data  | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Groww Account Data Integration

## Introduction

This proposal outlines the integration of Groww as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user account data from Groww, allowing users to validate their account details on the Catoff platform. This will enable users to use their Groww account data for various challenges and verifications on Catoff.

## External APIs Needed

- Groww API: Groww doesn't have a public API, so the integration will use data extraction methods from the Groww app/web.

## Use Cases

1. **User Verification**: Verify the user account data on Groww.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their Groww account details.
3. **Account Status**: Validate users' account status based on their Groww data.

## Data Provider

- **Name**: Groww Account Data
- **Hash Value**: 0x8bbe041be479e12ef2efee703fced2f4b605c4a6d69e9957d955bebb92ad30ed

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Groww integration. The full implementation should follow the service file template.

**`services/GrowwAccountDataService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const username = extractedParameters.username;
  const email = extractedParameters.email;
  const investmentStatus = extractedParameters.investment_status;
  const kycStatus = extractedParameters.kyc_status;
  const kycVerified = extractedParameters.kyc_verified;
  const phoneNo = extractedParameters.phoneNo;

  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Investment Status:', investmentStatus);
  console.log('KYC Status:', kycStatus);
  console.log('KYC Verified:', kycVerified);
  console.log('Phone Number:', phoneNo);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username, 
    100,
    proof[0]
  );
};
