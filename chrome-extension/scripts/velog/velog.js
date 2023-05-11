// Set to true to enable console log
// const debug = false;

let loader;
let ispublish  = false;
let content = '';
let title = '';

const currentUrl = window.location.href;
console.log(currentUrl);


if (currentUrl.includes('velog.io')) startLoader();
else stopLoader();
// if (currentUrl.includes('velog.io')){
//   if(currentUrl.includes('velog.io/write')) startLoader();
//   else{
//     const btn = document.querySelector('.write-button');
//     console.log(btn);
//     btn.addEventListener('click',() => {
//       console.log("새글작성 이벤트");
//       startLoader();
//     })
//   }  
// }

function startLoader() {
  if (loader) {
    return;
  }

  loader = setInterval(async () => {
    // 기능 Off시 작동하지 않도록 함
    console.log(ispublish);
    if (document.querySelector('[data-testid="publish"]') && !ispublish) {
      ispublish = true;
      const publishBtn = document.querySelector('[data-testid="publish"]');

      const publishHandler = async (e) => {
        
        stopLoader();
        try {
          title = document.querySelector("#preview > h1").textContent
          
          // let title = '';
          // const elements = document.querySelectorAll('h4');
          // if (elements.length > 0) {
          //   title = elements[elements.length - 1].textContent;
          //   // 마지막 요소에 대한 로직을 작성합니다.
          // }else{
          //   title = document.querySelector('h4').textContent;
          // }

          content = document.querySelector("#preview > div").textContent;
          const url = "https://velog.io" + document.querySelector('.username').textContent + title;
          console.log(url);
          const message = `[Velog] Title: ${title}`+'\n'+ `URL: ${url}`+'\n' + `CONTENT : ${content}`;

          console.log(message);
          uploadOnePostingOnSellog(message);
          console.log("전송완");
        } catch(error){
          console.log(error);
        } finally {
          ispublish = false;
          console.log("변경");
          content = '';
          title = '';
          startLoader();
        }
      }

      // 기존의 이벤트 리스너 제거 후, 다시 등록
      publishBtn.removeEventListener('click', publishHandler);
      publishBtn.addEventListener('click', publishHandler); 
    }

  }, 1000);
}


function stopLoader() {
  clearInterval(loader);
  loader = null;
}
  