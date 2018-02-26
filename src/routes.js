import React from "react";
import { Route } from "react-router-dom";

import { Loadable } from "./components/Loading";

export const MainNavigation = Loadable(() =>
  import("./containers/Navigation/MainNavigation")
);
export const Home = Loadable(() => import("./containers/Home/Home"));
export const OrderView = Loadable(() =>
  import("./containers/Orders/OrderView")
);

export function Footer() {
  return "Footer";
}

export function makeMainRoutes(Router, routerProps) {
  return (
    <Router {...routerProps}>
      <div>
        <Route path="/" component={MainNavigation} />
        <Route exact path="/" component={Home} />
        <Route path="/orders/:orderId" component={OrderView} />
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/" component={Footer} /> */}
      </div>
    </Router>
  );
}
