import React from "react";
import { shallow } from "enzyme";

import { Navbar, NavbarToggler } from "reactstrap";

import { Navigation } from "./Navigation";

it("renders without crashing", function() {
  const wrapper = shallow(<Navigation />);
  expect(wrapper.find(Navbar).exists()).toEqual(true);
});

it("should toggle", function() {
  const wrapper = shallow(<Navigation />);
  expect(wrapper.state("collapsed")).toEqual(true);
  wrapper.find(NavbarToggler).simulate("click");
  expect(wrapper.state("collapsed")).toEqual(false);
});
