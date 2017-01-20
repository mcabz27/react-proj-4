import {
  default as React,
  Component,
  PropTypes,
  Children,
} from "react";

import {
  Link,
} from "react-router";

import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";

import {
  LinkContainer,
} from "react-router-bootstrap";

import {
  ToastContainer,
  ToastMessage,
} from "react-toastr";

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  handleToast = this.handleToast.bind(this);

  handleToast(title, message) {
    this.refs.toast.success(title, message);
  }

  render() {
    return (
      <div className="full-height">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React Google Maps</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown id="examples-dropdown" title="Examples">
              <LinkContainer to="/basics/simple-map"><MenuItem>Simple map</MenuItem></LinkContainer>
              <LinkContainer to="/basics/geolocation"><MenuItem>Geolocation</MenuItem></LinkContainer>
              <LinkContainer to="/basics/directions"><MenuItem>Directions</MenuItem></LinkContainer>
              <MenuItem divider />
              <LinkContainer to="/events/accessing-arguments">
                <MenuItem>
                  Accessing arguments in UI events
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/events/getting-properties">
                <MenuItem>
                  Getting properties with event handlers
                </MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer to="/places/search-box"><MenuItem>Adding a places search box</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="container-fluid full-height">
          <ToastContainer
            ref="toast"
            toastMessageFactory={React.createFactory(ToastMessage.animation)}
          />
          <div className="row full-height">
            <div className="col-xs-7" style={{ height: `100%` }}>
              {React.cloneElement(Children.only(this.props.children), {
                toast: this.handleToast,
              })}
            </div>
            <div className="col-xs-5">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
