import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Avatar } from "@material-ui/core";
import { MenuIcon, MobileMenuIcon } from "../../components/svg";
import {
  changeLocale,
  clickOnMobileMenu,
  logoutUser,
  setContainerClassnames,
  toggleChangePasswordModal,
  toggleChangeProfileModal,
} from "../../redux/actions";

import ChangePasswordModal from "../modals/ChangePasswordModal";

import ProfileModal from "../modals/ProfileModal";
import { backEndUrl } from "../../constants/defaultValues";

class TopNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInFullScreen: false,
      nik: "",
      name: "",
      organization: "",
      iaeEmail: "",
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();
    let docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    const { selectedMenuHasSubItems, setContainerClassnames } = this.props;

    e.preventDefault();
    setTimeout(() => {
      let event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      selectedMenuHasSubItems
    );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  static getDerivedStateFromProps(props) {
    const { token } = props;
    const { nik, name, organization, iaeEmail } = jwt_decode(token);

    return {
      nik: nik,
      name: name,
      organization: organization,
      iaeEmail: iaeEmail,
    };
  }

  render() {
    const {
      history,
      containerClassnames,
      menuClickCount,
      token,
      toggleChangeProfileModal,
      toggleChangePasswordModal,
      logoutUser,
    } = this.props;
    const { isInFullScreen, name, nik } = this.state;

    return (
      <div>
        <nav className="navbar fixed-top">
          <div className="d-flex align-items-center navbar-left">
            <NavLink
              to="#"
              className="menu-button d-none d-md-block"
              onClick={(e) =>
                this.menuButtonClick(e, menuClickCount, containerClassnames)
              }
            >
              <MenuIcon />
            </NavLink>
            <NavLink
              to="#"
              className="menu-button-mobile d-xs-block d-sm-block d-md-none"
              onClick={(e) =>
                this.mobileMenuButtonClick(e, containerClassnames)
              }
            >
              <MobileMenuIcon />
            </NavLink>
          </div>
          <div className="navbar-right">
            <div className="header-icons d-inline-block align-middle">
              <button
                className="header-icon btn btn-empty d-none d-sm-inline-block"
                type="button"
                id="fullScreenButton"
                onClick={this.toggleFullScreen}
              >
                {isInFullScreen ? (
                  <i className="simple-icon-size-actual d-block" />
                ) : (
                  <i className="simple-icon-size-fullscreen d-block" />
                )}
              </button>
            </div>
            <div className="user d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="p-0" color="empty">
                  <div>
                    <Row className="align-items-center">
                      <Col xs={{ size: "auto" }}>{name}</Col>
                      <Col xs={{ size: "auto" }}>
                        <Avatar
                          variant="rounded"
                          src={`${backEndUrl}/assets/img/user/portrait/minified/${nik}.jpg`}
                        />
                      </Col>
                    </Row>
                  </div>
                </DropdownToggle>
                <DropdownMenu className="mt-3" right>
                  <DropdownItem onClick={() => toggleChangeProfileModal()}>
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={() => toggleChangePasswordModal()}>
                    Change Password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => logoutUser(token, history)}>
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </nav>

        <ProfileModal />
        <ChangePasswordModal />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, menu, settings }) => {
  const { token } = auth;
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;

  return {
    token,
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};

const mapActionsToProps = {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
  toggleChangeProfileModal,
  toggleChangePasswordModal,
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(TopNav);
