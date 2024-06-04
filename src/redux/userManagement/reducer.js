/* eslint-disable import/no-anonymous-default-export */
import {
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  CHANGE_USER_AUTHORIZATION,
  CHANGE_USER_AUTHORIZATION_ERROR,
  CHANGE_USER_AUTHORIZATION_SUCCESS,
} from '../actions';

const INIT_STATE = {
  changeUserAuthorizationLoading: false,
  changeUserAuthorizationerror: null,
  getUsersLoading: false,
  getUsersError: false,
  users: [],
  laboratoryTestUsers: [],
  chemicalSolutionControlUsers: [],
  electroplatingChemicalProcessControlUsers: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: true, error: null };
    case GET_USERS_ERROR:
      return {
        ...state,
        getUsersLoading: false,
        getUsersError: action.payload,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersLoading: false,
        getUsersError: null,
        users: action.payload.users,
        laboratoryTestUsers: action.payload.laboratoryTestUsers,
        chemicalSolutionControlUsers:
          action.payload.chemicalSolutionControlUsers,
        electroplatingChemicalProcessControlUsers:
          action.payload.electroplatingChemicalProcessControlUsers,
      };

    case CHANGE_USER_AUTHORIZATION:
      return { ...state, changeUserAuthorizationLoading: true, error: null };
    case CHANGE_USER_AUTHORIZATION_ERROR:
      return {
        ...state,
        changeUserAuthorizationLoading: false,
        changeUserAuthorizationerror: action.payload,
      };
    case CHANGE_USER_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        changeUserAuthorizationLoading: false,
        changeUserAuthorizationerror: null,
      };

    default:
      return { ...state };
  }
};
