import React, { PureComponent, Fragment, Suspense } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  Add as AddIcon,
  CloseOutlined as CloseOutlinedIcon,
  DeleteForever as DeleteForeverIcon,
  DoneAllOutlined as DoneAllOutlinedIcon,
  UndoOutlined as UndoOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  SubjectOutlined as SubjectOutlinedIcon,
  UpdateOutlined as UpdateOutlinedIcon,
  PostAddOutlined as PostAddOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
  ClearOutlined as ClearOutlinedIcon,
} from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import ReactApexChart from "react-apexcharts";
import {
  changeSelectedChemicalSolutionControlWorksheet,
  getChemicalSolutionControlWorksheets,
  toggleCreateChemicalSolutionControlWorksheetDialog,
  toggleEditChemicalSolutionControlWorksheetDialog,
  toggleDeleteChemicalSolutionControlWorksheetDialog,
  toggleReviseChemicalSolutionControlWorksheetDialog,
  toggleCreateChemicalSolutionControlRecordDialog,
  toggleEditChemicalSolutionControlRecordDialog,
  toggleDeleteChemicalSolutionControlRecordDialog,
  toggleVerifyChemicalSolutionControlRecordDialog,
  toggleUndoVerifyChemicalSolutionControlRecordDialog,
  toggleAttachCcrChemicalSolutionControlRecordDialog,
  changeSelectedChemicalSolutionControlStatus,
  editChemicalSolutionControlWorksheet,
  deleteChemicalSolutionControlWorksheet,
  editChemicalSolutionControlRecord,
} from "../../redux/actions";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import CreateChemicalSolutionControlWorksheetDialog from "../../containers/dialogs/CreateChemicalSolutionControlWorksheetDialog";
import EditChemicalSolutionControlWorksheetDialog from "../../containers/dialogs/EditChemicalSolutionControlWorksheetDialog";
import ReviseChemicalSolutionControlWorksheetDialog from "../../containers/dialogs/ReviseChemicalSolutionControlWorksheetDialog";
import DeleteChemicalSolutionControlWorksheetDialog from "../../containers/dialogs/DeleteChemicalSolutionControlWorksheetDialog";
import CreateChemicalSolutionControlRecordDialog from "../../containers/dialogs/CreateChemicalSolutionControlRecordDialog";
import EditChemicalSolutionControlRecordDialog from "../../containers/dialogs/EditChemicalSolutionControlRecordDialog";
import DeleteChemicalSolutionControlRecordDialog from "../../containers/dialogs/DeleteChemicalSolutionControlRecordDialog";
import VerifyChemicalSolutionControlRecordDialog from "../../containers/dialogs/VerifyChemicalSolutionControlRecordDialog";
import UndoVerifyChemicalSolutionControlRecordDialog from "../../containers/dialogs/UndoVerifyChemicalSolutionControlRecordDialog";
import AttachCcrChemicalSolutionControlRecordDialog from "../../containers/dialogs/AttachCcrChemicalSolutionControlRecordDialog";
import { Separator } from "../../components/Layouts";
import {
  chemicalSolutionAnalysisTableOptions,
  chemicalSolutionControlTableOptions,
  chemicalSolutionControlWorksheetsTableOptions,
  solutionTargetLimitsTableOptions,
  specificationReferencesTableOptions,
} from "../../constants/tableOptions";

class QaChemicalSolutionControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chemicalSolutionControlTableData: [],
      solutionTargetLimitsTableData: [],
      specificationReferencesTableData: [],
      chemicalSolutionAnalysisTableData: [],
      hideWorksheets: false,
      chemicalSolutionAnalysisLabel0: null,
      chemicalSolutionAnalysisLabel1: null,
      chemicalSolutionAnalysisLabel2: null,
      chemicalSolutionAnalysisLabel3: null,
      chemicalSolutionAnalysisLabel4: null,
      chemicalSolutionAnalysisLabel5: null,
      chemicalSolutionAnalysisLabel6: null,
      chemicalSolutionAnalysisLabel7: null,
      chemicalSolutionAnalysisLabel8: null,
      chemicalSolutionAnalysisLabel9: null,
      chemicalSolutionAnalysisLabel10: null,
      chemicalSolutionAnalysisLabel11: null,
      chemicalSolutionAnalysisLabel12: null,
      chemicalSolutionAnalysisLabel13: null,
      chemicalSolutionAnalysisLabel14: null,
      chemicalSolutionAnalysisLabel15: null,
      chemicalSolutionAnalysisLabel16: null,
      chemicalSolutionAnalysisLabel17: null,
      chemicalSolutionAnalysisLabel18: null,
      chemicalSolutionAnalysisLabel19: null,
      chemicalSolutionAnalysisLabel20: null,
      chemicalSolutionAnalysisLabel21: null,
      chemicalSolutionAnalysisLabel22: null,
      chemicalSolutionAnalysisLabel23: null,
      chemicalSolutionAnalysisLabel24: null,
      chemicalSolutionAnalysisLabel25: null,
      chemicalSolutionAnalysisLabel26: null,
      chemicalSolutionAnalysisLabel27: null,
      chemicalSolutionAnalysisLabel28: null,
      chemicalSolutionAnalysisLabel29: null,
      chemicalSolutionAnalysisChartData: null,
      chemicalSolutionAnalysisChartOptions: null,
    };
  }

  componentDidMount = () => {
    const {
      selectedChemicalSolutionControlStatus,
      getChemicalSolutionControlWorksheets,
    } = this.props;

    this._isMounted = true;
    getChemicalSolutionControlWorksheets(selectedChemicalSolutionControlStatus);
  };

  componentWillUnmount() {
    const { changeSelectedChemicalSolutionControlWorksheet } = this.props;

    this._isMounted = false;
    changeSelectedChemicalSolutionControlWorksheet({});
  }

  static getDerivedStateFromProps(props) {
    const { loading, selectedChemicalSolutionControlWorksheet } = props;
    const {
      solutionProcess,
      tankNumber,
      tankSize,
      tankVolume,
      location,
      testMethod,
      frequencyOfTest,
      temperatureRangeInCelcius,
      solutionSpecificationReferences,
      analysisSolutions,
      records,
    } = selectedChemicalSolutionControlWorksheet;
    const chemicalSolutionControlTableData = [
      { parameter: "Solution Process", value: solutionProcess },
      { parameter: "Tank Number", value: tankNumber },
      { parameter: "Tank Size", value: tankSize },
      { parameter: "Tank Volume", value: tankVolume },
      { parameter: "Location", value: location },
      { parameter: "Test Method", value: testMethod },
      { parameter: "Frequency of Test", value: frequencyOfTest },
      {
        parameter: "Temperature Range (°C)",
        value: temperatureRangeInCelcius,
      },
    ];
    let specificationReferencesTableData = [];
    let chemicalSolutionAnalysisTableData = records ?? [];
    let chemicalSolutionAnalysisChartData = [];

    if (!loading && analysisSolutions) {
      if (solutionSpecificationReferences) {
        const reduce = solutionSpecificationReferences.reduce((res, curr) => {
          if (res[curr.solution]) res[curr.solution].push(curr);
          else Object.assign(res, { [curr.solution]: [curr] });
          return res;
        }, {});
        const reduceArray = Object.values(reduce);

        for (let i = 0; i < reduceArray.length; i++) {
          const e = reduceArray[i];
          let row = {};

          row.rowName = e[0].solution;
          for (let j = 0; j < e.length; j++) {
            const f = e[j];

            row["columnName" + j] = `${f?.organization}: ${f?.specification}`;
            row["columnValue" + j] = f?.value;
          }
          specificationReferencesTableData.push(row);
        }
      }

      if (chemicalSolutionAnalysisTableData) {
        for (let i = 0; i < chemicalSolutionAnalysisTableData.length; i++) {
          const e = chemicalSolutionAnalysisTableData[i];
          const analysisResults = e?.analysisResults;

          for (let j = 0; j < analysisResults.length; j++) {
            const f = analysisResults[j];

            chemicalSolutionAnalysisTableData[i]["analysisResult" + j] = f;
          }
        }
      }

      for (let i = 0; i < analysisSolutions.length; i++) {
        const e = analysisSolutions[i];
        let data = [];
        let counter = 0;

        for (let j = 0; j < chemicalSolutionAnalysisTableData.length; j++) {
          const f = chemicalSolutionAnalysisTableData[j];
          const analysisResults = f.analysisResults;

          if (!isNaN(parseFloat(analysisResults[i]))) {
            data[counter] = [
              new Date(f.sampleTakenDate).getTime(),
              parseFloat(analysisResults[i]),
            ];
            counter++;
          }
        }
        counter = 0;
        chemicalSolutionAnalysisChartData.push({
          name: `${e.solution}`,
          data,
        });
      }

      return {
        chemicalSolutionControlTableData:
          chemicalSolutionControlTableData ?? [],
        solutionTargetLimitsTableData:
          selectedChemicalSolutionControlWorksheet?.solutionTargetLimits ?? [],
        specificationReferencesTableData: specificationReferencesTableData,
        chemicalSolutionAnalysisTableData: chemicalSolutionAnalysisTableData,
        chemicalSolutionAnalysisLabel0: analysisSolutions[0]
          ? `${analysisSolutions[0]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel1: analysisSolutions[1]
          ? `${analysisSolutions[1]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel2: analysisSolutions[2]
          ? `${analysisSolutions[2]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel3: analysisSolutions[3]
          ? `${analysisSolutions[3]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel4: analysisSolutions[4]
          ? `${analysisSolutions[4]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel5: analysisSolutions[5]
          ? `${analysisSolutions[5]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel6: analysisSolutions[6]
          ? `${analysisSolutions[6]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel7: analysisSolutions[7]
          ? `${analysisSolutions[7]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel8: analysisSolutions[8]
          ? `${analysisSolutions[8]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel9: analysisSolutions[9]
          ? `${analysisSolutions[9]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel10: analysisSolutions[10]
          ? `${analysisSolutions[10]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel11: analysisSolutions[11]
          ? `${analysisSolutions[11]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel12: analysisSolutions[12]
          ? `${analysisSolutions[12]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel13: analysisSolutions[13]
          ? `${analysisSolutions[13]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel14: analysisSolutions[14]
          ? `${analysisSolutions[14]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel15: analysisSolutions[15]
          ? `${analysisSolutions[15]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel16: analysisSolutions[16]
          ? `${analysisSolutions[16]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel17: analysisSolutions[17]
          ? `${analysisSolutions[17]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel18: analysisSolutions[18]
          ? `${analysisSolutions[18]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel19: analysisSolutions[19]
          ? `${analysisSolutions[19]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel20: analysisSolutions[20]
          ? `${analysisSolutions[20]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel21: analysisSolutions[21]
          ? `${analysisSolutions[21]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel22: analysisSolutions[22]
          ? `${analysisSolutions[22]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel23: analysisSolutions[23]
          ? `${analysisSolutions[23]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel24: analysisSolutions[24]
          ? `${analysisSolutions[24]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel25: analysisSolutions[25]
          ? `${analysisSolutions[25]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel26: analysisSolutions[26]
          ? `${analysisSolutions[26]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel27: analysisSolutions[27]
          ? `${analysisSolutions[27]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel28: analysisSolutions[28]
          ? `${analysisSolutions[28]?.solution}`
          : null,
        chemicalSolutionAnalysisLabel29: analysisSolutions[29]
          ? `${analysisSolutions[29]?.solution}`
          : null,
        chemicalSolutionAnalysisChartData,
      };
    }
    return {};
  }

  render() {
    const { _isMounted } = this;
    const {
      match,
      token,
      loading,
      selectedChemicalSolutionControlStatus,
      chemicalSolutionControlWorksheets,
      selectedChemicalSolutionControlWorksheet,
      toggleCreateChemicalSolutionControlWorksheetDialog,
      toggleEditChemicalSolutionControlWorksheetDialog,
      toggleDeleteChemicalSolutionControlWorksheetDialog,
      toggleReviseChemicalSolutionControlWorksheetDialog,
      toggleCreateChemicalSolutionControlRecordDialog,
      toggleEditChemicalSolutionControlRecordDialog,
      toggleDeleteChemicalSolutionControlRecordDialog,
      toggleVerifyChemicalSolutionControlRecordDialog,
      toggleUndoVerifyChemicalSolutionControlRecordDialog,
      toggleAttachCcrChemicalSolutionControlRecordDialog,
      changeSelectedChemicalSolutionControlStatus,
      changeSelectedChemicalSolutionControlWorksheet,
    } = this.props;
    const {
      chemicalSolutionControlTableData,
      solutionTargetLimitsTableData,
      specificationReferencesTableData,
      chemicalSolutionAnalysisTableData,
      chemicalSolutionAnalysisLabel0,
      chemicalSolutionAnalysisLabel1,
      chemicalSolutionAnalysisLabel2,
      chemicalSolutionAnalysisLabel3,
      chemicalSolutionAnalysisLabel4,
      chemicalSolutionAnalysisLabel5,
      chemicalSolutionAnalysisLabel6,
      chemicalSolutionAnalysisLabel7,
      chemicalSolutionAnalysisLabel8,
      chemicalSolutionAnalysisLabel9,
      chemicalSolutionAnalysisLabel10,
      chemicalSolutionAnalysisLabel11,
      chemicalSolutionAnalysisLabel12,
      chemicalSolutionAnalysisLabel13,
      chemicalSolutionAnalysisLabel14,
      chemicalSolutionAnalysisLabel15,
      chemicalSolutionAnalysisLabel16,
      chemicalSolutionAnalysisLabel17,
      chemicalSolutionAnalysisLabel18,
      chemicalSolutionAnalysisLabel19,
      chemicalSolutionAnalysisLabel20,
      chemicalSolutionAnalysisLabel21,
      chemicalSolutionAnalysisLabel22,
      chemicalSolutionAnalysisLabel23,
      chemicalSolutionAnalysisLabel24,
      chemicalSolutionAnalysisLabel25,
      chemicalSolutionAnalysisLabel26,
      chemicalSolutionAnalysisLabel27,
      chemicalSolutionAnalysisLabel28,
      chemicalSolutionAnalysisLabel29,
      hideWorksheets,
      chemicalSolutionAnalysisChartData,
    } = this.state;
    const { authorization } = jwt_decode(token);
    const {
      superAdmin,
      chemicalSolutionControlCreateWorksheet,
      chemicalSolutionControlCreateRecord,
      chemicalSolutionControlVerifyRecord,
    } = authorization;
    const solutionTargetLimitsTableDataExists = solutionTargetLimitsTableData[0]
      ?.solution
      ? true
      : "excluded";
    const chemicalSolutionControlWorksheetsTableColumns = [
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

            for (let i = 0; i < chemicalSolutionControlWorksheets.length; i++) {
              if (chemicalSolutionControlWorksheets[i].id === value) {
                rowData = chemicalSolutionControlWorksheets[i];
              }
            }
            return (
              <div>
                {rowData.revised === "Active" ? (
                  <ButtonGroup size="small" variant="contained">
                    {superAdmin || chemicalSolutionControlCreateWorksheet ? (
                      <Button
                        onClick={() => {
                          toggleEditChemicalSolutionControlWorksheetDialog(
                            rowData
                          );
                        }}
                        style={{ backgroundColor: "#4caf50" }}
                      >
                        <EditOutlinedIcon
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                      </Button>
                    ) : null}

                    {(superAdmin || chemicalSolutionControlCreateWorksheet) &&
                    !rowData?.records?.length ? (
                      <Button
                        onClick={() => {
                          if (
                            selectedChemicalSolutionControlWorksheet?.id ===
                            rowData?.id
                          ) {
                            changeSelectedChemicalSolutionControlWorksheet({});
                          }
                          toggleDeleteChemicalSolutionControlWorksheetDialog(
                            rowData
                          );
                        }}
                        style={{ backgroundColor: "#4caf50" }}
                      >
                        <DeleteForeverIcon
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                      </Button>
                    ) : null}

                    {(superAdmin || chemicalSolutionControlCreateWorksheet) &&
                    rowData?.records?.length &&
                    rowData?.revised === "Active" ? (
                      <Button
                        onClick={() => {
                          toggleReviseChemicalSolutionControlWorksheetDialog(
                            rowData
                          );
                        }}
                        style={{ backgroundColor: "#4caf50" }}
                      >
                        <UpdateOutlinedIcon
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                      </Button>
                    ) : null}

                    <Button
                      onClick={() => {
                        this.setState({ hideWorksheets: true });
                        changeSelectedChemicalSolutionControlWorksheet(rowData);
                      }}
                      disabled={
                        value === selectedChemicalSolutionControlWorksheet?.id
                      }
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      <SubjectOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup size="small" variant="contained">
                    {superAdmin || chemicalSolutionControlCreateWorksheet ? (
                      <Button
                        onClick={() => {
                          toggleEditChemicalSolutionControlWorksheetDialog(
                            rowData
                          );
                        }}
                        style={{ backgroundColor: "#f44336" }}
                      >
                        <EditOutlinedIcon
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                      </Button>
                    ) : null}

                    <Button
                      onClick={() => {
                        this.setState({ hideWorksheets: true });
                        changeSelectedChemicalSolutionControlWorksheet(rowData);
                      }}
                      disabled={
                        value === selectedChemicalSolutionControlWorksheet?.id
                      }
                      style={{ backgroundColor: "#f44336" }}
                    >
                      <SubjectOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                      />
                    </Button>
                  </ButtonGroup>
                )}
              </div>
            );
          },
        },
      },
      {
        label: "Status",
        name: "revised",
        options: {
          sortThirdClickReset: true,
          display: "false",
          filter: false,
          customBodyRender: (value) => {
            switch (value) {
              case "Active":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={<CheckOutlinedIcon style={{ color: "white" }} />}
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                    />
                  </div>
                );
              case "Revised":
                return (
                  <div>
                    <Chip
                      label={value}
                      size="small"
                      icon={<ClearOutlinedIcon style={{ color: "white" }} />}
                      style={{ backgroundColor: "#f44336", color: "white" }}
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
        label: "Solution Process",
        name: "solutionProcess",
        options: {
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Tank Number",
        name: "tankNumber",
        options: {
          display: "false",
          sortThirdClickReset: true,
        },
      },
      {
        label: "Tank Size",
        name: "tankSize",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Tank Volume",
        name: "tankVolume",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Location",
        name: "location",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Test Method",
        name: "testMethod",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Frequency Of Test",
        name: "frequencyOfTest",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Temperature Range (°C)",
        name: "temperatureRangeInCelcius",
        options: {
          display: "false",
          filter: false,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Creator",
        name: "creatorName",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Revision",
        name: "revision",
        options: {
          sortThirdClickReset: true,
        },
      },
      {
        label: "Creation Date",
        name: "creationDateFormated",
        options: {
          filter: false,
          searchable: false,
          sortThirdClickReset: true,
        },
      },
    ];
    const chemicalSolutionControlTableColumns = [
      {
        label: "Parameter",
        name: "parameter",
        options: {
          display: selectedChemicalSolutionControlWorksheet?.solutionProcess
            ? true
            : false,
          sortThirdClickReset: true,
          customBodyRender: (value) => {
            return <b>{value}</b>;
          },
          customHeadRender: () => (
            <th
              key={"parameter"}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
        },
      },
      {
        label: "Value",
        name: "value",
        options: {
          display: selectedChemicalSolutionControlWorksheet?.solutionProcess
            ? true
            : false,
          sortThirdClickReset: true,
          customHeadRender: () => (
            <th
              key={"value"}
              style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
            />
          ),
        },
      },
    ];
    const solutionTargetLimitsTableColumns = [
      {
        label: "Solution Content to be Analyzed",
        name: "solution",
        options: {
          display: solutionTargetLimitsTableDataExists,
          sortThirdClickReset: true,
          viewColumns: false,
        },
      },
      {
        label: "Min",
        name: "min",
        options: {
          display: solutionTargetLimitsTableDataExists,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Target",
        name: "target",
        options: {
          display: solutionTargetLimitsTableDataExists,
          sortThirdClickReset: true,
        },
      },
      {
        label: "Max",
        name: "max",
        options: {
          display: solutionTargetLimitsTableDataExists,
          sortThirdClickReset: true,
        },
      },
    ];
    const specificationReferencesTableColumns = [
      {
        label: "Solution Content to be Analyzed",
        name: "rowName",
        options: {
          display: specificationReferencesTableData[0]?.columnName0
            ? true
            : "excluded",
          sortThirdClickReset: true,
          viewColumns: false,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName0,
        name: "columnValue0",
        options: {
          display: specificationReferencesTableData[0]?.columnName0
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName0
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName1,
        name: "columnValue1",
        options: {
          display: specificationReferencesTableData[0]?.columnName1
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName1
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName2,
        name: "columnValue2",
        options: {
          display: specificationReferencesTableData[0]?.columnName2
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName2
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName3,
        name: "columnValue3",
        options: {
          display: specificationReferencesTableData[0]?.columnName3
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName3
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName4,
        name: "columnValue4",
        options: {
          display: specificationReferencesTableData[0]?.columnName4
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName4
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName5,
        name: "columnValue5",
        options: {
          display: specificationReferencesTableData[0]?.columnName5
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName5
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName6,
        name: "columnValue6",
        options: {
          display: specificationReferencesTableData[0]?.columnName6
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName6
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName7,
        name: "columnValue7",
        options: {
          display: specificationReferencesTableData[0]?.columnName7
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName7
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName8,
        name: "columnValue8",
        options: {
          display: specificationReferencesTableData[0]?.columnName8
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName8
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName9,
        name: "columnValue9",
        options: {
          display: specificationReferencesTableData[0]?.columnName9
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName9
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
      {
        label: specificationReferencesTableData[0]?.columnName10,
        name: "columnValue10",
        options: {
          display: specificationReferencesTableData[0]?.columnName10
            ? true
            : "excluded",
          download: specificationReferencesTableData[0]?.columnName10
            ? true
            : false,
          sortThirdClickReset: true,
        },
      },
    ];
    const chemicalSolutionAnalysisTableColumns = [
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

            for (let i = 0; i < chemicalSolutionAnalysisTableData.length; i++) {
              if (chemicalSolutionAnalysisTableData[i].id === value) {
                rowData = chemicalSolutionAnalysisTableData[i];
              }
            }
            return (
              <div>
                <ButtonGroup color="primary" size="small">
                  {!rowData?.verifierName &&
                  (superAdmin || chemicalSolutionControlCreateRecord) ? (
                    <Button
                      onClick={() => {
                        toggleEditChemicalSolutionControlRecordDialog(rowData);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Button>
                  ) : null}

                  {!rowData?.verifierName &&
                  (superAdmin || chemicalSolutionControlCreateRecord) ? (
                    <Button
                      onClick={() => {
                        toggleDeleteChemicalSolutionControlRecordDialog(
                          rowData
                        );
                      }}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  ) : null}

                  {!rowData?.verifierName &&
                  (superAdmin || chemicalSolutionControlVerifyRecord) ? (
                    <Button
                      onClick={() => {
                        toggleVerifyChemicalSolutionControlRecordDialog(
                          rowData
                        );
                      }}
                    >
                      <DoneAllOutlinedIcon fontSize="small" />
                    </Button>
                  ) : null}

                  {rowData?.verifierName &&
                  (superAdmin || chemicalSolutionControlVerifyRecord) ? (
                    <Button
                      onClick={() => {
                        toggleUndoVerifyChemicalSolutionControlRecordDialog(
                          rowData
                        );
                      }}
                    >
                      <UndoOutlinedIcon fontSize="small" />
                    </Button>
                  ) : null}

                  {!rowData?.chemicalChargingRecordNumber &&
                  rowData?.verifierName &&
                  (superAdmin || chemicalSolutionControlCreateRecord) ? (
                    <Button
                      onClick={() => {
                        toggleAttachCcrChemicalSolutionControlRecordDialog(
                          rowData
                        );
                      }}
                    >
                      <PostAddOutlinedIcon fontSize="small" />
                    </Button>
                  ) : null}
                </ButtonGroup>
              </div>
            );
          },
        },
      },
      {
        label: "Sample Taken Date",
        name: "sampleTakenDateFormated",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "8.75rem",
              minWidth: "8.75rem",
            },
          }),
        },
      },
      {
        label: "Sample Taken Time",
        name: "sampleTakenTime",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "6rem",
              minWidth: "6rem",
            },
          }),
        },
      },
      {
        label: "Agitation (minutes)",
        name: "agitationInMinutes",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "8.5rem",
              minWidth: "8.5rem",
            },
          }),
        },
      },
      {
        label: "Temp. (°C)",
        name: "temperatureInCelcius",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "5rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: "Sample Analysis Date",
        name: "sampleAnalysisDateFormated",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "8.75rem",
              minWidth: "8.75rem",
            },
          }),
        },
      },
      {
        label: "Sample Analysis Time",
        name: "sampleAnalysisTime",
        options: {
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "6rem",
              minWidth: "6rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel0,
        name: "analysisResult0",
        options: {
          display: chemicalSolutionAnalysisLabel0 ? true : "excluded",
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel1,
        name: "analysisResult1",
        options: {
          display: chemicalSolutionAnalysisLabel1 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel1 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel2,
        name: "analysisResult2",
        options: {
          display: chemicalSolutionAnalysisLabel2 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel2 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel3,
        name: "analysisResult3",
        options: {
          display: chemicalSolutionAnalysisLabel3 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel3 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel4,
        name: "analysisResult4",
        options: {
          display: chemicalSolutionAnalysisLabel4 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel4 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel5,
        name: "analysisResult5",
        options: {
          display: chemicalSolutionAnalysisLabel5 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel5 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel6,
        name: "analysisResult6",
        options: {
          display: chemicalSolutionAnalysisLabel6 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel6 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel7,
        name: "analysisResult7",
        options: {
          display: chemicalSolutionAnalysisLabel7 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel7 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel8,
        name: "analysisResult8",
        options: {
          display: chemicalSolutionAnalysisLabel8 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel8 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel9,
        name: "analysisResult9",
        options: {
          display: chemicalSolutionAnalysisLabel9 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel9 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel10,
        name: "analysisResult10",
        options: {
          display: chemicalSolutionAnalysisLabel10 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel10 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel11,
        name: "analysisResult11",
        options: {
          display: chemicalSolutionAnalysisLabel11 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel11 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel12,
        name: "analysisResult12",
        options: {
          display: chemicalSolutionAnalysisLabel12 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel12 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel13,
        name: "analysisResult13",
        options: {
          display: chemicalSolutionAnalysisLabel13 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel13 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel14,
        name: "analysisResult14",
        options: {
          display: chemicalSolutionAnalysisLabel14 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel14 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel15,
        name: "analysisResult15",
        options: {
          display: chemicalSolutionAnalysisLabel15 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel15 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel16,
        name: "analysisResult16",
        options: {
          display: chemicalSolutionAnalysisLabel16 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel16 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel17,
        name: "analysisResult17",
        options: {
          display: chemicalSolutionAnalysisLabel17 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel17 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel18,
        name: "analysisResult18",
        options: {
          display: chemicalSolutionAnalysisLabel18 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel18 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel19,
        name: "analysisResult19",
        options: {
          display: chemicalSolutionAnalysisLabel19 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel19 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel20,
        name: "analysisResult20",
        options: {
          display: chemicalSolutionAnalysisLabel20 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel20 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel21,
        name: "analysisResult21",
        options: {
          display: chemicalSolutionAnalysisLabel21 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel21 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel22,
        name: "analysisResult22",
        options: {
          display: chemicalSolutionAnalysisLabel22 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel22 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel23,
        name: "analysisResult23",
        options: {
          display: chemicalSolutionAnalysisLabel23 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel23 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel24,
        name: "analysisResult24",
        options: {
          display: chemicalSolutionAnalysisLabel24 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel24 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel25,
        name: "analysisResult25",
        options: {
          display: chemicalSolutionAnalysisLabel25 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel25 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel26,
        name: "analysisResult26",
        options: {
          display: chemicalSolutionAnalysisLabel26 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel26 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel27,
        name: "analysisResult27",
        options: {
          display: chemicalSolutionAnalysisLabel27 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel27 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel28,
        name: "analysisResult28",
        options: {
          display: chemicalSolutionAnalysisLabel28 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel28 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: chemicalSolutionAnalysisLabel29,
        name: "analysisResult29",
        options: {
          display: chemicalSolutionAnalysisLabel29 ? true : "excluded",
          download: chemicalSolutionAnalysisLabel29 ? true : false,
          sortThirdClickReset: true,
          setCellProps: () => ({
            style: {
              maxWidth: "15rem",
              minWidth: "5rem",
            },
          }),
        },
      },
      {
        label: "Technician",
        name: "creatorName",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
      {
        label: "Result",
        name: "result",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
      {
        label: "Verifier",
        name: "verifierName",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
      {
        label: "CCR Number",
        name: "chemicalChargingRecordNumber",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
      {
        label: "CCR Received",
        name: "chemicalChargingRecordReceivedDateFormated",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
      {
        label: "Remarks",
        name: "remarks",
        options: {
          sortThirdClickReset: true,
          display: false,
        },
      },
    ];

    chemicalSolutionControlWorksheetsTableOptions.textLabels = {
      body: {
        noMatch:
          !loading && _isMounted
            ? "❌ There is no matching data to display"
            : "⏳ Loading...",
      },
    };

    chemicalSolutionControlTableOptions.textLabels = {
      body: {
        noMatch: !loading
          ? "❌ There is no matching data to display"
          : "⏳ Loading...",
      },
    };

    solutionTargetLimitsTableOptions.viewColumns =
      solutionTargetLimitsTableData[0]?.solution ? true : false;

    solutionTargetLimitsTableOptions.textLabels = {
      body: {
        noMatch: !loading
          ? "❌ There is no matching data to display"
          : "⏳ Loading...",
      },
    };

    specificationReferencesTableOptions.viewColumns =
      specificationReferencesTableData[0]?.columnName0 ? true : false;

    specificationReferencesTableOptions.textLabels = {
      body: {
        noMatch: !loading
          ? "❌ There is no matching data to display"
          : "⏳ Loading...",
      },
    };

    chemicalSolutionAnalysisTableOptions.textLabels = {
      body: {
        noMatch: !loading
          ? "❌ There is no matching data to display"
          : "⏳ Loading...",
      },
    };

    chemicalSolutionAnalysisTableOptions.customToolbar = () => {
      if (superAdmin || chemicalSolutionControlCreateRecord) {
        return (
          <Tooltip
            title={"New Record"}
            onClick={() => toggleCreateChemicalSolutionControlRecordDialog()}
          >
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
        );
      }
    };

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Breadcrumb heading="F-DP 704.05" match={match} />
              {!selectedChemicalSolutionControlWorksheet?.id ? (
                <span className="top-right-button-container">
                  <FormControl>
                    <Select
                      value={selectedChemicalSolutionControlStatus}
                      onChange={(event) =>
                        changeSelectedChemicalSolutionControlStatus(
                          event.target.value
                        )
                      }
                    >
                      <MenuItem value={"active"}>Active</MenuItem>
                      <MenuItem value={"revised"}>Revised</MenuItem>
                    </Select>
                  </FormControl>

                  {superAdmin || chemicalSolutionControlCreateWorksheet ? (
                    <Button
                      className="text-zero ml-4"
                      color="primary"
                      onClick={
                        toggleCreateChemicalSolutionControlWorksheetDialog
                      }
                      variant="contained"
                    >
                      New Worksheet
                    </Button>
                  ) : null}
                </span>
              ) : null}
              <Separator className="mb-5" />
            </Grid>
          </Grid>

          <Card
            className="pt-5 pl-2 pr-2 pb-2 mb-5"
            elevation={4}
            hidden={hideWorksheets}
          >
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
                CHEMICAL SOLUTION CONTROL AND RECORDS WORKSHEETS
              </div>
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
                Chemical Lab. & P.C, Jl. Padjajaran No. 154 Bandung
              </div>
            </CardContent>
            <CardContent>
              <MUIDataTable
                columns={chemicalSolutionControlWorksheetsTableColumns}
                data={
                  !loading && _isMounted
                    ? chemicalSolutionControlWorksheets
                    : []
                }
                options={chemicalSolutionControlWorksheetsTableOptions}
              />
            </CardContent>
          </Card>

          {Object.keys(selectedChemicalSolutionControlWorksheet).length !== 0 &&
          selectedChemicalSolutionControlWorksheet ? (
            <Card className="pl-2 pr-2 pb-2" elevation={4}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <IconButton
                    aria-label="close"
                    onClick={() => {
                      changeSelectedChemicalSolutionControlWorksheet({});
                      this.setState({ hideWorksheets: false });
                    }}
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </div>
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
                  CHEMICAL SOLUTION CONTROL AND RECORDS
                </div>
              </CardContent>
              <CardContent>
                <MUIDataTable
                  className="content-card mb-5"
                  columns={chemicalSolutionControlTableColumns}
                  data={!loading ? chemicalSolutionControlTableData : []}
                  options={chemicalSolutionControlTableOptions}
                />
                <MUIDataTable
                  className="content-card mt-5 mb-5"
                  columns={solutionTargetLimitsTableColumns}
                  data={!loading ? solutionTargetLimitsTableData : []}
                  options={solutionTargetLimitsTableOptions}
                  title={"Solution Target Limit"}
                />
                <MUIDataTable
                  className="content-card mt-5 mb-5"
                  columns={specificationReferencesTableColumns}
                  data={!loading ? specificationReferencesTableData : []}
                  options={specificationReferencesTableOptions}
                  title={"Specification References"}
                />
                <MUIDataTable
                  className="content-card mt-5"
                  columns={chemicalSolutionAnalysisTableColumns}
                  data={!loading ? chemicalSolutionAnalysisTableData : []}
                  options={chemicalSolutionAnalysisTableOptions}
                  title={"Chemical Solution Analysis Records"}
                />
                <div id="wrapper">
                  {chemicalSolutionAnalysisLabel0 ? (
                    <div id="chart0" className="mt-5">
                      <ReactApexChart
                        options={{
                          chart: {
                            id: "chemicalSolutionAnalysisChart",
                            type: "line",
                          },
                          colors: [
                            "#f44336",
                            "#e91e63",
                            "#9c27b0",
                            "#673ab7",
                            "#3f51b5",
                            "#2196f3",
                            "#03a9f4",
                            "#00bcd4",
                            "#009688",
                            "#4caf50",
                            "#8bc34a",
                            "#cddc39",
                            "#ffeb3b",
                            "#ffc107",
                            "#ff9800",
                            "#ff5722",
                            "#795548",
                            "#9e9e9e",
                            "#607d8b",
                            "#000000",
                          ],
                          xaxis: {
                            type: "datetime",
                          },
                          yaxis: {
                            tickAmount: 7,
                            labels: {
                              minWidth: 40,
                            },
                          },
                          grid: {
                            xaxis: {
                              lines: {
                                show: true,
                              },
                            },
                            yaxis: {
                              lines: {
                                show: true,
                              },
                            },
                          },
                          markers: {
                            size: 2.5,
                          },
                          stroke: {
                            curve: "smooth",
                          },
                          legend: {
                            position: "right",
                            horizontalAlign: "left",
                            width: 142,
                            floating: false,
                            itemMargin: { vertical: 5 },
                            markers: { radius: 5 },
                          },
                        }}
                        series={
                          chemicalSolutionAnalysisChartData ?? [{ data: [] }]
                        }
                        height={500}
                      />
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: 12,
                    justifyContent: "left",
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    marginTop: 25,
                    marginLeft: 25,
                  }}
                >
                  F-DP 704.05.01
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Grid container>
            <Separator className="mb-5" />
          </Grid>
        </Fragment>

        {_isMounted ? <CreateChemicalSolutionControlWorksheetDialog /> : []}
        {_isMounted ? <EditChemicalSolutionControlWorksheetDialog /> : []}
        {_isMounted ? <DeleteChemicalSolutionControlWorksheetDialog /> : []}
        {_isMounted ? <ReviseChemicalSolutionControlWorksheetDialog /> : []}
        {_isMounted ? <CreateChemicalSolutionControlRecordDialog /> : []}
        {_isMounted ? <EditChemicalSolutionControlRecordDialog /> : []}
        {_isMounted ? <DeleteChemicalSolutionControlRecordDialog /> : []}
        {_isMounted ? <VerifyChemicalSolutionControlRecordDialog /> : []}
        {_isMounted ? <UndoVerifyChemicalSolutionControlRecordDialog /> : []}
        {_isMounted ? <AttachCcrChemicalSolutionControlRecordDialog /> : []}
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth, qaChemicalSolutionControl }) => {
  const { token } = auth;
  const {
    loading,
    selectedChemicalSolutionControlStatus,
    chemicalSolutionControlWorksheets,
    selectedChemicalSolutionControlWorksheet,
  } = qaChemicalSolutionControl;
  return {
    token,
    loading,
    selectedChemicalSolutionControlStatus,
    chemicalSolutionControlWorksheets,
    selectedChemicalSolutionControlWorksheet,
  };
};
const mapActionsToProps = {
  getChemicalSolutionControlWorksheets,
  toggleCreateChemicalSolutionControlWorksheetDialog,
  toggleEditChemicalSolutionControlWorksheetDialog,
  toggleDeleteChemicalSolutionControlWorksheetDialog,
  toggleReviseChemicalSolutionControlWorksheetDialog,
  toggleCreateChemicalSolutionControlRecordDialog,
  toggleEditChemicalSolutionControlRecordDialog,
  toggleDeleteChemicalSolutionControlRecordDialog,
  toggleVerifyChemicalSolutionControlRecordDialog,
  toggleUndoVerifyChemicalSolutionControlRecordDialog,
  toggleAttachCcrChemicalSolutionControlRecordDialog,
  changeSelectedChemicalSolutionControlStatus,
  changeSelectedChemicalSolutionControlWorksheet,
  editChemicalSolutionControlWorksheet,
  deleteChemicalSolutionControlWorksheet,
  editChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(QaChemicalSolutionControl);
