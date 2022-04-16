const{ app, BrowserWindow} = require ("electron");

let mainWimdow = null;

app.on('ready', ( () =>{
    mainWimdow = new BrowserWindow({
        webPreferences: {
            nodeIntegration:true
        }
    })
    mainWimdow.loadFile(__dirname + "/index.html")
}));