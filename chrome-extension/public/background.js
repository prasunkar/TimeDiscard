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
  let workSites=["docs.google.com","www.w3schools.com","www.google.com"];
  let procSites={};
  chrome.storage.local.set({procSites});
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
    let on=false;
    chrome.storage.local.set({on});
    let init=true;
    chrome.storage.local.set({init});
});
chrome.windows.onCreated.addListener(()=>{
    chrome.storage.local.get("on",({on})=>{
        if(on==false){
            let timer=25;
            chrome.storage.local.set({timer});
            chrome.alarms.create({ periodInMinutes: 1 });
            on=true;
            let relax=false;
            chrome.storage.local.set({relax});
            chrome.storage.local.set({on});
        }
    });
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get("timer",({timer})=>{
    chrome.storage.local.get("relax",({relax})=>{
    if(relax==false){
        timer-=1;
        if(timer==0){
        chrome.tabs.create({url:"/index.html"});
        timer=5;
        let relax=true;
        chrome.storage.local.set({relax});
        }
        chrome.storage.local.set({timer});
    }
    else{
        chrome.storage.local.get("timer",({timer})=>{
            timer-=1;
            chrome.storage.local.set({timer});
            if(timer==0){
            let relax=false;
            chrome.storage.local.set({relax});
            }
        });
    }
    });
});
});
chrome.tabs.onActivated.addListener(async ()=>{
 let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 let extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
 var website = extractSite.exec(tab.url);
 if(website==null){
 website=["www.google.com"];
 }
 console.log("URL of website:"+website[0]);
 chrome.storage.local.get("workSites",({workSites})=>{
     console.log("work sites:"+workSites);
     for(var i=0;i<workSites.length;i++){
        if(website[0]==workSites[i]){
        let start=false;
        chrome.storage.local.set({start});
        var stop=true;
        break;
        }
     }
     if(stop!=true){
      chrome.history.addUrl({url:tab.url},()=>{
    return 0;
 });
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
     chrome.storage.local.get("procSites",({procSites})=>{
        if(typeof procSites[website[0]] === 'undefined'){
        procSites[website[0]]=0;
        chrome.storage.local.set({procSites});
        }
     });
     }
     });
     chrome.storage.local.get("act",({act})=>{
     if(act){
     console.log("hello");
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    console.log("timediff:"+timediff);
                    chrome.storage.local.set({procTotal});
                    console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
                });
                     chrome.history.search({text:"",maxResults:2},(result)=>{
        extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
        chrome.storage.local.get("start",({start})=>{
        if(start){
        var prevSite=extractSite.exec(result[1].url)[0];
        }
        else if(start==false){
        var prevSite=extractSite.exec(result[0].url)[0];
        }
        console.log(prevSite);
        chrome.storage.local.get("procSites",({procSites})=>{
        procSites[prevSite]+=timediff;
        console.log("heckle");
        console.log(procSites[prevSite]);
        chrome.storage.local.set({procSites});
         prevTime=curTime;
         chrome.storage.local.set({prevTime});
        chrome.storage.local.get("procSites",({procSites})=>{
        console.log("procrastination sites visited and time:")
        for (const [key, value] of Object.entries(procSites)) {
            console.log(`${key}: ${Math.floor(value/1000)}`);
        }
     });
     });
        });
     });
                chrome.storage.local.get("start",({start})=>{
                if(start==false){
                        let act=false;
                        chrome.storage.local.set({act});
                }
                });
            });
     }
     });
     chrome.storage.local.get("prevTime",({prevTime})=>{
        console.log("prevTime:"+prevTime);
     });
     chrome.storage.local.get("procTotal",({procTotal})=>{
        console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
     });
     chrome.storage.local.get("procSessions",({procSessions})=>{
        console.log("# of procrastination:"+procSessions);
     });
});
chrome.tabs.onUpdated.addListener(async ()=>{
 let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 let extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
 var website = extractSite.exec(tab.url);
 if(website==null){
 website=["www.google.com"];
 }
 console.log("URL of website:"+website[0]);
 chrome.storage.local.get("workSites",({workSites})=>{
     console.log("work sites:"+workSites);
     for(var i=0;i<workSites.length;i++){
        if(website[0]==workSites[i]){
        let start=false;
        chrome.storage.local.set({start});
        var stop=true;
        break;
        }
     }
     if(stop!=true){
     if(website[0]=="www.google.com"){
    chrome.history.addUrl({url:"https://www.google.com/"},()=>{
    return 0;
    });
    }
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
     chrome.storage.local.get("procSites",({procSites})=>{
        if(typeof procSites[website[0]] === 'undefined'){
        procSites[website[0]]=0;
        chrome.storage.local.set({procSites});
        }
     });
     }
     });
     chrome.storage.local.get("act",({act})=>{
     if(act){
     console.log("hello");
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    console.log("timediff:"+timediff);
                    chrome.storage.local.set({procTotal});
                    console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
                });
                     chrome.history.search({text:"",maxResults:2},(result)=>{
        extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
        chrome.storage.local.get("init",({init})=>{
        if(!init){
        var prevSite=extractSite.exec(result[1].url)[0];
        console.log(prevSite);
        chrome.storage.local.get("procSites",({procSites})=>{
        procSites[prevSite]+=timediff;
        console.log("heckle");
        console.log(procSites[prevSite]);
        chrome.storage.local.set({procSites});
         prevTime=curTime;
         chrome.storage.local.set({prevTime});
         }
        chrome.storage.local.get("procSites",({procSites})=>{
        console.log("procrastination sites visited and time:")
        for (const [key, value] of Object.entries(procSites)) {
            console.log(`${key}: ${Math.floor(value/1000)}`);
        }
     });
     });
        });
     });
                chrome.storage.local.get("start",({start})=>{
                if(start==false){
                        let act=false;
                        chrome.storage.local.set({act});
                }
                });
            });
     }
     });
     chrome.storage.local.get("prevTime",({prevTime})=>{
        console.log("prevTime:"+prevTime);
     });
     chrome.storage.local.get("procTotal",({procTotal})=>{
        console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
     });
     chrome.storage.local.get("procSessions",({procSessions})=>{
        console.log("# of procrastination:"+procSessions);
     });
     chrome.storage.local.get("init",({init})=>{
if(init){
init=false;
chrome.storage.local.set({init});
}
});
});
chrome.windows.onRemoved.addListener(()=>{
    chrome.storage.local.get("act",({act})=>{
     if(act){
     console.log("hello");
            chrome.storage.local.get("prevTime",({prevTime})=>{
                let curTime= Date.now();
                let timediff=curTime-prevTime;
                chrome.storage.local.get("procTotal",({procTotal})=>{
                    procTotal+=timediff;
                    console.log("timediff:"+timediff);
                    chrome.storage.local.set({procTotal});
                    console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
                });
                     chrome.history.search({text:"",maxResults:1},(result)=>{
        extractSite= new RegExp("(?<=//).*[.][a-z]*(?=/)",'g');
        chrome.storage.local.get("start",({start})=>{
        var prevSite=extractSite.exec(result[0].url)[0];
        console.log(prevSite);
        chrome.storage.local.get("procSites",({procSites})=>{
        procSites[prevSite]+=timediff;
        console.log("heckle");
        console.log(procSites[prevSite]);
        chrome.storage.local.set({procSites});
         prevTime=curTime;
         chrome.storage.local.set({prevTime});
        chrome.storage.local.get("procSites",({procSites})=>{
        console.log("procrastination sites visited and time:")
        for (const [key, value] of Object.entries(procSites)) {
            console.log(`${key}: ${Math.floor(value/1000)}`);
        }
     });
     });
        });
     });
                chrome.storage.local.get("start",({start})=>{
                if(start==false){
                        let act=false;
                        chrome.storage.local.set({act});
                }
                });
            });
     }
     act=false;
     chrome.storage.local.set({act});
     start=false;
     chrome.storage.local.set({start});
     chrome.windows.getCurrent((window)=>{
console.log(window.id)
if(typeof window.id==='undefined'){
    let init=true;
    chrome.storage.local.set({init});
}
});
     });
     chrome.storage.local.get("prevTime",({prevTime})=>{
        console.log("prevTime:"+prevTime);
     });
     chrome.storage.local.get("procTotal",({procTotal})=>{
        console.log("time spent procrastinating:"+Math.floor(procTotal/1000));
     });
     chrome.storage.local.get("procSessions",({procSessions})=>{
        console.log("# of procrastination:"+procSessions);
     });
     chrome.storage.local.get("procSites",({procSites})=>{
        console.log("procrastination sites visited and time:")
        for (const [key, value] of Object.entries(procSites)) {
            console.log(`${key}: ${Math.floor(value/1000)}`);
        }
     });
});