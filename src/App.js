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
        <button onClick={() => onClick()}>SEND MAIN</button>
        <ErrorBoundary>
          <p>
            These two counters are inside the same error boundary. If one
            crashes, the error boundary will replace both of them.
          </p>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here

    console.log('error:', error);

    window.api.send('toMain', error);
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}
