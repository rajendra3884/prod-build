import React from 'react';
import ReactDOM from 'react-dom';
import { Route ,Router ,IndexRoute ,browserHistory } from 'react-router';

import App from './components/App';
import IndexView from './components/IndexView';
import TermsConditionsView from './components/TermsConditionsView';

ReactDOM.render(
  <Router history = {browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexView} />
      <Route path="/terms-conditions" component={TermsConditionsView} />
      <Route path="/*" component={IndexView} />
    </Route>
  </Router>,
  document.getElementById('app')
);
