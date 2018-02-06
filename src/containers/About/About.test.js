import React from "react";
import { shallow } from "enzyme";

import { Container } from "reactstrap";
import { About } from "./About";

it("renders without crashing", function() {
  const wrapper = shallow(<About />);
  expect(wrapper.find(Container).exists()).toEqual(true);
});
