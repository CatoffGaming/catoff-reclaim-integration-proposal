class ReclaimServiceResponse {
  constructor(flag, timestamp, userName, targetValue, data) {
    this.flag = flag
    this.timestamp = timestamp
    this.userName = userName
    this.targetValue = targetValue
    this.data = data
  }
}

module.exports = { ReclaimServiceResponse }
