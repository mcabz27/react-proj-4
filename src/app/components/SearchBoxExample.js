/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import fancyMapStyles from "../mapstyle/fancyMapStyles.json";

import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = { //search box styling
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `440px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15} //zoom on map
    center={props.center} //center of shown portion of map
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{ styles: fancyMapStyles }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Search A Random Place!"
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

export default class SearchBoxExample extends Component {

  state = {
    bounds: null,
    center: {
      lat: 40.7398,
      lng: -73.9902,
    },
    markers: [],
  };

  // handleMapMounted = this.handleMapMounted.bind(this);
  // handleBoundsChanged = this.handleBoundsChanged.bind(this);
  // handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  // handlePlacesChanged = this.handlePlacesChanged.bind(this);

  handleMapMounted = (map) => { //use of arrow func negates bind.this
    this._map = map;
  };

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  };

  handleSearchBoxMounted = (searchBox) => {
    this._searchBox = searchBox;
  };

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces(); //places is now information recieved from searchbox.
    console.log(places[0]);
    console.log('Lat: ' + places[0].geometry.location.lat()); //parsing through info
    console.log('Lng: ' + places[0].geometry.location.lng());
    console.log(places[0].formatted_address);
    console.log(places[0].name);
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location, //puts marker on position returned
    }));

    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center; //sets map center to marker in 1st position in array

    this.setState({
      center: mapCenter, //resets state to mapCenter ^^
      markers,
    });
  }

  render() {
    return (
      <SearchBoxExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers}

      />
    );
  }
}
