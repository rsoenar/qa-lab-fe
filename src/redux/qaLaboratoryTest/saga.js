import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  approveLaboratoryTestReportError,
  approveLaboratoryTestReportSuccess,
  approveLaboratoryTestRequestError,
  approveLaboratoryTestRequestSuccess,
  deleteLaboratoryTestRequestError,
  deleteLaboratoryTestRequestSuccess,
  downloadLaboratoryTestAttachmentError,
  downloadLaboratoryTestAttachmentSuccess,
  downloadLaboratoryTestReportDocumentError,
  downloadLaboratoryTestReportDocumentSuccess,
  downloadLaboratoryTestRequestDocumentError,
  downloadLaboratoryTestRequestDocumentSuccess,
  editLaboratoryTestReportError,
  editLaboratoryTestReportSuccess,
  editLaboratoryTestRequestError,
  editLaboratoryTestRequestSuccess,
  getLaboratoryTestsError,
  getLaboratoryTestsSuccess,
  receiveLaboratoryTestRequestError,
  receiveLaboratoryTestRequestSuccess,
  reviseLaboratoryTestReportError,
  reviseLaboratoryTestReportSuccess,
  submitLaboratoryTestReportError,
  submitLaboratoryTestReportSuccess,
  submitLaboratoryTestRequestError,
  submitLaboratoryTestRequestSuccess,
  toggleApproveReportModal,
  toggleApproveRequestModal,
  toggleDeleteRequestModal,
  toggleEditReportModal,
  toggleEditRequestModal,
  toggleReceiveRequestModal,
  toggleReviseReportModal,
  toggleSubmitReportModal,
  toggleSubmitRequestModal,
} from "./actions";
import {
  APPROVE_LABORATORY_TEST_REPORT,
  APPROVE_LABORATORY_TEST_REPORT_SUCCESS,
  APPROVE_LABORATORY_TEST_REQUEST,
  APPROVE_LABORATORY_TEST_REQUEST_SUCCESS,
  CHANGE_SELECTED_LABORATORY_TEST_YEAR,
  DELETE_LABORATORY_TEST_REQUEST,
  DELETE_LABORATORY_TEST_REQUEST_SUCCESS,
  DOWNLOAD_LABORATORY_TEST_ATTACHMENT,
  DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT,
  DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT,
  EDIT_LABORATORY_TEST_REPORT,
  EDIT_LABORATORY_TEST_REPORT_SUCCESS,
  EDIT_LABORATORY_TEST_REQUEST,
  EDIT_LABORATORY_TEST_REQUEST_SUCCESS,
  GET_LABORATORY_TESTS,
  RECEIVE_LABORATORY_TEST_REQUEST,
  RECEIVE_LABORATORY_TEST_REQUEST_SUCCESS,
  REVISE_LABORATORY_TEST_REPORT,
  REVISE_LABORATORY_TEST_REPORT_SUCCESS,
  SUBMIT_LABORATORY_TEST_REPORT,
  SUBMIT_LABORATORY_TEST_REPORT_SUCCESS,
  SUBMIT_LABORATORY_TEST_REQUEST,
  SUBMIT_LABORATORY_TEST_REQUEST_SUCCESS,
} from "../actions";
import axios from "axios";
import { backEndUrl } from "../../constants/defaultValues";
import jwt_decode from "jwt-decode";
import {
  toastError,
  toastSubmitLaboratoryTestRequestSuccess,
  toastEditLaboratoryTestRequestSuccess,
  toastApproveLaboratoryTestRequestSuccess,
  toastDeleteLaboratoryTestRequestSuccess,
  toastReceiveLaboratoryTestRequestSuccess,
  toastSubmitLaboratoryTestReportSuccess,
  toastEditLaboratoryTestReportSuccess,
  toastApproveLaboratoryTestReportSuccess,
  toastReviseLaboratoryTestReportSuccess,
} from "../../components/Toasts";

const getLaboratoryTestsAsync = async (payload) => {
  return await axios
    .get(`${backEndUrl}/api/qa/laboratory-tests/all/${payload ?? ""}`)
    .then((res) => {
      return res.data;
    });
};

const submitLaboratoryTestRequestAsync = async (payload) => {
  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/request/create`,
    data: payload,
  }).then((res) => {
    return res.data;
  });
};

const editLaboratoryTestRequestAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/request/edit/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const approveLaboratoryTestRequestAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/request/approve/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const deleteLaboratoryTestRequestAsync = async (payload) => {
  return await axios
    .post(`${backEndUrl}/api/qa/laboratory-tests/request/delete/${payload}`)
    .then((res) => {
      return res.data;
    });
};

const receiveLaboratoryTestRequestAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/request/receive/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const submitLaboratoryTestReportAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/report/create/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const editLaboratoryTestReportAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/report/edit/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const approveLaboratoryTestReportAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/report/approve/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const reviseLaboratoryTestReportAsync = async (payload) => {
  const { qaLaboratoryTestId, qaLaboratoryTest } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/laboratory-tests/report/revise/${qaLaboratoryTestId}`,
    data: qaLaboratoryTest,
  }).then((res) => {
    return res.data;
  });
};

