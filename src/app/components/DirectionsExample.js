/* global google */
import {
  default as React,
  Component,
} from "react";

// import raf from "raf";

// import canUseDOM from "can-use-dom";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps"; //importing from library(npm install react-google-maps)

import fancyMapStyles from "../mapstyle/fancyMapStyles.json";

import SearchBox from "react-google-maps/lib/places/SearchBox";

// const geolocation = (
//   canUseDOM && navigator.geolocation ?
//   navigator.geolocation :
//   ({
//     getCurrentPosition(success, failure) {
//       failure(`Your browser doesn't support geolocation.`);
//     },
//   })
// );

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

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
  >
  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={props.onPlacesChanged}
    inputPlaceholder="Type Your Friend's Address!"
    inputStyle={INPUT_STYLE}
  />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));

export default class DirectionsExample extends Component {
//add center: null update center
  state = {
    origin: new google.maps.LatLng(40.7398, -73.9902),
    destination: new google.maps.LatLng(40.697782, -74.930242),
    directions: null,
    markers: [],
  };

  componentWillUpdate() { //lifecycle function. lets component be updated. DOES NOT load only once. allows destination to be changed in search box w/o reloading whole page.
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
      destination: middle, //sets B marker(destination) to halfway
      travelMode: google.maps.TravelMode.WALKING, //uses walking. can also use TRANSIT, DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({ //if app gets OK...sets directions to result
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`); //shoots error message
      }
    });
  };

  handleMapMounted = (map) => { //use arrow functions to get rid of some of this keyword
    this._map = map;
  };

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  };

  handleSearchBoxMounted = (searchBox) => { //
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

    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center; //when more than 0 markers, sets state(center) to the 1st marker in array

    this.setState({ //set state as destination logged from search bar
      destination: new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng()), //places is what is returned from google. parsing through to get lat/lng of place from search bar
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
        center={this.state.origin} //sets center to entered origin
        directions={this.state.directions} //sets state as returned directions
        onMapMounted={this.handleMapMounted} //map loads
        onBoundsChanged={this.handleBoundsChanged} //handles change when new place is entered in search box.
        onSearchBoxMounted={this.handleSearchBoxMounted} //searchbar loads
        bounds={this.state.bounds} //area of map shown
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers} //returns state of the markers
      />
    );
  }
}
