/* eslint-disable import/no-anonymous-default-export */
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
} from '../actions';

import { authTokenKey } from '../../constants/defaultValues';

const INIT_STATE = {
  loading: false,
  error: null,
  token: localStorage.getItem(authTokenKey),
  showContactUsModal: false,
  showChangeProfileModal: false,
  showChangePasswordModal: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CONTACT_US_MODAL:
      return {
        ...state,
        showContactUsModal: !state.showContactUsModal,
      };
    case TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        showChangeProfileModal: !state.showChangeProfileModal,
      };
    case TOGGLE_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        showChangePasswordModal: !state.showChangePasswordModal,
      };

    case REGISTER_USER:
      return { ...state, loading: true, error: null };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
      };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, token: action.payload };

    case LOGIN_USER:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
      };

    case REFRESH_USER:
      return { ...state, loading: true, error: null };
    case REFRESH_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REFRESH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
      };

    case CHANGE_PROFILE:
      return { ...state, loading: true, error: null };
    case CHANGE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
      };

    case CHANGE_PASSWORD:
      return { ...state, loading: true, error: null };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload,
      };

    case LOGOUT_USER:
      return { ...state, loading: true, error: null };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, error: null, token: null };

    default:
      return { ...state };
  }
};
