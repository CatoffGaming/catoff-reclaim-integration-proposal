# Reclaim Integration Open Source Project

Welcome to the Catoff-Reclaim Integration Open Source Project! This project allows users to integrate different data providers with the [Reclaim](https://dev.reclaimprotocol.org/) protocol for use within the [Catoff](https://www.catoff.xyz) platform. By following the steps outlined in this guide, you can contribute new integrations to the project.

## Table of Contents

- [Introduction](#introduction)
- [How to Contribute](#how-to-contribute)
- [Proposal Template](#proposal-template)
- [Service File Template](#service-file-template)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)

## Introduction

The Catoff-Reclaim Integration Project is designed to facilitate the integration of various data providers with the Reclaim protocol for use within the Catoff platform. Each integration is managed through a service file that processes data from a specific provider and formats it into the `ReclaimServiceResponse` structure.

## How to Contribute

### 1. Submit a Proposal

Before adding a new integration, you must submit a proposal. Your proposal should follow the template provided below. The proposal serves to explain your intended integration, gather community feedback, and document the design decisions.

### Proposal Template
```markdown
| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| <Proposal Number> | <Proposal Title> | <Brief description of the proposal> | <Your Name> <Your Email> |                | Draft  | Integration | CRIP     | <Date>    |          |

## Title

<Provide a concise title for your proposal>

## Introduction

<Provide an introduction to the integration you are proposing. Explain the context and motivation behind the proposal.>

## External APIs Needed

<List any external APIs that are required for this integration.>

## Use Cases

<Describe the use cases for this integration. Explain how it can be used and who will benefit from it.>

## Data Provider

- **Name**: <Data Provider Name>
- **Hash Value**: <Hash Value from Reclaim Website>

## Code Snippet

<Provide a code snippet that demonstrates the key parts of the integration. Use the service file template as a guide.>
```

### 2. Implement the Integration

Once your proposal is accepted, follow the steps below to add your new integration:

1. Create a new service file in the `services` directory.
2. Add the necessary logic to process data from the new provider.
3. Update the constants in `utils/constants.js`.
4. Modify `services/reclaimService.js` to include your new integration.

### 3. Submit a Pull Request

After implementing the integration, submit a pull request for review. Ensure your code follows the project's style guidelines and passes all tests.

## Service File Template

Create a new file in the `services` directory, e.g., `newIntegrationService.js`, and use the template below.

**`services/newIntegrationService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processNewIntegrationData = async (proof, providerName) => {
  // TODO: Extract relevant data from the proof
  // Replace 'newParameter' with the actual parameter you need to extract
  const newData = JSON.parse(proof[0].claimData.context).extractedParameters.newParameter

  // TODO: Process the extracted data
  // Adjust the extraction logic based on the actual format of the data
  // For example, if the data is a string with numeric value
  const newValue = newData.match(/value=\\"([\d,]+)/)[1].replace(/,/g, '')

  // TODO: Extract additional relevant data from the proof
  const url = JSON.parse(proof[0].claimData.parameters).url
  const matchurl = url.match(/user\/([^\/]+)/)
  const username = matchurl ? matchurl[1] : null
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // TODO: Create a ReclaimServiceResponse object with the processed data
  // Adjust the parameters and processing logic based on the actual data structure
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(newValue, 10), proof[0])
}
```

### Update Constants

Add the new integration to the `constants.js` file.

**`utils/constants.js`**

```javascript
exports.RECLAIM_PROVIDER_ID = {
  newIntegration: 'NEW_INTEGRATION_SERVICE',  // Add this line
}

exports.RECLAIM_APP_ID = {
  NEW_INTEGRATION_SERVICE: 'your-new-integration-app-id',  // Add this line
}
```

### Update Reclaim Service

Import the new service and update the `reclaimService.js` file to handle the new integration.

**`services/reclaimService.js`**

```javascript
const { Reclaim } = require('@reclaimprotocol/js-sdk')
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants')
const { processSampleData } = require('./sampleService')
const { processNewIntegrationData } = require('./newIntegrationService')  // Add this line

exports.signWithProviderID = async (userId, challengeId, providerId) => {
  const providerName = RECLAIM_PROVIDER_ID[providerId]
  const reclaimAppID = RECLAIM_APP_ID[providerName]
  const reclaimAppSecret = process.env[`${providerName}_SECRET`]

  console.log(`Sending signature request to Reclaim for userId: ${userId} with providerName: ${providerName}`)

  try {
    const reclaimClient = new Reclaim.ProofRequest(reclaimAppID)
    await reclaimClient.buildProofRequest(providerId)
    reclaimClient.setSignature(await reclaimClient.generateSignature(reclaimAppSecret))
    const { requestUrl: signedUrl } = await reclaimClient.createVerificationRequest()

    await handleReclaimSession(userId, reclaimClient, providerName)
    return signedUrl
  } catch (error) {
    console.error(`Failed to process Reclaim request for userId: ${userId}`, error)
    throw error
  }
}

const handleReclaimSession = async (userId, reclaimClient, providerName) => {
  await reclaimClient.startSession({
    onSuccessCallback: async proof => {
      console.log(`Successful reclaim callback with proof: ${JSON.stringify(proof)}`)

      try {
        let processedData
        switch (providerName) {
          case 'SAMPLE_SERVICE':
            processedData = await processSampleData(proof, providerName)
            break
          case 'NEW_INTEGRATION_SERVICE':  // Add this case
            processedData = await processNewIntegrationData(proof, providerName)
            break
          default:
            throw new Error(`No handler for provider: ${providerName}`)
        }

        console.log(`Processed data: ${JSON.stringify(processedData)}`)
      } catch (error) {
        console.error(`Failed to process Reclaim proof for userId: ${userId}`, error)
      }
    },
    onFailureCallback: error => {
      console.error(`Verification failed for userId: ${userId}`, error)
    },
  })
}
```

## Installation and Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/CatoffGaming/catoff-reclaim-integration-proposal.git
   cd catoff-reclaim-integration-proposal
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create a `.env` file**

   ```sh
   cp .env.example .env
   ```

4. **Update the `.env` file** with your secrets.

5. **Run the application**

   ```sh
   npm start
   ```

6. **Run linting and formatting**

   ```sh
   npm run lint
   npm run lint:fix
   npm run format
   ```

## Summary

Thank you for contributing to the Catoff-Reclaim Integration Open Source Project! Your contributions help expand the capabilities of Reclaim by integrating new data providers for use within Catoff. Follow the steps outlined in this guide to submit proposals and implement new integrations efficiently. If you have any questions, feel free to open an issue or reach out to the project maintainers.