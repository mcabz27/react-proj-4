import {
  default as React,
  Component,
} from "react";

import {
  useRouterHistory,
  Router,
  Route,
  IndexRoute,
} from "react-router";

import {
  createHistory,
} from "history";

import {
  Application,
} from "./containers";

import {
  GettingStartedExample,
} from "./components";

import {
  SimpleMapExample,
  GeolocationExample,
  DirectionsExample,
} from "./components/basics";

import {
  AccessingArgumentsExample,
  GettingPropertiesExample,
} from "./components/events";


import {
  SearchBoxExample,
} from "./components/places";


const history = useRouterHistory(createHistory)({
  basename: `/react-google-maps`,
});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Application}>
          <IndexRoute component={GettingStartedExample} />
          <Route path="basics">
            <Route path="simple-map" component={SimpleMapExample} />
            <Route path="geolocation" component={GeolocationExample} />
            <Route path="directions" component={DirectionsExample} />
          </Route>
          <Route path="events">
            <Route path="accessing-arguments" component={AccessingArgumentsExample} />
            <Route path="getting-properties" component={GettingPropertiesExample} />
          </Route>
          <Route path="places">
            <Route path="search-box" component={SearchBoxExample} />
          </Route>
        </Route>
      </Router>
    );
  }
}
