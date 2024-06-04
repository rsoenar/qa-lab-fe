import { combineReducers } from "redux";
import menuReducer from "./menu/reducer";
import settingsReducer from "./settings/reducer";
import authReducer from "./auth/reducer";
import userManagementReducer from "./userManagement/reducer";
import mediaReducer from "./media/reducer";
import qaLaboratoryTestReducer from "./qaLaboratoryTest/reducer";
import qaChemicalSolutionControlReducer from "./qaChemicalSolutionControl/reducer";

const appReducer = combineReducers({
  menu: menuReducer,
  settings: settingsReducer,
  auth: authReducer,
  userManagement: userManagementReducer,
  media: mediaReducer,
  qaLaboratoryTest: qaLaboratoryTestReducer,
  qaChemicalSolutionControl: qaChemicalSolutionControlReducer,
});

const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT_USER_SUCCESS") {
  //   state = null;
  // }
  return appReducer(state, action);
};

export default rootReducer;
