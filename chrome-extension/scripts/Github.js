class GitHub {
  constructor(token) {
    this.token = token;
  }

  async createRecord(type, message, problemId) {
    // token, message, tree, parent
    console.log('createRecord', 'message:', message, 'type:', type, 'problemId:', problemId);
    return createRecord(this.token, message, type, problemId);
  }
}

/** create record
 * @param {string} token - the token
 * @param {string} message - the commit message
 */
async function createRecord(token, message, type, problemId) {
  return fetch(`https://k8a404.p.ssafy.io/api/webhook/chrome`, {
    method: 'POST',
    body: JSON.stringify({ message, type: type, problemId }),
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    mode: 'cors'
  })
    .then((res) => res.json())
    .then((data) => {
      return data.sha;
    })
    .catch((error)=>{
      console.log(error);
    });
}
