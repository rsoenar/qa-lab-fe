import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { CloudDownloadOutlined as CloudDownloadOutlinedIcon } from "@material-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Chip,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import {
  ArchiveOutlined as ArchiveOutlinedIcon,
  DeleteForever as DeleteForeverIcon,
  DoneAllOutlined as DoneAllOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon,
  UpdateOutlined as UpdateOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  DonutLargeOutlined as DonutLargeOutlinedIcon,
  SupervisorAccountOutlined as SupervisorAccountOutlinedIcon,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import {
  changeSelectedLaboratoryTestYear,
  getLaboratoryTests,
  getUsers,
  toggleApproveReportModal,
  toggleApproveRequestModal,
  toggleDeleteRequestModal,
  toggleDownloadDocumentModal,
  toggleEditReportModal,
  toggleEditRequestModal,
  toggleReceiveRequestModal,
  toggleReportHistoryModal,
  toggleReviseReportModal,
  toggleSubmitReportModal,
  toggleSubmitRequestModal,
} from "../../redux/actions";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ApproveLaboratoryTestReportModal from "../../containers/modals/ApproveLaboratoryTestReportModal";
import ApproveLaboratoryTestRequestModal from "../../containers/modals/ApproveLaboratoryTestRequestModal";
import DeleteLaboratoryTestRequestModal from "../../containers/modals/DeleteLaboratoryTestRequestModal";
import DownloadLaboratoryTestDocumentModal from "../../containers/modals/DownloadLaboratoryTestDocumentModal";
import EditLaboratoryTestReportModal from "../../containers/modals/EditLaboratoryTestReportModal";
import EditLaboratoryTestRequestModal from "../../containers/modals/EditLaboratoryTestRequestModal";
import LaboratoryTestReportHistoryModal from "../../containers/modals/LaboratoryTestReportHistoryModal";
import ReceiveLaboratoryTestRequestModal from "../../containers/modals/ReceiveLaboratoryTestRequestModal";
import ReviseLaboratoryTestReportModal from "../../containers/modals/ReviseLaboratoryTestReportModal";
import SubmitLaboratoryTestReportModal from "../../containers/modals/SubmitLaboratoryTestReportModal";
import SubmitLaboratoryTestRequestModal from "../../containers/modals/SubmitLaboratoryTestRequestModal";
import { Separator } from "../../components/Layouts";
import { laboratoryTestTableOptions } from "../../constants/tableOptions";
import { appLaunchYear, backEndUrl } from "../../constants/defaultValues";

