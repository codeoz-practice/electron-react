import React, { Component } from 'react';
import './App.css';

window.api.receive('fromMain', (data) => {
  console.log(`[RECV] Renderer-App.js: ${data} from main process`);
});
function onClick() {
  console.log(`[SEND] Renderer-App.js`);
  window.api.send('toMain', 'some data');
}

export default class extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Electron React App</h1>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => onClick()}>CLICK</button>
      </div>
    );
  }
}
