// Set to true to enable console log
// const debug = false;

let loader;
let count  = 0;

const currentUrl = window.location.href;
console.log(currentUrl);


if (currentUrl.includes('velog.io/write')) startLoader();

function startLoader() {
  loader = setInterval(async () => {
    // 기능 Off시 작동하지 않도록 함
    if(!document.querySelector("#root > div.sc-bzPmhk.dysCVS > div.sc-cVAmsi.llwjEf > div > div.sc-ksHpcM.sc-gXRojI.cPjSUg.nWFWW > div.sc-fTxOGA.dtVSnX > button.sc-kDTinF.NdyQG")) {
      return;
    }
    const publishBtn = document.querySelector("#root > div.sc-bzPmhk.dysCVS > div.sc-cVAmsi.llwjEf > div > div.sc-ksHpcM.sc-gXRojI.cPjSUg.nWFWW > div.sc-fTxOGA.dtVSnX > button.sc-kDTinF.NdyQG");

    publishBtn.addEventListener('click', (e) => {
      count ++;
      if(count > 1) return;
      stopLoader();
      window.addEventListener('beforeunload', () => {
        try {
          const title = document.querySelector("#root > div.sc-bzPmhk.dysCVS > div.sc-cVAmsi.llwjEf > div > div:nth-child(1) > section > div > div.sc-dcgwPl.cVtfog > h4").textContent;
          const url = "https://velog.io" + document.querySelector("#root > div.sc-bzPmhk.dysCVS > div.sc-cVAmsi.llwjEf > div > div.sc-ksHpcM.sc-gXRojI.cPjSUg.nWFWW > div:nth-child(1) > section.sc-fydGpi.cmTOmx.sc-gVkuDy.kbHzWp > div > div > div").textContent + title;
          const message = `[Velog] Title: ${title}`+'\n'+ `URL: ${url}`;

          console.log(message);
          uploadOnePostingOnSellog(message);
          
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
  