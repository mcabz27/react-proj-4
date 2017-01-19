/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";

// import InfoBox from "../../../lib/addons/InfoBox";

import fancyMapStyles from "../../constants/fancyMapStyles.json";

const StyledMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
  >
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class StyledMapExample extends Component {

  handleClickFromChildrenOfInfoBox = this.handleClickFromChildrenOfInfoBox.bind(this);

  handleClickFromChildrenOfInfoBox(e) {
    console.log(`handleClickFromChildrenOfInfoBox!!`);
    console.log(e);
  }

  render() {
    return (
      <StyledMapExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={new google.maps.LatLng(40.7398, -73.9902)}
        onClickFromChildrenOfInfoBox={this.handleClickFromChildrenOfInfoBox}
      />
    );
  }
}
