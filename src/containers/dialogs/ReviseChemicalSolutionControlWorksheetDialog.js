import {
  AddCircleOutline as AddCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
  Sync as SyncIcon,
} from "@material-ui/icons";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { FieldArray, Form, Formik } from "formik";
import React, { PureComponent } from "react";
import {
  reviseChemicalSolutionControlWorksheet,
  toggleReviseChemicalSolutionControlWorksheetDialog,
} from "../../redux/actions";
import { SlideTransition } from "../../components/Transitions";
import { Autocomplete } from "@material-ui/lab";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { chemicalSolutionControlReviseWorksheetFormValidationSchema } from "../../constants/validationSchemas";

class ReviseChemicalSolutionControlWorksheetDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dummyOptions: [],
      solutionProcess: "",
      tankNumber: "",
      tankSize: "",
      tankVolume: "",
      location: "",
      testMethod: "",
      frequencyOfTest: "",
      temperatureRangeInCelcius: "",
      solutionTargetLimits: [{ solution: "", min: "", target: "", max: "" }],
      solutionContents: [
        {
          solution: "",
          organization: "IAe",
          specification: "Solution Control Limit",
          value: "",
        },
      ],
      specificationReferences: [{ organization: "", specification: "" }],
      solutionSpecificationReferences: [],
      analysisSolutions: [
        {
          solution: "",
        },
      ],
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const {
      showReviseChemicalSolutionControlWorksheetDialog,
      selectedChemicalSolutionControlWorksheetToRevise,
    } = this.props;

    if (
      showReviseChemicalSolutionControlWorksheetDialog !==
        prevProps.showReviseChemicalSolutionControlWorksheetDialog &&
      showReviseChemicalSolutionControlWorksheetDialog &&
      selectedChemicalSolutionControlWorksheetToRevise
    ) {
      let {
        solutionProcess,
        tankNumber,
        tankSize,
        tankVolume,
        location,
        testMethod,
        frequencyOfTest,
        temperatureRangeInCelcius,
        solutionTargetLimits,
        solutionSpecificationReferences,
        analysisSolutions,
      } = selectedChemicalSolutionControlWorksheetToRevise;
      let solutionContents = solutionSpecificationReferences.filter((e) => {
        return e.specification === "Solution Control Limit";
      });
      let specificationReferences = solutionSpecificationReferences
        .map(({ organization, specification }) => ({
          organization,
          specification,
        }))
        .filter((e) => {
          return (
            e.organization !== "IAe" &&
            e.specification !== "Solution Control Limit"
          );
        })
        .filter(
          (v, i, a) =>
            a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
        );
      solutionSpecificationReferences = solutionSpecificationReferences.filter(
        (e) => {
          return (
            e.organization !== "IAe" &&
            e.specification !== "Solution Control Limit"
          );
        }
      );

      this.setState({
        solutionProcess,
        tankNumber,
        tankSize,
        tankVolume,
        location,
        testMethod,
        frequencyOfTest,
        temperatureRangeInCelcius,
        solutionTargetLimits,
        solutionContents,
        specificationReferences,
        solutionSpecificationReferences,
        analysisSolutions,
      });
    }
  }

  triggerEditChemicalSolutionControlWorksheet = (values) => {
    const {
      token,
      loading,
      selectedChemicalSolutionControlWorksheetToRevise,
      reviseChemicalSolutionControlWorksheet,
    } = this.props;
    const { id } = jwt_decode(token);
    let newWorksheet = values;

    if (!loading) {
      let {
        solutionContents,
        solutionSpecificationReferences,
        analysisSolutions,
      } = newWorksheet;

      newWorksheet.creator = id;
      newWorksheet.revision =
        selectedChemicalSolutionControlWorksheetToRevise?.revision
          ? selectedChemicalSolutionControlWorksheetToRevise?.revision + 1
          : 1;
      newWorksheet.revisedWorksheet =
        selectedChemicalSolutionControlWorksheetToRevise?.id;
      newWorksheet.solutionSpecificationReferences =
        solutionSpecificationReferences.map(
          ({ solution, organization, specification, value }) => ({
            solution,
            organization,
            specification,
            value,
          })
        );
      solutionContents = solutionContents.map(
        ({ solution, organization, specification, value }) => ({
          solution,
          organization,
          specification,
          value,
        })
      );
      newWorksheet.analysisSolutions = analysisSolutions.map(
        ({ solution }) => ({
          solution,
        })
      );
      for (let i = 0; i < solutionContents.length; i++) {
        const e = solutionContents[i];
        newWorksheet.solutionSpecificationReferences.push(e);
      }
      this.setState({ solutionSpecificationReferences: [] });
      reviseChemicalSolutionControlWorksheet(
        selectedChemicalSolutionControlWorksheetToRevise?.id,
        newWorksheet
      );
    }
  };

  render() {
    const {
      loading,
      showReviseChemicalSolutionControlWorksheetDialog,
      toggleReviseChemicalSolutionControlWorksheetDialog,
    } = this.props;
    const {
      dummyOptions,
      solutionProcess,
      tankNumber,
      tankSize,
      tankVolume,
      location,
      testMethod,
      frequencyOfTest,
      temperatureRangeInCelcius,
      solutionTargetLimits,
      solutionContents,
      specificationReferences,
      solutionSpecificationReferences,
      analysisSolutions,
    } = this.state;
    let chemicalSolutionControlWorksheetFormInitialValues = {};

    if (showReviseChemicalSolutionControlWorksheetDialog) {
      chemicalSolutionControlWorksheetFormInitialValues = {
        solutionProcess,
        tankNumber,
        tankSize,
        tankVolume,
        location,
        testMethod,
        frequencyOfTest,
        temperatureRangeInCelcius,
        solutionTargetLimits,
        solutionContents,
        specificationReferences,
        solutionSpecificationReferences,
        analysisSolutions,
      };
    }
    return (
      <Dialog
        open={showReviseChemicalSolutionControlWorksheetDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="xl"
        scroll="body"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleReviseChemicalSolutionControlWorksheetDialog({});
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Revise chemical control worksheet
        </DialogTitle>
        {showReviseChemicalSolutionControlWorksheetDialog ? (
          <Formik
            initialValues={chemicalSolutionControlWorksheetFormInitialValues}
            onSubmit={this.triggerEditChemicalSolutionControlWorksheet}
            validationSchema={
              chemicalSolutionControlReviseWorksheetFormValidationSchema
            }
          >
            {({ setFieldValue, values, touched, errors, handleChange }) => {
              const setSpecificationReferencesValue = (name, value) => {
                setFieldValue(name, value);
              };
              return (
                <Form autoComplete="off">
                  <DialogContent dividers>
                    <Container>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={solutionProcess}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("solutionProcess", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  errors.solutionProcess &&
                                  touched.solutionProcess
                                }
                                helperText={
                                  errors.solutionProcess &&
                                  touched.solutionProcess &&
                                  errors.solutionProcess
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Solution Process"
                                name="solutionProcess"
                                value={values.solutionProcess}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={tankNumber}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("tankNumber", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={errors.tankNumber && touched.tankNumber}
                                helperText={
                                  errors.tankNumber &&
                                  touched.tankNumber &&
                                  errors.tankNumber
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Tank Number"
                                name="tankNumber"
                                value={values.tankNumber}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={errors.tankSize && touched.tankSize}
                            fullWidth
                            helperText={
                              errors.tankSize &&
                              touched.tankSize &&
                              errors.tankSize
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Tank Size"
                            name="tankSize"
                            onChange={handleChange}
                            type="text"
                            value={values.tankSize}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            error={errors.tankVolume && touched.tankVolume}
                            fullWidth
                            helperText={
                              errors.tankVolume &&
                              touched.tankVolume &&
                              errors.tankVolume
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Tank Volume"
                            name="tankVolume"
                            onChange={handleChange}
                            type="text"
                            value={values.tankVolume}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={location}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("location", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={errors.location && touched.location}
                                helperText={
                                  errors.location &&
                                  touched.location &&
                                  errors.location
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Location"
                                name="location"
                                value={values.location}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={testMethod}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("testMethod", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={errors.testMethod && touched.testMethod}
                                helperText={
                                  errors.testMethod &&
                                  touched.testMethod &&
                                  errors.testMethod
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Test Method"
                                name="testMethod"
                                value={values.testMethod}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={frequencyOfTest}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("frequencyOfTest", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  errors.frequencyOfTest &&
                                  touched.frequencyOfTest
                                }
                                helperText={
                                  errors.frequencyOfTest &&
                                  touched.frequencyOfTest &&
                                  errors.frequencyOfTest
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Frequency Of Test"
                                name="frequencyOfTest"
                                value={values.frequencyOfTest}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Autocomplete
                            defaultValue={temperatureRangeInCelcius}
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue("temperatureRangeInCelcius", value);
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  errors.temperatureRangeInCelcius &&
                                  touched.temperatureRangeInCelcius
                                }
                                helperText={
                                  errors.temperatureRangeInCelcius &&
                                  touched.temperatureRangeInCelcius &&
                                  errors.temperatureRangeInCelcius
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Temperature Range (°C)"
                                name="temperatureRangeInCelcius"
                                value={values.temperatureRangeInCelcius}
                              />
                            )}
                            renderOption={(option, { inputValue }) => {
                              const matches = match(option, inputValue);
                              const parts = parse(option, matches);
                              return (
                                <div>
                                  {parts.map((part, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                      }}
                                    >
                                      {part.text}
                                    </span>
                                  ))}
                                </div>
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                        className="mt-4 pt-4"
                      >
                        Solution Target Limit
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <FieldArray
                            name="solutionTargetLimits"
                            render={({ insert, remove, push }) => (
                              <div>
                                {values.solutionTargetLimits.length > 0 &&
                                  values.solutionTargetLimits.map(
                                    (solutionTargetLimit, index) => (
                                      <Grid container spacing={3} key={index}>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionTargetLimits &&
                                              errors.solutionTargetLimits[
                                                index
                                              ] &&
                                              errors.solutionTargetLimits[index]
                                                .solution &&
                                              touched.solutionTargetLimits &&
                                              touched.solutionTargetLimits[
                                                index
                                              ].solution
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Solution Content To Be Analyzed"
                                            name={`solutionTargetLimits.${index}.solution`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values.solutionTargetLimits[index]
                                                .solution
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionTargetLimits &&
                                              errors.solutionTargetLimits[
                                                index
                                              ] &&
                                              errors.solutionTargetLimits[index]
                                                .min &&
                                              touched.solutionTargetLimits &&
                                              touched.solutionTargetLimits[
                                                index
                                              ].min
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Minimum"
                                            name={`solutionTargetLimits.${index}.min`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values.solutionTargetLimits[index]
                                                .min
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionTargetLimits &&
                                              errors.solutionTargetLimits[
                                                index
                                              ] &&
                                              errors.solutionTargetLimits[index]
                                                .target &&
                                              touched.solutionTargetLimits &&
                                              touched.solutionTargetLimits[
                                                index
                                              ].target
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Target"
                                            name={`solutionTargetLimits.${index}.target`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values.solutionTargetLimits[index]
                                                .target
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionTargetLimits &&
                                              errors.solutionTargetLimits[
                                                index
                                              ] &&
                                              errors.solutionTargetLimits[index]
                                                .max &&
                                              touched.solutionTargetLimits &&
                                              touched.solutionTargetLimits[
                                                index
                                              ].max
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Maximum"
                                            name={`solutionTargetLimits.${index}.max`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values.solutionTargetLimits[index]
                                                .max
                                            }
                                          />
                                        </Grid>
                                        {values.solutionTargetLimits?.length >
                                        1 ? (
                                          <Grid item xs={1}>
                                            <IconButton
                                              aria-label="delete"
                                              color="secondary"
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteOutlineIcon />
                                            </IconButton>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    )
                                  )}
                                {values.solutionTargetLimits.length <= 14 ? (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      aria-label="add"
                                      color="primary"
                                      onClick={() =>
                                        push({
                                          solution: "",
                                          min: "",
                                          target: "",
                                          max: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutlineIcon />
                                    </IconButton>
                                  </div>
                                ) : null}
                              </div>
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                        className="mt-4 pt-4"
                      >
                        Specification References: Solutions
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <FieldArray
                            name="solutionContents"
                            render={({ insert, remove, push }) => (
                              <div>
                                {values.solutionContents.length > 0 &&
                                  values.solutionContents.map(
                                    (solutionContent, index) => (
                                      <Grid container spacing={3} key={index}>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionContents &&
                                              errors.solutionContents[index] &&
                                              errors.solutionContents[index]
                                                .solution &&
                                              touched.solutionContents &&
                                              touched.solutionContents[index]
                                                .solution
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Solution Content to be Analyzed"
                                            name={`solutionContents.${index}.solution`}
                                            onChange={(event) => {
                                              setSpecificationReferencesValue(
                                                `solutionContents.${index}.solution`,
                                                event.target.value
                                              );
                                            }}
                                            type="text"
                                            value={
                                              values.solutionContents[index]
                                                .solution
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionContents &&
                                              errors.solutionContents[index] &&
                                              errors.solutionContents[index]
                                                .value &&
                                              touched.solutionContents &&
                                              touched.solutionContents[index]
                                                .value
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="IAe Solution Control Limit"
                                            name={`solutionContents.${index}.value`}
                                            onChange={(event) => {
                                              setSpecificationReferencesValue(
                                                `solutionContents.${index}.value`,
                                                event.target.value
                                              );
                                            }}
                                            type="text"
                                            value={
                                              values.solutionContents[index]
                                                .value
                                            }
                                          />
                                        </Grid>
                                        {values.solutionContents?.length > 1 ? (
                                          <Grid item xs={1}>
                                            <IconButton
                                              aria-label="delete"
                                              color="secondary"
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteOutlineIcon />
                                            </IconButton>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    )
                                  )}
                                {values.solutionContents.length <= 14 ? (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      aria-label="add"
                                      color="primary"
                                      onClick={() => {
                                        push({
                                          solution: "",
                                          organization: "IAe",
                                          specification:
                                            "Solution Control Limit",
                                          value: "",
                                        });
                                      }}
                                    >
                                      <AddCircleOutlineIcon />
                                    </IconButton>
                                  </div>
                                ) : null}
                              </div>
                            )}
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
                        Specification References: Specifications
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <FieldArray
                            name="specificationReferences"
                            render={({ insert, remove, push }) => (
                              <div>
                                {values.specificationReferences.length > 0 &&
                                  values.specificationReferences.map(
                                    (specificationReference, index) => (
                                      <Grid container spacing={3} key={index}>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.specificationReferences &&
                                              errors.specificationReferences[
                                                index
                                              ] &&
                                              errors.specificationReferences[
                                                index
                                              ].organization &&
                                              touched.specificationReferences &&
                                              touched.specificationReferences[
                                                index
                                              ].organization
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Name"
                                            name={`specificationReferences.${index}.organization`}
                                            onChange={(event) => {
                                              setSpecificationReferencesValue(
                                                `specificationReferences.${index}.organization`,
                                                event.target.value
                                              );
                                            }}
                                            type="text"
                                            value={
                                              values.specificationReferences[
                                                index
                                              ].organization
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.specificationReferences &&
                                              errors.specificationReferences[
                                                index
                                              ] &&
                                              errors.specificationReferences[
                                                index
                                              ].specification &&
                                              touched.specificationReferences &&
                                              touched.specificationReferences[
                                                index
                                              ].specification
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Specification"
                                            name={`specificationReferences.${index}.specification`}
                                            onChange={(event) => {
                                              setSpecificationReferencesValue(
                                                `specificationReferences.${index}.specification`,
                                                event.target.value
                                              );
                                            }}
                                            type="text"
                                            value={
                                              values.specificationReferences[
                                                index
                                              ].specification
                                            }
                                          />
                                        </Grid>
                                        {values.specificationReferences
                                          ?.length > 1 ? (
                                          <Grid item xs={1}>
                                            <IconButton
                                              aria-label="delete"
                                              color="secondary"
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteOutlineIcon />
                                            </IconButton>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    )
                                  )}
                                {values.specificationReferences.length <= 9 ? (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      aria-label="add"
                                      color="primary"
                                      onClick={() =>
                                        push({
                                          organization: "",
                                          specification: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutlineIcon />
                                    </IconButton>
                                  </div>
                                ) : null}
                              </div>
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                        className="mt-4 pt-4"
                      >
                        Specification References: Values
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <FieldArray
                            name="solutionSpecificationReferences"
                            render={({ insert, remove, push }) => (
                              <div>
                                {values.solutionSpecificationReferences.length >
                                  0 &&
                                  values.solutionSpecificationReferences.map(
                                    (specificationReferencesValue, index) => (
                                      <Grid container spacing={3} key={index}>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            disabled
                                            error={
                                              errors.solutionSpecificationReferences &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ] &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ].solution &&
                                              touched.solutionSpecificationReferences &&
                                              touched
                                                .solutionSpecificationReferences[
                                                index
                                              ].solution
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Solution Content to be Analyzed"
                                            name={`solutionSpecificationReferences.${index}.solution`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values
                                                .solutionSpecificationReferences[
                                                index
                                              ].solution
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            disabled
                                            error={
                                              errors.solutionSpecificationReferences &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ] &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ].organization &&
                                              touched.solutionSpecificationReferences &&
                                              touched
                                                .solutionSpecificationReferences[
                                                index
                                              ].organization
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Organization"
                                            name={`solutionSpecificationReferences.${index}.organization`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values
                                                .solutionSpecificationReferences[
                                                index
                                              ].organization
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            disabled
                                            error={
                                              errors.solutionSpecificationReferences &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ] &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ].specification &&
                                              touched.solutionSpecificationReferences &&
                                              touched
                                                .solutionSpecificationReferences[
                                                index
                                              ].specification
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Specification"
                                            name={`solutionSpecificationReferences.${index}.specification`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values
                                                .solutionSpecificationReferences[
                                                index
                                              ].specification
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.solutionSpecificationReferences &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ] &&
                                              errors
                                                .solutionSpecificationReferences[
                                                index
                                              ].value &&
                                              touched.solutionSpecificationReferences &&
                                              touched
                                                .solutionSpecificationReferences[
                                                index
                                              ].value
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Value"
                                            name={`solutionSpecificationReferences.${index}.value`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values
                                                .solutionSpecificationReferences[
                                                index
                                              ].value
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    )
                                  )}
                                <div
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <IconButton
                                    aria-label="add"
                                    color="primary"
                                    onClick={() => {
                                      const {
                                        solutionContents,
                                        specificationReferences,
                                      } = values;
                                      const scLength = solutionContents.length;
                                      const srLength =
                                        specificationReferences.length;

                                      setFieldValue(
                                        `solutionSpecificationReferences`,
                                        []
                                      );
                                      for (let i = 0; i < scLength; i++) {
                                        for (let j = 0; j < srLength; j++) {
                                          push({
                                            solution:
                                              values.solutionContents[i]
                                                .solution,
                                            organization:
                                              values.specificationReferences[j]
                                                .organization,
                                            specification:
                                              values.specificationReferences[j]
                                                .specification,
                                            value: "",
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    <SyncIcon />
                                  </IconButton>
                                </div>
                              </div>
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        style={{
                          alignItems: "center",
                          display: "flex",
                          fontSize: 18,
                          justifyContent: "center",
                        }}
                        className="mt-4 pt-4"
                      >
                        Chemical Solution Analysis: Solutions
                      </Grid>
                      <Grid
                        container
                        spacing={3}
                        className="mb-4 pb-4 mt-4 pt-4"
                      >
                        <Grid item xs>
                          <FieldArray
                            name="analysisSolutions"
                            render={({ remove, push }) => (
                              <div>
                                {values.analysisSolutions.length > 0 &&
                                  values.analysisSolutions.map(
                                    (_analysisSolution, index) => (
                                      <Grid container spacing={3} key={index}>
                                        <Grid item xs>
                                          <TextField
                                            className="mb-4"
                                            error={
                                              errors.analysisSolutions &&
                                              errors.analysisSolutions[index] &&
                                              errors.analysisSolutions[index]
                                                .solution &&
                                              touched.analysisSolutions &&
                                              touched.analysisSolutions[index]
                                                .solution
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            label="Chemical Solution Name"
                                            name={`analysisSolutions.${index}.solution`}
                                            onChange={handleChange}
                                            type="text"
                                            value={
                                              values.analysisSolutions[index]
                                                .solution
                                            }
                                          />
                                        </Grid>
                                        {values.analysisSolutions?.length >
                                        1 ? (
                                          <Grid item xs={1}>
                                            <IconButton
                                              aria-label="delete"
                                              color="secondary"
                                              onClick={() => remove(index)}
                                            >
                                              <DeleteOutlineIcon />
                                            </IconButton>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    )
                                  )}
                                {values.analysisSolutions.length <= 29 ? (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      aria-label="add"
                                      color="primary"
                                      onClick={() =>
                                        push({
                                          solution: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutlineIcon />
                                    </IconButton>
                                  </div>
                                ) : null}
                              </div>
                            )}
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
                              toggleReviseChemicalSolutionControlWorksheetDialog(
                                {}
                              );
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
                      variant="contained"
                      color="primary"
                      type={loading ? "button" : "submit"}
                    >
                      <LoadingSpinner />
                      <span className="label">Submit</span>
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
    showReviseChemicalSolutionControlWorksheetDialog,
    selectedChemicalSolutionControlWorksheetToRevise,
  } = qaChemicalSolutionControl;

  return {
    token,
    loading,
    showReviseChemicalSolutionControlWorksheetDialog,
    selectedChemicalSolutionControlWorksheetToRevise,
  };
};

const mapActionsToProps = {
  toggleReviseChemicalSolutionControlWorksheetDialog,
  reviseChemicalSolutionControlWorksheet,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ReviseChemicalSolutionControlWorksheetDialog);
