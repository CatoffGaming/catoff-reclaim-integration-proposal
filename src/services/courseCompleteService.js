const { generateProof } = require('../services/reclaimProvider');

// Example function to validate completion of an online course
const validateCourseCompletion = async (userId, courseName, completionDate) => {
  const statement = `User ${userId} completed ${courseName} on ${completionDate}`;
  try {
    const proof = await generateProof(userId, statement, 'COURSE_PROVIDER');
    // Submit proof to Catoff or use as needed
    console.log(`Proof generated for course completion validation: ${JSON.stringify(proof)}`);
    return proof;
  } catch (error) {
    console.error('Error validating course completion:', error);
    throw error;
  }
};

module.exports = validateCourseCompletion;
