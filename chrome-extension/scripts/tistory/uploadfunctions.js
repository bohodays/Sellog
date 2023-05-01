/** 푼 문제들에 대한 단일 업로드는 uploadGit 함수로 합니다.
 * 파라미터는 아래와 같습니다.
 * @param {string} commitMessage - 메시지
 * @param {function} cb - 콜백 함수 (ex. 업로드 후 로딩 아이콘 처리 등)
 * @returns {Promise<void>}
 */
async function uploadOnePostingOnSellog(message) {
  const token = await getToken();
  if (isNull(token)) {
    console.error('token is null', token);
    return;
  }
  return upload(token, message);
}

async function upload(token, message) {
  const stats = await getStats();
  await createRecord(token, message, "tistory", "");
}

async function createRecord(token, message, type, problemId) {
  return fetch(`https://k8a404.p.ssafy.io/api/webhook/chrome`, {
    method: 'POST',
    body: JSON.stringify({ message, type: type, problemId }),
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.sha;
    })
    .catch((error)=>{
      console.log(error);
    });
}