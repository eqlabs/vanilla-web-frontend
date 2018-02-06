import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { makeMainRoutes } from "./routes";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const routes = makeMainRoutes(Router);
ReactDOM.render(routes, document.getElementById("root"));
registerServiceWorker();
