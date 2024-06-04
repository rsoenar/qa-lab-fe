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
import { changeProfile, toggleChangeProfileModal } from "../../redux/actions";
import { Button } from "@material-ui/core";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { TextField } from "@material-ui/core";
import { changeProfileFormValidationSchema } from "../../constants/validationSchemas";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

class ProfileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nik: "",
      name: "",
      organization: "",
      iaeEmail: "",
      phoneNo: "",
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const { token, showChangeProfileModal } = this.props;
    const { nik, name, organization, iaeEmail, phoneNo } = jwt_decode(token);
    console.log(jwt_decode(token));

    if (
      showChangeProfileModal !== prevProps.showChangeProfileModal &&
      showChangeProfileModal
    ) {
      this.setState({
        nik: nik,
        name: name,
        organization: organization,
        iaeEmail: iaeEmail,
        phoneNo: phoneNo,
      });
    }
  }

  triggerChangeProfile = (values) => {
    const { token, loading, changeProfile } = this.props;
    const { id } = jwt_decode(token);
    const { nik, name, organization, iaeEmail, phoneNo } = values;

    if (!loading) {
      changeProfile({ id, nik, name, organization, iaeEmail, phoneNo });
    }
  };

  render() {
    const { loading, showChangeProfileModal, toggleChangeProfileModal } =
      this.props;
    const { nik, name, organization, iaeEmail, phoneNo } = this.state;

    return (
      <Modal
        backdrop={true}
        className={`modal-form-m`}
        isOpen={showChangeProfileModal}
        toggle={toggleChangeProfileModal}
      >
        {showChangeProfileModal ? (
          <React.Fragment>
            <Formik
              initialValues={{
                nik,
                name,
                organization,
                iaeEmail,
                phoneNo,
              }}
              onSubmit={this.triggerChangeProfile}
              validationSchema={changeProfileFormValidationSchema}
            >
              {({ values, touched, errors, handleChange, handleBlur }) => (
                <Form autoComplete="off">
                  <ModalHeader>Profile</ModalHeader>
                  <ModalBody>
                    <Container>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.nik && touched.nik}
                            fullWidth
                            helperText={errors.nik && touched.nik && errors.nik}
                            InputLabelProps={{ shrink: true }}
                            label="NIK"
                            name="nik"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.nik}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.name && touched.name}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            helperText={
                              errors.name && touched.name && errors.name
                            }
                            label="Full Name"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.name}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.organization && touched.organization}
                            fullWidth
                            helperText={
                              errors.organization &&
                              touched.organization &&
                              errors.organization
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Organization Code"
                            name="organization"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="XX0000"
                            type="text"
                            value={values.organization}
                          />
                        </Col>
                      </Row>
                      <Row xs="8" className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.iaeEmail && touched.iaeEmail}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            helperText={
                              errors.iaeEmail &&
                              touched.iaeEmail &&
                              errors.iaeEmail
                            }
                            label="Email"
                            name="iaeEmail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.iaeEmail}
                          />
                        </Col>
                        <Col xs="4" className="pt-4">
                          @indonesian-aerospace.com
                        </Col>
                      </Row>
                      <Row className="mb-4 pb-4 mt-4 pt-4">
                        <Col>
                          <TextField
                            error={errors.phoneNo && touched.phoneNo}
                            fullWidth
                            helperText={
                              errors.phoneNo &&
                              touched.phoneNo &&
                              errors.phoneNo
                            }
                            InputLabelProps={{ shrink: true }}
                            label="Phone Number"
                            name="phoneNo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="XXXX"
                            type="text"
                            value={values.phoneNo}
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
                              toggleChangeProfileModal();
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
  const { token, loading, showChangeProfileModal } = auth;
  return {
    token,
    loading,
    showChangeProfileModal,
  };
};
const mapActionsToProps = {
  toggleChangeProfileModal,
  changeProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(ProfileModal);
