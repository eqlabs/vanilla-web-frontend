import React from "react";
import { shallow } from "enzyme";

import { Container } from "reactstrap";
import { Home } from "./Home";

it("renders without crashing", function() {
  const wrapper = shallow(<Home />);
  expect(wrapper.find(Container).exists()).toEqual(true);
});