const downloadLaboratoryTestRequestDocumentAsync = async (payload) => {
  return await axios
    .get(
      `${backEndUrl}/api/qa/laboratory-tests/request/download/pdf/` +
        payload.qaLaboratoryTestId,
      {
        responseType: "blob",
      }
    )
    .then((res) => {
      return { data: res.data };
    });
};

const downloadLaboratoryTestReportDocumentAsync = async (payload) => {
  return await axios
    .get(
      `${backEndUrl}/api/qa/laboratory-tests/report/download/pdf/` +
        payload.qaLaboratoryTestId,
      {
        responseType: "blob",
      }
    )
    .then((res) => {
      return { data: res.data };
    });
};

const downloadLaboratoryTestAttachmentAsync = async (payload) => {
  return await axios
    .get(
      `${backEndUrl}/api/qa/laboratory-tests/attachment/download/` +
        payload.fileName,
      {
        responseType: "blob",
      }
    )
    .then((res) => {
      return { data: res.data };
    });
};

function* getLaboratoryTests({ payload }) {
  const { auth, qaLaboratoryTest } = yield select();

  payload = payload ?? qaLaboratoryTest?.selectedLaboratoryTestYear;

  try {
    const { success, message, data } = yield call(
      getLaboratoryTestsAsync,
      payload
    );

    if (success) {
      const { token } = auth;
      const { name, organization, authorization } = jwt_decode(token);
      const { qaLaboratoryTests } = data;
      const {
        superAdmin,
        laboratoryTestApproveReport,
        laboratoryTestReport,
        laboratoryTestReceiveRequest,
        laboratoryTestApproveRequest,
        laboratoryTestRequest,
        laboratoryTestObserve,
      } = authorization;
      if (
        superAdmin ||
        laboratoryTestObserve ||
        laboratoryTestApproveReport ||
        laboratoryTestReport ||
        laboratoryTestReceiveRequest
      ) {
        yield put(getLaboratoryTestsSuccess(qaLaboratoryTests));
      } else if (laboratoryTestApproveRequest) {
        const filteredQaLaboratoryTests = qaLaboratoryTests?.filter(function (
          e
        ) {
          return (
            e.requesterOrganization?.substring(0, 3) ===
            organization?.substring(0, 3)
          );
        });
        yield put(getLaboratoryTestsSuccess(filteredQaLaboratoryTests));
      } else if (laboratoryTestRequest) {
        const filteredQaLaboratoryTests = qaLaboratoryTests?.filter(function (
          e
        ) {
          return e.requesterName === name;
        });
        yield put(getLaboratoryTestsSuccess(filteredQaLaboratoryTests));
      }
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(getLaboratoryTestsError(error));
    toastError(error.message);
  }
}

function* submitLaboratoryTestRequest({ payload }) {
  try {
    const { success, message } = yield call(
      submitLaboratoryTestRequestAsync,
      payload
    );

    if (success) {
      yield put(submitLaboratoryTestRequestSuccess());
      yield put(toggleSubmitRequestModal());
      toastSubmitLaboratoryTestRequestSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(submitLaboratoryTestRequestError(error));
    toastError(error.message);
  }
}

function* editLaboratoryTestRequest({ payload }) {
  try {
    const { success, message } = yield call(
      editLaboratoryTestRequestAsync,
      payload
    );

    if (success) {
      yield put(editLaboratoryTestRequestSuccess());
      yield put(toggleEditRequestModal());
      toastEditLaboratoryTestRequestSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(editLaboratoryTestRequestError(error));
    toastError(error.message);
  }
}

function* approveLaboratoryTestRequest({ payload }) {
  try {
    const { success, message } = yield call(
      approveLaboratoryTestRequestAsync,
      payload
    );

    if (success) {
      yield put(approveLaboratoryTestRequestSuccess());
      yield put(toggleApproveRequestModal());
      toastApproveLaboratoryTestRequestSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(approveLaboratoryTestRequestError(error));
    toastError(error.message);
  }
}

function* deleteLaboratoryTestRequest({ payload }) {
  try {
    const { success, message } = yield call(
      deleteLaboratoryTestRequestAsync,
      payload
    );

    if (success) {
      yield put(deleteLaboratoryTestRequestSuccess());
      yield put(toggleDeleteRequestModal());
      toastDeleteLaboratoryTestRequestSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(deleteLaboratoryTestRequestError(error));
    toastError(error.message);
  }
}

function* receiveLaboratoryTestRequest({ payload }) {
  try {
    const { success, message } = yield call(
      receiveLaboratoryTestRequestAsync,
      payload
    );

    if (success) {
      yield put(receiveLaboratoryTestRequestSuccess());
      yield put(toggleReceiveRequestModal());
      toastReceiveLaboratoryTestRequestSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(receiveLaboratoryTestRequestError(error));
    toastError(error.message);
  }
}

function* submitLaboratoryTestReport({ payload }) {
  try {
    const { success, message } = yield call(
      submitLaboratoryTestReportAsync,
      payload
    );

    if (success) {
      yield put(submitLaboratoryTestReportSuccess());
      yield put(toggleSubmitReportModal());
      toastSubmitLaboratoryTestReportSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(submitLaboratoryTestReportError(error));
    toastError(error.message);
  }
}

function* editLaboratoryTestReport({ payload }) {
  try {
    const { success, message } = yield call(
      editLaboratoryTestReportAsync,
      payload
    );

    if (success) {
      yield put(editLaboratoryTestReportSuccess());
      yield put(toggleEditReportModal());
      toastEditLaboratoryTestReportSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(editLaboratoryTestReportError(error));
    toastError(error.message);
  }
}

function* approveLaboratoryTestReport({ payload }) {
  try {
    const { success, message } = yield call(
      approveLaboratoryTestReportAsync,
      payload
    );

    if (success) {
      yield put(approveLaboratoryTestReportSuccess());
      yield put(toggleApproveReportModal());
      toastApproveLaboratoryTestReportSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(approveLaboratoryTestReportError(error));
    toastError(error.message);
  }
}

function* reviseLaboratoryTestReport({ payload }) {
  try {
    const { success, message } = yield call(
      reviseLaboratoryTestReportAsync,
      payload
    );

    if (success) {
      yield put(reviseLaboratoryTestReportSuccess());
      yield put(toggleReviseReportModal());
      toastReviseLaboratoryTestReportSuccess();
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(reviseLaboratoryTestReportError(error));
    toastError(error.message);
  }
}

function* downloadLaboratoryTestRequestDocument({ payload }) {
  try {
    const { data } = yield call(
      downloadLaboratoryTestRequestDocumentAsync,
      payload
    );

    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `QA Laboratory Test Request ${payload.qaLaboratoryTestId}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      yield put(downloadLaboratoryTestRequestDocumentSuccess());
    } else {
      yield put(downloadLaboratoryTestRequestDocumentError("Download Error"));
    }
  } catch (error) {
    toastError(error.message);
  }
}

function* downloadLaboratoryTestReportDocument({ payload }) {
  try {
    const { data } = yield call(
      downloadLaboratoryTestReportDocumentAsync,
      payload
    );

    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `QA Laboratory Test Report ${payload.qaLaboratoryTestId}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      yield put(downloadLaboratoryTestReportDocumentSuccess());
    } else {
      yield put(downloadLaboratoryTestReportDocumentError("Download Error"));
    }
  } catch (error) {
    toastError(error.message);
  }
}

function* downloadLaboratoryTestAttachment({ payload }) {
  try {
    const { data } = yield call(downloadLaboratoryTestAttachmentAsync, payload);

    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${payload.fileName}`);
      document.body.appendChild(link);
      link.click();
      yield put(downloadLaboratoryTestAttachmentSuccess());
    } else {
      yield put(downloadLaboratoryTestAttachmentError("Download Error"));
    }
  } catch (error) {
    toastError(error.message);
  }
}

export function* watchGetLaboratoryTests() {
  yield takeEvery(GET_LABORATORY_TESTS, getLaboratoryTests);
}

export function* watchChangeSelectedLaboratoryTestYear() {
  yield takeEvery(CHANGE_SELECTED_LABORATORY_TEST_YEAR, getLaboratoryTests);
}

export function* watchSubmitLaboratoryTestRequest() {
  yield takeEvery(SUBMIT_LABORATORY_TEST_REQUEST, submitLaboratoryTestRequest);
}

export function* watchSubmitLaboratoryTestRequestSuccess() {
  yield takeEvery(SUBMIT_LABORATORY_TEST_REQUEST_SUCCESS, getLaboratoryTests);
}

export function* watchEditLaboratoryTestRequest() {
  yield takeEvery(EDIT_LABORATORY_TEST_REQUEST, editLaboratoryTestRequest);
}

export function* watchEditLaboratoryTestRequestSuccess() {
  yield takeEvery(EDIT_LABORATORY_TEST_REQUEST_SUCCESS, getLaboratoryTests);
}

export function* watchApproveLaboratoryTestRequest() {
  yield takeEvery(
    APPROVE_LABORATORY_TEST_REQUEST,
    approveLaboratoryTestRequest
  );
}

export function* watchApproveLaboratoryTestRequestSuccess() {
  yield takeEvery(APPROVE_LABORATORY_TEST_REQUEST_SUCCESS, getLaboratoryTests);
}

export function* watchDeleteLaboratoryTestRequest() {
  yield takeEvery(DELETE_LABORATORY_TEST_REQUEST, deleteLaboratoryTestRequest);
}

export function* watchDeleteLaboratoryTestRequestSuccess() {
  yield takeEvery(DELETE_LABORATORY_TEST_REQUEST_SUCCESS, getLaboratoryTests);
}

export function* watchReceiveLaboratoryTestRequest() {
  yield takeEvery(
    RECEIVE_LABORATORY_TEST_REQUEST,
    receiveLaboratoryTestRequest
  );
}

export function* watchReceiveLaboratoryTestRequestSuccess() {
  yield takeEvery(RECEIVE_LABORATORY_TEST_REQUEST_SUCCESS, getLaboratoryTests);
}

export function* watchSubmitLaboratoryTestReport() {
  yield takeEvery(SUBMIT_LABORATORY_TEST_REPORT, submitLaboratoryTestReport);
}

export function* watchSubmitLaboratoryTestReportSuccess() {
  yield takeEvery(SUBMIT_LABORATORY_TEST_REPORT_SUCCESS, getLaboratoryTests);
}

export function* watchEditLaboratoryTestReport() {
  yield takeEvery(EDIT_LABORATORY_TEST_REPORT, editLaboratoryTestReport);
}

export function* watchEditLaboratoryTestReportSuccess() {
  yield takeEvery(EDIT_LABORATORY_TEST_REPORT_SUCCESS, getLaboratoryTests);
}

export function* watchApproveLaboratoryTestReport() {
  yield takeEvery(APPROVE_LABORATORY_TEST_REPORT, approveLaboratoryTestReport);
}

export function* watchApproveLaboratoryTestReportSuccess() {
  yield takeEvery(APPROVE_LABORATORY_TEST_REPORT_SUCCESS, getLaboratoryTests);
}

export function* watchReviseLaboratoryTestReport() {
  yield takeEvery(REVISE_LABORATORY_TEST_REPORT, reviseLaboratoryTestReport);
}

export function* watchReviseLaboratoryTestReportSuccess() {
  yield takeEvery(REVISE_LABORATORY_TEST_REPORT_SUCCESS, getLaboratoryTests);
}

export function* watchDownloadLaboratoryTestRequestDocument() {
  yield takeEvery(
    DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT,
    downloadLaboratoryTestRequestDocument
  );
}

export function* watchDownloadLaboratoryTestReportDocument() {
  yield takeEvery(
    DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT,
    downloadLaboratoryTestReportDocument
  );
}

export function* watchDownloadLaboratoryTestAttachment() {
  yield takeEvery(
    DOWNLOAD_LABORATORY_TEST_ATTACHMENT,
    downloadLaboratoryTestAttachment
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetLaboratoryTests),
    fork(watchChangeSelectedLaboratoryTestYear),
    fork(watchSubmitLaboratoryTestRequest),
    fork(watchSubmitLaboratoryTestRequestSuccess),
    fork(watchEditLaboratoryTestRequest),
    fork(watchEditLaboratoryTestRequestSuccess),
    fork(watchApproveLaboratoryTestRequest),
    fork(watchApproveLaboratoryTestRequestSuccess),
    fork(watchDeleteLaboratoryTestRequest),
    fork(watchDeleteLaboratoryTestRequestSuccess),
    fork(watchReceiveLaboratoryTestRequest),
    fork(watchReceiveLaboratoryTestRequestSuccess),
    fork(watchSubmitLaboratoryTestReport),
    fork(watchSubmitLaboratoryTestReportSuccess),
    fork(watchEditLaboratoryTestReport),
    fork(watchEditLaboratoryTestReportSuccess),
    fork(watchApproveLaboratoryTestReport),
    fork(watchApproveLaboratoryTestReportSuccess),
    fork(watchReviseLaboratoryTestReport),
    fork(watchReviseLaboratoryTestReportSuccess),
    fork(watchDownloadLaboratoryTestRequestDocument),
    fork(watchDownloadLaboratoryTestReportDocument),
    fork(watchDownloadLaboratoryTestAttachment),
  ]);
}
