import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { firstBy } from "thenby";
import {
  changeUserAuthorizationError,
  changeUserAuthorizationSuccess,
  getUsersError,
  getUsersSuccess,
} from "./actions";
import {
  CHANGE_USER_AUTHORIZATION,
  CHANGE_USER_AUTHORIZATION_SUCCESS,
  GET_USERS,
} from "../actions";
import { toastError } from "../../components/Toasts";
import { backEndUrl } from "../../constants/defaultValues";

const getUsersAsync = async () => {
  return await axios.get(`${backEndUrl}/api/users/all`).then((res) => {
    const { success, message, data } = res.data;
    const users = data?.users?.map((user) => {
      user.authorizationId = user.authorization?.id;
      user.laboratoryTestAdmin = user.authorization?.laboratoryTestAdmin;
      user.laboratoryTestView = user.authorization?.laboratoryTestView;
      user.laboratoryTestObserve = user.authorization?.laboratoryTestObserve;
      user.laboratoryTestRequest = user.authorization?.laboratoryTestRequest;
      user.laboratoryTestApproveRequest =
        user.authorization?.laboratoryTestApproveRequest;
      user.laboratoryTestReceiveRequest =
        user.authorization?.laboratoryTestReceiveRequest;
      user.laboratoryTestReport = user.authorization?.laboratoryTestReport;
      user.laboratoryTestApproveReport =
        user.authorization?.laboratoryTestApproveReport;
      user.chemicalSolutionControlAdmin =
        user.authorization?.chemicalSolutionControlAdmin;
      user.chemicalSolutionControlView =
        user.authorization?.chemicalSolutionControlView;
      user.chemicalSolutionControlCreateWorksheet =
        user.authorization?.chemicalSolutionControlCreateWorksheet;
      user.chemicalSolutionControlCreateRecord =
        user.authorization?.chemicalSolutionControlCreateRecord;
      user.chemicalSolutionControlVerifyRecord =
        user.authorization?.chemicalSolutionControlVerifyRecord;
      user.electroplatingChemicalProcessControlAdmin =
        user.authorization?.electroplatingChemicalProcessControlAdmin;
      user.electroplatingChemicalProcessControlView =
        user.authorization?.electroplatingChemicalProcessControlView;
      user.electroplatingChemicalProcessControlOperator =
        user.authorization?.electroplatingChemicalProcessControlOperator;
      user.electroplatingChemicalProcessControlInspector =
        user.authorization?.electroplatingChemicalProcessControlInspector;
      user.electroplatingChemicalProcessControlLabPersonnel =
        user.authorization?.electroplatingChemicalProcessControlLabPersonnel;
      user.electroplatingChemicalProcessControlVerifier =
        user.authorization?.electroplatingChemicalProcessControlVerifier;
      return user;
    });
    const laboratoryTestUsers = users
      .map(
        ({
          authorization,
          birthDate,
          creationDate,
          duty,
          education,
          gender,
          iaeEmail,
          location,
          major,
          newUser,
          phoneNo,
          username,
          chemicalSolutionControlAdmin,
          chemicalSolutionControlView,
          chemicalSolutionControlCreateWorksheet,
          chemicalSolutionControlCreateRecord,
          chemicalSolutionControlVerifyRecord,
          electroplatingChemicalProcessControlAdmin,
          electroplatingChemicalProcessControlView,
          electroplatingChemicalProcessControlOperator,
          electroplatingChemicalProcessControlInspector,
          electroplatingChemicalProcessControlLabPersonnel,
          electroplatingChemicalProcessControlVerifier,
          ...properties
        }) => properties
      )
      .sort(
        firstBy("laboratoryTestAdmin", "desc")
          .thenBy("laboratoryTestView", "desc")
          .thenBy("laboratoryTestObserve", "desc")
          .thenBy("laboratoryTestRequest", "desc")
          .thenBy("laboratoryTestApproveRequest", "desc")
          .thenBy("laboratoryTestReceiveRequest", "desc")
          .thenBy("laboratoryTestReport", "desc")
          .thenBy("laboratoryTestApproveReport", "desc")
      );
    const chemicalSolutionControlUsers = users
      .map(
        ({
          authorization,
          birthDate,
          creationDate,
          duty,
          education,
          gender,
          iaeEmail,
          location,
          major,
          newUser,
          phoneNo,
          username,
          laboratoryTestAdmin,
          laboratoryTestView,
          laboratoryTestObserve,
          laboratoryTestRequest,
          laboratoryTestApproveRequest,
          laboratoryTestReceiveRequest,
          laboratoryTestReport,
          laboratoryTestApproveReport,
          electroplatingChemicalProcessControlAdmin,
          electroplatingChemicalProcessControlView,
          electroplatingChemicalProcessControlOperator,
          electroplatingChemicalProcessControlInspector,
          electroplatingChemicalProcessControlLabPersonnel,
          electroplatingChemicalProcessControlVerifier,
          ...properties
        }) => properties
      )
      .sort(
        firstBy("chemicalSolutionControlAdmin", "desc")
          .thenBy("chemicalSolutionControlView", "desc")
          .thenBy("chemicalSolutionControlCreateWorksheet", "desc")
          .thenBy("chemicalSolutionControlCreateRecord", "desc")
          .thenBy("chemicalSolutionControlVerifyRecord", "desc")
      );
    const electroplatingChemicalProcessControlUsers = users
      .map(
        ({
          authorization,
          birthDate,
          creationDate,
          duty,
          education,
          gender,
          iaeEmail,
          location,
          major,
          newUser,
          phoneNo,
          username,
          laboratoryTestAdmin,
          laboratoryTestView,
          laboratoryTestObserve,
          laboratoryTestRequest,
          laboratoryTestApproveRequest,
          laboratoryTestReceiveRequest,
          laboratoryTestReport,
          laboratoryTestApproveReport,
          chemicalSolutionControlAdmin,
          chemicalSolutionControlView,
          chemicalSolutionControlCreateWorksheet,
          chemicalSolutionControlCreateRecord,
          chemicalSolutionControlVerifyRecord,
          ...properties
        }) => properties
      )
      .sort(
        firstBy("electroplatingChemicalProcessControlAdmin", "desc")
          .thenBy("electroplatingChemicalProcessControlView", "desc")
          .thenBy("electroplatingChemicalProcessControlOperator", "desc")
          .thenBy("electroplatingChemicalProcessControlInspector", "desc")
          .thenBy("electroplatingChemicalProcessControlLabPersonnel", "desc")
          .thenBy("electroplatingChemicalProcessControlVerifier", "desc")
      );

    return {
      success,
      message,
      data: {
        users,
        laboratoryTestUsers,
        chemicalSolutionControlUsers,
        electroplatingChemicalProcessControlUsers,
      },
    };
  });
};

const changeUserAuthorizationAsync = async (payload) => {
  return await axios
    .patch(
      `${backEndUrl}/api/users/authorizations/${payload.authorizationId}`,
      payload.authorization
    )
    .then((res) => {
      return res.data;
    });
};

function* getUsers() {
  try {
    const { success, message, data } = yield call(getUsersAsync);
    const {
      users,
      laboratoryTestUsers,
      chemicalSolutionControlUsers,
      electroplatingChemicalProcessControlUsers,
    } = data;

    if (success) {
      yield put(
        getUsersSuccess(
          users,
          laboratoryTestUsers,
          chemicalSolutionControlUsers,
          electroplatingChemicalProcessControlUsers
        )
      );
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(getUsersError(error));
    toastError(error.message);
  }
}

function* changeUserAuthorization({ payload }) {
  try {
    const { success, message } = yield call(
      changeUserAuthorizationAsync,
      payload
    );

    if (success) {
      yield put(changeUserAuthorizationSuccess());
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(changeUserAuthorizationError(error));
    toastError(error.message);
  }
}

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}

export function* watchChangeUserAuthorization() {
  yield takeEvery(CHANGE_USER_AUTHORIZATION, changeUserAuthorization);
}

export function* watchChangeUserAuthorizationSuccess() {
  yield takeEvery(CHANGE_USER_AUTHORIZATION_SUCCESS, getUsers);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetUsers),
    fork(watchChangeUserAuthorization),
    fork(watchChangeUserAuthorizationSuccess),
  ]);
}
