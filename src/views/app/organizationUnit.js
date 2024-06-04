/* eslint-disable jsx-a11y/alt-text */
import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import { Avatar, Card, CardContent, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { getUsers } from "../../redux/actions";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Separator } from "../../components/Layouts";
import { backEndUrl } from "../../constants/defaultValues";
import { organizationUnitTableOptions } from "../../constants/tableOptions";

class OrganizationUnit extends PureComponent {
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
    const { match, getUsersLoading, users } = this.props;
    const organizationUnitTableColumns = [
      {
        label: "Photo",
        name: "photo",
        options: {
          filter: false,
          searchable: false,
          sortThirdClickReset: true,
          customBodyRender: (_value, tableMeta) => {
            return (
              <Avatar
                style={{ height: "120px", width: "90px" }}
                variant="rounded"
                src={`${backEndUrl}/assets/img/user/portrait/minified/${tableMeta.rowData[1]}.jpg`}
              />
            );
          },
          customHeadRender: () => (
            <th
              key={0}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
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
        label: "Email",
        name: "iaeEmail",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Phone No.",
        name: "phoneNo",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
    ];

    organizationUnitTableOptions.textLabels = {
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
              <Breadcrumb heading="Organization Unit" match={match} />
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          <Card className="pt-5 pl-2 pr-2 pb-2 mb-5" elevation={4}>
            <CardContent>
              <MUIDataTable
                columns={organizationUnitTableColumns}
                data={!getUsersLoading && _isMounted ? users : []}
                options={organizationUnitTableOptions}
                title={"Employees"}
              />
            </CardContent>
          </Card>
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
  const { getUsersLoading, users } = userManagement;

  return { token, getUsersLoading, users };
};
const mapActionsToProps = { getUsers };

export default connect(mapStateToProps, mapActionsToProps)(OrganizationUnit);
