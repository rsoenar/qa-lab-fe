import { TableCell, TableRow } from "@material-ui/core";

const mediaVideoTableOptions = {
  download: false,
  elevation: 0,
  filter: false,
  filterType: "multiselect",
  print: false,
  responsive: "standard",
  rowsPerPage: 3,
  rowsPerPageOptions: [3],
  selectableRows: "none",
  viewColumns: false,
};

const organizationUnitTableOptions = {
  download: false,
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50],
  searchPlaceholder:
    "NIK / Name / Gender Education / Major / Organization / Email / Phone No.",
  selectableRows: "none",
};

const laboratoryTestUserTableOptions = {
  download: false,
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50],
  selectableRows: "none",
};

const chemicalSolutionControlUserTableOptions = {
  download: false,
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50],
  selectableRows: "none",
};

const electroplatingChemicalProcessControlUserTableOptions = {
  download: false,
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50],
  selectableRows: "none",
};

const laboratoryTestTableOptions = {
  downloadOptions: { filename: "Laboratory Test.csv", separator: "," },
  draggableColumns: { enabled: true, transitionTime: 1 },
  elevation: 0,
  expandableRows: true,
  expandableRowsHeader: true,
  expandableRowsOnClick: false,
  filter: true,
  filterType: "multiselect",
  filterList: [["PE8000"], [], [], [], []],
  print: false,
  responsive: "vertical",
  rowsPerPage: 100,
  rowsPerPageOptions: [5, 10, 25, 50, 100, 250, 500],
  selectableRows: "none",
  renderExpandableRow: (rowData) => {
    return (
      <TableRow>
        <TableCell colSpan={3}>
          <b>Request for Laboratory</b>
          <br />
          <b>Material</b>
          <br />
          <b>Type / Code / Model</b>
          <br />
          <b>Material Specification</b>
          <br />
          <b>Manufactured by</b>
          <br />
          <b>Condition</b>
          <br />
          <b>Unit</b>
          <br />
          <b>Batch / Roll Number</b>
          <br />
          <b>Manufacturing Date</b>
          <br />
          <b>Expired Date</b>
          <br />
          <b>Program</b>
          <br />
          <b>Budget No. / RV No. / JID No.</b>
          <br />
          <b>Quantity of Sample</b>
          <br />
          <b>Quantity of Material</b>
          <br />
          <b>Reason of Test</b>
          <br />
          <b>Type of Test</b>
          <br />
          <b>Test According to Specification</b>
          <br />
        </TableCell>
        <TableCell colSpan={rowData.length - 2}>
          {rowData[13]}
          <br />
          {rowData[14]}
          <br />
          {rowData[15]}
          <br />
          {rowData[16]}
          <br />
          {rowData[17]}
          <br />
          {rowData[18]}
          <br />
          {rowData[19]}
          <br />
          {rowData[20]}
          <br />
          {rowData[21]}
          <br />
          {rowData[22]}
          <br />
          {rowData[23]}
          <br />
          {rowData[24]}
          <br />
          {rowData[25]}
          <br />
          {rowData[26]}
          <br />
          {rowData[27]}
          <br />
          {rowData[28]}
          <br />
          {rowData[29]}
          <br />
        </TableCell>
      </TableRow>
    );
  },
};

const chemicalSolutionControlWorksheetsTableOptions = {
  downloadOptions: {
    filename: "Chemical Solution Control Worksheets.csv",
    separator: ",",
  },
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 250,
  rowsPerPageOptions: [5, 10, 25, 50, 100, 250, 500],
  selectableRows: "single",
  selectableRowsHideCheckboxes: true,
};

const chemicalSolutionControlTableOptions = {
  download: false,
  draggableColumns: {
    enabled: false,
    transitionTime: 1,
  },
  elevation: 0,
  filter: false,
  pagination: false,
  print: false,
  responsive: "vertical",
  rowsPerPage: 15,
  rowsPerPageOptions: [15],
  search: false,
  selectableRows: "none",
  viewColumns: false,
};

const solutionTargetLimitsTableOptions = {
  downloadOptions: {
    filename: "Chemical Solution Control Worksheet Solution Target Limits.csv",
    separator: ",",
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 1,
  },
  elevation: 0,
  filter: false,
  pagination: false,
  print: false,
  responsive: "vertical",
  rowsPerPage: 15,
  rowsPerPageOptions: [15],
  search: false,
  selectableRows: "none",
};

const specificationReferencesTableOptions = {
  downloadOptions: {
    filename:
      "Chemical Solution Control Worksheet Specification References.csv",
    separator: ",",
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 1,
  },
  elevation: 0,
  filter: false,
  pagination: false,
  print: false,
  responsive: "vertical",
  rowsPerPage: 15,
  rowsPerPageOptions: [15],
  search: false,
  selectableRows: "none",
};

const chemicalSolutionAnalysisTableOptions = {
  downloadOptions: {
    filename: "Chemical Solution Control Records.csv",
    separator: ",",
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 1,
  },
  elevation: 0,
  filter: false,
  print: false,
  responsive: "vertical",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25, 50, 100, 250, 500],
  search: false,
  selectableRows: "none",
};

const electroplatingChemicalProcessControlTableOptions = {
  downloadOptions: {
    filename: "Control of Electroplating and Chemical Processes.csv",
    separator: ",",
  },
  elevation: 0,
  filter: true,
  filterType: "multiselect",
  print: false,
  responsive: "vertical",
  rowsPerPage: 100,
  rowsPerPageOptions: [5, 10, 25, 50, 100, 250, 500],
  selectableRows: "single",
  selectableRowsHideCheckboxes: true,
};

export {
  mediaVideoTableOptions,
  organizationUnitTableOptions,
  laboratoryTestUserTableOptions,
  chemicalSolutionControlUserTableOptions,
  electroplatingChemicalProcessControlUserTableOptions,
  laboratoryTestTableOptions,
  chemicalSolutionControlWorksheetsTableOptions,
  chemicalSolutionControlTableOptions,
  solutionTargetLimitsTableOptions,
  specificationReferencesTableOptions,
  chemicalSolutionAnalysisTableOptions,
  electroplatingChemicalProcessControlTableOptions,
};
