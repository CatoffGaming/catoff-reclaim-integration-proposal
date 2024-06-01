const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processGitHubData = async (proof, providerName) => {
  const githubUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const commitCount = await getUserCommits(githubUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    githubUsername,
    commitCount,
    proof[0]
  )
}

const getUserCommits = async username => {
  const daysAgo = 3650 // Approx. 10 years
  const dateSince = new Date(new Date().setDate(new Date().getDate() - daysAgo))
    .toISOString()
    .split('T')[0]
  const url = `https://api.github.com/search/commits?q=author:${username}+committer-date:>${dateSince}`
  const githubToken = process.env.RECLAIM_GITHUB_TOKEN

  const response = await axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.cloak-preview',
      Authorization: `token ${githubToken}`,
    },
  })

  console.log(
    `Total commits by ${username} in the last 10 years: ${response.data.total_count}`
  )
  return response.data.total_count
}
