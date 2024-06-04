import React, { PureComponent, Fragment, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { registerUser, toggleContactUsModal } from "../../redux/actions";
import ContactUsModal from "../../containers/modals/ContactUsModal";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { registerUserFormValidationSchema } from "../../constants/validationSchemas";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      registerNik: "",
      registerPassword: "",
      registerConfirmPassword: "",
    };
  }

  triggerRegisterUser = (values) => {
    const { history, loading, registerUser } = this.props;
    const { registerNik, registerPassword, registerConfirmPassword } = values;

    if (
      !loading &&
      registerNik !== "" &&
      registerPassword !== "" &&
      registerConfirmPassword !== ""
    ) {
      registerUser(
        {
          nik: String(registerNik).replace("\t", ""),
          username: String(registerNik).replace("\t", ""),
          password: String(registerPassword).replace("\t", ""),
        },
        history
      );
    }
  };

  render() {
    const { loading, toggleContactUsModal } = this.props;
    const { registerNik, registerPassword, registerConfirmPassword } =
      this.state;

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <Row className="h-100">
            <Col xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side" />
                <div className="form-side">
                  <p className="text-white h2">
                    Please register using your actual credentials
                  </p>
                  <CardTitle className="text-white mb-4">Register</CardTitle>
                  <Formik
                    initialValues={{
                      registerNik,
                      registerPassword,
                      registerConfirmPassword,
                    }}
                    onSubmit={this.triggerRegisterUser}
                    validationSchema={registerUserFormValidationSchema}
                  >
                    {({ values, errors, touched, handleChange }) => (
                      <Form
                        autoComplete="off"
                        className="av-tooltip tooltip-label-bottom"
                      >
                        <TextField
                          autocomplete="new-password"
                          className="input mb-5"
                          error={errors.registerNik && touched.registerNik}
                          helperText={
                            errors.registerNik &&
                            touched.registerNik &&
                            errors.registerNik
                          }
                          InputLabelProps={{ shrink: true }}
                          label="NIK"
                          name="registerNik"
                          onChange={handleChange}
                          type="text"
                          value={values.registerNik}
                          variant="filled"
                        />
                        <TextField
                          autocomplete="new-password"
                          className="input mb-5"
                          error={
                            errors.registerPassword && touched.registerPassword
                          }
                          helperText={
                            errors.registerPassword &&
                            touched.registerPassword &&
                            errors.registerPassword
                          }
                          InputLabelProps={{ shrink: true }}
                          label="Password"
                          name="registerPassword"
                          onChange={handleChange}
                          type="password"
                          value={values.registerPassword}
                          variant="filled"
                        />
                        <TextField
                          autocomplete="new-password"
                          className="input mb-5"
                          error={
                            errors.registerConfirmPassword &&
                            touched.registerConfirmPassword
                          }
                          helperText={
                            errors.registerConfirmPassword &&
                            touched.registerConfirmPassword &&
                            errors.registerConfirmPassword
                          }
                          InputLabelProps={{ shrink: true }}
                          label="Confirm Password"
                          name="registerConfirmPassword"
                          onChange={handleChange}
                          type="password"
                          value={values.registerConfirmPassword}
                          variant="filled"
                        />
                        <div className="d-flex justify-content-between align-items-center">
                          <NavLink className="text-white" to={`/auth/login`}>
                            Already have an account? Login here
                          </NavLink>
                          <Button
                            className={`btn-multiple-state ${
                              loading ? "show-spinner" : ""
                            }`}
                            color="primary"
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            <LoadingSpinner />
                            <span className="label">REGISTER</span>
                          </Button>
                        </div>
                        <div>
                          <Button
                            color="secondary"
                            onClick={
                              !loading
                                ? () => {
                                    toggleContactUsModal();
                                  }
                                : null
                            }
                            style={{
                              display: "inline-block",
                              minHeight: 0,
                              minWidth: 0,
                              padding: 0,
                            }}
                          >
                            Contact Us
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Card>
            </Col>
          </Row>
        </Fragment>
        <ContactUsModal />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;

  return { loading };
};
const mapActionsToProps = { toggleContactUsModal, registerUser };

export default connect(mapStateToProps, mapActionsToProps)(Register);
