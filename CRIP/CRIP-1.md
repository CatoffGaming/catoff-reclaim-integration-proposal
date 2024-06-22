| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-1   | Canva Design Integration |Integrating Canva Designs with Reclaim Protocol for Catoff to validate user Design Contributions.|  RohithPranav <rohithpranav567@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-23 |          |

## Title

Canva Design Integration

## Introduction

This proposal details the integration of Canva as a data provider for the Catoff-Reclaim integration project. The goal of this integration is to access and process user-generated design data from Canva, including completed design projects and usage metrics. This data will be utilized within the Catoff platform, enabling users to validate their design contributions and use them for various challenges and verifications on Catoff.

## External APIs Needed

- Canva Design API: https://www.canva.dev/docs/connect/api-reference/designs/get-design/

## Use Cases

1. **Design Portfolio Verification**: Authenticate user's design portfolios by accessing their Canva projects and design history.
2. **Creative Challenges**: Enable users to join creative challenges on Catoff that require validation of their Canva design work.
3. **Skill Recognition**: Recognize and validate user's design skills based on their completed projects and activity on Canva.

## Data Provider

- **Name**: Canva Design
- **Hash Value**: 0x7a002c09d16c4b8209a8f46c7040461ed89baea76c72ac5cf26959b10f009a1e

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Canva Design integration. The full implementation should follow the service file template.

**`services/canvaService.js`**

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processCanvaDesignData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const username = extractedParameters.username; 
  try {
    const canvaUserData = await axios.get(`https://api.canva.com/v1/users/${username}/designs`, {
      headers: {
        'Authorization': `Bearer YOUR_CANVA_API_TOKEN`
      }
    });

    const designs = canvaUserData.data.designs.map(design => ({
      title: design.title,
      url: design.url,
      createdAt: design.created_at,
    }));

    console.log(`User: ${username}, Designs: ${JSON.stringify(designs)}`);

    const lastUpdateTimeStamp = proof[0].claimData.timestampS;

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      designs,
      proof[0]
    );
  } catch (error) {
    console.error(`Failed to fetch Canva data for user ${username}:`, error);
    throw new Error(`Failed to fetch Canva data for user ${username}`);
  }
};

```
