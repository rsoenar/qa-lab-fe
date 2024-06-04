import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PROFILE,
  CHANGE_PROFILE_ERROR,
  CHANGE_PROFILE_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  REFRESH_USER,
  REFRESH_USER_ERROR,
  REFRESH_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  TOGGLE_CHANGE_PASSWORD_MODAL,
  TOGGLE_CONTACT_US_MODAL,
  TOGGLE_PROFILE_MODAL,
} from "../actions";

export const toggleContactUsModal = () => ({
  type: TOGGLE_CONTACT_US_MODAL,
});

export const toggleChangeProfileModal = () => ({
  type: TOGGLE_PROFILE_MODAL,
});

export const toggleChangePasswordModal = () => ({
  type: TOGGLE_CHANGE_PASSWORD_MODAL,
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});

export const registerUserError = (error) => ({
  type: REGISTER_USER_ERROR,
  payload: error,
});

export const registerUserSuccess = (token) => ({
  type: REGISTER_USER_SUCCESS,
  payload: token,
});

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});

export const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

export const loginUserSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: token,
});

export const refreshUser = (token) => ({
  type: REFRESH_USER,
  payload: token,
});

export const refreshUserError = (error) => ({
  type: REFRESH_USER_ERROR,
  payload: error,
});

export const refreshUserSuccess = (token) => ({
  type: REFRESH_USER_SUCCESS,
  payload: token,
});

export const changeProfile = (user) => ({
  type: CHANGE_PROFILE,
  payload: user,
});

export const changeProfileError = (error) => ({
  type: CHANGE_PROFILE_ERROR,
  payload: error,
});

export const changeProfileSuccess = (token) => ({
  type: CHANGE_PROFILE_SUCCESS,
  payload: token,
});

export const changePassword = (user) => ({
  type: CHANGE_PASSWORD,
  payload: user,
});

export const changePasswordError = (error) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
});

export const changePasswordSuccess = (token) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: token,
});

export const logoutUser = (token, history) => ({
  type: LOGOUT_USER,
  payload: { token, history },
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});
