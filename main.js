const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let nextProcess;

function startNextServer() {
  return spawn('npm', ['run', 'start'], {
    cwd: path.resolve(__dirname),
    shell: true,
    stdio: 'inherit',
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  nextProcess = startNextServer();

  // Wait a bit for Next.js server to start
  setTimeout(() => {
    createWindow();
  }, 5000);
});

app.on('window-all-closed', () => {
  if (nextProcess) {
    nextProcess.kill();
  }
  if (process.platform !== 'darwin') app.quit();
});
