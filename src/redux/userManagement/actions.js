import {
  CHANGE_USER_AUTHORIZATION,
  CHANGE_USER_AUTHORIZATION_ERROR,
  CHANGE_USER_AUTHORIZATION_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
} from '../actions';

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersError = (error) => ({
  type: GET_USERS_ERROR,
  payload: error,
});

export const getUsersSuccess = (
  users,
  laboratoryTestUsers,
  chemicalSolutionControlUsers,
  electroplatingChemicalProcessControlUsers
) => ({
  type: GET_USERS_SUCCESS,
  payload: {
    users,
    laboratoryTestUsers,
    chemicalSolutionControlUsers,
    electroplatingChemicalProcessControlUsers,
  },
});

export const changeUserAuthorization = (authorizationId, authorization) => ({
  type: CHANGE_USER_AUTHORIZATION,
  payload: { authorizationId, authorization },
});

export const changeUserAuthorizationError = (error) => ({
  type: CHANGE_USER_AUTHORIZATION_ERROR,
  payload: error,
});

export const changeUserAuthorizationSuccess = () => ({
  type: CHANGE_USER_AUTHORIZATION_SUCCESS,
});
