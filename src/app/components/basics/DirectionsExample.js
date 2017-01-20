/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";

import fancyMapStyles from "../../constants/fancyMapStyles.json";

import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
  >
  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={props.onPlacesChanged}
    inputPlaceholder="Type An Address!"
    inputStyle={INPUT_STYLE}
  />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class DirectionsExample extends Component {

  state = {
    origin: new google.maps.LatLng(40.7398, -73.9902),
    destination: new google.maps.LatLng(40.697782, -73.930242),
    directions: null,
    markers: [],
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();
    const midLat = (this.state.origin.lat() + this.state.destination.lat())/2;
    const midLng = (this.state.origin.lng() + this.state.destination.lng())/2;
      // console.log('Origin Lat: ' + this.state.origin.lat());
      // console.log('Origin Lng: ' + this.state.origin.lng());
      // console.log('Destination Lat: ' + this.state.destination.lat());
      // console.log('Destination Lng: ' + this.state.destination.lng());
      // console.log('New Lat: ' + midLat);
      // console.log('New Lng: ' + midLng);
    const middle = new google.maps.LatLng(midLat, midLng);
    DirectionsService.route({
      origin: this.state.origin,
      destination: middle,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }

    });
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    console.log(places[0]);
    console.log('Lat: ' + places[0].geometry.location.lat());
    console.log('Lng: ' + places[0].geometry.location.lng());
    console.log(places[0].formatted_address);
    console.log(places[0].name);
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  }

  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
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
