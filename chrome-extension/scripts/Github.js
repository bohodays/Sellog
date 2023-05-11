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
function createRecord(token, message, type, problemId) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://k8a404.p.ssafy.io/api/webhook/chrome', false);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ message, type, problemId }));
  if (xhr.status === 200) {
    console.log(xhr.responseText);
    const point = JSON.parse(xhr.responseText).response;

    if (point > 0 || point === -1) {
      // 메시지
      console.log(point);
      chrome.runtime.sendMessage({
        message: "alarm",
        payload: { point },
      });
    }
    return JSON.parse(xhr.responseText);
  } else if (xhr.status === 409) {
    console.log("이미 제출 이력이 있습니다.")
  } else {
    console.log(`Error: ${xhr.status} - ${xhr.statusText}`);
    throw new Error(xhr.statusText);
  }
}
