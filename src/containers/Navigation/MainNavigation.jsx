import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
  // NavItem,
  // NavLink
} from "reactstrap";
import "./MainNavigation.css";
import logo from "./vanilla.png";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Container fluid={true}>
          <Navbar light expand="md">
            <NavbarBrand to="/" tag={Link} className="mr-auto">
              <img className="vanilla-logo" src={logo} alt="Vanilla" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                {/* <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" tag={Link}>
                  About
                </NavLink>
              </NavItem> */}
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}
