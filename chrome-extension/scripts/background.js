/**
 * solvedac 문제 데이터를 파싱해오는 함수.
 * @param {int} problemId
 */
async function SolvedApiCall(problemId) {
  return fetch(`https://solved.ac/api/v3/problem/show?problemId=${problemId}`, { method: 'GET' })
    .then((query) => query.json());
}

// 알림을 띄워주는 함수
function sendNotification(point) {
  console.log("알림창");
  if(point > 0){
    chrome.notifications.create({
      type: "basic",
      title: "SELLOG",
      iconUrl: "../assets/sellogo.png",
      message: point + "포인트가 적립되었습니다.",
      priority: 2, // -2 to 2 (highest)
  
      eventTime: Date.now(),
    }, () => {
    });
  }else if(point == -1){
    chrome.notifications.create({
      type: "basic",
      title: "SELLOG",
      iconUrl: "../assets/sellogo.png",
      message: "기준점을 넘지 못해 기록이 인정되지 않습니다.",
      priority: 2, // -2 to 2 (highest)
      eventTime: Date.now(),
    }, () => {
    });
  }else if(point == -2){
    chrome.notifications.create({
      type: "basic",
      title: "SELLOG",
      iconUrl: "../assets/sellogo.png",
      message: "목표를 설정해주세요.",
      priority: 2, // -2 to 2 (highest)
      eventTime: Date.now(),
    }, () => {
    });
  }else{
    chrome.notifications.create({
      type: "basic",
      title: "SELLOG",
      iconUrl: "../assets/sellogo.png",
      message: "기준점을 넘지 못해 기록이 인정되지 않습니다.",
      priority: 2, // -2 to 2 (highest)
      eventTime: Date.now(),
    }, () => {
    });
  }
}

function handleMessage(request, sender, sendResponse) {
  console.log(request);
  if (request && request.message == "alarm") {
    console.log("g2g2");
    sendNotification(
      request.payload.point,
    );
  }
  if (request && request.closeWebPage === true && request.isSuccess === true) {
    /* Set username */
    chrome.storage.local.set(
      { Sellog_username: request.username } /* , () => {
      window.localStorage.Sellog_username = request.username;
    } */,
    );

    /* Set token */
    chrome.storage.local.set(
      { Sellog_token: request.token } /* , () => {
      window.localStorage[request.KEY] = request.token;
    } */,
    );

    /* Set img */
    chrome.storage.local.set(
      { Sellog_img: request.img }
    );

    /* Close pipe */
    chrome.storage.local.set({ pipe_Sellog: false }, () => {
      console.log('Closed pipe.');
    });

    // chrome.tabs.getSelected(null, function (tab) {
    //   chrome.tabs.remove(tab.id);
    // });

    /* Go to onboarding for UX */
    // const urlOnboarding = `chrome-extension://${chrome.runtime.id}/welcome.html`;
    // chrome.tabs.create({ url: urlOnboarding, selected: true }); // creates new tab
  } else if (request && request.closeWebPage === true && request.isSuccess === true) {
    alert('Something went wrong while trying to authenticate your profile!');
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.remove(tab.id);
    });
  } else if (request && request.sender == "baekjoon" && request.task == "SolvedApiCall") {
    SolvedApiCall(request.problemId).then((res) => sendResponse(res));
    //sendResponse(SolvedApiCall(request.problemId))
  } 
  return true;
}

chrome.runtime.onMessage.addListener(handleMessage);
