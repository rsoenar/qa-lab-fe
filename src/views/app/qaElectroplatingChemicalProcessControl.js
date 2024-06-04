import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { Button, Grid, Paper } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Separator } from "../../components/Layouts";
import { electroplatingChemicalProcessControlTableOptions } from "../../constants/tableOptions";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class QaElectroplatingChemicalProcessControl extends PureComponent {
  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { _isMounted } = this;
    const { match, token } = this.props;
    const { authorization } = jwt_decode(token);
    const { superAdmin, electroplatingChemicalProcessControlView } =
      authorization;
    let electroplatingChemicalProcessControlTableColumns = [
      {
        label: "Actions",
        name: "id",
        options: {
          download: false,
          empty: true,
          filter: false,
          print: false,
          searchable: false,
          sort: false,
        },
      },
      {
        label: "Status",
        name: "status",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Sheet No.",
        name: "sheetNo",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Process",
        name: "process",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Program",
        name: "process",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Specification",
        name: "specification",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Operator",
        name: "operatorName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Inspector",
        name: "inspectorName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Lab Personnel",
        name: "labPersonnelName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Verifier",
        name: "verifierName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Valid Until",
        name: "validUntilDateFormated",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
    ];

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Breadcrumb heading="F-DP 704.05.04" match={match} />
              {superAdmin || electroplatingChemicalProcessControlView ? (
                <Button
                  className="text-zero top-right-button-container"
                  color="primary"
                  variant="contained"
                >
                  New Template
                </Button>
              ) : null}
              {superAdmin || electroplatingChemicalProcessControlView ? (
                <Button
                  className="text-zero top-right-button-container"
                  color="primary"
                  variant="contained"
                >
                  New Test
                </Button>
              ) : null}
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          <Tabs>
            <TabList
              style={{ backgroundColor: "rgba(ff, ff, ff, 0.8)", fontSize: 18 }}
            >
              <Tab>Sheets</Tab>
              <Tab>Templates</Tab>
            </TabList>

            <TabPanel>
              <Paper className="pt-5  pl-4 pr-4 pb-4" elevation={4}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: 24,
                    justifyContent: "center",
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                  }}
                >
                  Control of Electroplating and Chemical Processes
                </div>
                <MUIDataTable
                  columns={electroplatingChemicalProcessControlTableColumns}
                  data={_isMounted ? [] : []}
                  options={electroplatingChemicalProcessControlTableOptions}
                />
              </Paper>
            </TabPanel>
            <TabPanel>
              <Paper className="pt-5  pl-4 pr-4 pb-4" elevation={4}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: 24,
                    justifyContent: "center",
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                  }}
                >
                  Control of Electroplating and Chemical Processes Templates
                </div>
                <MUIDataTable
                  columns={electroplatingChemicalProcessControlTableColumns}
                  data={_isMounted ? [] : []}
                  options={electroplatingChemicalProcessControlTableOptions}
                />
              </Paper>
            </TabPanel>
          </Tabs>

          <Grid container>
            <Separator className="mb-5" />
          </Grid>
        </Fragment>
      </Suspense>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { token } = auth;
  return {
    token,
  };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(QaElectroplatingChemicalProcessControl);
