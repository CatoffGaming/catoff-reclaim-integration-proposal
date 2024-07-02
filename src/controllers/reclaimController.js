const { signWithProviderID } = require('../services/reclaimService')
const { verifyFitnessChallenge } = require('../services/fitnessChallengeService');


exports.signHandler = async (req, res) => {
  const { userId, providerId } = req.body

  try {
    const signedUrl = await signWithProviderID(userId, providerId)
    res.status(200).json({
      success: true,
      message: 'Reclaim signature successful',
      data: { url: signedUrl },
    })
  } catch (error) {
    console.error(`Failed to sign reclaim request for userId: ${userId}`, error)
    res.status(500).json({
      success: false,
      message: `Failed to process request: ${error.message}`,
    })
  }
}


exports.fitnessChallengeHandler = async (req, res) => {
  const { userId, providerId, challengeData } = req.body;
  try {
    const response = await verifyFitnessChallenge(userId, providerId, challengeData);
    res.status(200).json({
      success: true,
      message: 'Fitness challenge verification successful',
      data: response
    });
  } catch (error) {
    console.error(`Failed to verify fitness challenge for userId: ${userId}`, error);
    res.status(500).json({
      success: false,
      message: `Failed to process request: ${error.message}`,
    });
  }
};