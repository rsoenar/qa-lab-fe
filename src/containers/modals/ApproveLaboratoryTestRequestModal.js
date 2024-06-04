import { Document, Page, pdfjs } from "react-pdf";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { PureComponent } from "react";
import {
  approveLaboratoryTestRequest,
  downloadLaboratoryTestAttachment,
  toggleApproveRequestModal,
} from "../../redux/actions";
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { AttachmentOutlined } from "@material-ui/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class ApproveLaboratoryTestRequestModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
    };
  }

  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { requestAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: requestAttachmentFileName });
  }

  triggerApproveLaboratoryTestRequest = () => {
    const {
      token,
      loading,
      selectedLaboratoryTest,
      approveLaboratoryTestRequest,
    } = this.props;
    const userId = jwt_decode(token).id;
    const { id } = selectedLaboratoryTest;

    if (!loading) {
      approveLaboratoryTestRequest(id, { requestApprover: userId });
    }
  };

  render() {
    const {
      loading,
      showApproveRequestModal,
      selectedLaboratoryTest,
      toggleApproveRequestModal,
    } = this.props;
    const { pageNumber } = this.state;
    const { requestIds, requestAttachmentFileName } =
      selectedLaboratoryTest ?? {};

    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showApproveRequestModal}
        toggle={toggleApproveRequestModal}
      >
        {showApproveRequestModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <ModalHeader>Approve Laboratory Test Request</ModalHeader>
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
                        pageNumber={pageNumber}
                        width={size.width ? size.width : 1}
                      />
                    </Document>
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
                        toggleApproveRequestModal({});
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
                className={`btn-shadow btn-multiple-state ml-1 ${
                  loading ? "show-spinner" : ""
                }`}
                color="primary"
                onClick={
                  !loading
                    ? () => {
                        this.triggerApproveLaboratoryTestRequest();
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
  const { loading, showApproveRequestModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showApproveRequestModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  toggleApproveRequestModal,
  downloadLaboratoryTestAttachment,
  approveLaboratoryTestRequest,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ApproveLaboratoryTestRequestModal);
