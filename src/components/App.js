import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { APP_ROUTES } from "../utils/route-config";

const HomeContainer = lazy(() => import("./home/home-container"));
const Modal = lazy(() => import("./shared/modal/modal"));
const Login = lazy(() => import("./home/login/login"));
const CMSContainer = lazy(() => import("./cms/cms-container"));

const App = props => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={APP_ROUTES.HOME} component={HomeContainer}></Route>
          <Route path={APP_ROUTES.LOGIN} render={props => (
              <Modal {...props} title="Login" routeRedirect="/">
                <Login></Login>
              </Modal>
            )}
          ></Route>
          <Route path={APP_ROUTES.CMS} component={CMSContainer}></Route>
          <Redirect to={APP_ROUTES.HOME} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
