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
  MenuItem,
  Modal, //modal comes w/ subcomponents (header, title, footer, body)
  Button,
  Panel
} from "react-bootstrap";

import {
  LinkContainer,
} from "react-router-bootstrap";

import {
  ToastContainer,
  ToastMessage,
} from "react-toastr";

export default class Application extends Component {

  state = {
    showModal: false,
    open: false
     }; //hide it at first

  close = () => { //make sure of arrow functions...modal breaks w.o arrow!!!
    this.setState({ showModal: false });
  };

  open = () => { //opens
    this.setState({ showModal: true });
  };

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
              <Link to="/">Midways</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/geolocation"><MenuItem>Geolocate Yourself</MenuItem>
            </LinkContainer>
            <LinkContainer to="/directions"><MenuItem>Find The Midway!</MenuItem>
            </LinkContainer>
            <Button
              className="button"
              bsStyle="primary"
              onClick={this.open}>
              Contact Me!
            </Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>How To Contact Me</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  <h3>
                  <li><a href="https://www.linkedin.com/in/matthew-cabezon">LinkedIn</a></li>
                  <li><a href="https://github.com/mcabz27">GitHub</a></li>
                  <li><a href="mailto:matt.cabezon@gmail.com">Email Me</a></li>
                  </h3>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        </Navbar>
        <div className="container-fluid full-height">
          <ToastContainer
            ref="toast"
            toastMessageFactory={React.createFactory(ToastMessage.animation)}
          />
          <div className="row full-height">
            <div className="col-xs-9" style={{ height: `100%` }}>
              {React.cloneElement(Children.only(this.props.children), {
                toast: this.handleToast,
              })}
            </div>
            <div className="col-xs-3">
              <div>
                <Button
                  className="button directions"
                  bsSize="large"
                  onClick={ ()=> this.setState({
                    open: !this.state.open })}>
                    How To Use Midways!
                </Button>
                <Panel collapsible expanded={this.state.open}><h3>
                  It's simple! Click on the <a href="/midways/directions">Find the Midway!</a> tab and type in your friends address, or where ever he or she may be.  This will give you directions to meet up half way in between you two. Hopefully this helps your plans!</h3>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
