import React, { PureComponent, Fragment } from "react";
import { Collapse, Nav, NavItem } from "reactstrap";
import {
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
  setContainerClassnames,
} from "../../redux/actions";
import {
  chemicalSolutionControlMenu,
  dashboardsMenu,
  electroplatingChemicalProcessControlMenu,
  laboratoryTestMenu,
  // mediaMenu,
  organizationUnitMenu,
  userManagementMenu,
} from "../../constants/menus";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: "",
      collapsedMenus: [],
      menu: "",
    };
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(
      0,
      nextClasses.join(" "),
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: "",
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter((x) => x !== "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter((x) => x !== "menu-sub-hidden");
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter((x) => x !== "")
      : "";
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes("menu-default") &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes("menu-hidden") ||
        currentClasses.includes("menu-mobile")
      ) {
        clickIndex = 0;
      }
    } else {
      if (currentClasses.includes("menu-sub-hidden") && menuClickCount === 3) {
        clickIndex = 2;
      } else if (
        currentClasses.includes("menu-hidden") ||
        currentClasses.includes("menu-mobile")
      ) {
        clickIndex = 0;
      }
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ["click", "touchstart", "touchend"].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ["click", "touchstart", "touchend"].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector(".sub-menu  li.active");
    const { selectedParentMenu, menu } = this.state;

    if (oldli != null) {
      oldli.classList.remove("active");
    }

    const oldliSub = document.querySelector(".third-level-menu  li.active");
    if (oldliSub != null) {
      oldliSub.classList.remove("active");
    }

    const selectedSublink = document.querySelector(
      ".third-level-menu  a.active"
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add("active");
    }

    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState(
        {
          selectedParentMenu:
            selectedlink.parentElement.parentElement.getAttribute(
              "data-parent"
            ),
        },
        callback
      );
    } else {
      let selectedParentNoSubItem = document.querySelector(
        ".main-menu  li a.active"
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu:
              selectedParentNoSubItem.getAttribute("data-flag"),
          },
          callback
        );
      } else if (selectedParentMenu === "") {
        this.setState(
          {
            selectedParentMenu: menu[0].id,
          },
          callback
        );
      }
    }
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu, menu } = this.state;
    const menuItem = menu.find((x) => x.id === selectedParentMenu);

    if (menuItem)
      return menuItem && menuItem.subs && menuItem.subs.length > 0
        ? true
        : false;
    else return false;
  };

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(" ").filter((x) => x !== "")
        : "";

      if (!currentClasses.includes("menu-mobile")) {
        if (
          currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes("menu-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes("menu-default") &&
          !currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          "sub-show-temporary",
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    let { collapsedMenus } = this.state;

    e.preventDefault();
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  static getDerivedStateFromProps(props) {
    const { token } = props;
    const { authorization } = jwt_decode(token);
    const {
      superAdmin,
      laboratoryTestAdmin,
      laboratoryTestView,
      chemicalSolutionControlAdmin,
      chemicalSolutionControlView,
      electroplatingChemicalProcessControlAdmin,
      electroplatingChemicalProcessControlView,
    } = authorization;
    let menu = [];

    menu.push(dashboardsMenu);
    menu.push(organizationUnitMenu);
    if (superAdmin) {
      // menu.splice(1, 0, mediaMenu);
      menu.splice(3, 0, userManagementMenu);
      menu.splice(4, 0, laboratoryTestMenu);
      menu.splice(5, 0, chemicalSolutionControlMenu);
      menu.splice(6, 0, electroplatingChemicalProcessControlMenu);
    } else {
      if (
        laboratoryTestAdmin ||
        chemicalSolutionControlAdmin ||
        electroplatingChemicalProcessControlAdmin
      ) {
        menu.push(userManagementMenu);
      }
      if (laboratoryTestView) {
        menu.push(laboratoryTestMenu);
      }
      if (chemicalSolutionControlView) {
        menu.push(chemicalSolutionControlMenu);
      }
      if (electroplatingChemicalProcessControlView) {
        menu.push(electroplatingChemicalProcessControlMenu);
      }
    }
    return {
      menu: menu,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive(this.setHasSubItemStatus);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  render() {
    const { selectedParentMenu, viewingParentMenu, collapsedMenus, menu } =
      this.state;

    return (
      <div
        className="sidebar"
        style={{
          opacity: 0.95,
        }}
      >
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menu &&
                  menu.map((item) => {
                    return (
                      <NavItem
                        key={item.id}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.id &&
                              viewingParentMenu === "") ||
                            viewingParentMenu === item.id,
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} /> {item.label}
                          </a>
                        ) : (
                          <NavLink
                            to={item.to}
                            onClick={(e) => this.openSubMenu(e, item)}
                            data-flag={item.id}
                          >
                            <i className={item.icon} /> {item.label}
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {menu &&
                menu.map((item) => {
                  return (
                    <Nav
                      key={item.id}
                      className={classnames({
                        "d-block":
                          (selectedParentMenu === item.id &&
                            viewingParentMenu === "") ||
                          viewingParentMenu === item.id,
                      })}
                      data-parent={item.id}
                    >
                      {item.subs &&
                        item.subs.map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.id}_${index}`}
                              className={`${
                                sub.subs && sub.subs.length > 0
                                  ? "has-sub-item"
                                  : ""
                              }`}
                            >
                              {sub.newWindow ? (
                                <a
                                  href={sub.to}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <i className={sub.icon} /> {sub.label}
                                </a>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <Fragment>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                        ? ""
                                        : "collapsed"
                                    }`}
                                    to={sub.to}
                                    id={`${item.id}_${index}`}
                                    onClick={(e) =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.id}_${index}`
                                      )
                                    }
                                  >
                                    <i className="simple-icon-arrow-down" />{" "}
                                    {sub.label}
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                    }
                                  >
                                    <Nav className="third-level-menu">
                                      {sub.subs.map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={`${item.id}_${index}_${thirdIndex}`}
                                          >
                                            {thirdSub.newWindow ? (
                                              <a
                                                href={thirdSub.to}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                              >
                                                <i className={thirdSub.icon} />{" "}
                                                {thirdSub.label}
                                              </a>
                                            ) : (
                                              <NavLink to={thirdSub.to}>
                                                <i className={thirdSub.icon} />{" "}
                                                {thirdSub.label}
                                              </NavLink>
                                            )}
                                          </NavItem>
                                        );
                                      })}
                                    </Nav>
                                  </Collapse>
                                </Fragment>
                              ) : (
                                <NavLink to={sub.to}>
                                  <i className={sub.icon} /> {sub.label}
                                </NavLink>
                              )}
                            </NavItem>
                          );
                        })}
                    </Nav>
                  );
                })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, menu }) => {
  const { token } = auth;
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu;

  return {
    token,
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  };
};

const mapActionToProps = {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Sidebar));
