import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  changePasswordError,
  changePasswordSuccess,
  changeProfileError,
  changeProfileSuccess,
  loginUserError,
  loginUserSuccess,
  logoutUserSuccess,
  refreshUserError,
  refreshUserSuccess,
  registerUserError,
  registerUserSuccess,
  toggleChangePasswordModal,
  toggleChangeProfileModal,
} from "./actions";
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_USER,
  REGISTER_USER,
} from "../actions";
import {
  toastError,
  toastUserRegistrationSuccess,
  toastChangeProfileSuccess,
  toastChangePasswordSuccess,
  toastLogoutSuccess,
} from "../../components/Toasts";
import { backEndUrl } from "../../constants/defaultValues";
import { authTokenKey } from "../../constants/defaultValues";

const registerUserAsync = async (user) => {
  return await axios
    .post(`${backEndUrl}/api/users/register`, user)
    .then((res) => {
      return res.data;
    });
};

const loginUserAsync = async (user) => {
  return await axios.post(`${backEndUrl}/api/users/login`, user).then((res) => {
    return res.data;
  });
};

const refreshUserAsync = async (payload) => {
  return await axios
    .post(`${backEndUrl}/api/users/refresh`, { id: jwt_decode(payload).id })
    .then((res) => {
      return res.data;
    });
};

const changeProfileAsync = async (user) => {
  return await axios
    .patch(`${backEndUrl}/api/users/profile`, user)
    .then((res) => {
      return res.data;
    });
};

const changePasswordAsync = async (user) => {
  return await axios
    .patch(`${backEndUrl}/api/users/password`, user)
    .then((res) => {
      return res.data;
    });
};

function* registerUser({ payload }) {
  const { user, history } = payload;

  try {
    const { success, message } = yield call(registerUserAsync, user);

    if (success) {
      yield put(registerUserSuccess(null));
      history.push("/");
      toastUserRegistrationSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(registerUserError(error));
    toastError(error.message);
  }
}

function* loginUser({ payload }) {
  const { user, history } = payload;

  try {
    const { success, message, data } = yield call(loginUserAsync, user);

    if (success) {
      const { token } = data;

      yield put(loginUserSuccess(token));
      localStorage.setItem(authTokenKey, token);
      history.push("/");
      window.location.reload();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(loginUserError(error));
    toastError(error.message);
  }
}

function* refreshUser({ payload }) {
  try {
    const { success, message, data } = yield call(refreshUserAsync, payload);

    if (success) {
      const { token } = data;

      yield put(refreshUserSuccess(token));
      localStorage.setItem(authTokenKey, token);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(refreshUserError(error));
    toastError(error.message);
  }
}

function* changeProfile({ payload }) {
  try {
    const { success, message, data } = yield call(changeProfileAsync, payload);

    if (success) {
      const { token } = data;

      yield put(changeProfileSuccess(token));
      yield put(toggleChangeProfileModal());
      localStorage.setItem(authTokenKey, token);
      toastChangeProfileSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(changeProfileError(error));
    toastError(error.message);
  }
}

function* changePassword({ payload }) {
  try {
    const { success, data, message } = yield call(changePasswordAsync, payload);

    if (success) {
      const { token } = data;

      yield put(changePasswordSuccess(token));
      yield put(toggleChangePasswordModal());
      localStorage.setItem(authTokenKey, token);
      toastChangePasswordSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(changePasswordError(error));
    toastError(error.message);
  }
}

function* logoutUser({ payload }) {
  const { token, history } = payload;
  const { name } = jwt_decode(token);

  try {
    yield put(logoutUserSuccess(null));
    localStorage.clear();
    history.push("/");
    toastLogoutSuccess(name);
  } catch (error) {
    toastError(error.message);
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchRefreshUser() {
  yield takeEvery(REFRESH_USER, refreshUser);
}

export function* watchChangeProfile() {
  yield takeEvery(CHANGE_PROFILE, changeProfile);
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchRefreshUser),
    fork(watchChangeProfile),
    fork(watchChangePassword),
    fork(watchLogoutUser),
  ]);
}
