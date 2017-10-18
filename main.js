const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;

let mainWindow;

function createWindow () {

  const tray = new Tray('assets/note.png');
  tray.setToolTip('Bloc-notes Electron');
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    icon: 'assets/note.png',
    title: 'Bloc-notes Electron',
    center: true,
    movable: true,
  });


  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});




