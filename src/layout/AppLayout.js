import React, { PureComponent } from "react";
import { ThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";
import { createTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import Sidebar from "../containers/navs/Sidebar";
import TopNav from "../containers/navs/Topnav";
import { AppBackground } from "../components/Backgrounds";
import { dark, light } from "../constants/styles";
import { refreshUser } from "../redux/actions";

class AppLayout extends PureComponent {
  render() {
    const { history, children, containerClassnames } = this.props;
    const appliedTheme = createTheme(true ? light : dark);

    return (
      <div id="app-container" className={containerClassnames}>
        <ThemeProvider theme={appliedTheme}>
          <AppBackground />
          <TopNav history={history} />
          <Sidebar />
          <main>
            <div className="container-fluid">{children}</div>
          </main>
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;

  return { containerClassnames };
};

const mapActionToProps = { refreshUser };

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
