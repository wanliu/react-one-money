import React, {Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, IndexRoute, Link, IndexLink} from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';


import configureStore from './store/configureStore';

import DevTools from './pages/DevTools';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

import './style/main.styl';

const history = createBrowserHistory();
const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {pathname} = this.props.location;
    return (
      <div>
        <ul className="nav">
          <li><IndexLink to="/" activeClassName="active">/</IndexLink></li>
          <li><Link to="/list" activeClassName="active">list</Link></li>
          <li><Link to="/detail" activeClassName="active">detail</Link></li>
        </ul>
        <DevTools />
        <TransitionGroup transitionName="example" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {cloneElement(this.props.children || <div/>, { key: pathname })}
        </TransitionGroup>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/list" component={ListPage}/>
        <Route path="/detail" component={DetailPage}/>
      </Route>
    </Router>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);