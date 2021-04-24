chrome.runtime.onInstalled.addListener(() => {
  let procTotal=0;
  let prevTime = Date.now();
  chrome.storage.local.set({prevTime});
  chrome.storage.local.set({procTotal});
  let start=false;
  let procSessions = 0;
  chrome.storage.local.set({procSessions});
  let hours= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  let days ={"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[]};
  let workSites=["docs.google.com","www.w3schools.com"];
  let act=false;
  chrome.storage.local.set({act});
  chrome.storage.local.set({days});
  chrome.storage.local.set({hours});
  chrome.storage.local.set({start});
  chrome.storage.local.set({workSites});
});
chrome.runtime.onStartup.addListener(()=>{
    var prevTime = Date.now();
    chrome.storage.local.set({prevTime});
    let start=false;
    let act=false;
    chrome.storage.local.set({act});
    chrome.storage.local.set({start});
});
chrome.tabs.onActivated.addListener(async ()=>{
 let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 let extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
 let website = extractSite.exec(tab.url);
 console.log(website[0]);
 chrome.storage.local.get("workSites",({workSites})=>{
     console.log(workSites);
     for(var i=0;i<workSites.length;i++){
        if(website[0]==workSites[i]){
        let start=false;
        chrome.storage.local.set({start});
        break;
        }
        else{
        let start=true;
        chrome.storage.local.set({start});
        }
     }
      chrome.storage.local.get("start",({start})=>{
    console.log(start);
 });
 });
});

