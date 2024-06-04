import { Button, IconButton, Input, TextField } from "@material-ui/core";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Form, Formik } from "formik";
import React, { PureComponent, Fragment } from "react";
import {
  downloadLaboratoryTestAttachment,
  editLaboratoryTestReport,
  toggleEditReportModal,
} from "../../redux/actions";
import { DeleteOutline as DeleteOutlineIcon } from "@material-ui/icons";
import { Editor } from "react-draft-wysiwyg";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { laboratoryTestReportFormValidationSchema } from "../../constants/validationSchemas";
import { stateToHTML } from "draft-js-export-html";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class EditLaboratoryTestReportModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reportDate: "",
      reportNumber: "",
      reportAttachmentFileName: null,
      reportAttachmentFileOriginalName: null,
      selectedFile: null,
      deleteAttachment: false,
      defaultEditorState: EditorState.createEmpty(),
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const { showEditReportModal, selectedLaboratoryTest } = this.props;

    if (
      showEditReportModal !== prevProps.showEditReportModal &&
      showEditReportModal
    ) {
      const {
        reportDate,
        reportNumber,
        reportAttachmentFileName,
        reportAttachmentFileOriginalName,
        testResult,
      } = selectedLaboratoryTest;

      this.setState({
        reportDate: reportDate?.substring(0, 10),
        reportNumber,
        reportAttachmentFileName,
        reportAttachmentFileOriginalName,
        selectedFile: null,
        deleteAttachment: false,
        defaultEditorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(testResult))
        ),
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(testResult))
        ),
      });
    }
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      deleteAttachment: false,
    });
  };

  deleteAttachment = () => {
    this.setState({
      deleteAttachment: true,
    });
  };

  onTestResultChange = (editorState) => {
    this.setState({ editorState });
  };

  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { reportAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: reportAttachmentFileName });
  }

  triggerEditLaboratoryTestReport = (values) => {
    const { token, loading, selectedLaboratoryTest, editLaboratoryTestReport } =
      this.props;
    const { selectedFile, deleteAttachment, editorState } = this.state;
    const userId = jwt_decode(token).id;
    const { id } = selectedLaboratoryTest;
    const { reportDate, reportNumber } = values;
    let laboratoryTest = new FormData();

    if (!loading) {
      laboratoryTest.append("reporter", userId);
      laboratoryTest.append("reportDate", reportDate);
      laboratoryTest.append("reportNumber", reportNumber);
      laboratoryTest.append(
        "testResult",
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
      laboratoryTest.append(
        "testResultHtml",
        stateToHTML(editorState.getCurrentContent())
      );
      if (selectedFile) {
        laboratoryTest.append("file", selectedFile);
      }
      if (deleteAttachment) {
        laboratoryTest.append("file", null);
      }
      editLaboratoryTestReport(id, laboratoryTest);
    }
  };

  render() {
    const {
      loading,
      showEditReportModal,
      selectedLaboratoryTest,
      toggleEditReportModal,
    } = this.props;
    const {
      reportNumber,
      reportDate,
      reportAttachmentFileOriginalName,
      deleteAttachment,
      defaultEditorState,
      editorState,
    } = this.state;
    const { requestIds } = selectedLaboratoryTest ?? {};
    let laboratoryTestReportFormInitialValues = {};

    if (showEditReportModal) {
      laboratoryTestReportFormInitialValues = {
        reportNumber,
        reportDate,
      };
    }
    return (
      <Fragment>
        <Modal
          backdrop={true}
          isOpen={showEditReportModal}
          toggle={toggleEditReportModal}
          style={{
            maxWidth: "1080px",
          }}
        >
          <Formik
            initialValues={laboratoryTestReportFormInitialValues}
            onSubmit={this.triggerEditLaboratoryTestReport}
            validationSchema={laboratoryTestReportFormValidationSchema}
          >
            {({ values, touched, errors, handleChange }) => (
              <Form autoComplete="off">
                <ModalHeader>Edit Laboratory Test Report</ModalHeader>
                <ModalBody>
                  {showEditReportModal ? (
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
                                  error={
                                    errors.reportDate && touched.reportDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.reportDate &&
                                    touched.reportDate &&
                                    errors.reportDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="reportDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.reportDate}
                                />
                              </Col>
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
                                    errors.reportNumber && touched.reportNumber
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
                            <Row>
                              <Col>
                                {reportAttachmentFileOriginalName &&
                                !deleteAttachment ? (
                                  <div>
                                    <span
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        paddingRight: "10px",
                                        paddingTop: "10px",
                                        textDecorationLine: "underline",
                                      }}
                                    >
                                      Attachment File | Uploaded :
                                    </span>{" "}
                                    <Button
                                      onClick={
                                        !loading
                                          ? () => {
                                              this.triggerDownloadLaboratoryTestAttachment();
                                            }
                                          : null
                                      }
                                      size="small"
                                      variant="outlined"
                                    >
                                      {reportAttachmentFileOriginalName}
                                    </Button>
                                    <IconButton
                                      aria-label="delete"
                                      onClick={this.deleteAttachment}
                                    >
                                      <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                  </div>
                                ) : (
                                  <div>
                                    <span
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        paddingRight: "10px",
                                        paddingTop: "10px",
                                        textDecorationLine: "underline",
                                      }}
                                    >
                                      Attachment File | Uploaded :
                                    </span>
                                    <label
                                      style={{
                                        fontSize: 18,
                                      }}
                                    >
                                      No File Uploaded
                                    </label>
                                  </div>
                                )}
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
                                    paddingTop: "10px",
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  Description of Test Results:
                                </div>
                                <Editor
                                  defaultEditorState={defaultEditorState}
                                  editorState={editorState}
                                  onEditorStateChange={this.onTestResultChange}
                                  readOnly={false}
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
                  ) : null}
                </ModalBody>
                <ModalFooter>
                  <Button
                    className={`btn-shadow btn-multiple-state ${
                      this.props.loading ? "show-spinner" : ""
                    }`}
                    color="primary"
                    type={!loading ? "submit" : "button"}
                    variant="contained"
                  >
                    <LoadingSpinner />
                    <span className="label">Save</span>
                  </Button>
                  <Button
                    className={`btn-shadow btn-multiple-state ${
                      this.props.loading ? "show-spinner" : ""
                    }`}
                    color="secondary"
                    onClick={
                      !loading
                        ? () => {
                            toggleEditReportModal({});
                          }
                        : null
                    }
                    type="button"
                    variant="contained"
                  >
                    <LoadingSpinner />
                    <span className="label">Cancel</span>
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, showEditReportModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showEditReportModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  toggleEditReportModal,
  downloadLaboratoryTestAttachment,
  editLaboratoryTestReport,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditLaboratoryTestReportModal);
