const { Reclaim } = require('@reclaimprotocol/js-sdk');
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants');

// Function to generate a proof using Reclaim Protocol
exports.generateProof = async (userId, challengeId, providerId) => {
    const providerName = RECLAIM_PROVIDER_ID[providerId];
    const reclaimAppID = RECLAIM_APP_ID[providerName];
    const reclaimAppSecret = process.env[`${providerName}_SECRET`];

    console.log(`Generating proof for userId: ${userId} with providerName: ${providerName}`);

    try {
        const reclaimClient = new Reclaim.ProofRequest(reclaimAppID);
        await reclaimClient.buildProofRequest(providerId);
        reclaimClient.setSignature(await reclaimClient.generateSignature(reclaimAppSecret));
        const { requestUrl: signedUrl } = await reclaimClient.createVerificationRequest();

        // Simulating a successful proof generation
        const proof = {
            userId,
            provider: providerName,
            proofUrl: signedUrl,
            timestamp: new Date().toISOString()
        };

        console.log(`Proof generated: ${JSON.stringify(proof)}`);
        return proof;
    } catch (error) {
        console.error(`Failed to generate proof for userId: ${userId}`, error);
        throw error;
    }
};
