import SearchBoxExample from "./SearchBoxExample";
import GeolocationExample from "./GeolocationExample";
import DirectionsExample from "./DirectionsExample";

SearchBoxExample.__raw = require(`!raw!./SearchBoxExample`);
GeolocationExample.__raw = require(`!raw!./GeolocationExample`);
DirectionsExample.__raw = require(`!raw!./DirectionsExample`);

export {
  GeolocationExample,
  DirectionsExample,
  SearchBoxExample,
};

