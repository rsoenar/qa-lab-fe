import { Button, ButtonGroup } from "@material-ui/core";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import React, { PureComponent } from "react";
import {
  downloadLaboratoryTestAttachment,
  downloadLaboratoryTestReportDocument,
  downloadLaboratoryTestRequestDocument,
  toggleDownloadDocumentModal,
} from "../../redux/actions";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import { AttachmentOutlined } from "@material-ui/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class DownloadLaboratoryTestDocumentModal extends PureComponent {
  triggerDownloadLaboratoryTestRequestDocument() {
    const { selectedLaboratoryTest, downloadLaboratoryTestRequestDocument } =
      this.props;
    const { requestIds } = selectedLaboratoryTest;

    downloadLaboratoryTestRequestDocument({
      qaLaboratoryTestId: requestIds[requestIds?.length - 1],
    });
  }

  triggerDownloadLaboratoryTestRequestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { requestAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: requestAttachmentFileName });
  }

  triggerDownloadLaboratoryTestReportDocument() {
    const { selectedLaboratoryTest, downloadLaboratoryTestReportDocument } =
      this.props;
    const { reportIds } = selectedLaboratoryTest;

    downloadLaboratoryTestReportDocument({
      qaLaboratoryTestId: reportIds[reportIds?.length - 1],
    });
  }

  triggerDownloadLaboratoryTestReportAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { reportAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: reportAttachmentFileName });
  }

  render() {
    const {
      loading,
      showDownloadDocumentModal,
      selectedLaboratoryTest,
      toggleDownloadDocumentModal,
    } = this.props;
    const {
      requestIds,
      reportIds,
      requesterName,
      requestApproverName,
      requestAttachmentFileName,
      reporterName,
      reportApproverName,
      reportAttachmentFileName,
    } = selectedLaboratoryTest ?? {};

    return (
      <Modal
        backdrop={true}
        className={reporterName ? `modal-form-xl` : `modal-form-l`}
        isOpen={showDownloadDocumentModal}
        toggle={toggleDownloadDocumentModal}
      >
        {showDownloadDocumentModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <ModalHeader>Download Laboratory Test Document</ModalHeader>
            <ModalBody>
              <Row>
                {requesterName ? (
                  <Col>
                    <SizeMe>
                      {({ size }) => (
                        <Document
                          file={`${backEndUrl}/temp/QA Laboratory Test Request ${
                            requestIds[requestIds?.length - 1]
                          }.pdf`}
                          onLoadError={console.error}
                        >
                          <Page
                            pageNumber={1}
                            width={size.width ? size.width : 1}
                          />
                        </Document>
                      )}
                    </SizeMe>
                  </Col>
                ) : null}
                {reporterName ? (
                  <Col>
                    <SizeMe>
                      {({ size }) => (
                        <Document
                          file={`${backEndUrl}/temp/QA Laboratory Test Report ${
                            reportIds[reportIds?.length - 1]
                          }.pdf`}
                        >
                          <Page
                            pageNumber={1}
                            width={size.width ? size.width : 1}
                          />
                        </Document>
                      )}
                    </SizeMe>
                  </Col>
                ) : null}
              </Row>
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
                        toggleDownloadDocumentModal({});
                      }
                    : null
                }
                type="button"
                variant="contained"
              >
                <LoadingSpinner />
                <span className="label">Close</span>
              </Button>
              <ButtonGroup>
                {requestApproverName ? (
                  <Button
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    color="primary"
                    onClick={
                      !loading
                        ? () => {
                            this.triggerDownloadLaboratoryTestRequestDocument();
                          }
                        : null
                    }
                    type="button"
                    variant="contained"
                  >
                    <LoadingSpinner />
                    <span className="label">
                      Download Laboratory Request PDF
                    </span>
                  </Button>
                ) : null}
                {requestAttachmentFileName && requestApproverName ? (
                  <Button
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    color="primary"
                    onClick={
                      !loading
                        ? () => {
                            this.triggerDownloadLaboratoryTestRequestAttachment();
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
              </ButtonGroup>
              {reportApproverName ? (
                <ButtonGroup>
                  {reportApproverName ? (
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="primary"
                      onClick={
                        !loading
                          ? () => {
                              this.triggerDownloadLaboratoryTestReportDocument();
                            }
                          : null
                      }
                      type="button"
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">
                        Download Laboratory Report PDF
                      </span>
                    </Button>
                  ) : null}
                  {reportAttachmentFileName && reportApproverName ? (
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="primary"
                      onClick={
                        !loading
                          ? () => {
                              this.triggerDownloadLaboratoryTestReportAttachment();
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
                </ButtonGroup>
              ) : null}
            </ModalFooter>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, showDownloadDocumentModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showDownloadDocumentModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  downloadLaboratoryTestAttachment,
  downloadLaboratoryTestRequestDocument,
  downloadLaboratoryTestReportDocument,
  toggleDownloadDocumentModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DownloadLaboratoryTestDocumentModal);