class QaLaboratoryTest extends PureComponent {
  componentDidMount = () => {
    const { selectedLaboratoryTestYear, getLaboratoryTests, getUsers } =
      this.props;

    this._isMounted = true;
    getLaboratoryTests(selectedLaboratoryTestYear);
    getUsers();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { _isMounted } = this;
    const {
      match,
      token,
      loading,
      selectedLaboratoryTestYear,
      laboratoryTests,
      changeSelectedLaboratoryTestYear,
      toggleSubmitRequestModal,
      toggleEditRequestModal,
      toggleApproveRequestModal,
      toggleDeleteRequestModal,
      toggleReceiveRequestModal,
      toggleSubmitReportModal,
      toggleEditReportModal,
      toggleApproveReportModal,
      toggleReviseReportModal,
      toggleDownloadDocumentModal,
      toggleReportHistoryModal,
    } = this.props;
    const { organization, authorization } = jwt_decode(token);
    const usersOrganization = organization?.substring(0, 3);
    const {
      superAdmin,
      laboratoryTestAdmin,
      laboratoryTestRequest,
      laboratoryTestApproveRequest,
      laboratoryTestReceiveRequest,
      laboratoryTestReport,
      laboratoryTestApproveReport,
    } = authorization;
    const yearPicker = [];
    let laboratoryTestTableColumns = [
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
          customBodyRender: (value) => {
            let rowData;

            for (let i = 0; i < laboratoryTests.length; i++) {
              if (laboratoryTests[i].id === value) {
                rowData = laboratoryTests[i];
              }
            }

            return (
              <div>
                <ButtonGroup size="small" variant="contained">
                  {(superAdmin || laboratoryTestApproveRequest) &&
                  rowData.requesterName &&
                  !rowData.requestApproverName &&
                  (superAdmin ||
                    usersOrganization ===
                      rowData.requesterOrganization?.substring(0, 3)) ? (
                    <Button
                      onClick={() => {
                        toggleApproveRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#ff9800" }}
                    >
                      <DoneAllOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestReceiveRequest) &&
                  rowData.requestApproverName &&
                  !rowData.requestReceiverName ? (
                    <Button
                      onClick={() => {
                        toggleReceiveRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#f57c00" }}
                    >
                      <DoneAllOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestReport) &&
                  rowData.requestReceiverName &&
                  !rowData.reporterName ? (
                    <Button
                      onClick={() => {
                        toggleSubmitReportModal(rowData);
                      }}
                      style={{ backgroundColor: "#2196f3" }}
                    >
                      <DoneAllOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestApproveReport) &&
                  rowData.reporterName &&
                  !rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleApproveReportModal(rowData);
                      }}
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      <DoneAllOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin &&
                    rowData.requesterName &&
                    !rowData.requestApproverName) ||
                  (laboratoryTestRequest &&
                    rowData.requesterName &&
                    !rowData.requestApproverName &&
                    usersOrganization ===
                      rowData.requesterOrganization?.substring(0, 3)) ? (
                    <Button
                      onClick={() => {
                        toggleEditRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#ff9800" }}
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestReport) &&
                  rowData.reporterName &&
                  !rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleEditReportModal(rowData);
                      }}
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestAdmin) &&
                  rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleEditRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#388e3c" }}
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestReport) &&
                  rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleReviseReportModal(rowData);
                      }}
                      style={{ backgroundColor: "#388e3c" }}
                    >
                      <UpdateOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {(superAdmin || laboratoryTestAdmin) &&
                  rowData.requestApproverName &&
                  !rowData.requestReceiverName ? (
                    <Button
                      onClick={() => {
                        toggleEditRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#f57c00" }}
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {((superAdmin || laboratoryTestAdmin) &&
                    rowData.requestApproverName &&
                    !rowData.requestReceiverName) ||
                  (laboratoryTestApproveRequest &&
                    rowData.requestApproverName &&
                    !rowData.requestReceiverName &&
                    usersOrganization ===
                      rowData.requesterOrganization?.substring(0, 3)) ? (
                    <Button
                      onClick={() => {
                        toggleDeleteRequestModal(rowData);
                      }}
                      style={{ backgroundColor: "#f57c00" }}
                    >
                      <DeleteForeverIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData.requesterName && !rowData.requestApproverName ? (
                    <Button
                      onClick={() => {
                        toggleDownloadDocumentModal(rowData);
                      }}
                      style={{ backgroundColor: "#ff9800" }}
                    >
                      <InsertDriveFileOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData.requestApproverName &&
                  !rowData.requestReceiverName ? (
                    <Button
                      onClick={() => {
                        toggleDownloadDocumentModal(rowData);
                      }}
                      style={{ backgroundColor: "#f57c00" }}
                    >
                      <InsertDriveFileOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData.requestReceiverName && !rowData.reporterName ? (
                    <Button
                      onClick={() => {
                        toggleDownloadDocumentModal(rowData);
                      }}
                      style={{ backgroundColor: "#2196f3" }}
                    >
                      <InsertDriveFileOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData.reporterName && !rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleDownloadDocumentModal(rowData);
                      }}
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      <InsertDriveFileOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleDownloadDocumentModal(rowData);
                      }}
                      style={{ backgroundColor: "#388e3c" }}
                    >
                      <InsertDriveFileOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData?.reportIds?.length > 1 &&
                  !rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleReportHistoryModal(rowData);
                      }}
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      <ArchiveOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}

                  {rowData?.reportIds?.length > 1 &&
                  rowData.reportApproverName ? (
                    <Button
                      onClick={() => {
                        toggleReportHistoryModal(rowData);
                      }}
                      style={{ backgroundColor: "#388e3c" }}
                    >
                      <ArchiveOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  ) : null}
                </ButtonGroup>
              </div>
            );
          },
        },
      },
      {
        label: "Status",
        name: "status",
        options: {
          sortThirdClickReset: true,
          customBodyRender: (value) => {
            switch (value) {
              case "Completed":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={<CheckOutlinedIcon style={{ color: "white" }} />}
                      style={{ backgroundColor: "#388e3c", color: "white" }}
                    />
                  </div>
                );

              case "Report Awaiting Approval":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={
                        <SupervisorAccountOutlinedIcon
                          style={{ color: "white" }}
                        />
                      }
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                    />
                  </div>
                );
              case "On Process":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={
                        <DonutLargeOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{ backgroundColor: "#2196f3", color: "white" }}
                    />
                  </div>
                );
              case "Awaiting Sample":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={
                        <LocalShippingOutlinedIcon style={{ color: "white" }} />
                      }
                      style={{ backgroundColor: "#f57c00", color: "white" }}
                    />
                  </div>
                );
              case "Request Awaiting Approval":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={
                        <SupervisorAccountOutlinedIcon
                          style={{ color: "white" }}
                        />
                      }
                      style={{ backgroundColor: "#ff9800", color: "white" }}
                    />
                  </div>
                );
              default:
                return (
                  <div>
                    <Chip label="No Status" size="small" />
                  </div>
                );
            }
          },
        },
      },
      {
        label: "Request Date",
        name: "requestDateFormated",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Request Number",
        name: "requestNumber",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Requester",
        name: "requesterName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Request Approver",
        name: "requestApproverName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Sample Receive Date",
        name: "requestReceiveDateFormated",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Sample Receiver",
        name: "requestReceiverName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Estimation Close Date",
        name: "estimationCloseDateFormated",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Report Date",
        name: "reportDateFormated",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Report Number",
        name: "reportNumber",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Reporter",
        name: "reporterName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Report approver",
        name: "reportApproverName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Request for Laboratory",
        name: "laboratory",
        options: {
          display: "false",
          sortThirdClickReset: true,
        },
      },
      {
        label: "Material",
        name: "material",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Type / Code / Model",
        name: "type",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Material Specification",
        name: "specification",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Manufactured by",
        name: "manufacturer",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Condition",
        name: "condition",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Unit",
        name: "unit",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Batch / Roll Number",
        name: "batchNumber",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Manufacturing Date",
        name: "manufacturingDate",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Expired Date",
        name: "expiryDate",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Program",
        name: "program",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Budget No. / RV No. / JID No.",
        name: "budgetNumber",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Quantity of Sample",
        name: "sample",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Quantity of Material",
        name: "quantity",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Reason of Test",
        name: "reasonOfTest",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Type of Test",
        name: "typeOfTest",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Test According to Specification",
        name: "testAccordingToSpecification",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Organization",
        name: "organization",
        options: {
          display: "excluded",
          filter: false,
          sortThirdClickReset: true,
        },
      },
    ];

    for (let year = appLaunchYear; year <= new Date().getFullYear(); year++) {
      yearPicker.push(year);
    }

    laboratoryTestTableOptions.textLabels = {
      body: {
        noMatch:
          !loading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <span>
                <Breadcrumb heading="F-DP 704.04" match={match} />
                {superAdmin || laboratoryTestAdmin ? (
                  <IconButton
                    aria-label="download history"
                    color="primary"
                    onClick={() =>
                      (window.location.href = `${backEndUrl}/api/qa/laboratory-tests/excel`)
                    }
                    variant="contained"
                    style={{ marginBottom: 12 }}
                  >
                    <CloudDownloadOutlinedIcon />
                  </IconButton>
                ) : null}
              </span>

              <span className="top-right-button-container">
                <FormControl>
                  <Select
                    value={selectedLaboratoryTestYear}
                    onChange={(event) =>
                      changeSelectedLaboratoryTestYear(event.target.value)
                    }
                  >
                    {yearPicker.map((year) => {
                      return (
                        <MenuItem key={year} value={year}>{`${
                          +year - 1
                        } - ${+year}`}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {superAdmin || laboratoryTestRequest ? (
                  <Button
                    className="text-zero ml-4"
                    color="primary"
                    onClick={toggleSubmitRequestModal}
                    variant="contained"
                  >
                    New Request
                  </Button>
                ) : null}
              </span>
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          <Card className="pt-5  pl-2 pr-2 pb-2" elevation={4}>
            <CardContent>
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
                LABORATORY TESTS
              </div>
            </CardContent>
            <CardContent>
              <MUIDataTable
                columns={laboratoryTestTableColumns}
                data={!loading && _isMounted ? laboratoryTests : []}
                options={laboratoryTestTableOptions}
              />
            </CardContent>
          </Card>

          <Grid container>
            <Separator className="mb-5" />
          </Grid>
        </Fragment>

        {_isMounted ? <SubmitLaboratoryTestRequestModal /> : null}
        {_isMounted ? <EditLaboratoryTestRequestModal /> : null}
        {_isMounted ? <ApproveLaboratoryTestRequestModal /> : null}
        {_isMounted ? <DeleteLaboratoryTestRequestModal /> : null}
        {_isMounted ? <ReceiveLaboratoryTestRequestModal /> : null}
        {_isMounted ? <SubmitLaboratoryTestReportModal /> : null}
        {_isMounted ? <EditLaboratoryTestReportModal /> : null}
        {_isMounted ? <ApproveLaboratoryTestReportModal /> : null}
        {_isMounted ? <ReviseLaboratoryTestReportModal /> : null}
        {_isMounted ? <DownloadLaboratoryTestDocumentModal /> : null}
        {_isMounted ? <LaboratoryTestReportHistoryModal /> : null}
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, selectedLaboratoryTestYear, laboratoryTests } =
    qaLaboratoryTest;
  return {
    token,
    loading,
    selectedLaboratoryTestYear,
    laboratoryTests,
  };
};
const mapActionsToProps = {
  getLaboratoryTests,
  getUsers,
  toggleSubmitRequestModal,
  toggleEditRequestModal,
  toggleApproveRequestModal,
  toggleDeleteRequestModal,
  toggleReceiveRequestModal,
  toggleSubmitReportModal,
  toggleEditReportModal,
  toggleApproveReportModal,
  toggleReviseReportModal,
  toggleDownloadDocumentModal,
  toggleReportHistoryModal,
  changeSelectedLaboratoryTestYear,
};

export default connect(mapStateToProps, mapActionsToProps)(QaLaboratoryTest);
