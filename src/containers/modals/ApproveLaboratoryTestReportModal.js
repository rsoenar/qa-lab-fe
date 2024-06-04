import { Document, Page, pdfjs } from "react-pdf";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { PureComponent } from "react";
import {
  approveLaboratoryTestReport,
  downloadLaboratoryTestAttachment,
  toggleApproveReportModal,
} from "../../redux/actions";
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { AttachmentOutlined } from "@material-ui/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class ApproveLaboratoryTestReportModal extends PureComponent {
  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { reportAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: reportAttachmentFileName });
  }

  triggerApproveLaboratoryTestReport = () => {
    const {
      token,
      loading,
      selectedLaboratoryTest,
      approveLaboratoryTestReport,
    } = this.props;
    const userId = jwt_decode(token).id;
    const { id } = selectedLaboratoryTest;

    if (!loading) {
      approveLaboratoryTestReport(id, { reportApprover: userId });
    }
  };

  render() {
    const {
      loading,
      showApproveReportModal,
      selectedLaboratoryTest,
      toggleApproveReportModal,
    } = this.props;
    const { reportIds, reportAttachmentFileName } =
      selectedLaboratoryTest ?? {};

    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showApproveReportModal}
        toggle={toggleApproveReportModal}
      >
        {showApproveReportModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <ModalHeader>Approve Laboratory Test Report</ModalHeader>
            <ModalBody>
              <SizeMe>
                {({ size }) => (
                  <Document
                    file={`${backEndUrl}/temp/QA Laboratory Test Report ${
                      reportIds[reportIds?.length - 1]
                    }.pdf`}
                  >
                    <Page pageNumber={1} width={size.width ? size.width : 1} />
                  </Document>
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
                        toggleApproveReportModal({});
                      }
                    : null
                }
                type="button"
                variant="contained"
              >
                <LoadingSpinner />
                <span className="label">Cancel</span>
              </Button>
              {reportAttachmentFileName ? (
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
                className={`btn-shadow btn-multiple-state ml-1 ${
                  loading ? "show-spinner" : ""
                }`}
                color="primary"
                onClick={
                  !loading
                    ? () => {
                        this.triggerApproveLaboratoryTestReport();
                      }
                    : null
                }
                type="button"
                variant="contained"
              >
                <LoadingSpinner />
                <span className="label">Approve</span>
              </Button>
            </ModalFooter>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, showApproveReportModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showApproveReportModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  downloadLaboratoryTestAttachment,
  approveLaboratoryTestReport,
  toggleApproveReportModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ApproveLaboratoryTestReportModal);
