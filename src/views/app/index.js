import React, { PureComponent, Suspense } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import AppLayout from "../../layout/AppLayout";

const Dashboards = React.lazy(() => import("./dashboards"));
// const Media = React.lazy(() => import("./media"));
const OrganizationUnit = React.lazy(() => import("./organizationUnit"));
const UserManagement = React.lazy(() => import("./userManagement"));
const QaLaboratoryTest = React.lazy(() => import("./qaLaboratoryTest"));
const QaChemicalSolutionControl = React.lazy(() =>
  import("./qaChemicalSolutionControl")
);
const QaElectroplatingChemicalProcessControl = React.lazy(() =>
  import("./qaElectroplatingChemicalProcessControl")
);

class App extends PureComponent {
  render() {
    const { match, token } = this.props;
    const { url } = match;
    const { authorization } = jwt_decode(token);
    const {
      superAdmin,
      laboratoryTestAdmin,
      laboratoryTestView,
      chemicalSolutionControlAdmin,
      chemicalSolutionControlView,
      electroplatingChemicalProcessControlView,
    } = authorization;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/dashboards`} />

              <Route
                path={`${url}/dashboards`}
                render={(props) => <Dashboards {...props} />}
              />

              {/* Deprecated */}
              {/* {superAdmin ? (
                <Route
                  path={`${url}/media`}
                  render={(props) => <Media {...props} />}
                />
              ) : null} */}

              <Route
                path={`${url}/organization-unit`}
                render={(props) => <OrganizationUnit {...props} />}
              />

              {superAdmin ||
              laboratoryTestAdmin ||
              chemicalSolutionControlAdmin ? (
                <Route
                  path={`${url}/user-management`}
                  render={(props) => <UserManagement {...props} />}
                />
              ) : null}

              {superAdmin || laboratoryTestView ? (
                <Route
                  path={`${url}/laboratory-test`}
                  render={(props) => <QaLaboratoryTest {...props} />}
                />
              ) : null}

              {superAdmin || chemicalSolutionControlView ? (
                <Route
                  path={`${url}/chemical-solution-control`}
                  render={(props) => <QaChemicalSolutionControl {...props} />}
                />
              ) : null}

              {superAdmin || electroplatingChemicalProcessControlView ? (
                <Route
                  path={`${url}/electroplating-chemical-process-control`}
                  render={(props) => (
                    <QaElectroplatingChemicalProcessControl {...props} />
                  )}
                />
              ) : null}

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = ({ auth, menu }) => {
  const { token } = auth;
  const { containerClassnames } = menu;

  return { token, containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
