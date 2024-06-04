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
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { SizeMe } from "react-sizeme";
import { backEndUrl } from "../../constants/defaultValues";
import { connect } from "react-redux";
import { toggleReportHistoryModal } from "../../redux/actions";
pdfjs.GlobalWorkerOptions.workerSrc = `${backEndUrl}/assets/js/pdf.worker.min.js`;

class LaboratoryTestReportHistoryModal extends PureComponent {
  render() {
    const {
      loading,
      showReportHistoryModal,
      selectedLaboratoryTest,
      toggleReportHistoryModal,
    } = this.props;
    const { reportIds } = selectedLaboratoryTest ?? {};

    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showReportHistoryModal}
        toggle={toggleReportHistoryModal}
      >
        {showReportHistoryModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <ModalHeader>Laboratory Test Report History Archive</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  {reportIds?.map((reportId, i) => {
                    if (i < reportIds?.length - 1) {
                      return (
                        <SizeMe>
                          {({ size }) => (
                            <Document
                              file={
                                `${backEndUrl}/temp/QA Laboratory Test Report ` +
                                reportId +
                                ".pdf"
                              }
                            >
                              <Page
                                pageNumber={1}
                                width={size.width ? size.width : 1}
                              />
                            </Document>
                          )}
                        </SizeMe>
                      );
                    }
                    return null;
                  })}
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                className={`btn-shadow btn-multiple-state`}
                color="secondary"
                onClick={
                  !loading
                    ? () => {
                        toggleReportHistoryModal({});
                      }
                    : null
                }
                type="button"
                variant="contained"
              >
                <LoadingSpinner />
                <span className="label">Close</span>
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
  const { loading, showReportHistoryModal, selectedLaboratoryTest } =
    qaLaboratoryTest;

  return {
    token,
    loading,
    showReportHistoryModal,
    selectedLaboratoryTest,
  };
};

const mapActionsToProps = {
  toggleReportHistoryModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LaboratoryTestReportHistoryModal);
