import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import {
  toggleEditChemicalSolutionControlRecordDialog,
  editChemicalSolutionControlRecord,
} from "../../redux/actions";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SlideTransition } from "../../components/Transitions";
import jwt_decode from "jwt-decode";
import { chemicalSolutionControlEditRecordFormValidationSchema } from "../../constants/validationSchemas";

class EditChemicalSolutionControlRecordDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sampleTakenDate: "",
      sampleTakenTime: "",
      agitationInMinutes: "",
      temperatureInCelcius: "",
      sampleAnalysisDate: "",
      sampleAnalysisTime: "",
      analysisResult0: "",
      analysisResult1: "",
      analysisResult2: "",
      analysisResult3: "",
      analysisResult4: "",
      analysisResult5: "",
      analysisResult6: "",
      analysisResult7: "",
      analysisResult8: "",
      analysisResult9: "",
      analysisResult10: "",
      analysisResult11: "",
      analysisResult12: "",
      analysisResult13: "",
      analysisResult14: "",
      analysisResult15: "",
      analysisResult16: "",
      analysisResult17: "",
      analysisResult18: "",
      analysisResult19: "",
      analysisResult20: "",
      analysisResult21: "",
      analysisResult22: "",
      analysisResult23: "",
      analysisResult24: "",
      analysisResult25: "",
      analysisResult26: "",
      analysisResult27: "",
      analysisResult28: "",
      analysisResult29: "",
      analysisSolutions: [],
      remarks: "",
    };
  }

  static getDerivedStateFromProps(props) {
    const { loading, selectedChemicalSolutionControlWorksheet } = props;
    const { analysisSolutions } = selectedChemicalSolutionControlWorksheet;

    if (!loading) {
      return {
        analysisSolutions: analysisSolutions,
      };
    }
    return {};
  }

  componentDidUpdate(prevProps, _prevState) {
    const {
      showEditChemicalSolutionControlRecordDialog,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
    } = this.props;

    if (
      showEditChemicalSolutionControlRecordDialog !==
        prevProps.showEditChemicalSolutionControlRecordDialog &&
      showEditChemicalSolutionControlRecordDialog &&
      selectedChemicalSolutionControlWorksheet &&
      selectedChemicalSolutionControlRecord
    ) {
      let {
        sampleTakenDate,
        sampleTakenTime,
        agitationInMinutes,
        temperatureInCelcius,
        sampleAnalysisDate,
        sampleAnalysisTime,
        analysisResult0,
        analysisResult1,
        analysisResult2,
        analysisResult3,
        analysisResult4,
        analysisResult5,
        analysisResult6,
        analysisResult7,
        analysisResult8,
        analysisResult9,
        analysisResult10,
        analysisResult11,
        analysisResult12,
        analysisResult13,
        analysisResult14,
        analysisResult15,
        analysisResult16,
        analysisResult17,
        analysisResult18,
        analysisResult19,
        analysisResult20,
        analysisResult21,
        analysisResult22,
        analysisResult23,
        analysisResult24,
        analysisResult25,
        analysisResult26,
        analysisResult27,
        analysisResult28,
        analysisResult29,
        remarks,
      } = selectedChemicalSolutionControlRecord;

      this.setState({
        sampleTakenDate: sampleTakenDate.substr(0, 10),
        sampleTakenTime,
        agitationInMinutes,
        temperatureInCelcius,
        sampleAnalysisDate: sampleAnalysisDate.substr(0, 10),
        sampleAnalysisTime,
        analysisResult0,
        analysisResult1,
        analysisResult2,
        analysisResult3,
        analysisResult4,
        analysisResult5,
        analysisResult6,
        analysisResult7,
        analysisResult8,
        analysisResult9,
        analysisResult10,
        analysisResult11,
        analysisResult12,
        analysisResult13,
        analysisResult14,
        analysisResult15,
        analysisResult16,
        analysisResult17,
        analysisResult18,
        analysisResult19,
        analysisResult20,
        analysisResult21,
        analysisResult22,
        analysisResult23,
        analysisResult24,
        analysisResult25,
        analysisResult26,
        analysisResult27,
        analysisResult28,
        analysisResult29,
        remarks,
      });
    }
  }

  triggerEditChemicalSolutionControlRecord = (values) => {
    const {
      token,
      loading,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
      editChemicalSolutionControlRecord,
    } = this.props;
    const {
      sampleTakenDate,
      sampleTakenTime,
      agitationInMinutes,
      temperatureInCelcius,
      sampleAnalysisDate,
      sampleAnalysisTime,
      analysisResult0,
      analysisResult1,
      analysisResult2,
      analysisResult3,
      analysisResult4,
      analysisResult5,
      analysisResult6,
      analysisResult7,
      analysisResult8,
      analysisResult9,
      analysisResult10,
      analysisResult11,
      analysisResult12,
      analysisResult13,
      analysisResult14,
      analysisResult15,
      analysisResult16,
      analysisResult17,
      analysisResult18,
      analysisResult19,
      analysisResult20,
      analysisResult21,
      analysisResult22,
      analysisResult23,
      analysisResult24,
      analysisResult25,
      analysisResult26,
      analysisResult27,
      analysisResult28,
      analysisResult29,
      remarks,
    } = values;
    const analysisResults = [
      analysisResult0,
      analysisResult1,
      analysisResult2,
      analysisResult3,
      analysisResult4,
      analysisResult5,
      analysisResult6,
      analysisResult7,
      analysisResult8,
      analysisResult9,
      analysisResult10,
      analysisResult11,
      analysisResult12,
      analysisResult13,
      analysisResult14,
      analysisResult15,
      analysisResult16,
      analysisResult17,
      analysisResult18,
      analysisResult19,
      analysisResult20,
      analysisResult21,
      analysisResult22,
      analysisResult23,
      analysisResult24,
      analysisResult25,
      analysisResult26,
      analysisResult27,
      analysisResult28,
      analysisResult29,
    ].slice(
      0,
      selectedChemicalSolutionControlWorksheet?.analysisSolutions?.length
    );

    if (!loading) {
      editChemicalSolutionControlRecord(
        selectedChemicalSolutionControlWorksheet.id,
        selectedChemicalSolutionControlRecord.id,
        {
          creator: jwt_decode(token)?.id,
          sampleTakenDate,
          sampleTakenTime,
          agitationInMinutes,
          temperatureInCelcius,
          sampleAnalysisDate,
          sampleAnalysisTime,
          analysisResults,
          remarks,
        }
      );
    }
  };

  render() {
    const {
      loading,
      showEditChemicalSolutionControlRecordDialog,
      toggleEditChemicalSolutionControlRecordDialog,
      selectedChemicalSolutionControlWorksheet,
    } = this.props;
    const {
      sampleTakenDate,
      sampleTakenTime,
      agitationInMinutes,
      temperatureInCelcius,
      sampleAnalysisDate,
      sampleAnalysisTime,
      analysisResult0,
      analysisResult1,
      analysisResult2,
      analysisResult3,
      analysisResult4,
      analysisResult5,
      analysisResult6,
      analysisResult7,
      analysisResult8,
      analysisResult9,
      analysisResult10,
      analysisResult11,
      analysisResult12,
      analysisResult13,
      analysisResult14,
      analysisResult15,
      analysisResult16,
      analysisResult17,
      analysisResult18,
      analysisResult19,
      analysisResult20,
      analysisResult21,
      analysisResult22,
      analysisResult23,
      analysisResult24,
      analysisResult25,
      analysisResult26,
      analysisResult27,
      analysisResult28,
      analysisResult29,
      remarks,
    } = this.state;
    const analysisSolutions =
      selectedChemicalSolutionControlWorksheet?.analysisSolutions ?? [];
    let chemicalSolutionControlRecordFormInitialValues = {};

    if (showEditChemicalSolutionControlRecordDialog) {
      chemicalSolutionControlRecordFormInitialValues = {
        sampleTakenDate,
        sampleTakenTime,
        agitationInMinutes,
        temperatureInCelcius,
        sampleAnalysisDate,
        sampleAnalysisTime,
        analysisResult0,
        analysisResult1,
        analysisResult2,
        analysisResult3,
        analysisResult4,
        analysisResult5,
        analysisResult6,
        analysisResult7,
        analysisResult8,
        analysisResult9,
        analysisResult10,
        analysisResult11,
        analysisResult12,
        analysisResult13,
        analysisResult14,
        analysisResult15,
        analysisResult16,
        analysisResult17,
        analysisResult18,
        analysisResult19,
        analysisResult20,
        analysisResult21,
        analysisResult22,
        analysisResult23,
        analysisResult24,
        analysisResult25,
        analysisResult26,
        analysisResult27,
        analysisResult28,
        analysisResult29,
        remarks,
      };
    }
    return (
      <Dialog
        open={showEditChemicalSolutionControlRecordDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="xl"
        scroll="body"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleEditChemicalSolutionControlRecordDialog({});
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Edit chemical solution control record
        </DialogTitle>
        {showEditChemicalSolutionControlRecordDialog ? (
          <Formik
            initialValues={chemicalSolutionControlRecordFormInitialValues}
            onSubmit={this.triggerEditChemicalSolutionControlRecord}
            validationSchema={
              chemicalSolutionControlEditRecordFormValidationSchema
            }
          >
            {({ values, touched, errors, handleChange }) => {
              return (
                <Form autoComplete="off">
                  <DialogContent dividers>
                    <Container>
                      <Grid
                        container
                        className="mt-4 pt-4"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                      >
                        Sample Taken
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.sampleTakenDate && touched.sampleTakenDate
                            }
                            fullWidth
                            helperText={
                              errors.sampleTakenDate &&
                              touched.sampleTakenDate &&
                              errors.sampleTakenDate
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Date"
                            name="sampleTakenDate"
                            onChange={handleChange}
                            type="date"
                            value={values.sampleTakenDate}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.sampleTakenTime && touched.sampleTakenTime
                            }
                            fullWidth
                            helperText={
                              errors.sampleTakenTime &&
                              touched.sampleTakenTime &&
                              errors.sampleTakenTime
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Time"
                            name="sampleTakenTime"
                            onChange={handleChange}
                            type="text"
                            value={values.sampleTakenTime}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.agitationInMinutes &&
                              touched.agitationInMinutes
                            }
                            fullWidth
                            helperText={
                              errors.agitationInMinutes &&
                              touched.agitationInMinutes &&
                              errors.agitationInMinutes
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Agitation (minutes)"
                            name="agitationInMinutes"
                            onChange={handleChange}
                            type="text"
                            value={values.agitationInMinutes}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.temperatureInCelcius &&
                              touched.temperatureInCelcius
                            }
                            fullWidth
                            helperText={
                              errors.temperatureInCelcius &&
                              touched.temperatureInCelcius &&
                              errors.temperatureInCelcius
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Temperature (°C)"
                            name="temperatureInCelcius"
                            onChange={handleChange}
                            type="text"
                            value={values.temperatureInCelcius}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="mt-4 pt-4"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                      >
                        Sample Analysis
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.sampleAnalysisDate &&
                              touched.sampleAnalysisDate
                            }
                            fullWidth
                            helperText={
                              errors.sampleAnalysisDate &&
                              touched.sampleAnalysisDate &&
                              errors.sampleAnalysisDate
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Date"
                            name="sampleAnalysisDate"
                            onChange={handleChange}
                            type="date"
                            value={values.sampleAnalysisDate}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.sampleAnalysisTime &&
                              touched.sampleAnalysisTime
                            }
                            fullWidth
                            helperText={
                              errors.sampleAnalysisTime &&
                              touched.sampleAnalysisTime &&
                              errors.sampleAnalysisTime
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Time"
                            name="sampleAnalysisTime"
                            onChange={handleChange}
                            type="text"
                            value={values.sampleAnalysisTime}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="mt-4 pt-4"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                      >
                        Results
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={!analysisSolutions[0] && !analysisSolutions[1]}
                      >
                        {analysisSolutions[0] ? (
                          <Grid item xs>
                            <TextField
                              error={
                                errors.analysisResult0 &&
                                touched.analysisResult0
                              }
                              fullWidth
                              helperText={
                                errors.analysisResult0 &&
                                touched.analysisResult0 &&
                                errors.analysisResult0
                              }
                              hidden={!analysisSolutions[0]}
                              InputLabelProps={{ shrink: true }}
                              label={analysisSolutions[0]?.solution}
                              name="analysisResult0"
                              onChange={handleChange}
                              type="text"
                              value={values.analysisResult0}
                            />
                          </Grid>
                        ) : null}
                        {analysisSolutions[1] ? (
                          <Grid item xs>
                            <TextField
                              error={
                                errors.analysisResult1 &&
                                touched.analysisResult1
                              }
                              fullWidth
                              helperText={
                                errors.analysisResult1 &&
                                touched.analysisResult1 &&
                                errors.analysisResult1
                              }
                              hidden={!analysisSolutions[1]}
                              InputLabelProps={{ shrink: true }}
                              label={analysisSolutions[1]?.solution}
                              name="analysisResult1"
                              onChange={handleChange}
                              type="text"
                              value={values.analysisResult1}
                            />
                          </Grid>
                        ) : null}
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={!analysisSolutions[2] && !analysisSolutions[3]}
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult2 && touched.analysisResult2
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult2 &&
                              touched.analysisResult2 &&
                              errors.analysisResult2
                            }
                            hidden={!analysisSolutions[2]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[2]?.solution}
                            name="analysisResult2"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult2}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult3 && touched.analysisResult3
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult3 &&
                              touched.analysisResult3 &&
                              errors.analysisResult3
                            }
                            hidden={!analysisSolutions[3]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[3]?.solution}
                            name="analysisResult3"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult3}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={!analysisSolutions[4] && !analysisSolutions[5]}
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult4 && touched.analysisResult4
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult4 &&
                              touched.analysisResult4 &&
                              errors.analysisResult4
                            }
                            hidden={!analysisSolutions[4]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[4]?.solution}
                            name="analysisResult4"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult4}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult5 && touched.analysisResult5
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult5 &&
                              touched.analysisResult5 &&
                              errors.analysisResult5
                            }
                            hidden={!analysisSolutions[5]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[5]?.solution}
                            name="analysisResult5"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult5}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={!analysisSolutions[6] && !analysisSolutions[7]}
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult6 && touched.analysisResult6
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult6 &&
                              touched.analysisResult6 &&
                              errors.analysisResult6
                            }
                            hidden={!analysisSolutions[6]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[6]?.solution}
                            name="analysisResult6"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult6}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult7 && touched.analysisResult7
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult7 &&
                              touched.analysisResult7 &&
                              errors.analysisResult7
                            }
                            hidden={!analysisSolutions[7]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[7]?.solution}
                            name="analysisResult7"
                            onChange={handleChange}
                            analysisSolutions
                            type="text"
                            value={values.analysisResult7}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={!analysisSolutions[8] && !analysisSolutions[9]}
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult8 && touched.analysisResult8
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult8 &&
                              touched.analysisResult8 &&
                              errors.analysisResult8
                            }
                            hidden={!analysisSolutions[8]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[8]?.solution}
                            name="analysisResult8"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult8}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult9 && touched.analysisResult9
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult9 &&
                              touched.analysisResult9 &&
                              errors.analysisResult9
                            }
                            hidden={!analysisSolutions[9]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[9]?.solution}
                            name="analysisResult9"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult9}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[10] && !analysisSolutions[11]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult10 &&
                              touched.analysisResult10
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult10 &&
                              touched.analysisResult10 &&
                              errors.analysisResult10
                            }
                            hidden={!analysisSolutions[10]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[10]?.solution}
                            name="analysisResult10"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult10}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult11 &&
                              touched.analysisResult11
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult11 &&
                              touched.analysisResult11 &&
                              errors.analysisResult11
                            }
                            hidden={!analysisSolutions[11]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[11]?.solution}
                            name="analysisResult11"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult11}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[12] && !analysisSolutions[13]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult12 &&
                              touched.analysisResult12
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult12 &&
                              touched.analysisResult12 &&
                              errors.analysisResult12
                            }
                            hidden={!analysisSolutions[12]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[12]?.solution}
                            name="analysisResult12"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult12}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult13 &&
                              touched.analysisResult13
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult13 &&
                              touched.analysisResult13 &&
                              errors.analysisResult13
                            }
                            hidden={!analysisSolutions[13]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[13]?.solution}
                            name="analysisResult13"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult13}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[14] && !analysisSolutions[15]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult14 &&
                              touched.analysisResult14
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult14 &&
                              touched.analysisResult14 &&
                              errors.analysisResult14
                            }
                            hidden={!analysisSolutions[14]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[14]?.solution}
                            name="analysisResult14"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult14}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult15 &&
                              touched.analysisResult15
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult15 &&
                              touched.analysisResult15 &&
                              errors.analysisResult15
                            }
                            hidden={!analysisSolutions[15]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[15]?.solution}
                            name="analysisResult15"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult15}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[16] && !analysisSolutions[17]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult16 &&
                              touched.analysisResult16
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult16 &&
                              touched.analysisResult16 &&
                              errors.analysisResult16
                            }
                            hidden={!analysisSolutions[16]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[16]?.solution}
                            name="analysisResult16"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult16}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult17 &&
                              touched.analysisResult17
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult17 &&
                              touched.analysisResult17 &&
                              errors.analysisResult17
                            }
                            hidden={!analysisSolutions[17]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[17]?.solution}
                            name="analysisResult17"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult17}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[18] && !analysisSolutions[19]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult18 &&
                              touched.analysisResult18
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult18 &&
                              touched.analysisResult18 &&
                              errors.analysisResult18
                            }
                            hidden={!analysisSolutions[18]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[18]?.solution}
                            name="analysisResult18"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult18}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult19 &&
                              touched.analysisResult19
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult19 &&
                              touched.analysisResult19 &&
                              errors.analysisResult19
                            }
                            hidden={!analysisSolutions[19]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[19]?.solution}
                            name="analysisResult19"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult19}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[20] && !analysisSolutions[21]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult20 &&
                              touched.analysisResult20
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult20 &&
                              touched.analysisResult20 &&
                              errors.analysisResult20
                            }
                            hidden={!analysisSolutions[20]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[20]?.solution}
                            name="analysisResult20"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult20}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult21 &&
                              touched.analysisResult21
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult21 &&
                              touched.analysisResult21 &&
                              errors.analysisResult21
                            }
                            hidden={!analysisSolutions[21]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[21]?.solution}
                            name="analysisResult21"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult21}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[22] && !analysisSolutions[23]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult22 &&
                              touched.analysisResult22
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult22 &&
                              touched.analysisResult22 &&
                              errors.analysisResult22
                            }
                            hidden={!analysisSolutions[22]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[22]?.solution}
                            name="analysisResult22"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult22}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult23 &&
                              touched.analysisResult23
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult23 &&
                              touched.analysisResult23 &&
                              errors.analysisResult23
                            }
                            hidden={!analysisSolutions[23]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[23]?.solution}
                            name="analysisResult23"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult23}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[24] && !analysisSolutions[25]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult24 &&
                              touched.analysisResult24
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult24 &&
                              touched.analysisResult24 &&
                              errors.analysisResult24
                            }
                            hidden={!analysisSolutions[24]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[24]?.solution}
                            name="analysisResult24"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult24}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult25 &&
                              touched.analysisResult25
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult25 &&
                              touched.analysisResult25 &&
                              errors.analysisResult25
                            }
                            hidden={!analysisSolutions[25]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[25]?.solution}
                            name="analysisResult25"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult25}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[26] && !analysisSolutions[27]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult26 &&
                              touched.analysisResult26
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult26 &&
                              touched.analysisResult26 &&
                              errors.analysisResult26
                            }
                            hidden={!analysisSolutions[26]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[26]?.solution}
                            name="analysisResult26"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult26}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult27 &&
                              touched.analysisResult27
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult27 &&
                              touched.analysisResult27 &&
                              errors.analysisResult27
                            }
                            hidden={!analysisSolutions[27]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[27]?.solution}
                            name="analysisResult27"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult27}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                        hidden={
                          !analysisSolutions[28] && !analysisSolutions[29]
                        }
                      >
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult28 &&
                              touched.analysisResult28
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult28 &&
                              touched.analysisResult28 &&
                              errors.analysisResult28
                            }
                            hidden={!analysisSolutions[28]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[28]?.solution}
                            name="analysisResult28"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult28}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={
                              errors.analysisResult29 &&
                              touched.analysisResult29
                            }
                            fullWidth
                            helperText={
                              errors.analysisResult29 &&
                              touched.analysisResult29 &&
                              errors.analysisResult29
                            }
                            hidden={!analysisSolutions[29]}
                            InputLabelProps={{ shrink: true }}
                            label={analysisSolutions[29]?.solution}
                            name="analysisResult29"
                            onChange={handleChange}
                            type="text"
                            value={values.analysisResult29}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mt-4 pt-4"
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                      >
                        Notes
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <TextField
                            error={errors.remarks && touched.remarks}
                            fullWidth
                            helperText={
                              errors.remarks &&
                              touched.remarks &&
                              errors.remarks
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Remarks"
                            name="remarks"
                            onChange={handleChange}
                            type="text"
                            value={values.remarks}
                          />
                        </Grid>
                      </Grid>
                    </Container>
                  </DialogContent>
                  <DialogActions style={{ margin: 4 }}>
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="secondary"
                      onClick={
                        !loading
                          ? () => {
                              toggleEditChemicalSolutionControlRecordDialog({});
                            }
                          : null
                      }
                      type="button"
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Cancel</span>
                    </Button>
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="primary"
                      onClick={() => {}}
                      type={loading ? "button" : "submit"}
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Save</span>
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        ) : null}
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, qaChemicalSolutionControl }) => {
  const { token } = auth;
  const {
    loading,
    showEditChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  } = qaChemicalSolutionControl;

  return {
    token,
    loading,
    showEditChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  };
};

const mapActionsToProps = {
  toggleEditChemicalSolutionControlRecordDialog,
  editChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditChemicalSolutionControlRecordDialog);
