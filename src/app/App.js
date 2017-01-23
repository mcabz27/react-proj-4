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
  GeolocationExample,
  DirectionsExample,
  SearchBoxExample,
} from "./components";

const history = useRouterHistory(createHistory)({
  basename: `/midways`,
});

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Application}>
          <IndexRoute component={SearchBoxExample} />
            <Route path="geolocation" component={GeolocationExample} />
            <Route path="directions" component={DirectionsExample} />
        </Route>
      </Router>
    );
  }
}
