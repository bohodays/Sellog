class GitHub {
  constructor(hook, token) {
    log('GitHub constructor', hook, token);
    this.hook = hook;
    this.token = token;
  }

  async createCommit(message, treeSHA, refSHA) {
    // hook, token, message, tree, parent
    log('GitHub createCommit', 'message:', message, 'treeSHA:', treeSHA, 'refSHA:', refSHA);
    return createCommit(this.hook, this.token, message, treeSHA, refSHA);
  }
}

/** create a commit in git
 * @see https://docs.github.com/en/rest/reference/git#create-a-commit
 * @param {string} hook - the github repository
 * @param {string} token - the github token
 * @param {string} message - the commit message
 * @param {string} treeSHA - the tree sha
 * @param {string} refSHA - the parent sha
 * @return {Promise} - the promise for the commit sha
 */
async function createCommit(hook, token, message, treeSHA, refSHA) {
  return fetch(`https://api.github.com/repos/${hook}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: treeSHA, parents: [refSHA] }),
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.sha;
    });
}
