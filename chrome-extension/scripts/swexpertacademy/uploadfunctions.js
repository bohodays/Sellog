/** 푼 문제들에 대한 단일 업로드는 uploadGit 함수로 합니다.
 * 파라미터는 아래와 같습니다.
 * @param {string} commitMessage - 메시지
 * @param {function} cb - 콜백 함수 (ex. 업로드 후 로딩 아이콘 처리 등)
 * @returns {Promise<void>}
 */
async function uploadOneSolveProblemOnGit(bojData, cb) {
  const token = await getToken();
  if (isNull(token)) {
    console.error('token is null', token);
    return;
  }
  return upload(token, bojData.message, bojData.problemId, cb);
}
/** 업로드
 * @param {string} token
 * @param {string} message - 기록 정보
 * @param {function} cb - 콜백 함수 (ex. 업로드 후 로딩 아이콘 처리 등)
 */
async function upload(token, message, problemId, cb) {
  const git = new GitHub(token);
  const stats = await getStats();
  await git.createRecord("swea", message, problemId);

  // 콜백 함수 실행
  if (typeof cb === 'function') cb();
}