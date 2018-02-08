import React from "react";
import { Route } from "react-router-dom";

import { Loadable } from "./components/Loading";

export const Navigation = Loadable(() => import("./containers/Navigation"));
export const Home = Loadable(() => import("./containers/Home"));
export const OrderView = Loadable(() => import("./containers/Orders"));

export function Footer() {
  return "Footer";
}

export function makeMainRoutes(Router, routerProps) {
  return (
    <Router {...routerProps}>
      <div>
        <Route path="/" component={Navigation} />
        <Route exact path="/" component={Home} />
        <Route path="/order/:orderId" component={OrderView} />
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/" component={Footer} /> */}
      </div>
    </Router>
  );
}
