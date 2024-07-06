const { validateCourseCompletion } = require('../services/courseCompleteService'); // Adjust path as necessary
const {verifyUberRides} = require('../services/verifyUberRides')

exports.verifyUberRides = async (req, res) => {
  const { userId, month, numberOfRides } = req.body;
  
  try {
    const proof = await verifyUberRides(userId, month, numberOfRides);
    res.status(200).json({
      success: true,
      message: 'Uber rides verified successfully',
      proof: proof
    });
  } catch (error) {
    console.error('Error verifying Uber rides:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify Uber rides',
      error: error.message
    });
  }
};

exports.validateCourseCompletion = async (req, res) => {
  const { userId, courseName, completionDate } = req.body;
  
  try {
    const proof = await validateCourseCompletion(userId, courseName, completionDate);
    res.status(200).json({
      success: true,
      message: 'Course completion validated successfully',
      proof: proof
    });
  } catch (error) {
    console.error('Error validating course completion:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate course completion',
      error: error.message
    });
  }
};
