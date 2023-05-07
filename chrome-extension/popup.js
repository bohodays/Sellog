/* global oAuth2 */
/* eslint no-undef: "error" */

let action = false;

$('#authenticateGithub').on('click', () => {
  if (action) {
    oAuth2.begin("github");
  }
});

$('#authenticateTistory').on('click', () => {
  if (action) {
    oAuth2.begin("tistory");
  }
});

/* Get URL for welcome page */
//$('#welcome_URL').attr('href', `chrome-extension://${chrome.runtime.id}/welcome.html`);

chrome.storage.local.get('Sellog_token', (data) => {
  const token = data.Sellog_token;
  if (token === null || token === undefined) {
    action = true;
    $('#auth_mode').show();
  } else {
    const AUTHENTICATION_URL = 'https://k8a404.p.ssafy.io/api/user';

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) { //데이터를 전부 받은 상태
        if (xhr.status === 200) {
          const username = JSON.parse(xhr.responseText).response.nickname;
          const img = JSON.parse(xhr.responseText).response.img;
          console.log(username);
          chrome.storage.local.set(
            { Sellog_username: username }
          );

          chrome.storage.local.set(
            { Sellog_img: img }
          );

          $('#commit_mode').show();
          chrome.storage.local.get(['Sellog_username'], (data3) => {
            // console.log(JSON.parse(xhr.responseText).response.nickname);
            const nickname = data3.Sellog_username;
            if (nickname) {
              $('#nickname').html(`<a target="blank" style="color: black !important;">${nickname}</a>`);
            }    
          });

          chrome.storage.local.get(['Sellog_img'], (data4) => {
            const img = data4.Sellog_img;
            if (img && img === 1) {
              $('#userImg').html(`<img src="assets/profile1.png" width="150" height="150"></img>`);
            } else {
              $('#userImg').html(`<img src="${img}" width="150" height="150"></img>`);
            }
          });

        } else {
          // bad oAuth
          // reset token and redirect to authorization process again!
          chrome.storage.local.set({ Sellog_token: null }, () => {
            console.log('BAD token!!! Redirecting back to oAuth process');
            action = true;
            $('#auth_mode').show();
          });
        }
      }
    });
    xhr.open('GET', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();

  }
});

/*
  초기에 활성화 데이터가 존재하는지 확인, 없으면 새로 생성, 있으면 있는 데이터에 맞게 버튼 조정
 */
chrome.storage.local.get('bjhEnable', (data4) => {
  if (data4.bjhEnable === undefined) {
    $('#onffbox').prop('checked', true);
    chrome.storage.local.set({ 'bjhEnable': $('#onffbox').is(':checked') }, () => { });
  }
  else {
    $('#onffbox').prop('checked', data4.bjhEnable);
    chrome.storage.local.set({ 'bjhEnable': $('#onffbox').is(':checked') }, () => { });
  }
})
/*
  활성화 버튼 클릭 시 storage에 활성 여부 데이터를 저장.
 */
$('#onffbox').on('click', () => {
  chrome.storage.local.set({ 'bjhEnable': $('#onffbox').is(':checked') }, () => { });
});