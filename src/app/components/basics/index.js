import SimpleMapExample from "./SimpleMapExample";

import GeolocationExample from "./GeolocationExample";

import DirectionsExample from "./DirectionsExample";

SimpleMapExample.__raw = require(`!raw!./SimpleMapExample`);
GeolocationExample.__raw = require(`!raw!./GeolocationExample`);
DirectionsExample.__raw = require(`!raw!./DirectionsExample`);

export {
  SimpleMapExample,
  GeolocationExample,
  DirectionsExample,
};
