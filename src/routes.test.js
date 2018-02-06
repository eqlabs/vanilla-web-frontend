import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";

import { makeMainRoutes } from "./routes";
// import { About, Home, Navigation, NotFound } from "./containers";

it("renders each route component", function() {
  const wrapper = mount(makeMainRoutes(MemoryRouter));
  expect(wrapper.find(Route).length).toEqual(4);
});

// it("renders Home route", function() {
//   const wrapper = mount(
//     makeMainRoutes(MemoryRouter, { initialEntries: ["/"] })
//   );
// });

// it("renders About route", function() {
//   const wrapper = mount(
//     makeMainRoutes(MemoryRouter, { initialEntries: ["/about"] })
//   );
//   wrapper.html(); //?
// });

// it("renders random route", function() {
//   const wrapper = mount(
//     makeMainRoutes(MemoryRouter, { initialEntries: ["/random"] })
//   );
// });
