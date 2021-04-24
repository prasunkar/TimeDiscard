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
        var stop=true;
        break;
        }
     }
     if(stop!=true){
     let start=true;
     chrome.storage.local.get("act",({act})=>{
        if(act==false){
          let prevTime= Date.now()
          chrome.storage.local.get("procSessions",({procSessions})=>{
            procSessions+=1;
            chrome.storage.local.set({procSessions});
          });
          chrome.storage.local.set({prevTime});
        }
     });
     let act=true;
     chrome.storage.local.set({act});
     chrome.storage.local.set({start});
     }
     chrome.storage.local.get("act",({act})=>{
     if(act){
        chrome.storage.local.get("start",({start})=>{
            if(start==false){
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    chrome.storage.local.set({procTotal});
                    console.log(Math.floor(procTotal/1000));
                });
            });
            let act=false;
            chrome.storage.local.set({act});
            }
        });
     }
     });
     chrome.storage.local.get("prevTime",({prevTime})=>{
        console.log(prevTime);
     });
     chrome.storage.local.get("procSessions",({procSessions})=>{
        console.log(procSessions);
     });
      });
});
chrome.tabs.onUpdated.addListener(async ()=>{
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
        var stop=true;
        break;
        }
     }
     if(stop!=true){
     let start=true;
     chrome.storage.local.get("act",({act})=>{
        if(act==false){
          let prevTime= Date.now()
          chrome.storage.local.get("procSessions",({procSessions})=>{
            procSessions+=1;
            chrome.storage.local.set({procSessions});
          });
          chrome.storage.local.set({prevTime});
        }
     });
     let act=true;
     chrome.storage.local.set({act});
     chrome.storage.local.set({start});
     }
     chrome.storage.local.get("act",({act})=>{
     if(act){
        chrome.storage.local.get("start",({start})=>{
            if(start==false){
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    chrome.storage.local.set({procTotal});
                    console.log(Math.floor(procTotal/1000));
                });
            });
            let act=false;
            chrome.storage.local.set({act});
            }
        });
     }
     });
     chrome.storage.local.get("prevTime",({prevTime})=>{
        console.log(prevTime);
     });
     chrome.storage.local.get("procSessions",({procSessions})=>{
        console.log(procSessions);
     });
      });
});
chrome.windows.onRemoved.addListener(()=>{
console.log("off");
    chrome.storage.local.get("act",({act})=>{
    console.log(act);
     if(act){
        chrome.storage.local.get("start",({start})=>{
            if(start){
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    chrome.storage.local.set({procTotal});
                    console.log(Math.floor(procTotal/1000));
                });
            });
            let act=false;
            chrome.storage.local.set({act});
            }
        });
     }
     });
});