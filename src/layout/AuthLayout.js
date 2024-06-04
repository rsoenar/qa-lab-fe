import React, { PureComponent, Fragment } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import { AuthBackground } from "../components/Backgrounds";
import { dark, light } from "../constants/styles";

class AuthLayout extends PureComponent {
  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    const { children } = this.props;
    const appliedTheme = createMuiTheme(true ? light : dark);

    return (
      <Fragment>
        <ThemeProvider theme={appliedTheme}>
          <div className="fixed-background" hidden />
          <AuthBackground />
          <main>
            <div className="container">{children}</div>
          </main>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default AuthLayout;
