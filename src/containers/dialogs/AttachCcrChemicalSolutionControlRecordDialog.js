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
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import {
  toggleAttachCcrChemicalSolutionControlRecordDialog,
  attachCcrChemicalSolutionControlRecord,
} from "../../redux/actions";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SlideTransition } from "../../components/Transitions";
import { chemicalSolutionControlRecordAttachCcrFormValidationSchema } from "../../constants/validationSchemas";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

class AttachCcrChemicalSolutionControlRecordDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dummyOptions: [],
      chemicalChargingRecordNumber: "",
      chemicalChargingRecordReceivedDate: "",
    };
  }

  triggerAttachCcrChemicalSolutionControlRecord = (values) => {
    const {
      loading,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
      attachCcrChemicalSolutionControlRecord,
    } = this.props;
    const { chemicalChargingRecordNumber, chemicalChargingRecordReceivedDate } =
      values;

    if (!loading) {
      attachCcrChemicalSolutionControlRecord(
        selectedChemicalSolutionControlWorksheet.id,
        selectedChemicalSolutionControlRecord.id,
        {
          chemicalChargingRecordNumber: chemicalChargingRecordNumber,
          chemicalChargingRecordReceivedDate:
            chemicalChargingRecordReceivedDate,
        }
      );
    }
  };

  render() {
    const {
      loading,
      showAttachCcrChemicalSolutionControlRecordDialog,
      toggleAttachCcrChemicalSolutionControlRecordDialog,
    } = this.props;
    const {
      dummyOptions,
      chemicalChargingRecordNumber,
      chemicalChargingRecordReceivedDate,
    } = this.state;
    let chemicalChargingRecordFormInitialValues = {};

    if (showAttachCcrChemicalSolutionControlRecordDialog) {
      chemicalChargingRecordFormInitialValues = {
        chemicalChargingRecordNumber,
        chemicalChargingRecordReceivedDate,
      };
    }

    return (
      <Dialog
        open={showAttachCcrChemicalSolutionControlRecordDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="xl"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleAttachCcrChemicalSolutionControlRecordDialog();
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Attach Chemical Charging Record (CCR)
        </DialogTitle>
        {showAttachCcrChemicalSolutionControlRecordDialog ? (
          <Formik
            initialValues={chemicalChargingRecordFormInitialValues}
            onSubmit={this.triggerAttachCcrChemicalSolutionControlRecord}
            validationSchema={
              chemicalSolutionControlRecordAttachCcrFormValidationSchema
            }
          >
            {({ setFieldValue, values, touched, errors, handleChange }) => {
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
                            freeSolo
                            fullWidth
                            getOptionLabel={(option) => option}
                            onInputChange={(_event, value) => {
                              setFieldValue(
                                "chemicalChargingRecordNumber",
                                value
                              );
                            }}
                            openOnFocus
                            options={dummyOptions}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  errors.chemicalChargingRecordNumber &&
                                  touched.chemicalChargingRecordNumber
                                }
                                helperText={
                                  errors.chemicalChargingRecordNumber &&
                                  touched.chemicalChargingRecordNumber &&
                                  errors.chemicalChargingRecordNumber
                                }
                                InputLabelProps={{ shrink: true }}
                                label="Chemical Charging Record Number"
                                name="chemicalChargingRecordNumber"
                                value={values.chemicalChargingRecordNumber}
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
                            error={
                              errors.chemicalChargingRecordReceivedDate &&
                              touched.chemicalChargingRecordReceivedDate
                            }
                            fullWidth
                            helperText={
                              errors.chemicalChargingRecordReceivedDate &&
                              touched.chemicalChargingRecordReceivedDate &&
                              errors.chemicalChargingRecordReceivedDate
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Chemical Charging Record Received Date"
                            name="chemicalChargingRecordReceivedDate"
                            onChange={handleChange}
                            type="date"
                            value={values.chemicalChargingRecordReceivedDate}
                          />
                        </Grid>
                      </Grid>
                    </Container>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="secondary"
                      onClick={
                        !loading
                          ? () => {
                              toggleAttachCcrChemicalSolutionControlRecordDialog();
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
    showAttachCcrChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  } = qaChemicalSolutionControl;

  return {
    token,
    loading,
    showAttachCcrChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  };
};

const mapActionsToProps = {
  toggleAttachCcrChemicalSolutionControlRecordDialog,
  attachCcrChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AttachCcrChemicalSolutionControlRecordDialog);
