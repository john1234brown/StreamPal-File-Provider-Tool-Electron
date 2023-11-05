const http = require('node:http');
const fs = require('node:fs');
const { promises: Fs } = require('node:fs');
const path = require('node:path');
const SmeeClient = require('smee-client');
var configJSON;
var configjson;
var __newDirName;
var p2pRunning = false;
var pingEventReady = false;
//let execPath;
/*let rootDir = app.getAppPath()
let last = path.basename(rootDir)
if (last == 'app.asar') {
    if(process.
    rootDir = Path.dirname(app.getPath('exe'))
}*/
//__newDirName = process.env.INIT_CWD;
//__newDirName = process.env.PORTABLE_EXECUTABLE_FILE;
//console.log(process.env.PORTABLE_EXECUTABLE_FILE);
//__newDirName = path.dirname (process.execPath);
//Our 6 Way server backup system will plan on using a ipns location to keep up with them incase of changes in the future!
const smeeReplit = new SmeeClient({
  source: 'https://sse.johnsfriends.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});
const smeeReplitBackup = new SmeeClient({
  source: 'https://sse1.streampal.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});
const smeeReplitBackup2 = new SmeeClient({
  source: 'https://sse2.streampal.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});
const smeeReplitBackup3 = new SmeeClient({
  source: 'https://sse3.streampal.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});
const smeeReplitBackup4 = new SmeeClient({
  source: 'https://sse4.streampal.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});

const smee = new SmeeClient({
  source: 'https://sse.johnsfriends.repl.co/requesting',
  target: null,
  //onmessage: onMessage,
  logger: console
});
var eventsReplit;
var eventsReplitBackup;
var eventsReplitBackup2;
var eventsReplitBackup3;
var eventsReplitBackup4;
var eventsSmee;
//HERE WE INITIALIZE ALL OF OUR VARIABLES TO THE EXECUTION FOLDER USING THE ./ directory path!
//AND taking a file from the path.join(app.getAppPath(), 'filepath') and writing it to the ./ Directory if it doesn't exist!
async function initializeObjectsInExecutionPath() {
  //Here
  switch (process.platform) {
    case "win32":
      //Do Nothing config file is saved and used from the appData Program location folder on windows!
      //The installer for windows auto handles and bundles all of that!
      //The only thing this os needs is the quit option to close this process from the tray icon
      var configJSON = await fs.promises.readFile('./config.json');
      configjson = JSON.parse(configJSON);
      __newDirName = configjson.repoDir.replaceAll('//', '\\');
      console.log(__newDirName);
      console.log(configjson);
      rootFolderName = configjson.listOfRootFolderNames[rootFolderIndex];
      break;
    case "linux":
      //fs.readFileSync()
      try {
        const stat = fs.existsSync('./config.json');
        if (stat) {
          console.log('It exists the user config!');
          var configJSON = await fs.promises.readFile('./config.json');
          configjson = JSON.parse(configJSON);
          rootFolderName = configjson.listOfRootFolderNames[rootFolderIndex];
          __newDirName = configjson.repoDir;
          console.log(configjson);
          return;// new Promise(resolve=>resolve('done'));
          /*Do nothing continue already exists everything is all good!*/
        } else {
          try {
            const stat2 = fs.existsSync(path.join(path.dirname(process.execPath), '/config.json'));
            console.log('Default config was found:', stat2);
            if (stat2) {
              try {
                const defaultconfig = await fs.promises.readFile(path.join(path.dirname(process.execPath), '/config.json'));
                var json = JSON.parse(defaultconfig);
                await fs.promises.writeFile('./config.json', JSON.stringify(json, null, " "), { flag: 'wx' });
                configjson = json;
                rootFolderName = configjson.listOfRootFolderNames[rootFolderIndex];
                __newDirName = configjson.repoDir;
                console.log(configjson);
                return;// new Promise(resolve=>resolve('done'));
              } catch (e) {
                console.log(e);
                configJSON = await fs.promises.readFile('./config.json');
                configjson = JSON.parse(configJSON);
                rootFolderName = configjson.listOfRootFolderNames[rootFolderIndex];
                __newDirName = configjson.repoDir;
                console.log(configjson);
                return; //new Promise(resolve=>resolve('done'));
              }
            }
          } catch (error) {
            console.log(error);
            var errmsg = {
              err: "Couldn't write the default config, because the program couldn't find it!"
            };
            await fs.promises.writeFile('./error.log', JSON.stringify(errmsg, null, " "));
            process.exit();
          }
          console.log('HEY THIS FILE DOESNT EXIST OHHHHH NOOOO!!!!!!!!!!!');
        }
      } catch (e1) {
        console.log(e1);
      }
      break;
    case "darwin":
      //This one might react the same as linux so might have to write the config file if not existing

      break;
    case "freebsd":
      //I will have to find a os to test on to find out how it works
      break;
    case "openbsd":
      //I will have to find a os to test on to find out how it works
      break;
  }
}
/*function startInitializeConfig(){

}
startInitializeConfig();*/
//initializeObjectsInExecutionPath();
//const { platform } = require('os');
//const opn = require('better-opn');
process.env.OPEN_MATCH_HOST_ONLY = 'true';
const spawn = require('node:child_process'); // This will allow us to interact with ipfs automagically for the users!
const { Worker, workerData } = require("node:worker_threads");
const timer = ms => new Promise(res => setTimeout(res, ms));
//var exec2 = require('child_process').execFile;
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const realLog = console.log;
var clients = [];
//process.env.IPFS_PATH=__newDirName+"/ipfs"
var prefix = "/"
if (process.platform === "win32") {
  prefix = "\\";
}
var ipfsBinaryPrefix = "";
//const [url] = "http://localhost:3000";
const url = 'https://localhost:3000/'
const electron = require('electron');
//console.log(electron);
const { app, BrowserView, BrowserWindow } = require('electron');
const Tray = electron.Tray;
const iconPath = path.join(path.dirname(process.execPath), '/gui/assets/logos/TabLogo.png');
const Menu = electron.Menu;
var tray = null;

//This Is a test Function used to log things to the console for testing purposes
async function handleClick(menuItem, browserWindow, event) {
  realLog(menuItem);
  realLog(browserWindow);
  realLog(event);
}
//__newDirName = path.join(path.join(path.dirname(app.getPath ('home')), require("os").userInfo().username), 'streampal');


/*async function respond(index, ) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: 'providing', id: '0', url: url })
  };
  const response = await fetch('http://localhost:3050', requestOptions.requestType);
  //console.log(response);
};*/
async function respond(Obj, index) {
  try {
    console.log('posting we have it!');
    var url;
    switch (index) {
      case 0:
        url = 'smee';
        break;
      case 1:
        url = 'https://sse.johnsfriends.repl.co/providing/';
        break;
      case 2:
        url = 'https://sse1.streampal.repl.co/providing/';
        break;
      case 3:
        url = 'https://sse2.streampal.repl.co/providing/';
        break;
      case 4:
        url = 'https://sse3.streampal.repl.co/providing/';
        break;
      case 5:
        url = 'https://sse4.streampal.repl.co/providing/';
        break;
    }

    if ((url !== undefined) && (url !== null)) {
      console.log('Providing',)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Obj)
      };
      const response = await fetch(url, requestOptions);
      console.log('posted to: ', url, 'with body:', Obj);
      console.log(response.status);
      console.log('Posted Response!');
    }
  } catch (e) {
    realLog(e);
  }
}

function startStopP2P() {
  if (p2pRunning) {
    if (configjson.replit) {
      try{
      if (eventsReplit){
        eventsReplit.close();
      }
      if (eventsReplitBackup){
        eventsReplitBackup.close();
      }
      if (eventsReplitBackup2){
        eventsReplitBackup2.close();
      }
      if (eventsReplitBackup3){
        eventsReplitBackup3.close();
      }
      if (eventsReplitBackup4){
        eventsReplitBackup4.close();
      }
      }catch(e){
        realLog(e);
      }
      //eventsReplitBackup2.close();
      //eventsReplitBackup3.close();
      //eventsReplitBackup4.close();
    }
    if (configjson.smee) {
      eventsSmee.close();
    }
    p2pRunning = false;
  } else {
    initializeP2P();
  }
}

function processMsg(Respondindex, msg) {
  try {
    var data = JSON.parse(msg.data);
    if (data.type === 'requesting') {
      console.log('This is not a message it is a request! checking if we have it! if so will respond!:', JSON.stringify(data));
      if (data.reqType) {
        /*if (data.reqType === 'tv'){
          console.log('its a tv request');
        }
        if (data.reqType === 'movie'){
          console.log('its a movie request');
        }*/
        switch (data.reqType) {
          case "tv":
            console.log('Its a tv show');
            //Event better and shorter version to cut down on for looping unnecessarily!
            console.log(data.id);
            if (Pings2Check.find((value, rootIndex) => {
              if (value.find(row => parseInt(row.id) === parseInt(data.id))) {
                console.log('WE found it we have it!\n with rootIndex of:', rootIndex);
              if (arrayOfPingJsonTemp[rootIndex].info.tvshows.find(row => parseInt(row.id) === parseInt(data.id))){
                var tvIndex = arrayOfPingJsonTemp[rootIndex].info.tvshows.findIndex(row => parseInt(row.id) === parseInt(data.id));
                if (arrayOfPingJsonTemp[rootIndex].info.tvshows[tvIndex].seasons?.find(r => parseInt(r.season) === parseInt(data.reqSeason))){
                  var seasonIndex = arrayOfPingJsonTemp[rootIndex].info.tvshows[tvIndex].seasons.findIndex(r => parseInt(r.season) === parseInt(data.reqSeason));
                  if (arrayOfPingJsonTemp[rootIndex].info.tvshows[tvIndex].seasons[seasonIndex].episodes?.find(ep=> parseInt(ep.episode) === parseInt(data.reqEpisode))){
                    var episodeIndex = arrayOfPingJsonTemp[rootIndex].info.tvshows[tvIndex].seasons[seasonIndex].episodes.findIndex(ep=> parseInt(ep.episode) === parseInt(data.reqEpisode));
                    console.log('Requested Resource Found Root index:', rootIndex, 'tvshowindex', tvIndex, 'seasonindex', seasonIndex, 'episodeindex', episodeIndex);
                    var ipns = configjson.listOfipns[rootIndex];
                    var listOfTypes = arrayOfPingJsonTemp[rootIndex].info.tvshows[tvIndex].seasons[seasonIndex].episodes[episodeIndex].listoftypes;
                    var objToSend = {
                      type: 'providing',
                      providerUsername: configjson.providerUsername,
                      id: data.id,
                      reqType: data.reqType,
                      reqSeason: data.reqSeason,
                      reqEpisode: data.reqEpisode,
                      ipns: ipns,
                      listoftypes: listOfTypes
                    }
                    respond(objToSend, Respondindex);
                    return;
                  }
                }
              }
              }
            })){
              console.log('We have it!');
            }

            //Newer version testing the findIndex method with proper return of a array of index's [rootindexAkaIpnsIndex, tvshowIndex, seasonIndex, EpisodeIndex]
            /*arrayOfPingJsonTemp.findIndex((element, rootindex) => {
              var index = element.info.tvshows.findIndex(row => row.id === data.id);
              console.log(index);
              if (index !== -1) {
                var seasonindex = element.info.tvshows[index].seasons.findIndex(row2 => parseInt(row2.season) === data.reqSeason);
                if (seasonindex !== -1) {
                  var episodeindex = element.info.tvshows[index].seasons[seasonindex].episodes.findIndex(row3 => parseInt(row3.episode) === data.reqEpisode);
                  if (episodeindex !== -1) {
                    console.log('Requested Resource Found Root index:', rootindex, 'tvshowindex', index, 'seasonindex', seasonindex, 'episodeindex', episodeindex);
                    var ipns = configjson.listOfipns[rootindex];
                    var listOfTypes = arrayOfPingJsonTemp[rootindex].info.tvshows[index].seasons[seasonindex].episodes[episodeindex].listoftypes;
                    var objToSend = {
                      type: 'providing',
                      providerUsername: configjson.providerUsername,
                      id: data.id,
                      reqType: data.reqType,
                      reqSeason: data.reqSeason,
                      reqEpisode: data.reqEpisode,
                      ipns: ipns,
                      listoftypes: listOfTypes
                    }
                    respond(objToSend, Respondindex);
                    return 1;
                  }
                }
                //console.log(rootindex, index);
                //return [rootindex, index];
              }else{
                return -1;
              }
            });*/
            break;
          case "movie":
            console.log('Its a movie');
            //Event better and shorter version to cut down on for looping unnecessarily!
            if (Pings2Check.find((value, rootindex) => {
              if (value.find(row => parseInt(row.id) === parseInt(data.id))) {
                var index = value.findIndex(row => parseInt(row.id) === parseInt(data.id));
                var ipns = configjson.listOfipns[rootindex];
                var listOfTypes = arrayOfPingJsonTemp[rootindex].info.movies[index].listoftypes;
                var objToSend = {
                  type: 'providing',
                  providerUsername: configjson.providerUsername,
                  id: data.id,
                  reqType: data.reqType,
                  ipns: ipns,
                  listoftypes: listOfTypes
                }
                console.log('found', data.id);
                console.log(arrayOfPingJsonTemp[rootindex].info.movies[index].listoftypes);
                console.log(rootindex);
                respond(objToSend, Respondindex);
                return 1;
              }
            })) {
              console.log('We have it!');
            }
            //New findIndex Version
            /*arrayOfPingJsonTemp?.findIndex((element, rootindex) => {
              var index = element.info.movies.findIndex(row => row.id === data.id);
              if (index !== -1) {
                var ipns = configjson.listOfipns[rootindex];
                var listOfTypes = arrayOfPingJsonTemp[rootindex].info.movies[index].listoftypes;
                var objToSend = {
                  type: 'providing',
                  providerUsername: configjson.providerUsername,
                  id: data.id,
                  reqType: data.reqType,
                  ipns: ipns,
                  listoftypes: listOfTypes
                }
                console.log('found', data.id);
                console.log(element.info.movies[index]);
                console.log(rootindex);
                respond(objToSend, Respondindex);
                return 1;
              }
              //console.log(rootindex, index);
              //return [rootindex, index];
            });*/
            break;
        }
      }
    } else {
      if (data.type === 'providing') {
        return;
      }
      //console.log(msg.data)
      console.log('This is a msg! no need to check!', JSON.stringify(data));
    }
  } catch (e) {
    realLog(e);
  }
}

async function initializeP2P() {
  if (!p2pRunning) {
    p2pRunning = true;
  }
  if (configjson.replit) {
    //eventsReplit = smeeReplit.start();
    //eventsReplitBackup = smeeReplitBackup.start();
    var disindex = 0;
    const urls = [
      'https://sse.johnsfriends.repl.co/status',
      'https://sse1.streampal.repl.co/status',
      'https://sse2.streampal.repl.co/status',
      'https://sse3.streampal.repl.co/status',
      'https://sse4.streampal.repl.co/status'
    ];
    for(disindex; disindex<4; disindex++){
      try {
        const response = await fetch(urls[disindex].toString());
        if (response.status === 200){
          const data = await response.json();
          if (data.providers <= 9999){
            switch(disindex){
                case 0:
                  eventsReplit = smeeReplit.start();
                  eventsReplit.onmessage = (msg) => {
                    processMsg(1, msg);
                  }
                  return;
                break;

                case 1:
                  eventsReplitBackup = smeeReplitBackup.start();
                  eventsReplitBackup.onmessage = (msg) => {
                    processMsg(2, msg)
                  }
                  return;
                break;

                case 2:
                  eventsReplitBackup2 = smeeReplitBackup2.start();
                  eventsReplitBackup2.onmessage = (msg) => {
                    processMsg(3, msg)
                  }
                  return;
                break;

                case 3:
                  eventsReplitBackup3 = smeeReplitBackup3.start();
                  eventsReplitBackup3.onmessage = (msg) => {
                    processMsg(4, msg)
                  }
                  return;
                break;

                case 4:
                  eventsReplitBackup4 = smeeReplitBackup4.start();
                  eventsReplitBackup4.onmessage = (msg) => {
                    processMsg(5, msg)
                  }
                  return;
                break;
              }
            }else{
              continue;
            }
          }else{
            continue;
          }
        }catch(e){
          continue;
        }
      }
    //eventsReplitBackup2 = smeeReplitBackup2.start();
    //eventsReplitBackup3 = smeeReplitBackup3.start();
    //eventsReplitBackup4 = smeeReplitBackup4.start();
/*
    eventsReplitBackup.onmessage = (msg) => {
      processMsg(2, msg)
    }

    eventsReplitBackup2.onmessage = (msg) => {
      processMsg(3, msg);
    }

    eventsReplitBackup3.onmessage = (msg) => {
      processMsg(4, msg);
    }

    eventsReplitBackup4.onmessage = (msg) => {
      processMsg(5, msg); 
    }*/
  }



  if (configjson.smee) {
    eventsSmee = smee.start();
    eventsSmee.onmessage = (msg) => {
      processMsg(0, msg);
    }
  }
}

function quitProcess() {
  process.exit();
}

function openGUI() {
  if (BrowserWindow.getAllWindows().length === 0) {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      useContentSize: false,
      enableLargerThanScreen: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    //const view = new BrowserView()
    //win.setBrowserView(view)
    //view.setBounds({ x: 0, y: 0, width: 1200, height: 800 });
    //view.webContents.loadURL('http://localhost:3000');
    // Load the index.html of the app.
    win.loadURL('http://localhost:3000/');
    //win.loadFile('./index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()
  }
}

function initializeMainGUI() {

  function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      useContentSize: false,
      enableLargerThanScreen: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    //const view = new BrowserView()
    //win.setBrowserView(view)
    //view.setBounds({ x: 0, y: 0, width: 1200, height: 800 });
    //view.webContents.loadURL('http://localhost:3000');
    // Load the index.html of the app.
    win.loadURL('http://localhost:3000/');
    //win.loadFile('./index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // This method is equivalent to 'app.on('ready', function())'
  app.whenReady().then(() => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      tray = new Tray(iconPath);
      let template = [
        /* {
           label: 'audio',
           submenu: [
             {
               label: 'low',
               type: 'radio',
               checked: true,
               click: handleClick
             },
             {
               label: 'High',
               type: 'radio',
               click: handleClick
             }
           ]
         },*/
        {
          id: '2',
          label: 'Open GUI',
          toolTip: 'This will open the Browser GUI incase you closed it and dont want to restart the whole application you can just click this...',
          click: openGUI
        },
        { type: 'separator' },
        {
          id: '1',
          label: 'Start/Stop P2P',
          toolTip: 'Start or Stop the Peer 2 Peer protocol listener this will stop you forwarding your file locations to the peers via the event source server.',
          click: startStopP2P
        },
        { type: 'separator' },
        {
          id: '0',
          label: 'Quit',
          toolTip: 'Closes out the whole application this includes the Tray as well along with the GUI Window',
          click: quitProcess
        }
      ]
      const ctxMenu = Menu.buildFromTemplate(template);
      tray.setContextMenu(ctxMenu);
    }

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the
      // app when the dock icon is clicked and there are no
      // other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      //app.quit()
    }
  });

  // In this file, you can include the rest of your
  // app's specific main process code. You can also
  // put them in separate files and require them here.
}

function is64Bit() {
  return ['arm64', 'ppc64', 'x64', 's390x', 'mipsel'].includes(process.arch);
}

async function ipfsBinaryType(){
  switch (process.platform){
    case "win32":
      if (is64Bit()){
        if (process.arch === "x64"){
          ipfsBinaryPrefix = "/lib/win32/64/./ipfs.exe";
        }
      }else{
        if (process.arch === "x32"){
          ipfsBinaryPrefix = "/lib/win32/32/./ipfs.exe";
        }
      }
    break;
    case "linux":
      if (is64Bit()){
        switch (process.arch){
          case "arm64":
          ipfsBinaryPrefix = "/lib/linux/arm64/ipfs";
          case "x64":
          ipfsBinaryPrefix = "/lib/linux/64/ipfs";
          break;
        }
      }else{
        switch (process.arch){
          case "arm":
          ipfsBinaryPrefix = "/lib/linux/arm/ipfs";
          case "x32":
          ipfsBinaryPrefix = "/lib/linux/64/ipfs";
          break;
        }
      }
    break;
    case "darwin":
      if (is64Bit()){
        switch (process.arch){
          case "arm64":
          ipfsBinaryPrefix = "/lib/darwin/arm64/ipfs";
          case "x64":
          ipfsBinaryPrefix = "/lib/darwin/64/ipfs";
          break;
        }
      }
    break;
    case "freebsd":
      if (is64Bit()){
        switch (process.arch){
          case "arm64":
          ipfsBinaryPrefix = "/lib/freebsd/arm64/ipfs";
          case "x64":
          ipfsBinaryPrefix = "/lib/freebsd/64/ipfs";
          break;
        }
      }else{
        switch (process.arch){
          case "arm":
          ipfsBinaryPrefix = "/lib/freebsd/arm/ipfs";
          case "x32":
          ipfsBinaryPrefix = "/lib/freebsd/32/ipfs";
          break;
        }
      }
    break;
    case "openbsd":
      if (is64Bit()){
        switch (process.arch){
          case "arm64":
          ipfsBinaryPrefix = "/lib/openbsd/arm64/ipfs";
          case "x64":
          ipfsBinaryPrefix = "/lib/openbsd/64/ipfs";
          break;
        }
      }else{
        switch (process.arch){
          case "arm":
          ipfsBinaryPrefix = "/lib/openbsd/arm/ipfs";
          case "x32":
          ipfsBinaryPrefix = "/lib/openbsd/32/ipfs";
          break;
        }
      }
    break;
  }
  //console.log(__dirname+ipfsBinaryPrefix);
  //const stat = await fs.promises.stat(__dirname+ipfsBinaryPrefix);
  //if (stat.isFile()){
  //console.log('Its a file lets try and include this env PATH');
  /*console.log(process.env.PATH.includes(__dirname+ipfsBinaryPrefix+";"));
  if (!process.env.PATH.includes(__dirname+ipfsBinaryPrefix+";")){
  process.env.PATH = process.env.PATH + __dirname+ipfsBinaryPrefix+";";
  console.log(process.env.PATH.includes(__dirname+ipfsBinaryPrefix+";"));
  }*/
  if (process.platform === 'win32' || process.platform === 'darwin'){
    ipfsBinaryPrefix= path.join(path.dirname(path.dirname(app.getAppPath())), ipfsBinaryPrefix);
    console.log('SETTING IPFS BINARY PREFIX TO:', ipfsBinaryPrefix);
  }else{
    ipfsBinaryPrefix= path.join(path.dirname(path.dirname(app.getAppPath())), ipfsBinaryPrefix);
  }
}
ipfsBinaryType();
/*spawn.exec(ipfsBinaryPrefix+" version", function(err, out, outerr){
  console.log(err);
  console.log(out);
  console.log(outerr);
  if (out){
    console.log('ENABLING IPFS DESKTOP TO TRUE HOPEFULLY ITS INSTALLED ACTUALLY LOL!');
    configjson.ipfsDesktopInstalled=true;
  }
});*/
var rootFolderIndex = 0;
var browserFolderIndex = 0; ///This variable will be used to know which index the browser is adding files or mkdir too! so that way the refresh has its own internal index system for its loop through!
var rootFolderName; /////refresh is aka calling the function temp();
var updatingIPFS = false;
var refreshing = false;
//var updatingIPFS = new Array();
/*for (var t=0; t<(configjson.length-1);t++){
  updatingIPFS[t] = false;
}*/
var updatingFromBrowser = false;
var remaining = new Array();
//var total = 1;
var threadcount = new Array();
var counter = new Array();
//var remainingAlt = 0;
var remainingAlt = new Array();
//var totalAlt = 1;
var totalAlt = new Array();
//var threadcountAlt = 0;
var threadcountAlt = new Array();
//var counterAlt = 0;
var counterAlt = new Array();
var browserUploadType;
var browserThreads = new Array();
var threads = new Array();
const hostname = 'localhost';
const port = 3000;
var TmpLogs = [];
var browsers = [];
var logs = [];
var pings = [];
var pingIndex = 0;
//var filelogs = [];
var Pings2Check = new Array();
//var ArrayOfPings2Check = [];
var Pings = [];
var array = [];
var arrayOfFiles = new Array();
//var arrayArrayOfFiles = [];
var arrayOfFilesFromBrowser = [];
//var arrayOfFiles2 = [];
const reg = new RegExp('^[0-9]+$');
const express = require('express');
var cors = require('cors');
const { isArgumentsObject } = require('node:util/types');
const app3 = express();
const app2 = express();
var router = express.Router();
//__ogdirname = __dirname;

//app.use(rawBody);
/*var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/
//app.use(cors());
app2.use(cors());
app2.options('localhost 127.0.0.1', cors());
app2.use(express.json());
app3.use(router);
app2.use(router);

var arrayOfPingJsonTemp = new Array();
var pingJSONTemp = {
  "ping": "pong",
  'info': {
    'movies': [],
    'tvshows': []
  }
}

function isString(str) {
  try {
    if (typeof str === 'string' || str instanceof String) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

//This is a multithreaded Browser File Upload Worker For IPFS write commands!
function startBrowserWorker(cmd, t, c, threadIndex) {
  var workerData = {
    cmd: cmd,
    thread: t,
    counter: c,
    threadIndex: threadIndex,
    ipfsBinaryPrefix: ipfsBinaryPrefix
  }
  var worker = new Worker(path.join(path.dirname(process.execPath), '/lib/browserWorker.js'), { workerData: workerData });

  worker.on('error', (err) => { throw err; });

  worker.on('exit', () => {
    //console.log('EXITING!');
    browserThreads[threadIndex].delete(worker);
    //i = i-1;
    //console.log(`Thread exiting, ${threads.size} running...`);
    if (browserThreads[threadIndex].size === 0) {
    /*remainingAlt = */remainingAlt.splice(threadIndex, 1);
    /*threadcountAlt = */threadcountAlt.splice(threadIndex, 1);
    /*browserThreads = */browserThreads.splice(threadIndex, 1);
    /*arrayOfFilesFromBrowser = */arrayOfFilesFromBrowser.splice(threadIndex, 1);
      console.log("Finished Fully!");
      updatingFromBrowser = false;
      //console.log(primes.join('\n'));
    }
  });
  worker.on('message', (msg) => {
    if (isJsonString(msg)) {
      var Data = JSON.parse(msg);
      if ((Data.type === "done") && (parseInt(Data.threadIndex) === parseInt(threadIndex))) {
        if ((remainingAlt[threadIndex]) < (arrayOfFilesFromBrowser[threadIndex].length)) {
          //This will help rerun the same thread number when initializing the next worker!
          remainingAlt[threadIndex] = remainingAlt[threadIndex] + 1;
          threadcountAlt[threadIndex] = threadcountAlt[threadIndex] - 1;
          console.log('Finished Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'and Files Remaining:', (arrayOfFilesFromBrowser[threadIndex].length - remainingAlt[threadIndex]));
          startWorker(arrayOfFiles[(counter)], Data.thread, (counter));
          //console.log(threads.size);
          return;
        }
        //console.log('Msg from', Data.thread, "on counter:", Data.counter, "with the msg:", msg);
        remainingAlt[threadIndex] = remainingAlt[threadIndex] + 1;
        //total=total+1;
        threadcountAlt[threadIndex] = threadcountAlt[threadIndex] - 1;
        console.log('Finished Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'and Files Remaining:', (arrayOfFilesFromBrowser[threadIndex].length - remainingAlt[threadIndex]));
        return;
      }
      if (Data.type === "failed") {
        console.log('Error Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'Files Remaining:', (arrayOfFilesFromBrowser.length - remainingAlt[threadIndex]), 'Attempting To Retry.... in 5 seconds!');

      }

      if (Data.type === "starting") {
        console.log('Working Thread:', Data.thread, 'On Counter:', Data.counter, 'On Command:', arrayOfFiles[Data.counter]);

      }
      if (Data.type === "msg") {
        console.log('Working Thread:', Data.thread, 'On Counter:', Data.counter, 'Sent a Msg:', Data.msg);
      }
    }
  });
  browserThreads[threadIndex].add(worker);
  //console.log('Working Thread:', t, 'On Counter:', counter, 'On Command:', arrayOfFiles[c]);
  counterAlt[threadIndex] = counterAlt[threadIndex] + 1;
  //totalAlt[threadIndex]=totalAlt[threadIndex]+1;
  threadcountAlt[threadIndex] = threadcountAlt[threadIndex] + 1;
}

//This is the Multithreaded Worker Initializer for Browser File Uploads!
//This function is designed to be called after the files have been written to and renamed and added to the local repository!
//expected to be called after the updateIPFSFromBrowser has been executed and successfully promised!
async function updateIPFSFilesFromBrowser(dataJson, threadIndex) {
  if (arrayOfFilesFromBrowser[threadIndex].length > 0) {
    remainingAlt[threadIndex] = 0;
    console.log('Files Remaining:', (arrayOfFilesFromBrowser[threadIndex].length) - remainingAlt[threadIndex]);
    const threadCount = parseInt(configjson.maxUploadThreads);
    //var threads = new Set();
    //var i=0;
    console.time('UpdateIPFSFilesFromBrowserMultithreadTest');
    var a = threadcountAlt[threadIndex] + 1;
    for (remainingAlt[threadIndex]; remainingAlt[threadIndex] < (arrayOfFilesFromBrowser[threadIndex].length - 1);) {
      if (!updatingFromBrowser) { ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<< ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
        updatingFromBrowser = true;
        for (a = threadcountAlt[threadIndex] + 1; a <= threadCount; a++) {
          startBrowserWorker(arrayOfFilesFromBrowser[counterAlt[threadIndex]], a, counterAlt[threadIndex], threadIndex); ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
          console.log('Starting Worker on')
        }
      } ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<< ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
      await timer(1000);
    }
    console.log('Files Remaining:', (arrayOfFilesFromBrowser[threadIndex].length) - remainingAlt[threadIndex]);
    console.timeEnd('UpdateIPFSFilesMultithreadTest');
    //After for loop
    //rootFolderIndex = dataJson.browserIndex;
    await updatePingtoIPFSForBrowser(dataJson.browserIndex);
  }

}
//The Rename Function!
// This is the Rename and File Move Function Along with generating the IPFS Write commands in a nested array style layout !
async function checkDirForVideos(dataJson, dir, threadIndex) {//NOTES RENAME BROWSERFOLDERINDEX to dataJson.browserIndex and all the browserFolderindexs on the Array List to threadIndex
  try {
    //const configJSON = await fs.promises.readFile('./config.json');
    //var json = JSON.parse(configJSON);
    //var uploadType = dataJson.fileType;
    //var rootFolderName = json.rootFolderName;
    // Get the files as an array
    const files = await fs.promises.readdir(dir);
    if (files.length > parseInt(configjson.maximumAmountOfFilesAndFoldersToSearchThroughOnDragAndDrops)) {//Hopefully we stop alot of potential bugs such as someone accidently dragging there C: drive root folder onto the application
      //Along with protecting from allowing to many files to be searched through at once!
      //Might make this configurable with config.json using maximumAmountOfFilesAndFoldersToSearchThroughOnDragAndDrops: 20 by default
      return;
    }//this is to hopefully stop to potential memory leaks
    console.log('Checking Dir:', dir);
    files.sort(function(a, b) {
      return a.split(".")[0] - b.split(".")[0];
    });

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(dir, file);
      //const toPath = path.join( moveTo, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);
      console.log(path.basename(fromPath));

      if (stat.isFile()) {
        var filePath = path.dirname(fromPath);
        var fileType = path.extname(fromPath);
        var fileName = path.basename(fromPath);
        //console.log(path.extname(fromPath));
        //console.log(dataJson.fileType);
        if (dataJson.fileType === "tv") {
          //console.log('Its TV SHOW!');
          /*if (containsOnlyNumbers(fileName)){
            if (fileType.toLowerCase() === "mkv" || fileType.toLowerCase() === "mp4"){
              var dis=string;
              if(process.platform === 'win32') {dis=string.replaceAll('\\', '/');}
            }
          }else{*///FileName Isnt a Number only then we will check first to ensure there arent already a list of files there for this type and id and name!
          //We will just use the rename function to make the process a whole lot simpler!
          if (fileType.toLowerCase() === ".mkv" || fileType.toLowerCase() === ".mp4") {
            console.log('Found video File!');
            var newFilePath = __newDirName + prefix + configjson.listOfRootFolderNames[dataJson.browserIndex] + prefix + "tvshows" + prefix + dataJson.name + "-" + dataJson.id + prefix + dataJson.season + prefix + dataJson.episode + prefix + dataJson.fileQuality + prefix;
            var newfilename = "1" + fileType;
            var i = 1;
            var test = true;
            while (test) {
              if (fs.existsSync(path.join(newFilePath, newfilename))) {
                i = i + 1;
                newfilename = i + fileType;
              }
              if (!(fs.existsSync(path.join(newFilePath, newfilename)))) {
                arrayOfFilesFromBrowser[threadIndex].push(ipfsBinaryPrefix + " files write --create --parents --raw-leaves " + "/" + configjson.listOfRootFolderNames[dataJson.browserIndex] + "/tvshows/" + dataJson.name + "-" + dataJson.id + "/" + dataJson.season + "/" + dataJson.episode + "/" + dataJson.fileQuality + "/" + newfilename + " " + __newDirName + "/" + configjson.listOfRootFolderNames[dataJson.browserIndex] + "/tvshows/" + dataJson.name + "-" + dataJson.id + "/" + dataJson.season + "/" + dataJson.episode + "/" + dataJson.fileQuality + "/" + newfilename);
                console.log('Files:', arrayOfFilesFromBrowser[threadIndex].length);
                test = false;
                realLog(newfilename, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
              }
            }//End of our while loop check!
            //We will have to encapusalte this in a directory ^ check to ensure files don't exist before trying to rename!
            try {
              await Fs.renameSync(fromPath, path.join(newFilePath, newfilename));   ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<< ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
              console.log('Renamed and Moved file', fromPath, 'too', path.join(newFilePath, newfilename));
            } catch (e) {
              realLog(e);
            }
          }
          //}
        }
        if (dataJson.fileType === "movie") {
          if (fileType.toLowerCase() === ".mkv" || fileType.toLowerCase() === ".mp4") {
            var newFilePath = __newDirName + prefix + configjson.listOfRootFolderNames[dataJson.browserIndex] + prefix + "tvshows" + prefix + dataJson.name + "-" + dataJson.id + prefix + dataJson.fileQuality + prefix;
            var newfilename = "1" + fileType;
            var i = 1;
            var test = true;
            while (test) {
              if (fs.existsSync(path.join(newFilePath, newfilename))) {
                i = i + 1;
                newfilename = i + fileType;
              }
              if (!(fs.existsSync(path.join(newFilePath, newfilename)))) {
                arrayOfFilesFromBrowser[threadIndex].push(ipfsBinaryPrefix + " files write --create --parents --raw-leaves " + "/" + configjson.listOfipns[dataJson.browserIndex] + "/" + dataJson.name + "-" + dataJson.id + "/" + dataJson.fileQuality + "/" + newfilename + " " + __newDirName + "/" + configjson.listOfRootFolderNames[dataJson.browserIndex] + "/" + dataJson.name + "-" + dataJson.id + "/" + dataJson.fileQuality + "/" + newfilename);
                test = false;
                realLog(newfilename, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
              }
            }//End of our while loop check!
            //We will have to encapusalte this in a directory ^ check to ensure files don't exist before trying to rename!
            try {
              await Fs.renameSync(fromPath, path.join(newFilePath, newfilename)); ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<< ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
              console.log('Renamed and Moved file', fromPath, 'too', path.join(newFilePath, newfilename));
            } catch (e) {
              realLog(e);
            }
          }
          /*if (containsOnlyNumbers(fileName)){
            if (fileType.toLowerCase() === "mkv" || fileType.toLowerCase() === "mp4"){
              var dis=string;
              if(process.platform === 'win32') {dis=string.replaceAll('\\', '/');}
            }
          }else{//FileName Isnt a Number only then we will check first to ensure there arent already a list of files there for this type and id and name!
  
          }*/
        }
        //console.log(fromPath, "is a file.");
        //console.log(fromPath.split(rootFolderName).length);
        //var length = fromPath.split(rootFolderName).length;
        //console.log(string);
        //var length2 = string.split(prefix).length


        //var directory = string.split(prefix)[0];
        //console.log(directory);

      }


      //if (fromPath.split("/" + rootFolderName + "/"))
      else if (stat.isDirectory()) {
        //console.log("'%s' is a directory.", fromPath);
        await checkDirForVideos(dataJson, fromPath, threadIndex);//testAdditionalDirectoriesAndFiles(fromPath);
        //console.log(fromPath.split(rootFolderName).length);

      }
    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
  //realLog(JSON.stringify(pingJSONTemp.info.movies));
}
//This is the Main function of the Browser File upload process!
async function updateIPFSFromBrowser(json) {
  var dir = json.path;
  var threadIndex = threadcountAlt.length;
  browserThreads[threadIndex] = new Set();
  //Check if dir is a file if not then loop through its subdirectorys and check to find any video files that match our required format either mp4 or mkv. and queue for upload!
  const stat = await fs.promises.stat(dir);
  if (stat.isDirectory) {
    arrayOfFilesFromBrowser[threadIndex] = new Array();
    await checkDirForVideos(json, dir, threadIndex);
    console.log('Finished CheckDir:', arrayOfFilesFromBrowser[threadIndex]);
    if (arrayOfFilesFromBrowser[threadIndex].length > 0) {
      //Here is where we 
      await testMainDirectoryForBrowser(path.join(__newDirName, configjson.listOfRootFolderNames[jsonbrowserIndex]), json.browserIndex); //UNCOMMENT THISSS LINE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<=========//It will be responsible for updating the ping.json properly before publishing to the ipns and before writing to the ipfs!
      await pings2CheckGenerateForBrowser(json.browserIndex);
      await updateIPFSFilesFromBrowser(json, threadIndex); ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<< ///UNCOMMMENT THISSSS LINE=========================<<<<<<<<<<<<<<
      //console.log('Files:', arrayOfFilesFromBrowser.length);
    }
  } else {
    //If Its just a file then we will do our checking and just add it all right inside this function if its not and is a directory then we do the loop and then execute the update to start the working threaded process!

    console.log(dir);
    return;
  }



}

//Final Ping to IPFS Function this is final function to be executed!
async function updatePingtoIPFSForBrowser(browserIndex) {
  //console.log(ipfsBinaryPrefix+" files write --create --parents --truncate /"+configjson.ipfsFolders[rootFolderIndex]+"/ping.json "+__newDirName+"/"+rootFolderName+"/ping.json");
  var command2 = ipfsBinaryPrefix + " files write --create --parents --truncate /" + configjson.ipfsFolders[browserIndex] + "/ping.json " + __newDirName + "/" + configjson.listOfRootFolderNames[browserIndex] + "/ping.json";
  var command3 = ipfsBinaryPrefix + " files stat /" + configjson.ipfsFolders[browserIndex];
  spawn.exec(command2, function() {
    spawn.exec(command3, function(err3, out3, outerr) {
      if (err3) {
        console.log(err3);
      }
      if (out3) {
        //console.log(out3);
        var cid = out3.split('\n')[0];
        var command4 = ipfsBinaryPrefix + " name publish --key=" + configjson.ipnsKeys[browserIndex] + " " + cid;
        console.log('ITS A SUCCCESSS WE GO THE CID I THINK!');
        console.log(command4);
        spawn.exec(command4, function(err, out, outerr) {
          if (err) {
            console.log(err);
          }
          if (out) {
            console.log(out);
            var IPNS = out.split(' ')[2].replace(":", "");
            configjson = JSON.parse(fs.readFileSync('./config.json'));
            //configjson.ipns = IPNS;
            //configjson = JSON.parse(fs.readFileSync('./config.json'));
            configjson.listOfipns[browserIndex] = IPNS;
            //console.log(configjson);
            fs.writeFileSync('./config.json', JSON.stringify(configjson, null, " "));
          }
        });
      }
    });
  });
}
//This will regenerate the pings to check aka video files for the browser to fetch and check the status of files
//So it can display the status of files if they are still pending to be public yet or are publicly available through the ipfs gateway yet!
//Complete No Bugs!
async function pings2CheckGenerateForBrowser(browserIndex) {
  console.log('PINGS Generating to Check!');
  if (Pings2Check[browserIndex].length === 0) {
    if (pingJSONTemp.info.movies.length > 0) {
      pingJSONTemp.info.movies.forEach(row => {
        var movieobj = {
          'id': row.id,
          'type': 'movie',
          'name': row.name,
          'ipnsIndex': browserIndex,
          'listoftypes': row.listoftypes
        }
        Pings2Check[browserIndex].push(movieobj);
      });
    }
    if (pingJSONTemp.info.tvshows.length > 0) {
      pingJSONTemp.info.tvshows.forEach(row => {
        var id = row.id;
        var name = row.name;
        var listoftypesobj = [];
        row.seasons.forEach(seasonrow => {
          var seasonnum = seasonrow.season;
          seasonrow.episodes.forEach(episoderow => {
            var episodenum = episoderow.episode;
            episoderow.listoftypes.forEach(listoftyperow => {
              //Here we construct the new listobj
              var listobj = {
                'id': listoftyperow.id,
                'filetype': listoftyperow.filetype,
                'quality': listoftyperow.type,
                'season': seasonnum,
                'episode': episodenum
              }
              listoftypesobj.push(listobj);
            });
          });
        });

        var tvobj = {
          'id': id,
          'type': 'tvshow',
          'name': name,
          'ipnsIndex': browserIndex,
          'listoftypes': listoftypesobj
        }
        Pings2Check[browserIndex].push(tvobj);
        //console.log('I think we finished looping through each episode and season testing this should be 4th on the log list!');

      });
    }
  }
}

//Complete No Bugs
function startWorker(cmd, t, c) {
  var workerData = {
    cmd: cmd,
    thread: t,
    counter: c,
    ipfsBinaryPrefix: ipfsBinaryPrefix
  }
  var worker = new Worker(path.join(path.dirname(process.execPath), '/lib/worker.js'), { workerData: workerData });

  worker.on('error', (err) => { throw err; });

  worker.on('exit', () => {
    //console.log('EXITING!');
    threads[rootFolderIndex].delete(worker);
    //i = i-1;
    console.log(`Thread exiting, ${threads[rootFolderIndex].size} running...`);
    if (threads[rootFolderIndex].size === 0) {
      ///*remaining = */remaining.splice(rootFolderIndex, 1);
      ///*threadcount = */threadcount.splice(threadIndex, 1);
      ///*threads = */threads.splice(threadIndex, 1);
      console.log("Finished Fully!");
      updatingIPFS[rootFolderIndex] = false;
      //console.log(primes.join('\n'));
    }
  });
  worker.on('message', (msg) => {
    if (isJsonString(msg)) {
      var Data = JSON.parse(msg);
      if (Data.type === "done") {
        if ((remaining[rootFolderIndex]) < (arrayOfFiles[rootFolderIndex].length)) {
          //This will help rerun the same thread number when initializing the next worker!
          remaining[rootFolderIndex] = remaining[rootFolderIndex] + 1;
          threadcount[rootFolderIndex] = threadcount[rootFolderIndex] - 1;
          console.log('Finished Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'and Files Remaining:', (arrayOfFiles[rootFolderIndex].length - remaining[rootFolderIndex]));
          startWorker(arrayOfFiles[rootFolderIndex][(counter[rootFolderIndex])], Data.thread, (counter[rootFolderIndex]));
          //console.log(threads.size);
          return;
        }
        //console.log('Msg from', Data.thread, "on counter:", Data.counter, "with the msg:", msg);
        remaining[rootFolderIndex] = remaining[rootFolderIndex] + 1;
        //total=total+1;
        threadcount[rootFolderIndex] = threadcount[rootFolderIndex] - 1;
        console.log('Finished Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'and Files Remaining:', (arrayOfFiles[rootFolderIndex].length - remaining[rootFolderIndex]));
        return;
      }
      if (Data.type === "failed") {
        console.log('Error Working On Thread:', Data.thread, 'On Counter:', Data.counter, 'Files Remaining:', (arrayOfFiles[rootFolderIndex].length - remaining[rootFolderIndex]), 'Attempting To Retry.... in 5 seconds!');

      }

      if (Data.type === "starting") {
        console.log('Working Thread:', Data.thread, 'On Counter:', Data.counter, 'On Command:', arrayOfFiles[rootFolderIndex][Data.counter]);

      }
      if (Data.type === "msg") {
        console.log('Working Thread:', Data.thread, 'On Counter:', Data.counter, 'Sent a Msg:', Data.msg);
      }
    }
  });
  threads[rootFolderIndex].add(worker);
  //console.log('Working Thread:', t, 'On Counter:', counter, 'On Command:', arrayOfFiles[c]);
  counter[rootFolderIndex] = counter[rootFolderIndex] + 1;
  //total[rootFolderIndex]=total[rootFolderIndex]+1;
  threadcount[rootFolderIndex] = threadcount[rootFolderIndex] + 1;
}
//Complete No Bugs as of rn Well minus the nested arrays and it has no bugs!
async function updateIPFSFilesNewAttempt() {
  if (arrayOfFiles[rootFolderIndex]) {
    if (arrayOfFiles[rootFolderIndex].length > 0) {
      remaining[rootFolderIndex] = 0;
      console.log('Working Index', rootFolderIndex, "with remaining as", remaining[rootFolderIndex]);
      console.log('Files Remaining:', ((arrayOfFiles[rootFolderIndex].length) - remaining[rootFolderIndex]));
      const threadCount = parseInt(configjson.maxUploadThreads);
      //var threads = new Set();
      //var i=0;
      console.time('UpdateIPFSFilesMultithreadTest');
      var aa = threadcount[rootFolderIndex] + 1;
      for (remaining[rootFolderIndex]; remaining[rootFolderIndex] < (arrayOfFiles[rootFolderIndex].length - 1);) {
        if (!updatingIPFS[rootFolderIndex]) {
          //updatingIPFS=true;
          for (aa; aa <= threadCount; aa++) {
            startWorker(arrayOfFiles[rootFolderIndex][counter[rootFolderIndex]], aa, counter[rootFolderIndex]);
            //await timer(1000);
          }
          updatingIPFS[rootFolderIndex] = true;
        } else {
          console.log('Sorry your ipfs is already updating!');
        }
        await timer(1000);
      }
      console.log('Files Remaining:', (arrayOfFiles[rootFolderIndex].length) - remaining[rootFolderIndex]);
      console.timeEnd('UpdateIPFSFilesMultithreadTest');
      //After for loop
      await updatePingtoIPFS();
    }
  }

}
//Complete No Bugs as of rn 
async function updateIPFS(dir) {
  if (arrayOfFiles[rootFolderIndex]) {
    console.log(dir);
    arrayOfFiles[rootFolderIndex].push(ipfsBinaryPrefix + " files write --create --parents --raw-leaves /" + configjson.ipfsFolders[rootFolderIndex] + "/" + dir + " " + __newDirName + "/" + rootFolderName + "/" + dir);
    console.log('Files:', arrayOfFiles.length);
    return;
  } else {
    arrayOfFiles[rootFolderIndex] = new Array();
    console.log(dir);
    arrayOfFiles[rootFolderIndex].push(ipfsBinaryPrefix + " files write --create --parents --raw-leaves /" + configjson.ipfsFolders[rootFolderIndex] + "/" + dir + " " + __newDirName + "/" + rootFolderName + "/" + dir);
    console.log('Files:', arrayOfFiles.length);
  }
}

//Complete No Bugs
async function updatePingtoIPFS() {
  //console.log(ipfsBinaryPrefix+" files write --create --parents --truncate /"+configjson.ipfsFolders[rootFolderIndex]+"/ping.json "+__newDirName+"/"+rootFolderName+"/ping.json");
  var command2 = ipfsBinaryPrefix + " files write --create --parents --truncate /" + configjson.ipfsFolders[rootFolderIndex] + "/ping.json " + __newDirName + "/" + configjson.listOfRootFolderNames[rootFolderIndex] + "/ping.json";
  var command3 = ipfsBinaryPrefix + " files stat /" + configjson.ipfsFolders[rootFolderIndex];
  spawn.exec(command2, function() {
    spawn.exec(command3, function(err3, out3, outerr) {
      if (err3) {
        console.log(err3);
      }
      if (out3) {
        //console.log(out3);
        var cid = out3.split('\n')[0];
        var command4 = ipfsBinaryPrefix + " name publish --key=" + configjson.ipnsKeys[rootFolderIndex] + " " + cid;
        console.log('ITS A SUCCCESSS WE GO THE CID I THINK!');
        console.log(command4);
        spawn.exec(command4, function(err, out, outerr) {
          if (err) {
            console.log(err);
          }
          if (out) {
            console.log(out);
            var IPNS = out.split(' ')[2].replace(":", "");
            configjson = JSON.parse(fs.readFileSync('./config.json'));
            //configjson.ipns = IPNS;
            //configjson = JSON.parse(fs.readFileSync('./config.json'));
            configjson.listOfipns[rootFolderIndex] = IPNS;
            //console.log(configjson);
            fs.writeFileSync('./config.json', JSON.stringify(configjson, null, " "));
            return new Promise(resolve => resolve('done'));
          }
        });
      }
    });
  });
}

async function pings2CheckGenerate() {
  console.log('PINGS Generating to Check!');
  ///Example of expected easier loopable object to fetch and detect its status on the ipns location of ipfs!
  /*var tvobj = {
    'id': null,
    'type': 'tvshow',
    'name': null,
    'listoftypes': [{
      'id': null,
      'filetype': null,
      'quality': null,
      'season': null,
      'episode': null
    }]
  }*/
  ///Example of expected easier loopable object to fetch and detect its status on the ipns location of ipfs!
  /*var movieobj = {
    'id': null,
    'type': 'movie',
    'name': null,
    'listoftypes': []
  }*/

  if (Pings2Check[rootFolderIndex].length === 0) {
    if (pingJSONTemp.info.movies.length > 0) {
      pingJSONTemp.info.movies.forEach(row => {
        var movieobj = {
          'id': row.id,
          'type': 'movie',
          'name': row.name,
          'ipnsIndex': rootFolderIndex,
          'listoftypes': row.listoftypes
        }
        Pings2Check[rootFolderIndex].push(movieobj);
        row.listoftypes.forEach(listoftyperow => {
          var arrayObj = {
            id: row.id,
            type: 'movie',
            name: row.name,
            ipnsIndex: rootFolderIndex,

          }
        });
      });
    }
    if (pingJSONTemp.info.tvshows.length > 0) {
      pingJSONTemp.info.tvshows.forEach(row => {
        var id = row.id;
        var name = row.name;
        var listoftypesobj = [];
        row.seasons.forEach(seasonrow => {
          var seasonnum = seasonrow.season;
          seasonrow.episodes.forEach(episoderow => {
            var episodenum = episoderow.episode;
            episoderow.listoftypes.forEach(listoftyperow => {
              //Here we construct the new listobj
              var listobj = {
                'id': listoftyperow.id,
                'filetype': listoftyperow.filetype,
                'quality': listoftyperow.type,
                'season': seasonnum,
                'episode': episodenum
              }
              var arrayobj = {

              }
              listoftypesobj.push(listobj);
            });
          });
        });

        var tvobj = {
          'id': id,
          'type': 'tvshow',
          'name': name,
          'ipnsIndex': rootFolderIndex,
          'listoftypes': listoftypesobj
        }
        Pings2Check[rootFolderIndex].push(tvobj);
        //console.log('I think we finished looping through each episode and season testing this should be 4th on the log list!');

      });
    }
  }
}
//Complete No Bugs
async function respondPing(req, res) {
  console.log('responding to ping list request!');
  //console.log(Pings);
  if (Pings.length > 0) {
    //console.log(Pings);
    console.log('Supplying Ping List to listener!', Pings);
    res.status(200).end(JSON.stringify({ 'logs': Pings }));
    //array=[];
    //pings2CheckGenerate();
  }
}
//Complete No Bugs
async function checkPings() {
  console.log('Ping Check Initialized!');
  Pings = [];
  if (Pings2Check.length > 0) {
    for (const [i, v] of Pings2Check.entries()) {
      console.log(i, v);
      var row = Pings2Check[i];
      if (row.length > 0) {
        row.forEach(row => {
          switch (row.type) {
            case "movie":
              row.listoftypes.forEach(listrow => {
                //console.log(listrow);
                var urlsuffix = "/movies/" + row.name + "-" + row.id + "/" + listrow.type + "/" + listrow.id + "." + listrow.filetype;
                Pings.push("https://ipfs.io/ipns/" + configjson.listOfipns[i] + urlsuffix);
                //console.log('https://ipfs.io/ipns/'+configjson.listOfipns[i]+urlsuffix);
              });
              break;
            case "tvshow":
              row.listoftypes.forEach(listrow => {
                //console.log(listrow);
                var urlsuffix = "/tvshows/" + row.name + "-" + row.id + "/" + listrow.season + "/" + listrow.episode + "/" + listrow.quality + "/" + listrow.id + "." + listrow.filetype;
                Pings.push("https://ipfs.io/ipns/" + configjson.listOfipns[i] + urlsuffix);
                //console.log('https://ipfs.io/ipns/'+configjson.listOfipns[i]+urlsuffix);
              });
              break;
          }
        });
      }
    }

    /*Pings2Check.forEach(row => {
      if (row.length > 0){
      var index = row
      row.forEach(row => {
        switch (row.type){
          case "movie":
          row.listoftypes.forEach(listrow => {
            console.log(listrow);
            var urlsuffix = "/movies/"+row.name+"-"+row.id+"/"+listrow.type+"/"+listrow.id+"."+listrow.filetype;
            array.push("https://ipfs.io/ipns/"+configjson.ipns+urlsuffix);
          });
          break;
          case "tvshow":
            row.listoftypes.forEach(listrow => {
              console.log(listrow);
              var urlsuffix = "/tvshows/"+row.name+"-"+row.id+"/"+listrow.season+"/"+listrow.episode+"/"+listrow.quality+"/"+listrow.id+"."+listrow.filetype;
              array.push("https://ipfs.io/ipns/"+configjson.ipns+urlsuffix);
            });
          break;
        }
      });
      }
    })*/
    //fetchPingCheck(array);
  }
}
//Complete No Bugs
function convertTitle2foldername(b) {
  var a = b.toString().toLowerCase();
  a = a.replaceAll(' ', '');
  a = a.replaceAll(/[\W_]+/g, "");
  //d = encodeURIComponent(d);
  //d = d.replaceAll('^\\+', '').replaceAll('[\\\\/:*?\'<>|]', '');
  return a;
}


//console.log('converting harry potters philospher stone title: ,', convertTitle2foldername("Harry Potter and the Philosopher's Stone"));
//Complete No Bugs
function addToTmpLogs(log) {
  try {
    if (isString(log)) {
      //TmpLogs.push(log);
      sendEventsToAll(log);
      logs.push(log);
    } else {
      sendEventsToAll(log);
    }
  } catch (e) {
    realLog(e);
  }
}
//Complete No Bugs
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str += p + '::' + obj[p] + '\n';
    }
  }
  return str;
}

////Log Override!
console.log = function() {
  try {
    // ...your code...
    //if (Array.isArray(arguments)){
    //    if (arguments.length > 1){
    /*if (!isString(objToString(arguments))){
      var string = objToString(arguments);
      addToTmpLogs(string);
    }else{
      var string = arguments.toString();
      addToTmpLogs(string);*/
    //var string = objToString(arguments);
    var string = "";
    for (var i = 0; arguments.length > i; i++) {
      string = string + " " + arguments[i];
    }
    addToTmpLogs(string);
    //}else {
    //addToTmpLogs(msg);
    //}
    // Pass off to the real one
    return realLog.apply(console, arguments);
    //}
  } catch (e) {
    realLog(e);
  }
};
realLog(configjson);


//Complete No Bugs
async function respondInit(req, res) {
  console.log('Initializer recieved from browser:', configjson);
  var obj = {
    browserIndex: browserFolderIndex,
    pingIndex: pingIndex,
    config: configjson,
    pingReady: pingEventReady
  }
  res.status(200).end(JSON.stringify(obj));
}
//Complete No Bugs
async function respondLogs(req, res) {
  if (TmpLogs.length > 0) {
    var logs = {
      "logs": TmpLogs
    };
    res.end(JSON.stringify(logs));
    TmpLogs = [];
  } else {
    res.status(404).end();
  }
}
//Complete No Bugs
async function makeDirs(id, name, type, seasons) {
  var safename = convertTitle2foldername(name);
  switch (type) {
    case "movie":
      var moveFrom = configjson.listOfRootFolderNames[browserFolderIndex] + "/movies/" + safename + "-" + id;
      if (!(fs.existsSync(path.join(moveFrom, "hd")))) {
        fs.mkdir(path.join(moveFrom, "hd"), { recursive: true }, (err) => {
          if (err) {
            return false;
          }
          console.log('HD Directory created successfully for ' + moveFrom + "/hd");
        });
      } else {
        console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "/hd");
      }
      if (!(fs.existsSync(path.join(moveFrom, "sd")))) {
        fs.mkdir(path.join(moveFrom, "sd"), { recursive: true }, (err) => {
          if (err) {
            return false;
          }
          console.log('SD Directory created successfully for ' + moveFrom + "/sd");
        });
      } else {
        console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "/sd");
      }
      if (!(fs.existsSync(path.join(moveFrom, "cam")))) {
        fs.mkdir(path.join(moveFrom, "cam"), { recursive: true }, (err) => {
          if (err) {
            return false;
          }
          console.log('CAM Directory created successfully for ' + moveFrom + "/cam");
        });
      } else {
        console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "/cam");
      }
      break;

    case "tvshow":
      if (seasons) {
        for (var row of seasons) {
          var season = row.season;
          var episodes = row.episode_count;
          for (var i = 0; i < episodes; i++) {
            var moveFrom = configjson.listOfRootFolderNames[browserFolderIndex] + "/tvshows/" + safename + "-" + id + "/" + parseInt(season) + "/" + parseInt(i + 1) + "/";
            try {
              if (!(fs.existsSync(path.join(moveFrom, "hd")))) {
                await fs.promises.mkdir(path.join(moveFrom, "hd"), { recursive: true });
                console.log('HD Directory created successfully for ' + moveFrom + "hd");
              } else {
                console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "hd");
              }
              if (!(fs.existsSync(path.join(moveFrom, "sd")))) {
                await fs.promises.mkdir(path.join(moveFrom, "sd"), { recursive: true });
                console.log('SD Directory created successfully for ' + moveFrom + "sd");
              } else {
                console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "sd");
              }
              if (!(fs.existsSync(path.join(moveFrom, "cam")))) {
                await fs.promises.mkdir(path.join(moveFrom, "cam"), { recursive: true });
                console.log('CAM Directory created successfully for ' + moveFrom + "cam");
              } else {
                console.log('Error: Already Exists! Occurred while creating the directory for ', moveFrom + "cam");
              }
            } catch (err) {
              console.error('Error occurred while creating the directory for ', moveFrom + "cam", err);
            }
            //End of Second For Loop Down Below V
          }//End of the second loop right here
          //End of First For Loop Down Below V
        }//End of the first loop right here
      } else {//seasons object is blank so return false
        return;
      }
      break;
  }//end of switch statement
}
//end of makedir function

/*async function respond(url) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: 'providing', id: '0', url: url })
  };
  const response = await fetch('http://localhost:3050', requestOptions);
  //console.log(response);
};*/
//This creates the local website 
const server = http.createServer((req, res) => {
  //console.log('Request for ' + req.url + ' by method ' + req.method);
  const fourpath = path.join(path.dirname(process.execPath), '/gui/404.html');

  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;
    //console.log(req.url);
    //console.log(fileUrl);
    //console.log(path.join(app.getAppPath(), '/worker.js'));
    //console.log(path.join(path.dirname(process.execPath),fileUrl));
    //console.log(path.join(process.execPath, '/gui/index.html'));

    var filePath = path.join(path.dirname(process.execPath), prefix + "gui" + fileUrl);
    console.log('the requested file path:', filePath);
    const fileExt = path.extname(filePath);
    switch (fileExt) {
      case '.html':
        if (fs.existsSync(filePath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        } else {
          filePath = fourpath
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        break;
      case '.css':
        if (fs.existsSync(filePath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/css');
          fs.createReadStream(filePath).pipe(res);
        } else {
          filePath = fourpath
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        break;
      case '.js':
        if (fs.existsSync(filePath)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/javascript');
          fs.createReadStream(filePath).pipe(res);
        } else {
          filePath = fourpath
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        break;
      case '.png':
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'image/png');
          res.statusCode = 200;
          fs.createReadStream(filePath).pipe(res);
        } else {
          filePath = fourpath
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        break;
      case '.ttf':
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/plain');
          res.statusCode = 200;
          fs.createReadStream(filePath).pipe(res);
        } else {
          filePath = fourpath
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        break;
      default:
        filePath = fourpath
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
        break;
    }
  }
});

//This allows the listening of the local website on localhost at port 3000 for the gui display!
server.listen(port, hostname, () => {
  console.log(`Web UI is running at http://${hostname}:${port}/`);
});

//This will be for the browser
app2.get('/', function(req, res) {
  //var json = JSON.parse(req.headers);
  var type = req.get("request-type");
  //console.log(JSON.stringify(json));
  if (type !== undefined && type !== null) {
    /*if (type === "logs") {
      respondLogs(req, res);
    }*/
    if (type === "init") {
      respondInit(req, res);
    }
    if (type === 'ping') {
      realLog('Sending them to Ping!');
      console.log('sending them to ping!');
      respondPing(req, res);
    }
  }
});

//This is the event sender!
function sendEventsToAll(newFact) {
  if (!isString(newFact)) {
    try {
      newFact = objToString(newFact);
    } catch (e) {
      realLog(e);
    }
  }

  const dataobj = {
    type: 'single',
    obj: newFact
  }
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(dataobj)}\n\n`))
}

function sendFinishedEventToAll() {
  const dataobj = {
    type: 'task',
    status: 'finished',
    msg: 'for ping list event clients'
  }
  clients.forEach(client => client.response.write('data: ' + JSON.stringify(dataobj) + "\n\n"));
}

//This the event handler!
function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const dataobj = {
    type: 'array',
    obj: logs
  }

  const data = `data: ${JSON.stringify(dataobj)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

function eventsHandlerPing(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const dataobj = {
    type: 'array',
    pingIndex: pingIndex,
    obj: pings
  }

  const data = `data: ${JSON.stringify(dataobj)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

//This is for event source server for the browser for the logs and such!
app2.get('/consolelog', eventsHandler);
//This is the ping console handler to help keep log persistent during application close and open etc..
app2.get('/ping', eventsHandlerPing);

app2.post('/', (req, res) => {
  try {
    var json = req.body;
    console.log(JSON.stringify(req.body));
    if (req.body === undefined) {
      res.status(404).end('{"error": 404}');
    }
    if (json !== undefined) {
      if (json.type) {
        if (json.type === "mkdir") {
          var type = json.maketype;
          var id = json.id;
          var name = json.name;
          var seasons;
          if (json.seasons) seasons = json.seasons; else seasons = null;
          if (makeDirs(id, name, type, seasons)) {
            console.log('mkdir success');
            res.status(200).end('{"info": "mk dir success"}');
          } else {
            console.log('mkdir failure');
            res.status(200).end(`{"error": "mkdir failure ${configjson.rootPath + `/${type}s/` + name + "-" + id}"}`);
          }
          //we execute mkdir
          //console.log('mkdir success');
          //res.status(200).end('{"info": "mk dir success"}');
        }
        if (json.type === "refresh") {
          temp();
          res.status(200).end();
        }
        if (json.type === "worker") {
          threadcount = threadcount - 1;
          remaining = remaining - 1;
          console.log('Finished Working On Thread:', json.thread, 'On Counter:', json.counter, 'Files Remaining:', remaining);
        }
        if (json.type === "worker-ping") {
          console.log("Ping Recieved From Thread:", json.thread, "Counter:", json.counter);
        }
        if (json.type === "addFile") {
          updateIPFSFromBrowser(json);
          res.status(200).end(JSON.stringify({ status: 'done' }));
        }
        if (json.type === "updateBrowserIndex") {
          console.log('Updated Browser Selected Repo Index:', json.index);
          browserFolderIndex = parseInt(json.index);
        }
        if (json.type === "addBrowserIndex") {
          var t = new Array();
          t = configjson.listOfRootFolderNames;
          var folderindex = t.length;
          var foldername = json.name;
          fs.mkdir(path.join(__newDirName, foldername), { recursive: true }, (err) => {
            if (err) {
              console.log('Repo:', foldername, ' must already be created!');
              return false;
            }
            console.log('Repo:', foldername, 'created successfully!');
          });
          configjson.listOfRootFolderNames.push(foldername);
          configjson.ipfsFolders.push(foldername);
          configjson.listOfRootPaths.push("./" + foldername);
          configjson.ipnsKeys.push('key' + folderindex);
          fs.writeFileSync('./config.json', JSON.stringify(configjson, null, " "));
        }
        if (json.type === "removeBrowserIndex") {
          var foldername = json.name;
          var folderindex = json.index;
          //var t = new Array();
          //t = configjson.listOfRootFolderNames;
          //var folderindex;
          /*configjson.listOfRootFolderNames.forEach((v,i) => {
            if (v === json.name){
              folderindex = i;
              configjson.listOfRootFolderNames = configjson.
            }
          });*/
          configjson.listOfRootFolderNames = configjson.listOfRootFolderNames.filter((row) => row === foldername);
          configjson.listOfRootPaths = configjson.listOfRootPaths.filter((row) => row.replace("./", "") === foldername);
          configjson.ipfsFolders = configjson.ipfsFolders.filter((row) => row === foldername);
          configjson.ipnsKeys = configjson.ipnsKeys.splice(folderindex, 1);
          /*configjson.ipfsFolders.forEach(v, i => {
            if (i>0){
              configjson.ipfsFolders[i]="root"+i;
            }else{
              configjson.ipfsFolders[i]="root";
            }
          });*/
          /*if (configjson.listOfRootFolderNames.length> configjson.ipfsFolders.length){
            configjson.ipfsFolders = configjson.ipfsFolders.splice(0, (configjson.listOfRootFolderNames.length-1));
          }*/
          fs.writeFileSync('./config.json', JSON.stringify(configjson, null, " "));
          configJSON = fs.readFileSync('./config.json');
          configjson = JSON.parse(configjson);
        }
      }
    }
  } catch (e) {
    realLog(e);
  }
});

app2.post('/ping', (req, res) => {
  try {
    var json = req.body;
    realLog(json);
    pingIndex = json.pingIndex;
    pings.push(json);
    res.status(200).end();
  } catch (e) {
    realLog(e);
  }
})

app2.listen(3030, function() {
  console.log('Listening for Web UI on port 3030 locally')
});

async function testMainDirectoryForBrowser(browserIndex) {
  //arrayOfPingJsonTemp[browserIndex];
  // Our starting point
  try {
    //const configJSON = await fs.promises.readFile('./config.json');
    //var json = JSON.parse(configJSON);
    //console.log(json.rootpath);
    var moveFrom = configjson.repoDir+prefix+configjson.listOfRootFolderNames[browserIndex];
    //console.log(moveFrom);

    // Get the files as an array
    const files = await fs.promises.readdir(moveFrom);
    files.sort(function(a, b) {
      return a.split(".")[0] - b.split(".")[0];
    });

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(moveFrom, file);
      //const toPath = path.join( moveTo, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        //console.log(fromPath, "is a file.");
        //console.log(fromPath.split(rootFolderName).length);

        //console.log(fromPath.split("/" + rootFolderName + "/").length);


        //if (fromPath.split("/" + rootFolderName + "/"))

      }
      else if (stat.isDirectory()) {
        //console.log(fromPath, "is a directory.");
        const files2 = await fs.promises.readdir(fromPath);

        await testAdditionalDirectoriesAndFilesForBrowser(fromPath, fromPath.split(configjson.listOfRootFolderNames[browserIndex])[0], browserIndex);
        //console.log('Split Length ', fromPath.split(rootFolderName).length);
        //console.log(fromPath.split(rootFolderName)[0])

      }
    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }

}

//Complete No Bugs im assuming we will see! lol 3/24/23
async function testAdditionalDirectoriesAndFilesForBrowser(dir, browserIndex) {
  //realLog(arrayOfPingJsonTemp[browserIndex]);
  //console.log(dir);
  try {
    //const configJSON = await fs.promises.readFile('./config.json');
    //configjson = configJSON;
    //var json = JSON.parse(configJSON);
    //var configjson.listOfRootFolderNames[browserIndex] = json.configjson.listOfRootFolderNames[browserIndex];
    // Get the files as an array
    const files = await fs.promises.readdir(dir);
    files.sort(function(a, b) {
      return a.split(".")[0] - b.split(".")[0];
    });

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(dir, file);
      //console.log (fromPath);
      //const toPath = path.join( moveTo, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        //console.log(fromPath, "is a file.");
        //console.log(fromPath.split(configjson.listOfRootFolderNames[browserIndex]).length);
        //var length = fromPath.split(configjson.listOfRootFolderNames[browserIndex]).length;
        var string = fromPath.replace(__newDirName, "").replace(prefix + configjson.listOfRootFolderNames[browserIndex] + prefix, "");

        //console.log(string);
        var length2 = string.split(prefix).length

        var directory = string.split(prefix)[0];
        //console.log(directory);
        if (directory === "movies") {
          if (length2 === 4) {
            var foldername = string.split(prefix)[1].split('-')[0];////
            var filename = string.split(prefix)[3];////
            var filequality = string.split(prefix)[2];////
            //console.log(filename);
            //            console.log('File type is ', filename.split(".")[1]);
            //            console.log('filename is ', filename.split('.')[0]);
            //console.log(containsOnlyNumbers(filename.split('.')[0]));
            if (containsOnlyNumbers(filename.split('.')[0])) {

              if ((filename.split(".")[1].includes("mkv")) || (filename.split(".")[1].includes("mp4"))) {
                var dis = string
                if (process.platform === 'win32') { dis = string.replaceAll('\\', '/'); }
                await updateIPFS(dis);
                var id = string.split(prefix)[1].split('-')[1];
                //                console.log('Id is ', id);
                //                console.log('Is valid video type and name is valid!');
                //realLog(arrayOfPingJsonTemp[browserIndex].info.movies);
                //var result = arrayOfPingJsonTemp[browserIndex].info.movies.find(row => parseInt(row.id) === parseInt(id));
                //realLog(result);
                if (arrayOfPingJsonTemp[browserIndex].info.movies.find(row => parseInt(row.id) === parseInt(id))) {
                  //console.log('Its in it! might so load its value and modify it then filter it out and re push it in the array!');
                  //realLog("ITS IN IT OMG!");
                  var index = arrayOfPingJsonTemp[browserIndex].info.movies.findIndex(row => parseInt(row.id) === parseInt(id));
                  var array = [];
                  arrayOfPingJsonTemp[browserIndex].info.movies[index].listoftypes.forEach(row => {
                    array.push(row);
                  });
                  /*for(var row of arrayOfPingJsonTemp[browserIndex].info.movies[index].listoftypes){
                    array.push(row);
                  }*/
                  array.push({
                    'type': filequality,
                    'filetype': filename.split('.')[1],
                    'id': filename.split('.')[0]
                  });
                  var obj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'videocount': (1 + arrayOfPingJsonTemp[browserIndex].info.movies[index].videocount),
                    'listoftypes': array
                  }
                  arrayOfPingJsonTemp[browserIndex].info.movies[index] = obj;
                } else {
                  var obj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'videocount': 1,
                    'listoftypes': [{
                      'type': filequality,
                      'filetype': filename.split('.')[1],
                      'id': filename.split('.')[0]
                    }]
                  }
                  arrayOfPingJsonTemp[browserIndex].info.movies.push(obj);
                }
              }
            } else {//This else is continue what happens if the video file is not in proper regexpression check aka we need to rename the video file to do proper ordering check if there is already video count stored for this id if so increment rename up one if not return
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //console.log('ERRROR ERRROR File is not Number!');
              var id = string.split(prefix)[1].split('-')[1];
              if (arrayOfPingJsonTemp[browserIndex].info.movies.find(row => parseInt(row.id) === parseInt(id))) {
                //console.log("its got data Lets do something about it!");
                var index = arrayOfPingJsonTemp[browserIndex].info.movies.findIndex(row => parseInt(row.id) === parseInt(id));
                var currentAmount = parseInt(arrayOfPingJsonTemp[browserIndex].info.movies[index].videocount + 1);
                var newname = currentAmount + "." + filename.split('.')[1];
                fs.rename(fromPath, path.join(dir, newname), (err) => {
                  console.log(err);
                });
                var array = [];
                arrayOfPingJsonTemp[browserIndex].info.movies[index].listoftypes.forEach(row => {
                  array.push(row);
                });
                /*for(var row of arrayOfPingJsonTemp[browserIndex].info.movies[index].listoftypes){
                  array.push(row);
                }*/
                array.push({
                  'type': filequality,
                  'filetype': filename.split('.')[1],
                  'id': filename.split('.')[0]
                });
                var obj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'videocount': (1 + arrayOfPingJsonTemp[browserIndex].info.movies[index].videocount),
                  'listoftypes': array
                }
                arrayOfPingJsonTemp[browserIndex].info.movies[index] = obj;
                //So here since it was found we will just increment this one to the next number up!
                //console.log('Its in it! might so load its value and modify it then filter it out and re push it in the array!');
              } else {
                // Nope nothing contained so we will just start the counter!
                console.log('File name is not a number renaming it please double check it was success sometimes due to ordering of files it will mess up the numerical ordering all though i have implemented a new failsafe check for that i hope it works well for everyone!');
                //Rename the video file to #1
                var newname = "1." + filename.split(".")[1];
                fs.rename(fromPath, path.join(dir, newname), (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Renammed file', fromPath, 'too', path.join(dir, newname));
                  }
                });

                //Push the obj into the array!
                var obj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'videocount': 1,
                  'listoftypes': [{
                    'type': filequality,
                    'filetype': newname.split('.')[1],
                    'id': newname.split('.')[0]
                  }]
                }
                arrayOfPingJsonTemp[browserIndex].info.movies.push(obj);
              }
            }
          }
        }
        if (directory === "tvshows") {
          if (length2 === 6) {
            var foldername = string.split(prefix)[1].split('-')[0];
            var filename = string.split(prefix)[5];
            var filequality = string.split(prefix)[4];
            var seasonnum = string.split(prefix)[2];
            var episodenum = string.split(prefix)[3];
            var id = string.split(prefix)[1].split('-')[1];
            //            console.log('File type is ', filename.split(".")[1]);
            if (containsOnlyNumbers(filename.split('.')[0])) {
              if (filename.split(".")[1].includes("mkv") || filename.split(".")[1].includes("mp4")) {
                var dis = string
                if (process.platform === 'win32') { dis = string.replaceAll('\\', '/'); }
                await updateIPFS(dis);
                //var id = string.split(prefix)[1].split('-')[1];
                //                console.log('Id is ', id);
                //Filename is a number just make sure to properly add to the arrayOfPingJsonTemp[browserIndex]
                if (arrayOfPingJsonTemp[browserIndex].info.tvshows.find(row => parseInt(row.id) === parseInt(id))) {
                  //console.log('Its in it! might so load its value and modify it and update in array!');
                  //realLog("ITS IN IT OMG!");
                  var idindex = arrayOfPingJsonTemp[browserIndex].info.tvshows.findIndex(row => parseInt(row.id) === parseInt(id));
                  if (arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.find(row => parseInt(row.season) === parseInt(seasonnum))) {
                    var seasonindex = arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.findIndex(row => parseInt(row.season) === parseInt(seasonnum));

                    if (arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.find(row => parseInt(row.episode) === parseInt(episodenum))) {
                      var episodeindex = arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.findIndex(row => parseInt(row.episode) === parseInt(episodenum));
                      ///For loop through listoftypes to increment properly!
                      var array = [];
                      arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].listoftypes.forEach(row => {
                        array.push(row);
                      });
                      var counter = arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].videocount + 1;
                      var listoftypeobj = {
                        'type': filequality,
                        'filetype': filename.split('.')[1],
                        'id': filename.split('.')[0]
                      }
                      array.push(listoftypeobj);
                      arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex] = {
                        'episode': arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].episode,
                        'videocount': counter,
                        'listoftypes': array

                      }//This will probably update everything correctly now!

                    } else { //Season index was found but not the episode index!
                      //We just need to add in the episode object into the season index!
                      var episodeobj = {
                        'episode': episodenum,
                        'videocount': 1,
                        'listoftypes': [{ 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }]
                      }
                      arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.push(episodeobj);
                    }

                  } else {
                    // We have to add in the season object, episodes object, and episode object to this pingJSON and insert it into it UUUUUUUUGGGGGGGGG!
                    var episodeob = {
                      'episode': episodenum,
                      'videocount': 1,
                      'listoftypes': [
                        { 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }
                      ]
                    }
                    var seasonob = {
                      'season': seasonnum,
                      'episodes': [episodeob]
                    }
                    arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.push(seasonob);
                  }

                } else {//ID not found so manually add ALLL things!
                  //realLog('putting it into The Array of tvshows since its id was not found!');
                  var episodeob = {
                    'episode': episodenum,
                    'videocount': 1,
                    'listoftypes': [
                      { 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }
                    ]
                  }
                  var seasonob = {
                    'season': seasonnum,
                    'episodes': [episodeob]
                  }
                  var tvobj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'seasons': [seasonob]
                  }
                  arrayOfPingJsonTemp[browserIndex].info.tvshows.push(tvobj);
                  //realLog(arrayOfPingJsonTemp[browserIndex].info.tvshows[0].seasons[0]);
                }
              } else { return; }
            } else {//Error this filename is not a number need to fix it! We have to replicate all of this above to ensure proper numbering!
              //We redoo the same as before but modify the filenames before adding the object to the list!
              ///ERRRRRRRRRRRRRRRRROOOOOOOOOOORRRRRRRRRRRRRRRRR
              /////NOT A NUMBER ! MUST RENAME!!!!! BUT HAVE TO CHECK FOR COUNTS ALREADY TO ENSURE WE GET IT RIGHT!
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              var newfilename = "1." + filename.split('.')[1];
              var i = 1;
              var test = true;
              while (test) {
                if (fs.existsSync(path.join(dir, newfilename))) {
                  i = i + 1;
                  newfilename = i + "." + filename.split('.')[1];
                }
                if (!(fs.existsSync(path.join(dir, newfilename)))) {
                  test = false;
                  realLog(newfilename, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                }
              }//End of our while loop check!
              //We will have to encapusalte this in a directory ^ check to ensure files don't exist before trying to rename!
              try {
                fs.renameSync(fromPath, path.join(dir, newfilename));
                console.log('Renammed file', fromPath, 'too', path.join(dir, newfilename));
              } catch (e) {
                console.error(e);
              }
              //Bullseye deprecated way that caused the error V
              /*fs.rename(fromPath, path.join(dir, newfilename), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Renammed file', fromPath, 'too', path.join(dir, newfilename));
                }
              });*/

              console.log('File name is not a number renaming it please double check it was success sometimes due to ordering of files it will mess up the numerical ordering all though i have implemented a new failsafe check for that i hope it works well for everyone!');
              //realLog('ERRRORRERER!');
              if (arrayOfPingJsonTemp[browserIndex].info.tvshows.find(row => parseInt(row.id) === parseInt(id))) {
                //console.log('Its in it! might so load its value and modify it and update in array!');
                //realLog("ITS IN IT OMG!");
                var idindex = arrayOfPingJsonTemp[browserIndex].info.tvshows.findIndex(row => parseInt(row.id) === parseInt(id));
                if (arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.find(row => parseInt(row.season) === parseInt(seasonnum))) {
                  var seasonindex = arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.findIndex(row => parseInt(row.season) === parseInt(seasonnum));
                  //realLog(arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex]);
                  if (arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.find(row => parseInt(row.episode) === parseInt(episodenum))) {
                    var episodeindex = arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.findIndex(row => parseInt(row.episode) === parseInt(episodenum));
                    ///For loop through listoftypes to increment properly!
                    var array = [];
                    arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].listoftypes.forEach(row => {
                      array.push(row);
                    });
                    var counter = parseInt(arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].videocount + 1);
                    newfilename = counter + "." + filename.split('.')[1];
                    var listoftypeobj = {
                      'type': filequality,
                      'filetype': newfilename.split('.')[1],
                      'id': newfilename.split('.')[0]
                    }
                    array.push(listoftypeobj);
                    arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex] = {
                      'episode': arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].episode,
                      'videocount': counter,
                      'listoftypes': array
                    }//This will probably update everything correctly now!
                    //This was sudo code that all in all ran really well out the box just had the typo issue other then that pretty good! but i can optimize this truly
                    // ^ the above lines of code are redundant since i already have the episode index i could just push to the listoftypes directly to the arrayOfPingJsonTemp[browserIndex] object but as you seen
                    // i went the dumb and long route with a for loop reduplicate and redundant way to do it! i must say im appalled looking at this hope you enjoy these comments!

                  } else { //Season index was found but not the episode index!
                    //We just need to add in the episode object into the season index!
                    var episodeobj = {
                      'episode': episodenum,
                      'videocount': 1,
                      'listoftypes': [{ 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }]
                    }
                    arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons[seasonindex].episodes.push(episodeobj);
                  }

                } else {
                  // We have to add in the season object, episodes object, and episode object to this pingJSON and insert it into it UUUUUUUUGGGGGGGGG!
                  var episodeob = {
                    'episode': episodenum,
                    'videocount': 1,
                    'listoftypes': [
                      { 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }
                    ]
                  }
                  var seasonob = {
                    'season': seasonnum,
                    'episodes': [episodeob]
                  }
                  arrayOfPingJsonTemp[browserIndex].info.tvshows[idindex].seasons.push(seasonob);
                }

              } else {//ID not found so manually add ALLL things!
                var episodeob = {
                  'episode': episodenum,
                  'videocount': 1,
                  'listoftypes': [
                    { 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }
                  ]
                }
                var seasonob = {
                  'season': seasonnum,
                  'episodes': [episodeob]
                }
                var tvobj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'seasons': [seasonob]
                }
                arrayOfPingJsonTemp[browserIndex].info.tvshows.push(tvobj);
              }

              //EVEN MORE BULLEYE THAT IS DEPRECATED AND CAUSED MY ERROR VVVVVV
              //We will have to encapusalte this in a directory check to ensure files dont exist before trying to rename!
              //
              /*fs.rename(fromPath, path.join(dir, newfilename), (err) => {
                if (err){
                console.log(err);
                }else{
                  console.log('Renammed file',fromPath, 'too', path.join(dir, newfilename));
                }
              });*/

            }
          }
        }
      }


      //if (fromPath.split("/" + configjson.listOfRootFolderNames[browserIndex] + "/"))
      else if (stat.isDirectory()) {
        //console.log("'%s' is a directory.", fromPath);
        await testAdditionalDirectoriesAndFiles(fromPath);
        //console.log(fromPath.split(configjson.listOfRootFolderNames[browserIndex]).length);

      }
    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
  //realLog(JSON.stringify(arrayOfPingJsonTemp[browserIndex].info.movies));
}


async function testAdditionalDirectoriesAndFiles(dir) {
  //realLog(pingJSONTemp);
  //console.log(dir);
  try {
    //const configJSON = await fs.promises.readFile('./config.json');
    //configjson = configJSON;
    //var json = JSON.parse(configJSON);
    //var rootFolderName = json.rootFolderName;
    // Get the files as an array
    const files = await fs.promises.readdir(dir);
    files.sort(function(a, b) {
      return a.split(".")[0] - b.split(".")[0];
    });

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(dir, file);
      //console.log (fromPath);
      //const toPath = path.join( moveTo, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        //console.log(fromPath, "is a file.");
        //console.log(fromPath.split(rootFolderName).length);
        //var length = fromPath.split(rootFolderName).length;
        //console.log('from path:',fromPath);
        var string = fromPath.replace(__newDirName, "").replace(prefix + rootFolderName + prefix, "");
        /*if (process.platform === 'win32'){
          string = fromPath.replace(__newDirName, "").replace('\\' + rootFolderName + '\\', "");
        }*/

       // console.log(string);
        var length2 = string.split(prefix).length

        var directory = string.split(prefix)[0];
        //console.log(directory);
        if (directory === "movies") {
          if (length2 === 4) {
            var foldername = string.split(prefix)[1].split('-')[0];////
            var filename = string.split(prefix)[3];////
            var filequality = string.split(prefix)[2];////
            //console.log(filename);
            //            console.log('File type is ', filename.split(".")[1]);
            //            console.log('filename is ', filename.split('.')[0]);
            //console.log(containsOnlyNumbers(filename.split('.')[0]));
            if (containsOnlyNumbers(filename.split('.')[0])) {

              if ((filename.split(".")[1].includes("mkv")) || (filename.split(".")[1].includes("mp4"))) {
                var dis = string
                if (process.platform === 'win32') { dis = string.replaceAll('\\', '/'); }
                await updateIPFS(dis);
                var id = string.split(prefix)[1].split('-')[1];
                //                console.log('Id is ', id);
                //                console.log('Is valid video type and name is valid!');
                //realLog(pingJSONTemp.info.movies);
                //var result = pingJSONTemp.info.movies.find(row => parseInt(row.id) === parseInt(id));
                //realLog(result);
                if (pingJSONTemp.info.movies.find(row => parseInt(row.id) === parseInt(id))) {
                  //console.log('Its in it! might so load its value and modify it then filter it out and re push it in the array!');
                  //realLog("ITS IN IT OMG!");
                  var index = pingJSONTemp.info.movies.findIndex(row => parseInt(row.id) === parseInt(id));
                  var array = [];
                  pingJSONTemp.info.movies[index].listoftypes.forEach(row => {
                    array.push(row);
                  });
                  /*for(var row of pingJSONTemp.info.movies[index].listoftypes){
                    array.push(row);
                  }*/
                  array.push({
                    'type': filequality,
                    'filetype': filename.split('.')[1],
                    'id': filename.split('.')[0]
                  });
                  var obj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'videocount': (1 + pingJSONTemp.info.movies[index].videocount),
                    'listoftypes': array
                  }
                  pingJSONTemp.info.movies[index] = obj;
                } else {
                  var obj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'videocount': 1,
                    'listoftypes': [{
                      'type': filequality,
                      'filetype': filename.split('.')[1],
                      'id': filename.split('.')[0]
                    }]
                  }
                  pingJSONTemp.info.movies.push(obj);
                }
              }
            } else {//This else is continue what happens if the video file is not in proper regexpression check aka we need to rename the video file to do proper ordering check if there is already video count stored for this id if so increment rename up one if not return
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              //console.log('ERRROR ERRROR File is not Number!');
              var id = string.split(prefix)[1].split('-')[1];
              if (pingJSONTemp.info.movies.find(row => parseInt(row.id) === parseInt(id))) {
                //console.log("its got data Lets do something about it!");
                var index = pingJSONTemp.info.movies.findIndex(row => parseInt(row.id) === parseInt(id));
                var currentAmount = parseInt(pingJSONTemp.info.movies[index].videocount + 1);
                var newname = currentAmount + "." + filename.split('.')[1];
                fs.rename(fromPath, path.join(dir, newname), (err) => {
                  console.log(err);
                });
                var array = [];
                pingJSONTemp.info.movies[index].listoftypes.forEach(row => {
                  array.push(row);
                });
                /*for(var row of pingJSONTemp.info.movies[index].listoftypes){
                  array.push(row);
                }*/
                array.push({
                  'type': filequality,
                  'filetype': filename.split('.')[1],
                  'id': filename.split('.')[0]
                });
                var obj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'videocount': (1 + pingJSONTemp.info.movies[index].videocount),
                  'listoftypes': array
                }
                pingJSONTemp.info.movies[index] = obj;
                //So here since it was found we will just increment this one to the next number up!
                //console.log('Its in it! might so load its value and modify it then filter it out and re push it in the array!');
              } else {
                // Nope nothing contained so we will just start the counter!
                console.log('File name is not a number renaming it please double check it was success sometimes due to ordering of files it will mess up the numerical ordering all though i have implemented a new failsafe check for that i hope it works well for everyone!');
                //Rename the video file to #1
                var newname = "1." + filename.split(".")[1];
                fs.rename(fromPath, path.join(dir, newname), (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Renammed file', fromPath, 'too', path.join(dir, newname));
                  }
                });

                //Push the obj into the array!
                var obj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'videocount': 1,
                  'listoftypes': [{
                    'type': filequality,
                    'filetype': newname.split('.')[1],
                    'id': newname.split('.')[0]
                  }]
                }
                pingJSONTemp.info.movies.push(obj);
              }
            }
          }
        }
        if (directory === "tvshows") {
          if (length2 === 6) {
            var foldername = string.split(prefix)[1].split('-')[0];
            var filename = string.split(prefix)[5];
            var filequality = string.split(prefix)[4];
            var seasonnum = string.split(prefix)[2];
            var episodenum = string.split(prefix)[3];
            var id = string.split(prefix)[1].split('-')[1];
            //            console.log('File type is ', filename.split(".")[1]);
            if (containsOnlyNumbers(filename.split('.')[0])) {
              if (filename.split(".")[1].includes("mkv") || filename.split(".")[1].includes("mp4")) {
                var dis = string
                if (process.platform === 'win32') { dis = string.replaceAll('\\', '/'); }
                await updateIPFS(dis);
                //var id = string.split(prefix)[1].split('-')[1];
                //                console.log('Id is ', id);
                //Filename is a number just make sure to properly add to the pingJSONTemp
                if (pingJSONTemp.info.tvshows.find(row => parseInt(row.id) === parseInt(id))) {
                  //console.log('Its in it! might so load its value and modify it and update in array!');
                  var idindex = pingJSONTemp.info.tvshows.findIndex(row => parseInt(row.id) === parseInt(id));
                  if (pingJSONTemp.info.tvshows[idindex].seasons.find(row => parseInt(row.season) === parseInt(seasonnum))) {
                    var seasonindex = pingJSONTemp.info.tvshows[idindex].seasons.findIndex(row => parseInt(row.season) === parseInt(seasonnum));

                    if (pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.find(row => parseInt(row.episode) === parseInt(episodenum))) {
                      var episodeindex = pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.findIndex(row => parseInt(row.episode) === parseInt(episodenum));
                      ///For loop through listoftypes to increment properly!
                      var array = [];
                      pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].listoftypes.forEach(row => {
                        array.push(row);
                      });
                      var counter = pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].videocount + 1;
                      var listoftypeobj = {
                        'type': filequality,
                        'filetype': filename.split('.')[1],
                        'id': filename.split('.')[0]
                      }
                      array.push(listoftypeobj);
                      pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex] = {
                        'episode': pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].episode,
                        'videocount': counter,
                        'listoftypes': array

                      }//This will probably update everything correctly now!

                    } else { //Season index was found but not the episode index!
                      //We just need to add in the episode object into the season index!
                      var episodeobj = {
                        'episode': episodenum,
                        'videocount': 1,
                        'listoftypes': [{ 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }]
                      }
                      pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.push(episodeobj);
                    }

                  } else {
                    // We have to add in the season object, episodes object, and episode object to this pingJSON and insert it into it UUUUUUUUGGGGGGGGG!
                    var episodeob = {
                      'episode': episodenum,
                      'videocount': 1,
                      'listoftypes': [
                        { 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }
                      ]
                    }
                    var seasonob = {
                      'season': seasonnum,
                      'episodes': [episodeob]
                    }
                    pingJSONTemp.info.tvshows[idindex].seasons.push(seasonob);
                  }

                } else {//ID not found so manually add ALLL things!
                  //realLog('putting it into The Array of tvshows since its id was not found!');
                  var episodeob = {
                    'episode': episodenum,
                    'videocount': 1,
                    'listoftypes': [
                      { 'type': filequality, 'filetype': filename.split('.')[1], 'id': filename.split('.')[0] }
                    ]
                  }
                  var seasonob = {
                    'season': seasonnum,
                    'episodes': [episodeob]
                  }
                  var tvobj = {
                    'id': parseInt(id),
                    'name': foldername,
                    'seasons': [seasonob]
                  }
                  pingJSONTemp.info.tvshows.push(tvobj);
                  //realLog(pingJSONTemp.info.tvshows[0].seasons[0]);
                }
              } else { return; }
            } else {//Error this filename is not a number need to fix it! We have to replicate all of this above to ensure proper numbering!
              //We redoo the same as before but modify the filenames before adding the object to the list!
              ///ERRRRRRRRRRRRRRRRROOOOOOOOOOORRRRRRRRRRRRRRRRR
              /////NOT A NUMBER ! MUST RENAME!!!!! BUT HAVE TO CHECK FOR COUNTS ALREADY TO ENSURE WE GET IT RIGHT!
              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              var newfilename = "1." + filename.split('.')[1];
              var i = 1;
              var test = true;
              while (test) {
                if (fs.existsSync(path.join(dir, newfilename))) {
                  i = i + 1;
                  newfilename = i + "." + filename.split('.')[1];
                }
                if (!(fs.existsSync(path.join(dir, newfilename)))) {
                  test = false;
                  realLog(newfilename, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                }
              }//End of our while loop check!
              //We will have to encapusalte this in a directory ^ check to ensure files don't exist before trying to rename!
              try {
                fs.renameSync(fromPath, path.join(dir, newfilename));
                console.log('Renammed file', fromPath, 'too', path.join(dir, newfilename));
              } catch (e) {
                console.error(e);
              }
              //Bullseye deprecated way that caused the error V
              /*fs.rename(fromPath, path.join(dir, newfilename), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Renammed file', fromPath, 'too', path.join(dir, newfilename));
                }
              });*/

              console.log('File name is not a number renaming it please double check it was success sometimes due to ordering of files it will mess up the numerical ordering all though i have implemented a new failsafe check for that i hope it works well for everyone!');
              //realLog('ERRRORRERER!');
              if (pingJSONTemp.info.tvshows.find(row => parseInt(row.id) === parseInt(id))) {
                //console.log('Its in it! might so load its value and modify it and update in array!');
                //realLog("ITS IN IT OMG!");
                var idindex = pingJSONTemp.info.tvshows.findIndex(row => parseInt(row.id) === parseInt(id));
                if (pingJSONTemp.info.tvshows[idindex].seasons.find(row => parseInt(row.season) === parseInt(seasonnum))) {
                  var seasonindex = pingJSONTemp.info.tvshows[idindex].seasons.findIndex(row => parseInt(row.season) === parseInt(seasonnum));
                  //realLog(pingJSONTemp.info.tvshows[idindex].seasons[seasonindex]);
                  if (pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.find(row => parseInt(row.episode) === parseInt(episodenum))) {
                    var episodeindex = pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.findIndex(row => parseInt(row.episode) === parseInt(episodenum));
                    ///For loop through listoftypes to increment properly!
                    var array = [];
                    pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].listoftypes.forEach(row => {
                      array.push(row);
                    });
                    var counter = parseInt(pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].videocount + 1);
                    newfilename = counter + "." + filename.split('.')[1];
                    var listoftypeobj = {
                      'type': filequality,
                      'filetype': newfilename.split('.')[1],
                      'id': newfilename.split('.')[0]
                    }
                    array.push(listoftypeobj);
                    pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex] = {
                      'episode': pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes[episodeindex].episode,
                      'videocount': counter,
                      'listoftypes': array
                    }//This will probably update everything correctly now!
                    //This was sudo code that all in all ran really well out the box just had the typo issue other then that pretty good! but i can optimize this truly
                    // ^ the above lines of code are redundant since i already have the episode index i could just push to the listoftypes directly to the pingJSONTemp object but as you seen
                    // i went the dumb and long route with a for loop reduplicate and redundant way to do it! i must say im appalled looking at this hope you enjoy these comments!

                  } else { //Season index was found but not the episode index!
                    //We just need to add in the episode object into the season index!
                    var episodeobj = {
                      'episode': episodenum,
                      'videocount': 1,
                      'listoftypes': [{ 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }]
                    }
                    pingJSONTemp.info.tvshows[idindex].seasons[seasonindex].episodes.push(episodeobj);
                  }

                } else {
                  // We have to add in the season object, episodes object, and episode object to this pingJSON and insert it into it UUUUUUUUGGGGGGGGG!
                  var episodeob = {
                    'episode': episodenum,
                    'videocount': 1,
                    'listoftypes': [
                      { 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }
                    ]
                  }
                  var seasonob = {
                    'season': seasonnum,
                    'episodes': [episodeob]
                  }
                  pingJSONTemp.info.tvshows[idindex].seasons.push(seasonob);
                }

              } else {//ID not found so manually add ALLL things!
                var episodeob = {
                  'episode': episodenum,
                  'videocount': 1,
                  'listoftypes': [
                    { 'type': filequality, 'filetype': newfilename.split('.')[1], 'id': newfilename.split('.')[0] }
                  ]
                }
                var seasonob = {
                  'season': seasonnum,
                  'episodes': [episodeob]
                }
                var tvobj = {
                  'id': parseInt(id),
                  'name': foldername,
                  'seasons': [seasonob]
                }
                pingJSONTemp.info.tvshows.push(tvobj);
              }

              //EVEN MORE BULLSEYE THAT IS DEPRECATED AND CAUSED MY ERROR VVVVVV
              //We will have to encapusalte this in a directory check to ensure files dont exist before trying to rename!
              //
              /*fs.rename(fromPath, path.join(dir, newfilename), (err) => {
                if (err){
                console.log(err);
                }else{
                  console.log('Renammed file',fromPath, 'too', path.join(dir, newfilename));
                }
              });*/

            }
          }
        }
      }


      //if (fromPath.split("/" + rootFolderName + "/"))
      else if (stat.isDirectory()) {
        //console.log("'%s' is a directory.", fromPath);
        await testAdditionalDirectoriesAndFiles(fromPath);
        //console.log(fromPath.split(rootFolderName).length);

      }
    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
  //realLog(JSON.stringify(pingJSONTemp.info.movies));
}

//Complete No Bugs
// Make an async function that gets executed immediately
async function testMainDirectory() {
  var moveFrom = __newDirName+prefix+configjson.listOfRootFolderNames[rootFolderIndex];
  //realLog(moveFrom);
  pingJSONTemp = {
    "ping": "pong",
    'info': {
      'movies': [],
      'tvshows': []
    }
  }
  // Our starting point
  //realLog(moveFrom);
  try {
    //const configJSON = await fs.promises.readFile('./config.json');
    //var json = JSON.parse(configJSON);
    //console.log(json.rootpath);
    //console.log(moveFrom);
    //var moveFrom = configjson.repoDir+prefix+configjson.rootFolderName[rootFolderIndex];
    //console.log(moveFrom);
    //console.log(moveFrom);

    // Get the files as an array
    const files = await fs.promises.readdir(moveFrom);
    files.sort(function(a, b) {
      return a.split(".")[0] - b.split(".")[0];
    });

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(moveFrom, file);
      //const toPath = path.join( moveTo, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        //console.log(fromPath, "is a file.");
        //console.log(fromPath.split(rootFolderName).length);

        //console.log(fromPath.split("/" + rootFolderName + "/").length);


        //if (fromPath.split("/" + rootFolderName + "/"))

      }
      else if (stat.isDirectory()) {
        //console.log(fromPath, "is a directory.");
        const files2 = await fs.promises.readdir(fromPath);
        /*for (const file2 of files2) {
          //Additional File
          console.log('BEFORE', file2);
          const fromPath2 = path.join(fromPath, file2);
          //const toPath = path.join( moveTo, file );

          // Stat the file to see if we have a file or dir
          const stat2 = await fs.promises.stat(fromPath2);
          if (stat2.isFile()) {
            console.log("'%s' is a file.", fromPath2);
            console.log(fromPath2.split(rootFolderName).length);

            //console.log(fromPath.split("/" + rootFolderName + "/").length);


            //if (fromPath.split("/" + rootFolderName + "/"))

          }
          else if (stat2.isDirectory()) {
            console.log("'%s' is a directory.", fromPath2);
          }
        }*/
        await testAdditionalDirectoriesAndFiles(fromPath, fromPath.split(rootFolderName)[0]);
        //console.log('Split Length ', fromPath.split(rootFolderName).length);
        //console.log(fromPath.split(rootFolderName)[0])

      }
      // Now move async
      //await fs.promises.rename( fromPath, toRenamed); How we will rename video files in proper order this will be used later on Very cool functin here

      // Log because we're crazy
      //console.log("Moved '%s'->'%s'", fromPath, toPath);
    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    //var moveFrom = __newDirName+prefix+configjson.listOfRootFolderNames[rootFolderIndex];
    //realLog(moveFrom, '\n\n\n');
    console.error("We've thrown! Whoops!", e);
  }

}
//Complete No Bugs
async function temp() {
  initializeObjectsInExecutionPath();
  await timer(5000);
  const configJSON = await fs.promises.readFile('./config.json');
  if (configjson.openGUIOnStart){
  initializeMainGUI();
  }
  //initializeP2P();
  if (isJsonString(configJSON)) {
    configjson = JSON.parse(configJSON);
    console.log(configjson);
    var t = new Array();
    t = configjson.listOfRootFolderNames;
    var i = t.length;
    if (configjson.repoAutoSearchIndexing) {
      for (i; i > 0; i--) {
        rootFolderIndex = (i - 1);
        arrayOfFiles[rootFolderIndex] = new Array();
        rootFolderName = configjson.listOfRootFolderNames[rootFolderIndex];
        //await timer(1000);
        await testMainDirectory();
        //console.log(pingJSONTemp);
        arrayOfPingJsonTemp[rootFolderIndex] = pingJSONTemp;
        var pingpath = __newDirName + prefix + configjson.listOfRootFolderNames[rootFolderIndex] + prefix + "ping.json";
        //console.log(pingpath);
        //await timer(1000);
        if (arrayOfPingJsonTemp[rootFolderIndex]) {
          await fs.promises.writeFile(pingpath, JSON.stringify(arrayOfPingJsonTemp[rootFolderIndex], null, " "), { flag: 'w' });
          Pings2Check[rootFolderIndex] = new Array();
          await timer(100);
          await pings2CheckGenerate();
          await timer(1000);
          // realLog(arrayOfPingJsonTemp[rootFolderIndex]);}
          //await timer(1000);
          //await updateIPFSFilesNewAttempt();
          if (configjson.ipfsDesktopInstalled) {
            //Ensures the key is generated!
            try {
              if (configjson.ipnsKeys[rootFolderIndex] !== "self") {
                var command4 = ipfsBinaryPrefix + " key gen " + configjson.ipnsKeys[rootFolderIndex];
                const promise = exec(command4, { env: process.env });
                const child = promise.child;
                child.stdout.on('data', function(data) {
                  //console.log('stdout: ' + data);
                });
                child.stderr.on('data', function(data) {
                  //console.log('stderr: ' + data);
                });
                child.on('close', function(code) {
                  //console.log('closing code: ' + code);
                });
                // i.e. can then await for promisified exec call to complete

                const { stdout, stderr } = await promise;
              }
            } catch (e) {/*console.log(e);*/ }
            //console.log(stdout);
            //console.log(child.exitCode);
            /*spawn.exec(command4, function(err, stdout, stderr){
            if (err){console.log(err)}
            if (stdout){console.log(stdout)}
            if (stderr){console.log(stderr)}
            });*/
            threads[rootFolderIndex] = new Set();
            counter[rootFolderIndex] = 0;
            threadcount[rootFolderIndex] = 0;
            await timer(1000);
            //await updateIPFSFiles();////////////
            console.log('Working on Index', rootFolderIndex);
            await updateIPFSFilesNewAttempt(); /////////
            //await timer(5000);
            //await pings2CheckGenerate(); ////////////
            await timer(1000);
            //await timer(1000);
            //opn(url);
            //spawn.spawn('open', ['http://localhost:3000']);
            //spawn.exec((process.platform.replace('darwin','').replace(/win32|linux/,'xdg-') + 'open ' + url));
            ////////
            //await timer(2500);
          }
          //await pings2CheckGenerate();
        }
      }
    }
    await timer(2500);
    var allpingpath = __newDirName + prefix + 'allpings.json'
    //await fs.promises.writeFile(allpingpath, JSON.stringify(arrayOfPingJsonTemp[rootFolderIndex], null, " "), { flag: 'w'});
    await Fs.writeFile(allpingpath, JSON.stringify(Pings2Check, null, " "), { flag: 'w' });
    //await timer(2500);
    await checkPings();
    console.log('Bout to run the system send event to all!');
    await timer(1000);
    pingEventReady = true;
    sendFinishedEventToAll();
  }
}
temp();
