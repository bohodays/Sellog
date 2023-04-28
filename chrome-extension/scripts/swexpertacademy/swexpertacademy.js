// Set to true to enable console log
const debug = false;

/* 
  문제 제출 맞음 여부를 확인하는 함수
  2초마다 문제를 파싱하여 확인
*/
let loader;

const currentUrl = window.location.href;

// SWEA 연습 문제 주소임을 확인하고, 맞는 파서를 실행
if (currentUrl.includes('/main/solvingProblem/solvingProblem.do') && document.querySelector('header > h1 > span').textContent === '모의 테스트') startLoader();
else if (currentUrl.includes('/main/code/problem/problemSolver.do') && currentUrl.includes('extension=Sellog')) parseAndUpload();

function parseAndUpload() {
  //async wrapper
  (async () => {
    const bojData = await parseData();
    await beginUpload(bojData);
  })();
}
function startLoader() {
  loader = setInterval(async () => {
    // 기능 Off시 작동하지 않도록 함
    const enable = await checkEnable();
    if (!enable) stopLoader();
    // 제출 후 채점하기 결과가 성공적으로 나왔다면 코드를 파싱하고,
    // 결과 페이지로 안내한다.
    else if (getSolvedResult().includes('pass입니다')) {
      log('정답이 나왔습니다. 코드를 파싱합니다');
      stopLoader();
      try {
        const { contestProbId } = await parseCode();
        // prettier-ignore
        await makeSubmitButton(`${window.location.origin}`
          + `/main/code/problem/problemSolver.do?`
          + `contestProbId=${contestProbId}&`
          + `nickName=${getNickname()}&`
          + `extension=Sellog`);
      } catch (error) {
        log(error);
      }
    }
  }, 2000);
}

function getSolvedResult() {
  return document.querySelector('div.popup_layer.show > div > p.txt')?.innerText.trim().toLowerCase() || '';
}

function stopLoader() {
  clearInterval(loader);
}

/* 파싱 직후 실행되는 함수 */
async function beginUpload(bojData) {
  log('bojData', bojData);
  startUpload();
  if (isNotEmpty(bojData)) {
    const stats = await getStats();

    const currentVersion = stats.version;
    /* version을 최신으로 변경한다 */
    if (isNull(currentVersion) || currentVersion !== getVersion()) {
      await versionUpdate();
    }
    await uploadOneSolveProblemOnGit(bojData, markUploadedCSS);
  }
}

async function versionUpdate() {
  log('start versionUpdate');
  const stats = await updateLocalStorageStats();
  // update version.
  stats.version = getVersion();
  await saveStats(stats);
  log('stats updated.', stats);
}
