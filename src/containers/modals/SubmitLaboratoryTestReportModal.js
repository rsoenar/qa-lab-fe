import { Button, Input, TextField } from "@material-ui/core";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { EditorState, convertToRaw } from "draft-js";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import {
  submitLaboratoryTestReport,
  toggleSubmitReportModal,
} from "../../redux/actions";
import { Editor } from "react-draft-wysiwyg";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { laboratoryTestReportFormValidationSchema } from "../../constants/validationSchemas";
import moment from "moment";
import { stateToHTML } from "draft-js-export-html";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class SubmitLaboratoryTestReportModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reportDate: "",
      reportNumber: "",
      selectedFile: null,
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const { showSubmitReportModal, selectedLaboratoryTest } = this.props;

    if (
      showSubmitReportModal !== prevProps.showSubmitReportModal &&
      showSubmitReportModal
    ) {
      const { tempReportNumber } = selectedLaboratoryTest;
      const date = moment().format("YYYY-MM-DD");

      this.setState({
        reportDate: date,
        reportNumber: tempReportNumber,
        selectedFile: null,
        editorState: EditorState.createEmpty(),
      });
    }
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onTestResultChange = (editorState) => {
    this.setState({ editorState });
  };

  triggerSubmitLaboratoryTestReport = (values) => {
    const {
      token,
      loading,
      selectedLaboratoryTest,
      submitLaboratoryTestReport,
    } = this.props;
    const { selectedFile, editorState } = this.state;
    const userId = jwt_decode(token).id;
    const { id } = selectedLaboratoryTest;
    const { reportDate, reportNumber } = values;
    let laboratoryTest = new FormData();

    if (!loading) {
      laboratoryTest.append("reporter", userId);
      laboratoryTest.append("reportDate", reportDate);
      laboratoryTest.append("reportNumber", reportNumber?.trim());
      laboratoryTest.append(
        "testResult",
        JSON.stringify(convertToRaw(editorState?.getCurrentContent()))
      );
      laboratoryTest.append(
        "testResultHtml",
        stateToHTML(editorState?.getCurrentContent())
      );
      if (selectedFile) {
        laboratoryTest.append("file", selectedFile);
      }
      submitLaboratoryTestReport(id, laboratoryTest);
    }
  };

  render() {
    const {
      loading,
      showSubmitReportModal,
      selectedLaboratoryTest,
      toggleSubmitReportModal,
    } = this.props;
    const { reportDate, reportNumber, editorState } = this.state;
    const { requestIds } = selectedLaboratoryTest ?? {};
    let laboratoryTestReportFormInitialValues = {};

    if (showSubmitReportModal) {
      laboratoryTestReportFormInitialValues = {
        reportDate,
        reportNumber,
      };
    }
    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showSubmitReportModal}
        toggle={toggleSubmitReportModal}
      >
        {showSubmitReportModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <Formik
              initialValues={laboratoryTestReportFormInitialValues}
              onSubmit={this.triggerSubmitLaboratoryTestReport}
              validationSchema={laboratoryTestReportFormValidationSchema}
            >
              {({ values, touched, errors, handleChange }) => (
                <Form autoComplete="off">
                  <ModalHeader>Submit Laboratory Test Report</ModalHeader>
                  <ModalBody>
                    <SizeMe>
                      {({ size }) => (
                        <div>
                          <Document
                            file={`${backEndUrl}/temp/QA Laboratory Test Request ${
                              requestIds[requestIds?.length - 1]
                            }.pdf`}
                          >
                            <Page
                              pageNumber={1}
                              width={size.width ? size.width : 1}
                            />
                          </Document>
                          <div
                            style={{
                              border: "2.65px solid",
                              borderColor: "#000000",
                              marginLeft: "65px",
                              marginRight: "50px",
                              padding: "10px",
                            }}
                          >
                            <Row
                              style={{
                                paddingBottom: "20px",
                              }}
                            >
                              <Col>
                                <div
                                  style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  Report Date:
                                </div>
                                <TextField
                                  InputLabelProps={{ shrink: false }}
                                  fullWidth
                                  helperText={
                                    errors.reportDate &&
                                    touched.reportDate &&
                                    errors.reportDate
                                  }
                                  name="reportDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.reportDate}
                                  error={
                                    errors.reportDate && touched.reportDate
                                  }
                                />
                              </Col>
                              <Col>
                                <Row>
                                  <Col>
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        paddingBottom: "10px",
                                        paddingTop: "10px",
                                        textDecorationLine: "underline",
                                      }}
                                    >
                                      Report Number:
                                    </div>
                                    <TextField
                                      disabled
                                      error={
                                        errors.reportNumber &&
                                        touched.reportNumber
                                      }
                                      fullWidth
                                      helperText={
                                        errors.reportNumber &&
                                        touched.reportNumber &&
                                        errors.reportNumber
                                      }
                                      InputLabelProps={{ shrink: false }}
                                      name="reportNumber"
                                      onChange={handleChange}
                                      type="text"
                                      value={values.reportNumber}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row
                              style={{
                                paddingBottom: "20px",
                              }}
                            >
                              <Col>
                                <div
                                  style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    paddingRight: "10px",
                                    paddingTop: "10px",
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  Attachment File | Uploaded :
                                </div>
                                <Input
                                  disableUnderline
                                  label="Attachment File"
                                  onChange={this.onFileChange}
                                  style={{
                                    paddingBottom: "20px",
                                  }}
                                  type="file"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div
                                  style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    paddingBottom: "10px",
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  Description of Test Results:
                                </div>
                                <Editor
                                  editorState={editorState}
                                  onEditorStateChange={this.onTestResultChange}
                                  toolbar={{
                                    options: ["inline", "list", "history"],
                                  }}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      )}
                    </SizeMe>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="secondary"
                      onClick={
                        !loading
                          ? () => {
                              toggleSubmitReportModal({});
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
                      type={!loading ? "submit" : "button"}
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Submit</span>
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, showSubmitReportModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showSubmitReportModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  submitLaboratoryTestReport,
  toggleSubmitReportModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SubmitLaboratoryTestReportModal);
