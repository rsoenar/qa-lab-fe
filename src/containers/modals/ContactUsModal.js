import {
  Business as BusinessIcon,
  Email as EmailIcon,
  Face as FaceIcon,
  Phone as PhoneIcon,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import React, { PureComponent } from 'react';
import {
  laboratoryTestContact,
  softwareProgrammingContact,
} from '../../constants/contacts';
import { connect } from 'react-redux';
import { toggleContactUsModal } from '../../redux/actions';

class ContactUsModal extends PureComponent {
  render() {
    const { showContactUsModal, toggleContactUsModal } = this.props;

    return (
      <Modal
        backdrop={true}
        className={`modal-form-l`}
        isOpen={showContactUsModal}
        toggle={toggleContactUsModal}
      >
        {showContactUsModal ? (
          <React.Fragment>
            <ModalHeader>Contact Us</ModalHeader>
            <ModalBody>
              <Container>
                <Row>
                  <Col>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 18,
                        justifyContent: 'center',
                        textDecorationLine: 'underline',
                        textTransform: 'capitalize',
                      }}
                    >
                      {`${laboratoryTestContact.role}`}
                    </Row>
                    <Row
                      className="mt-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <FaceIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${laboratoryTestContact.name} | ${laboratoryTestContact.nik}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <BusinessIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${laboratoryTestContact.organizationUnit}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <PhoneIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${laboratoryTestContact.phoneNo}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <EmailIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      <span>{`${laboratoryTestContact.email}`}</span>
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 18,
                        justifyContent: 'center',
                        textDecorationLine: 'underline',
                      }}
                    >
                      {`${softwareProgrammingContact.role}`}
                    </Row>
                    <Row
                      className="mt-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <FaceIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${softwareProgrammingContact.name} | ${softwareProgrammingContact.nik}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <BusinessIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${softwareProgrammingContact.organizationUnit}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <PhoneIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      {`${softwareProgrammingContact.phoneNo}`}
                    </Row>
                    <Row
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <EmailIcon />
                    </Row>
                    <Row
                      className="mb-4"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 16,
                        justifyContent: 'center',
                      }}
                    >
                      <span>{`${softwareProgrammingContact.email}`}</span>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                className={`btn-shadow btn-multiple-state`}
                color="secondary"
                onClick={toggleContactUsModal}
                type="button"
                variant="contained"
              >
                <span className="label">Close</span>
              </Button>
            </ModalFooter>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { showContactUsModal } = auth;

  return {
    showContactUsModal,
  };
};

const mapActionsToProps = {
  toggleContactUsModal,
};

export default connect(mapStateToProps, mapActionsToProps)(ContactUsModal);
