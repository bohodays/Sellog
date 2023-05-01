// Set to true to enable console log
// const debug = false;

let loader;

const currentUrl = window.location.href;
console.log(currentUrl);

if (currentUrl.includes('tistory.com/manage/newpost')) {
  window.addEventListener('DOMContentLoaded', () => {
    const publishBtn = document.querySelector("#publish-btn");
    if (!publishBtn) return;
    console.log(publishBtn);

    publishBtn.addEventListener('click', async () => {
      console.log("1111");
      try {
        const title = document.querySelector("#post-title-inp").textContent;
        const content = document.querySelector("#tinymce").textContent;
        const url = document.querySelector("#editor-root > div > div > div > div > form > fieldset > div.layer_body > div > dl:nth-child(5) > dd > span").textContent + title;
        const message = `[Tistory] Title: ${title}, content: ${content}`+'\n\n'+ `URL: ${url}`;
                
        console.log(message);
        await uploadOnePostingOnSellog(message);
      } catch(error){
        console.log(error);
      }
    })
  });
}

  