

import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;
const TEMP_DIR = process.env.TEMP + '\\chrome_test_fav_' + Date.now();

const chromeProcess = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${TEMP_DIR}`,
  'about:blank'
]);

async function run() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      if (res.ok) break;
    } catch (e) {}
    await new Promise(r => setTimeout(r, 200));
  }
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');

  const svgContent = fs.readFileSync('static/img/favicon.svg', 'utf8');
  const icoBase64 = fs.readFileSync('static/favicon.ico').toString('base64');
  const pngBase64 = fs.readFileSync('static/img/favicon-256.png').toString('base64');

  const html = `
    <html>
      <body style="background:#222; display:flex; gap:20px; align-items:center; padding:50px;">
        <div style="background:#fff; padding:20px;">
          <h3>SVG:</h3>
          <div style="width:128px; height:128px;">${svgContent}</div>
        </div>
        <div style="background:#fff; padding:20px;">
          <h3>ICO:</h3>
          <img src="data:image/x-icon;base64,${icoBase64}" width="128" height="128" />
        </div>
        <div style="background:#fff; padding:20px;">
          <h3>PNG 256:</h3>
          <img src="data:image/png;base64,${pngBase64}" width="128" height="128" />
        </div>
      </body>
    </html>
  `;

  await send('Page.navigate', { url: 'data:text/html,' + encodeURIComponent(html) });
  await new Promise(r => setTimeout(r, 1000));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('shots/favicon-check.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Saved shots/favicon-check.png');
  chromeProcess.kill();
}
run();
