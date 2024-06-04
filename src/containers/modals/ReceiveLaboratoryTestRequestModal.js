import { Button, TextField } from "@material-ui/core";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import {
  downloadLaboratoryTestAttachment,
  receiveLaboratoryTestRequest,
  toggleReceiveRequestModal,
} from "../../redux/actions";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { laboratoryTestRequestReceiveFormValidationSchema } from "../../constants/validationSchemas";
import moment from "moment";
import {
  toastRequestReceiveDateMustBeBigger,
  toastEstimationCloseDateMustBeBigger,
} from "../../components/Toasts";
import { AttachmentOutlined } from "@material-ui/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class ReceiveLaboratoryTestRequestModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requestDate: "",
      requestReceiveDate: "",
      workdayEstimation: "",
      estimationCloseDate: "",
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const { showReceiveRequestModal, selectedLaboratoryTest } = this.props;

    if (
      showReceiveRequestModal !== prevProps.showReceiveRequestModal &&
      showReceiveRequestModal &&
      selectedLaboratoryTest
    ) {
      const { requestDate } = selectedLaboratoryTest;
      const today = moment().format("YYYY-MM-DD");

      this.setState({
        requestDate: requestDate?.substring(0, 10),
        requestReceiveDate: today,
        workdayEstimation: 0,
        estimationCloseDate: today,
      });
    }
  }

  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { requestAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: requestAttachmentFileName });
  }

  triggerReceiveLaboratoryTestRequest = (values) => {
    const {
      token,
      loading,
      selectedLaboratoryTest,
      receiveLaboratoryTestRequest,
    } = this.props;
    const userId = jwt_decode(token).id;
    const { id } = selectedLaboratoryTest;
    let { requestDate, requestReceiveDate, estimationCloseDate } = values;
    let laboratoryTest = new FormData();

    if (!loading) {
      requestDate = new Date(requestDate);
      requestReceiveDate = new Date(requestReceiveDate);
      estimationCloseDate = new Date(estimationCloseDate);
      if (requestDate > requestReceiveDate) {
        toastRequestReceiveDateMustBeBigger();
      } else if (requestReceiveDate > estimationCloseDate) {
        toastEstimationCloseDateMustBeBigger();
      } else if (
        requestDate <= requestReceiveDate &&
        requestReceiveDate <= estimationCloseDate
      ) {
        laboratoryTest.append("requestReceiver", userId);
        laboratoryTest.append("requestDate", values.requestDate);
        laboratoryTest.append("requestReceiveDate", values.requestReceiveDate);
        laboratoryTest.append(
          "estimationCloseDate",
          values.estimationCloseDate
        );
        receiveLaboratoryTestRequest(id, laboratoryTest);
      }
    }
  };

  render() {
    const {
      loading,
      showReceiveRequestModal,
      selectedLaboratoryTest,
      toggleReceiveRequestModal,
    } = this.props;
    const {
      requestDate,
      requestReceiveDate,
      workdayEstimation,
      estimationCloseDate,
    } = this.state;
    const { requestIds, requestAttachmentFileName } =
      selectedLaboratoryTest ?? {};
    let laboratoryTestRequestReceiveFormInitialValues = {};

    if (showReceiveRequestModal) {
      laboratoryTestRequestReceiveFormInitialValues = {
        requestDate,
        requestReceiveDate,
        workdayEstimation,
        estimationCloseDate,
      };
    }

    return (
      <Modal
        className={`modal-form-l`}
        isOpen={showReceiveRequestModal}
        toggle={toggleReceiveRequestModal}
        backdrop={true}
      >
        {showReceiveRequestModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <Formik
              initialValues={laboratoryTestRequestReceiveFormInitialValues}
              onSubmit={this.triggerReceiveLaboratoryTestRequest}
              validationSchema={
                laboratoryTestRequestReceiveFormValidationSchema
              }
            >
              {({ values, touched, errors, handleChange, setFieldValue }) => (
                <Form autoComplete="off">
                  <ModalHeader>Receive Laboratory Test Request</ModalHeader>
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
                                  Request Date:
                                </div>
                                <TextField
                                  error={
                                    errors.requestDate && touched.requestDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.requestDate &&
                                    touched.requestDate &&
                                    errors.requestDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="requestDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.requestDate}
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
                                  Sample Receive Date:
                                </div>
                                <TextField
                                  error={
                                    errors.requestReceiveDate &&
                                    touched.requestReceiveDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.requestReceiveDate &&
                                    touched.requestReceiveDate &&
                                    errors.requestReceiveDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="requestReceiveDate"
                                  onChange={(event) => {
                                    const requestDate = new Date(
                                      values.requestDate
                                    );
                                    const requestReceiveDate = new Date(
                                      event.target.value
                                    );
                                    const estimationCloseDate = new Date(
                                      values.estimationCloseDate
                                    );
                                    if (
                                      requestReceiveDate >= requestDate &&
                                      estimationCloseDate >= requestReceiveDate
                                    ) {
                                      const workdayEstimation = Math.round(
                                        Math.abs(
                                          (requestReceiveDate -
                                            estimationCloseDate) /
                                            (24 * 60 * 60 * 1000)
                                        )
                                      );
                                      setFieldValue(
                                        "requestReceiveDate",
                                        event.target.value
                                      );
                                      setFieldValue(
                                        "workdayEstimation",
                                        workdayEstimation
                                      );
                                    } else if (
                                      requestReceiveDate >= requestDate &&
                                      estimationCloseDate < requestReceiveDate
                                    ) {
                                      setFieldValue(
                                        "requestReceiveDate",
                                        event.target.value
                                      );
                                      setFieldValue("workdayEstimation", 0);
                                      setFieldValue(
                                        "estimationCloseDate",
                                        event.target.value
                                      );
                                    } else if (
                                      requestDate > requestReceiveDate
                                    ) {
                                      toastRequestReceiveDateMustBeBigger();
                                    }
                                  }}
                                  type="date"
                                  value={values.requestReceiveDate}
                                />
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
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  Workday Estimation:
                                </div>
                                <TextField
                                  error={
                                    errors.workdayEstimation &&
                                    touched.workdayEstimation
                                  }
                                  fullWidth
                                  helperText={
                                    errors.workdayEstimation &&
                                    touched.workdayEstimation &&
                                    errors.workdayEstimation
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  min="1"
                                  name="workdayEstimation"
                                  onChange={(event) => {
                                    const workdayEstimation =
                                      event.target.value;

                                    if (
                                      workdayEstimation >= 0 &&
                                      /^\d+$/.test(workdayEstimation) &&
                                      parseInt(workdayEstimation) < 1000
                                    ) {
                                      const requestReceiveDate = new Date(
                                        values.requestReceiveDate
                                      );
                                      const estimationCloseDate =
                                        requestReceiveDate;
                                      estimationCloseDate.setDate(
                                        estimationCloseDate.getDate() +
                                          parseInt(workdayEstimation)
                                      );
                                      setFieldValue(
                                        "workdayEstimation",
                                        workdayEstimation
                                      );
                                      setFieldValue(
                                        "estimationCloseDate",
                                        estimationCloseDate
                                          .toISOString()
                                          .split("T")[0]
                                      );
                                    }
                                  }}
                                  step="1"
                                  type="number"
                                  value={values.workdayEstimation}
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
                                  Estimation Close Date:
                                </div>
                                <TextField
                                  error={
                                    errors.estimationCloseDate &&
                                    touched.estimationCloseDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.estimationCloseDate &&
                                    touched.estimationCloseDate &&
                                    errors.estimationCloseDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="estimationCloseDate"
                                  onChange={(event) => {
                                    const requestReceiveDate = new Date(
                                      values.requestReceiveDate
                                    );
                                    const estimationCloseDate = new Date(
                                      event.target.value
                                    );
                                    if (
                                      estimationCloseDate >= requestReceiveDate
                                    ) {
                                      const oneDay = 24 * 60 * 60 * 1000;
                                      const workdayEstimation = Math.round(
                                        Math.abs(
                                          (requestReceiveDate -
                                            estimationCloseDate) /
                                            oneDay
                                        )
                                      );
                                      setFieldValue(
                                        "estimationCloseDate",
                                        event.target.value
                                      );
                                      setFieldValue(
                                        "workdayEstimation",
                                        workdayEstimation
                                      );
                                    } else {
                                      toastEstimationCloseDateMustBeBigger();
                                    }
                                  }}
                                  type="date"
                                  value={values.estimationCloseDate}
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
                              toggleReceiveRequestModal({});
                            }
                          : null
                      }
                      type="button"
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Cancel</span>
                    </Button>
                    {requestAttachmentFileName ? (
                      <Button
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        color="primary"
                        onClick={
                          !loading
                            ? () => {
                                this.triggerDownloadLaboratoryTestAttachment();
                              }
                            : null
                        }
                        type="button"
                        variant="contained"
                      >
                        <LoadingSpinner />
                        <span className="label">
                          <AttachmentOutlined />
                        </span>
                      </Button>
                    ) : null}
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="primary"
                      type={!loading ? "submit" : "button"}
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Receive</span>
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
  const { loading, showReceiveRequestModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showReceiveRequestModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  toggleReceiveRequestModal,
  downloadLaboratoryTestAttachment,
  receiveLaboratoryTestRequest,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ReceiveLaboratoryTestRequestModal);
