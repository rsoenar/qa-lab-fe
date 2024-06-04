import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { changeUserAuthorization, getUsers } from "../../redux/actions";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Separator } from "../../components/Layouts";
import { UserAuthorizationSwitch } from "../../components/Material";
import { backEndUrl } from "../../constants/defaultValues";
import {
  laboratoryTestUserTableOptions,
  chemicalSolutionControlUserTableOptions,
  electroplatingChemicalProcessControlUserTableOptions,
} from "../../constants/tableOptions";

class UserManagement extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      laboratoryTestUsers: [],
      chemicalSolutionControlUsers: [],
      electroplatingChemicalProcessControlUsers: [],
    };
  }

  static getDerivedStateFromProps(props) {
    const {
      laboratoryTestUsers,
      chemicalSolutionControlUsers,
      electroplatingChemicalProcessControlUsers,
    } = props;

    return {
      laboratoryTestUsers,
      chemicalSolutionControlUsers,
      electroplatingChemicalProcessControlUsers,
    };
  }

  componentDidMount = () => {
    const { getUsers } = this.props;

    this._isMounted = true;
    getUsers();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { _isMounted } = this;
    const { match, token, getUsersLoading, changeUserAuthorization } =
      this.props;
    const {
      laboratoryTestUsers,
      chemicalSolutionControlUsers,
      electroplatingChemicalProcessControlUsers,
    } = this.state;
    const { id: userId, authorization } = jwt_decode(token);
    const {
      superAdmin,
      chemicalSolutionControlAdmin,
      laboratoryTestAdmin,
      electroplatingChemicalProcessControlAdmin,
    } = authorization;
    const laboratoryTestUserColumns = [
      {
        name: "id",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "authorizationId",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        label: "Photo",
        name: "photo",
        options: {
          filter: false,
          searchable: false,
          sortThirdClickReset: true,
          customHeadRender: () => (
            <th
              key={0}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
          customBodyRender: (_value, tableMeta) => {
            return (
              <Avatar
                src={`${backEndUrl}/assets/img/user/portrait/minified/${tableMeta.rowData[3]}.jpg`}
                style={{ height: "120px", width: "90px" }}
                variant="rounded"
              />
            );
          },
        },
      },
      {
        label: "NIK",
        name: "nik",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Name",
        name: "name",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Organization",
        name: "organization",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Administrator",
        name: "laboratoryTestAdmin",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? true : false}
                value={value ? "Administrator: On" : "Administrator: Off"}
                disabled={tableMeta.rowData[0] === userId}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestAdmin: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestAdmin = value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "View",
        name: "laboratoryTestView",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "View: On" : "View: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestView: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestView = value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Observe",
        name: "laboratoryTestObserve",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Observe: On" : "Observe: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestObserve: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestObserve = value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Request",
        name: "laboratoryTestRequest",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Request: On" : "Request: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestRequest: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestRequest = value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Approve Request",
        name: "laboratoryTestApproveRequest",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Approve Request: On" : "Approve Request: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    laboratoryTestApproveRequest: !value,
                  };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestApproveRequest =
                    value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Receive Request",
        name: "laboratoryTestReceiveRequest",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Receive Request: On" : "Receive Request: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    laboratoryTestReceiveRequest: !value,
                  };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestReceiveRequest =
                    value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Report",
        name: "laboratoryTestReport",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Report: On" : "Report: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestReport: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestReport = value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
      {
        name: "laboratoryTestApproveReport",
        label: "Approve Report",
        options: {
          sortThirdClickReset: true,
          searchable: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Approve Report: On" : "Approve Report: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { laboratoryTestApproveReport: !value };
                  const index = laboratoryTestUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  laboratoryTestUsers[index].laboratoryTestApproveReport =
                    value;
                  this.setState({ laboratoryTestUsers });
                }}
              />
            );
          },
        },
      },
    ];
    const chemicalSolutionControlUserColumns = [
      {
        name: "id",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "authorizationId",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        label: "Photo",
        name: "photo",
        options: {
          filter: false,
          searchable: false,
          sortThirdClickReset: true,
          customHeadRender: () => (
            <th
              key={0}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
          customBodyRender: (_value, tableMeta) => {
            return (
              <Avatar
                src={`${backEndUrl}/assets/img/user/portrait/minified/${tableMeta.rowData[3]}.jpg`}
                style={{ height: "120px", width: "90px" }}
                variant="rounded"
              />
            );
          },
        },
      },
      {
        label: "NIK",
        name: "nik",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Name",
        name: "name",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Organization",
        name: "organization",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Administrator",
        name: "chemicalSolutionControlAdmin",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Administrator: On" : "Administrator: Off"}
                disabled={tableMeta.rowData[0] === userId}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    chemicalSolutionControlAdmin: !value,
                  };
                  const index = chemicalSolutionControlUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  chemicalSolutionControlUsers[
                    index
                  ].chemicalSolutionControlAdmin = value;
                  this.setState({ chemicalSolutionControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "View",
        name: "chemicalSolutionControlView",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "View: On" : "View: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = { chemicalSolutionControlView: !value };
                  const index = chemicalSolutionControlUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  chemicalSolutionControlUsers[
                    index
                  ].chemicalSolutionControlView = value;
                  this.setState({ chemicalSolutionControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Create Worksheet",
        name: "chemicalSolutionControlCreateWorksheet",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Create Worksheet: On" : "Create Worksheet: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    chemicalSolutionControlCreateWorksheet: !value,
                  };
                  const index = chemicalSolutionControlUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  chemicalSolutionControlUsers[
                    index
                  ].chemicalSolutionControlCreateWorksheet = value;
                  this.setState({ chemicalSolutionControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Create Record",
        name: "chemicalSolutionControlCreateRecord",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Create Record: On" : "Create Record: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    chemicalSolutionControlCreateRecord: !value,
                  };
                  const index = chemicalSolutionControlUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  chemicalSolutionControlUsers[
                    index
                  ].chemicalSolutionControlCreateRecord = value;
                  this.setState({ chemicalSolutionControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Verify Record",
        name: "chemicalSolutionControlVerifyRecord",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Verify Record: On" : "Verify Record: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    chemicalSolutionControlVerifyRecord: !value,
                  };
                  const index = chemicalSolutionControlUsers.findIndex(
                    (x) => x.authorizationId === authorizationId
                  );

                  changeUserAuthorization(authorizationId, authorization);
                  chemicalSolutionControlUsers[
                    index
                  ].chemicalSolutionControlVerifyRecord = value;
                  this.setState({ chemicalSolutionControlUsers });
                }}
              />
            );
          },
        },
      },
    ];
    const electroplatingChemicalProcessControlUserColumns = [
      {
        name: "id",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        name: "authorizationId",
        options: {
          display: "excluded",
          filter: false,
          searchable: false,
        },
      },
      {
        label: "Photo",
        name: "photo",
        options: {
          filter: false,
          searchable: false,
          sortThirdClickReset: true,
          customHeadRender: () => (
            <th
              key={0}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
          customBodyRender: (_value, tableMeta) => {
            return (
              <Avatar
                src={`${backEndUrl}/assets/img/user/portrait/minified/${tableMeta.rowData[3]}.jpg`}
                style={{ height: "120px", width: "90px" }}
                variant="rounded"
              />
            );
          },
        },
      },
      {
        label: "NIK",
        name: "nik",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Name",
        name: "name",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Organization",
        name: "organization",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Administrator",
        name: "electroplatingChemicalProcessControlAdmin",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Administrator: On" : "Administrator: Off"}
                disabled={tableMeta.rowData[0] === userId}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlAdmin: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlAdmin = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "View",
        name: "electroplatingChemicalProcessControlView",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "View: On" : "View: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlView: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlView = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Operator",
        name: "electroplatingChemicalProcessControlOperator",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Operator: On" : "Operator: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlOperator: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlOperator = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Inspector",
        name: "electroplatingChemicalProcessControlInspector",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Inspector: On" : "Inspector: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlInspector: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlInspector = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Lab Personnel",
        name: "electroplatingChemicalProcessControlLabPersonnel",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Lab Personnel: On" : "Lab Personnel: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlLabPersonnel: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlLabPersonnel = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
      {
        label: "Verifier",
        name: "electroplatingChemicalProcessControlVerifier",
        options: {
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <UserAuthorizationSwitch
                checked={value ? value : false}
                value={value ? "Verifier: On" : "Verifier: Off"}
                onChange={() => {
                  const authorizationId = tableMeta.rowData[1];
                  const authorization = {
                    electroplatingChemicalProcessControlVerifier: !value,
                  };
                  const index =
                    electroplatingChemicalProcessControlUsers.findIndex(
                      (x) => x.authorizationId === authorizationId
                    );

                  changeUserAuthorization(authorizationId, authorization);
                  electroplatingChemicalProcessControlUsers[
                    index
                  ].electroplatingChemicalProcessControlVerifier = value;
                  this.setState({ electroplatingChemicalProcessControlUsers });
                }}
              />
            );
          },
        },
      },
    ];

    laboratoryTestUserTableOptions.textLabels = {
      body: {
        noMatch:
          !getUsersLoading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };
    chemicalSolutionControlUserTableOptions.textLabels = {
      body: {
        noMatch:
          !getUsersLoading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };
    electroplatingChemicalProcessControlUserTableOptions.textLabels = {
      body: {
        noMatch:
          !getUsersLoading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Breadcrumb heading="User Management" match={match} />
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          {superAdmin || laboratoryTestAdmin ? (
            <Card className="pt-5 pl-2 pr-2 pb-2 mb-5" elevation={4}>
              <CardContent>
                <MUIDataTable
                  columns={laboratoryTestUserColumns}
                  data={
                    !getUsersLoading && _isMounted ? laboratoryTestUsers : []
                  }
                  options={laboratoryTestUserTableOptions}
                  title={"F-DP 704.04: Laboratory Tests"}
                />
              </CardContent>
            </Card>
          ) : null}

          {superAdmin || chemicalSolutionControlAdmin ? (
            <Card className="pt-5 pl-2 pr-2 pb-2 mb-5" elevation={4}>
              <CardContent>
                <MUIDataTable
                  columns={chemicalSolutionControlUserColumns}
                  data={
                    !getUsersLoading && _isMounted
                      ? chemicalSolutionControlUsers
                      : []
                  }
                  options={chemicalSolutionControlUserTableOptions}
                  title={
                    "F-DP 704.05.01: Chemical Solution Control and Records"
                  }
                />
              </CardContent>
            </Card>
          ) : null}

          {superAdmin || electroplatingChemicalProcessControlAdmin ? (
            <Card className="pt-5 pl-2 pr-2 pb-2" elevation={4}>
              <CardContent>
                <MUIDataTable
                  columns={electroplatingChemicalProcessControlUserColumns}
                  data={
                    !getUsersLoading && _isMounted
                      ? electroplatingChemicalProcessControlUsers
                      : []
                  }
                  options={electroplatingChemicalProcessControlUserTableOptions}
                  title={
                    "F-DP 704.05.04: Control of Electroplating and Chemical Processes"
                  }
                />
              </CardContent>
            </Card>
          ) : null}

          <Grid container>
            <Separator className="mb-5" />
          </Grid>
        </Fragment>
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth, userManagement }) => {
  const { token } = auth;
  const {
    getUsersLoading,
    laboratoryTestUsers,
    chemicalSolutionControlUsers,
    electroplatingChemicalProcessControlUsers,
  } = userManagement;

  return {
    token,
    getUsersLoading,
    laboratoryTestUsers,
    chemicalSolutionControlUsers,
    electroplatingChemicalProcessControlUsers,
  };
};
const mapActionsToProps = { changeUserAuthorization, getUsers };

export default connect(mapStateToProps, mapActionsToProps)(UserManagement);
