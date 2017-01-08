
import React                                   from 'react'
import ReactDOM                                from 'react-dom'
import { createStore, combineReducers }        from 'redux'
import { Provider }                            from 'react-redux'
import { Router, Route, IndexRoute, browserHistory }       from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createDevTools }                      from 'redux-devtools'
import LogMonitor                              from 'redux-devtools-log-monitor'
import DockMonitor                             from 'redux-devtools-dock-monitor'
import $ from 'jquery'
window.jQuery = $
require('bootstrap')

import App from './layouts/App'
import Home from './pages/Home'
import UserPage from './pages/UserPage'
import Services from './pages/Services'

const reducer = combineReducers({
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

const store = createStore(
  reducer,
  DevTools.instrument()
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute   component={Home}/>
          <Route path="userPage" component={UserPage}/>
          <Route path="service" component={Services}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
)
