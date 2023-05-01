// Set to true to enable console log
// const debug = false;

let loader;

const currentUrl = window.location.href;

// 버튼 누르면 제출
if (currentUrl.includes('tistory.com/manage/newpost')) {
    document.querySelector("#publish-btn").addEventListener('click', async () => {
        try{
            const title = document.querySelector("#post-title-inp").textContent;
            const content = document.querySelector("#tinymce").textContent;
            const url = document.querySelector("#editor-root > div:nth-child(42) > div > div > div > form > fieldset > div.layer_body > div > dl:nth-child(5) > dd > span").textContent
                + title;
            const message = `[Tistory] Title: ${title}, content: ${content}`+'\n\n'+
                    `URL: ${url}`;
            
            console.log(message);
            await uploadOnePostingOnSellog(message);
            
        } catch(error){
            console.log(error);
        }
    })
}

  