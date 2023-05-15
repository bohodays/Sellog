/* 
    (needs patch) 
    IMPLEMENTATION OF AUTHENTICATION ROUTE AFTER REDIRECT FROM GITHUB.
*/

const localAuth = {
  /**
   * Initialize
   */
  init() {
    this.KEY = 'Sellog_token';
    this.ACCESS_TOKEN_URL = 'https://k8a404.p.ssafy.io/oauth2/authorization/github';
  },

  requestToken(url) {
    const that = this;
    if (url.match(/\?error=(.+)/)) {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {});
      });
    } else {
      // eslint-disable-next-line
      const accessToken = url.match(/\&accessToken=([\w\/\-.,]+)/);
      // console.log(accessToken);
      if (accessToken) {
        that.finish(accessToken[1]);
      }else {
        chrome.runtime.sendMessage({
          closeWebPage: true,
          isSuccess: false,
        });
      }
    }
  },

  /**
   * Finish
   *
   * @param token The OAuth2 token given to the application from the provider.
   */
  finish(token) {
    /* Get username */
    // To validate user, load user object from GitHub.
    const AUTHENTICATION_URL = 'https://k8a404.p.ssafy.io/api/user';

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const username = JSON.parse(xhr.responseText).response.nickname;
          const img = JSON.parse(xhr.responseText).response.img;
          // sendMessage를 통해 background.js request로 전달
          chrome.runtime.sendMessage({
            closeWebPage: true,
            isSuccess: true,
            token,
            username,
            img,
            KEY: this.KEY,
          });
        }
      }
    });
    xhr.open('GET', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
  },
};

localAuth.init(); // load params.
const link = window.location.href;
/* Check for open pipe */
if (link.includes("k8a404.p.ssafy.io") && link.includes("refreshToken") && link.includes("accessToken")) {
  chrome.storage.local.get('pipe_Sellog', (data) => {
    if (data && data.pipe_Sellog) {
      localAuth.requestToken(link);
    }
  });
}else if(link.includes("k8a404.p.ssafy.io")){
  //k8a404 로컬스토리에 저장되어있는 토큰을 가져오기
  chrome.storage.local.get('pipe_Sellog', (data) => {
    if (data && data.pipe_Sellog && localStorage.getItem("accessToken") ) {
      localAuth.finish(localStorage.getItem("accessToken"));
    }
  });
}
