import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import { changePassword, toggleChangePasswordModal } from "../../redux/actions";
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { TextField } from "@material-ui/core";
import { changePasswordFormValidationSchema } from "../../constants/validationSchemas";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { toastNewPasswordsNotMatched } from "../../components/Toasts";

class ChangePasswordModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  triggerChangePassword = (values) => {
    const { token, loading, changePassword } = this.props;
    const { id } = jwt_decode(token);
    const { newPassword, confirmNewPassword } = values;

    if (!loading) {
      if (newPassword !== confirmNewPassword) {
        return toastNewPasswordsNotMatched();
      }
      changePassword({ id, password: newPassword });
    }
  };

  render() {
    const { loading, showChangePasswordModal, toggleChangePasswordModal } =
      this.props;
    const { newPassword, confirmNewPassword } = this.state;

    return (
      <Modal
        backdrop={true}
        className={`modal-form-m`}
        isOpen={showChangePasswordModal}
        toggle={toggleChangePasswordModal}
      >
        {showChangePasswordModal ? (
          <React.Fragment>
            <Formik
              initialValues={{
                newPassword,
                confirmNewPassword,
              }}
              onSubmit={this.triggerChangePassword}
              validationSchema={changePasswordFormValidationSchema}
            >
              {({ values, touched, errors, handleChange, handleBlur }) => (
                <Form autoComplete="off">
                  <ModalHeader>Change Password</ModalHeader>
                  <ModalBody>
                    <Container>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.newPassword && touched.newPassword}
                            fullWidth
                            helperText={
                              errors.newPassword &&
                              touched.newPassword &&
                              errors.newPassword
                            }
                            InputLabelProps={{ shrink: true }}
                            label="New Password"
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.newPassword}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={
                              errors.confirmNewPassword &&
                              touched.confirmNewPassword
                            }
                            fullWidth
                            helperText={
                              errors.confirmNewPassword &&
                              touched.confirmNewPassword &&
                              errors.confirmNewPassword
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.confirmNewPassword}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className={`btn-shadow btn-multiple-state`}
                      color="secondary"
                      onClick={
                        !loading
                          ? () => {
                              toggleChangePasswordModal();
                            }
                          : null
                      }
                      type="button"
                      variant="contained"
                    >
                      <span className="label">Cancel</span>
                    </Button>
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "show-spinner" : ""
                      }`}
                      color="primary"
                      type={loading ? "button" : "submit"}
                      variant="contained"
                    >
                      <LoadingSpinner />
                      <span className="label">Save</span>
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

const mapStateToProps = ({ auth }) => {
  const { token, loading, showChangePasswordModal } = auth;

  return {
    token,
    loading,
    showChangePasswordModal,
  };
};

const mapActionsToProps = {
  toggleChangePasswordModal,
  changePassword,
};

export default connect(mapStateToProps, mapActionsToProps)(ChangePasswordModal);
