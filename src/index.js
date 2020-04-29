import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router'
import './index.css';
import App from './containers/app/App';
import AnotherPage from './containers/AnotherPage'
import * as serviceWorker from './serviceWorker';


const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/another" component={AnotherPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
