// eslint-disable-next-line no-unused-vars
const oAuth2 = {
  /**
   * Initialize
   */
  init() {
    this.KEY = 'Sellog_token';
    this.GITHUB_ACCESS_TOKEN_URL = 'http://k8a404.p.ssafy.io:8080/oauth2/authorization/github';
    this.TISTORY_ACCESS_TOKEN_URL = 'http://k8a404.p.ssafy.io:8080/oauth2/authorization/tistory';
  },

  /**
   * Begin
   */
  begin(type) {
    this.init(); // secure token params.
    
    var url = '';
    
    if(type === 'github'){
      url = `${this.GITHUB_ACCESS_TOKEN_URL}`;
    }else{
      url = `${this.TISTORY_ACCESS_TOKEN_URL}`;
    }
    

    chrome.storage.local.set({ pipe_Sellog: true }, () => {
      // opening pipe temporarily

      chrome.tabs.create({ url, selected: true }, function () {
        window.close();
        chrome.tabs.getCurrent(function (tab) {
          // chrome.tabs.remove(tab.id, function () {});
        });
      });
    });
  },
};
