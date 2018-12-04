import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let HotContext = React.createContext();
let _invalidate;
function HotContainer({ children }) {
  const [inc, setInc] = React.useState(0);
  _invalidate = () => setInc(c => c + 1);
  return <HotContext.Provider value={inc}>{children}</HotContext.Provider>;
}

window.__enqueueForceUpdate = function(type) {
  console.log('force', type.name);
  _invalidate();
};

window.__renderHook = function(type) {
  console.log('render', type.name);
  React.useContext(HotContext);
};

ReactDOM.render(
  <HotContainer>
    <App />
  </HotContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
