// Set to true to enable console log
// const debug = false;

let loader;
let count  = 0;

const currentUrl = window.location.href;
console.log(currentUrl);


if (currentUrl.includes('tistory.com/manage/newpost')) startLoader();

function startLoader() {
  loader = setInterval(async () => {
    // 기능 Off시 작동하지 않도록 함
    if(!document.querySelector("#publish-btn")) {
      return;
    }
    const publishBtn = document.querySelector("#publish-btn");
    // const content = document.querySelector("#tinymce").textContent;

    publishBtn.addEventListener('click', (e) => {
      count ++;
      if(count > 1) return;
      stopLoader();
      window.addEventListener('beforeunload', async() => {
        try {
          const title = document.querySelector("#post-title-inp").textContent;
          const url = document.querySelector("#editor-root > div:nth-child(42) > div > div > div > form > fieldset > div.layer_body > div > dl:nth-child(5) > dd > span").textContent + title;
          const message = `[Tistory] Title: ${title}`+'\n'+ `URL: ${url}`;

          console.log(message);
          await uploadOnePostingOnSellog(message);
        } catch(error){
          console.log(error);
        }
      });
      
    });

    
  }, 1000);
}

function clickEvent() {
  
}
function stopLoader() {
  clearInterval(loader);
  loader = null;
}
  