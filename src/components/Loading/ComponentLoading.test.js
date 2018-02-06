import React from "react";
import { render } from "enzyme";

import {
  ComponentLoading,
  errorComponent,
  timedOutComponent,
  pastDelayComponent
} from "./ComponentLoading";

it("renders error", function() {
  const rendered = render(ComponentLoading({ error: true }));
  const actual = render(errorComponent());
  expect(rendered.html()).toEqual(actual.html());
});

it("renders timeout", function() {
  const rendered = render(ComponentLoading({ timedOut: true }));
  const actual = render(timedOutComponent());
  expect(rendered.html()).toEqual(actual.html());
});

it("renders pastDelay", function() {
  const rendered = render(ComponentLoading({ pastDelay: true }));
  const actual = render(pastDelayComponent());
  expect(rendered.html()).toEqual(actual.html());
});
