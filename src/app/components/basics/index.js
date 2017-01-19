import SimpleMapExample from "./SimpleMapExample";

import StyledMapExample from "./StyledMapExample";

import GeolocationExample from "./GeolocationExample";

import DirectionsExample from "./DirectionsExample";

import PopUpInfoWindowExample from "./PopUpInfoWindowExample";

SimpleMapExample.__raw = require(`!raw!./SimpleMapExample`);
StyledMapExample.__raw = require(`!raw!./StyledMapExample`);
GeolocationExample.__raw = require(`!raw!./GeolocationExample`);
DirectionsExample.__raw = require(`!raw!./DirectionsExample`);
PopUpInfoWindowExample.__raw = require(`!raw!./PopUpInfoWindowExample`);

export {
  SimpleMapExample,
  StyledMapExample,
  GeolocationExample,
  DirectionsExample,
  PopUpInfoWindowExample,
};
