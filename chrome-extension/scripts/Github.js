class GitHub {
  constructor(token) {
    this.token = token;
  }

  async createRecord(type, message) {
    // token, message, tree, parent
    log('createRecord', 'message:', message, 'type:', type);
    return createRecord(this.token, message, type);
  }
}

/** create record
 * @param {string} token - the token
 * @param {string} message - the commit message
 */
async function createRecord(token, message, type) {
  return fetch(`https://k8a404.p.ssafy.io/api/webhook/chrome`, {
    method: 'POST',
    body: JSON.stringify({ message, type: type }),
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.sha;
    });
}
