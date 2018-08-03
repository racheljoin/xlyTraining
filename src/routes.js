import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Test from './containers/Test';
import About from './containers/About';

const AppRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Test} />
    <Route path="about(-:uu)" component={About} />
  </Route>
);

export default AppRoutes;
