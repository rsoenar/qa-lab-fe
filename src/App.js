import React, { PureComponent, Suspense } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { getLaboratoryTests, getUsers, refreshUser } from "./redux/actions";
import { socket } from "./AppRenderer";
import { getDirection } from "./helpers/Utils";
import { ToastifyContainer } from "./components/Miscellaneous";

const ViewMain = React.lazy(() => import("./views"));
const ViewAuth = React.lazy(() => import("./views/auth"));
const ViewError = React.lazy(() => import("./views/error"));
const ViewApp = React.lazy(() => import("./views/app"));

const AuthRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    const direction = getDirection();

    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  componentDidMount = () => {
    const { token, getLaboratoryTests, refreshUser } = this.props;

    socket.on("users_authorizations_updated", () => {
      refreshUser(token);
    });
    socket.on("laboratory_test_data_updated", () => {
      getLaboratoryTests();
    });
  };

  componentWillUnmount() {
    socket.off("users_authorizations_updated");
    socket.off("laboratory_test_data_updated");
  }

  render() {
    const { token } = this.props;

    return (
      <div className="h-100">
        <>
          <ToastifyContainer />
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <AuthRoute component={ViewApp} path="/app" token={token} />
                <Route
                  path="/auth"
                  render={(props) => <ViewAuth {...props} />}
                />
                <Route
                  exact
                  path="/error"
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  exact
                  path="/"
                  render={(props) => <ViewMain {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};
const mapActionToProps = { refreshUser, getUsers, getLaboratoryTests };

export default connect(mapStateToProps, mapActionToProps)(App);
