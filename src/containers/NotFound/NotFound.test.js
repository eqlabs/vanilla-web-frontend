import React from "react";
import { shallow } from "enzyme";

import { Container } from "reactstrap";
import { NotFound } from "./NotFound";

it("renders without crashing", function() {
  const wrapper = shallow(<NotFound />);
  expect(wrapper.find(Container).exists()).toEqual(true);
});
