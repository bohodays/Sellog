// Set to true to enable console log
const debug = false;

let loader;
let count  = 0;
let content  = "";

const currentUrl = window.location.href;
// console.log(currentUrl);


if (currentUrl.includes('tistory.com/manage/newpost')) startLoader();

function startLoader() {
  loader = setInterval(async () => {
    if(document.querySelector("#editor-tistory_ifr")){
      // iframe 요소 가져오기
      var iframe = document.querySelector('#editor-tistory_ifr');

      // iframe 내부의 document 객체 가져오기
      var iframeDoc = iframe.contentWindow.document;

      // iframe 내부의 #tinymce 요소의 textContent 가져오기
      content = iframeDoc.querySelector('#tinymce').textContent;
    }

    if(!document.querySelector("#publish-btn")) {
      return;
    }
    const publishBtn = document.querySelector("#publish-btn");

    count ++;
    if (count > 1) return;

    publishBtn.addEventListener('click', (e) => {
      window.addEventListener('beforeunload', (e) => {
        try {
          e.preventDefault();
          // console.log("이벤트막아")
          stopLoader();
          const title = document.querySelector("#post-title-inp").textContent;
          const url = document.querySelector("#editor-root > div:nth-child(42) > div > div > div > form > fieldset > div.layer_body > div > dl:nth-child(5) > dd > span").textContent + title;
          const message = `[Tistory] Title: ${title}`+'\n'+ `URL: ${url}`+'\n' + `CONTENT : ${content}`;

          console.log(message);
          uploadOnePostingOnSellog(message)
            .then(() => {
              // 페이지 이동
              // console.log("다시 이동해");
              publishBtn.click();
            })
          
        } catch(error){
          console.log(error);
        }
      });
      
    });

    
  }, 500);
}

function stopLoader() {
  clearInterval(loader);
  loader = null;
}
  