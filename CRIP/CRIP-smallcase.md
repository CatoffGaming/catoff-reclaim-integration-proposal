| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-smallcase   | SmallCase Integration | Integration with Smallcase API to validate user total returns on their investments and their networth. | Basit Raza <basitraza2000@gmail.com |         | Draft  | Integration | CRIP     | 2024-06-30 |          |

## Title

SmallCase Integration

## Introduction

This proposal outlines the integration of Smallcase returns & Networth Via smallcase  as  data providers for the Catoff-Reclaim integration project. The integration can be used with both the smallcase data providors and aims to retrieve total aggregate returns and total networth of their investment Portfolio . This will enable users to validate their networth and returns of their investments and use it for various challenges and verifications across the Catoff platform.

## External APIs Needed

- SmallCase API: https://gatewayapi.smallcase.com/v1/gatewaydemo/engine/user/investments - Retrieves the networth and returns of a user.

## Use Cases

1. **User Portfolio Verification**: Verify the activity of users on smallcase by looking at their returns/networth .
2. **Active Investor Validation**: Allow users to prove their status as Active Investors .
3. **Returns**: Enable users to showcase their returns on thier  portfolio .
4. **Networth**: Verify networth on their investments accross all assets(ETF, Mutual funds, stocks, smallcases).

## Data Providers

- **Name**: Smallcase returns
- **Hash Value**: 0xb490b0e1580609e96de8c034ce570c2787de0f8eca4bf99c8991ce001741a2f7



- **Name**: Networth Via smallcase
- **Hash Value**: 0x775178a84f61e94419c2698a15a1018a0220b2893ebc606a70febd7ce77ee0e1


## Code Snippet

Below is a code snippet that demonstrates the key parts of the SmallCase integration. The full implementation follows the service file template.

**`services/smallCaseService.js`**

```javascript

const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processSmallcaseData = async (proof, providerName) => {
    try {
        const userToken = JSON.parse(proof[0].claimData.context).extractedParameters.authToken;
        const lastUpdateTimeStamp = proof[0].claimData.timestampS;

        const { returns, networth } = await getSmallcaseReturns(userToken);

        return new ReclaimServiceResponse(
            providerName,
            lastUpdateTimeStamp,
            userToken,
            returns,
            networth,
            proof[0]
        );
    } catch (error) {
        console.error('Error fetching data from smallcase :', error);
        throw error;
    }
}
