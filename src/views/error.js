import React, { PureComponent, Fragment, Suspense } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { Card, CardTitle, Col, Row } from 'reactstrap';
import { AuthBackground } from '../components/Backgrounds';
import { dark, light } from '../constants/styles';

class Error extends PureComponent {
  componentDidMount() {
    document.body.classList.add('background');
  }

  componentWillUnmount() {
    document.body.classList.remove('background');
  }

  goBackHome = () => {
    window.location.href = '/app';
  };

  render() {
    const appliedTheme = createMuiTheme(true ? light : dark);

    return (
      <Suspense fallback={<div className="loading" />}>
        <Fragment>
          <ThemeProvider theme={appliedTheme}>
            <AuthBackground />
            <main>
              <div className="container">
                <Row className="h-100">
                  <Col xxs="12" md="10" className="mx-auto my-auto">
                    <Card className="auth-card">
                      <div className="position-relative image-side" />
                      <div className="form-side">
                        <p className="text-white h2">Error</p>
                        <CardTitle className="text-white mb-5">
                          Ooops... looks like an error occurred!
                        </CardTitle>
                        <p className="text-white text-small mt-5 mb-0">
                          Error code
                        </p>
                        <p className="display-1 text-white font-weight-bold mb-5">
                          404
                        </p>
                        <Button
                          className={`btn-multiple-state`}
                          color="primary"
                          onClick={this.goBackHome}
                          size="large"
                          type="button"
                          variant="contained"
                        >
                          <span className="label">GO BACK HOME</span>
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </main>
          </ThemeProvider>
        </Fragment>
      </Suspense>
    );
  }
}

export default Error;
