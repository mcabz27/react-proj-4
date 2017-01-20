/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";

import fancyMapStyles from "../../constants/fancyMapStyles.json";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 40.7398, lng: -73.9902 }}
    defaultOptions={{ styles: fancyMapStyles }}
  />
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {

  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
}
