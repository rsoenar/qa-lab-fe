import { Document, Page, pdfjs } from "react-pdf";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { PureComponent } from "react";
import {
  deleteLaboratoryTestRequest,
  downloadLaboratoryTestAttachment,
  toggleDeleteRequestModal,
} from "../../redux/actions";
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import { AttachmentOutlined } from "@material-ui/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class DeleteLaboratoryTestRequestModal extends PureComponent {
  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { requestAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: requestAttachmentFileName });
  }

  triggerDeleteLaboratoryTestRequest = () => {
    const { loading, selectedLaboratoryTest, deleteLaboratoryTestRequest } =
      this.props;
    const { id } = selectedLaboratoryTest;

    if (!loading) {
      deleteLaboratoryTestRequest(id);
    }
  };

  render() {
    const {
      loading,
      showDeleteRequestModal,
      selectedLaboratoryTest,
      toggleDeleteRequestModal,
    } = this.props;
    const { requestIds, requestAttachmentFileName } =
      selectedLaboratoryTest ?? {};

    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showDeleteRequestModal}
        toggle={toggleDeleteRequestModal}
      >
        {showDeleteRequestModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <ModalHeader>Delete Laboratory Test Request</ModalHeader>
            <ModalBody>
              <SizeMe>
                {({ size }) => (
                  <Document
                    file={`${backEndUrl}/temp/QA Laboratory Test Request ${
                      requestIds[requestIds?.length - 1]
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
                        toggleDeleteRequestModal({});
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
                onClick={
                  !loading
                    ? () => {
                        this.triggerDeleteLaboratoryTestRequest();
                      }
                    : null
                }
                type="button"
                variant="contained"
              >
                <LoadingSpinner />
                <span className="label">Delete</span>
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
  const { loading, showDeleteRequestModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showDeleteRequestModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  downloadLaboratoryTestAttachment,
  deleteLaboratoryTestRequest,
  toggleDeleteRequestModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteLaboratoryTestRequestModal);
