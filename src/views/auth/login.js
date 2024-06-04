import React, { PureComponent, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { Card, CardTitle, Col, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { loginUser, toggleContactUsModal } from "../../redux/actions";
import ContactUsModal from "../../containers/modals/ContactUsModal";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { loginUserFormValidationSchema } from "../../constants/validationSchemas";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
    };
  }

  triggerLoginUser = (values) => {
    const { history, loading, loginUser } = this.props;
    const { loginUsername, loginPassword } = values;

    if (!loading && loginUsername !== "" && loginPassword !== "") {
      loginUser({ username: loginUsername, password: loginPassword }, history);
    }
  };

  render() {
    const { loading, toggleContactUsModal } = this.props;
    const { loginUsername, loginPassword } = this.state;

    return (
      <Suspense fallback={<div className="loading" />}>
        <>
          <Row className="h-100">
            <Col xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side" />
                <div className="form-side">
                  <p className="text-white h2">
                    Please login using your registered username &amp; password
                  </p>
                  <CardTitle className="text-white mb-4">Login</CardTitle>
                  <Formik
                    initialValues={{ loginUsername, loginPassword }}
                    onSubmit={this.triggerLoginUser}
                    validationSchema={loginUserFormValidationSchema}
                  >
                    {({ values, touched, errors, handleChange }) => (
                      <Form
                        autoComplete="off"
                        className="av-tooltip tooltip-label-bottom"
                      >
                        <TextField
                          autocomplete="new-password"
                          className="input mb-5"
                          error={errors.loginUsername && touched.loginUsername}
                          helperText={
                            errors.loginUsername &&
                            touched.loginUsername &&
                            errors.loginUsername
                          }
                          InputLabelProps={{ shrink: true }}
                          label="Username / NIK"
                          name="loginUsername"
                          onChange={handleChange}
                          type="text"
                          value={values.loginUsername}
                          variant="filled"
                        />
                        <TextField
                          autocomplete="new-password"
                          className="input mb-5"
                          error={errors.loginPassword && touched.loginPassword}
                          helperText={
                            errors.loginPassword &&
                            touched.loginPassword &&
                            errors.loginPassword
                          }
                          InputLabelProps={{ shrink: true }}
                          label="Password"
                          name="loginPassword"
                          onChange={handleChange}
                          type="password"
                          value={values.loginPassword}
                          variant="filled"
                        />
                        <div className="d-flex justify-content-between align-items-center ">
                          <NavLink className="text-white" to="/auth/register">
                            Don't have an account? Register here
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
                            <span className="label">LOGIN</span>
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
        </>
        <ContactUsModal />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;

  return { loading };
};
const mapActionsToProps = { toggleContactUsModal, loginUser };

export default connect(mapStateToProps, mapActionsToProps)(Login);
