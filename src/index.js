import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "video-react/dist/video-react.css";
import "./assets/css/vendor/bootstrap.min.css";
import "./assets/css/vendor/bootstrap.rtl.only.min.css";
import {
  defaultColor,
  isDarkSwitchActive,
  isMultiColorActive,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from "./constants/defaultValues";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const color =
  (isMultiColorActive || isDarkSwitchActive) &&
  localStorage.getItem(themeColorStorageKey)
    ? localStorage.getItem(themeColorStorageKey)
    : defaultColor;
const render = () => {
  import("./assets/css/sass/themes/gogo." + color + ".scss").then((x) => {
    import("./AppRenderer");
  });
};

localStorage.setItem(themeColorStorageKey, color);
localStorage.setItem(themeRadiusStorageKey, "rounded");

render();
