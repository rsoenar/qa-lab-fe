import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  changeSelectedChemicalSolutionControlWorksheet,
  createChemicalSolutionControlRecordError,
  createChemicalSolutionControlRecordSuccess,
  createChemicalSolutionControlWorksheetError,
  createChemicalSolutionControlWorksheetSuccess,
  deleteChemicalSolutionControlRecordError,
  deleteChemicalSolutionControlRecordSuccess,
  deleteChemicalSolutionControlWorksheetError,
  deleteChemicalSolutionControlWorksheetSuccess,
  reviseChemicalSolutionControlWorksheetError,
  reviseChemicalSolutionControlWorksheetSuccess,
  editChemicalSolutionControlRecordError,
  editChemicalSolutionControlRecordSuccess,
  editChemicalSolutionControlWorksheetError,
  editChemicalSolutionControlWorksheetSuccess,
  verifyChemicalSolutionControlRecordError,
  verifyChemicalSolutionControlRecordSuccess,
  attachCcrChemicalSolutionControlRecordError,
  attachCcrChemicalSolutionControlRecordSuccess,
  getChemicalSolutionControlWorksheetsError,
  getChemicalSolutionControlWorksheetsSuccess,
  toggleCreateChemicalSolutionControlRecordDialog,
  toggleCreateChemicalSolutionControlWorksheetDialog,
  toggleDeleteChemicalSolutionControlRecordDialog,
  toggleDeleteChemicalSolutionControlWorksheetDialog,
  toggleEditChemicalSolutionControlRecordDialog,
  toggleEditChemicalSolutionControlWorksheetDialog,
  toggleVerifyChemicalSolutionControlRecordDialog,
  toggleAttachCcrChemicalSolutionControlRecordDialog,
  toggleReviseChemicalSolutionControlWorksheetDialog,
  undoVerifyChemicalSolutionControlRecordError,
  undoVerifyChemicalSolutionControlRecordSuccess,
  toggleUndoVerifyChemicalSolutionControlRecordDialog,
} from "./actions";
import {
  CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS,
} from "../actions";
import {
  toastError,
  toastCreateChemicalSolutionControlWorksheetSuccess,
  toastEditChemicalSolutionControlWorksheetSuccess,
  toastDeleteChemicalSolutionControlWorksheetSuccess,
  toastReviseChemicalSolutionControlWorksheetSuccess,
  toastCreateChemicalSolutionControlRecordSuccess,
  toastEditChemicalSolutionControlRecordSuccess,
  toastDeleteChemicalSolutionControlRecordSuccess,
  toastVerifyChemicalSolutionControlRecordSuccess,
  toastAttachCcrChemicalSolutionControlRecordSuccess,
  toastUndoVerifyChemicalSolutionControlRecordSuccess,
} from "../../components/Toasts";
import { backEndUrl } from "../../constants/defaultValues";

const getChemicalSolutionControlWorksheetsAsync = async (payload) => {
  return await axios
    .get(
      `${backEndUrl}/api/qa/chemical-solution-controls/worksheet/all/${
        payload ?? ""
      }`
    )
    .then((res) => {
      return res.data;
    });
};

const createChemicalSolutionControlWorksheetAsync = async (payload) => {
  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/worksheet/create`,
    data: payload,
  }).then((res) => {
    return res.data;
  });
};

const editChemicalSolutionControlWorksheetAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/worksheet/edit/${qaChemicalSolutionControlWorksheetId}`,
    data: qaChemicalSolutionControlWorksheet,
  }).then((res) => {
    return res.data;
  });
};

const deleteChemicalSolutionControlWorksheetAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/worksheet/delete/${qaChemicalSolutionControlWorksheetId}`,
    data: qaChemicalSolutionControlWorksheet,
  }).then((res) => {
    return res.data;
  });
};

const reviseChemicalSolutionControlWorksheetAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/worksheet/revise/${qaChemicalSolutionControlWorksheetId}`,
    data: qaChemicalSolutionControlWorksheet,
  }).then((res) => {
    return res.data;
  });
};

const createChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecord,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/record/create/${qaChemicalSolutionControlWorksheetId}`,
    data: qaChemicalSolutionControlRecord,
  }).then((res) => {
    return res.data;
  });
};

const editChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/record/edit/${qaChemicalSolutionControlWorksheetId}/${qaChemicalSolutionControlRecordId}`,
    data: qaChemicalSolutionControlRecord,
  }).then((res) => {
    return res.data;
  });
};

const deleteChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
  } = payload;

  return await axios
    .post(
      `${backEndUrl}/api/qa/chemical-solution-controls/record/delete/${qaChemicalSolutionControlWorksheetId}/${qaChemicalSolutionControlRecordId}`
    )
    .then((res) => {
      return res.data;
    });
};

const verifyChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/record/verify/${qaChemicalSolutionControlWorksheetId}/${qaChemicalSolutionControlRecordId}`,
    data: qaChemicalSolutionControlRecord,
  }).then((res) => {
    return res.data;
  });
};

const undoVerifyChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/record/verify/${qaChemicalSolutionControlWorksheetId}/${qaChemicalSolutionControlRecordId}`,
    data: qaChemicalSolutionControlRecord,
  }).then((res) => {
    return res.data;
  });
};

const attachCcrChemicalSolutionControlRecordAsync = async (payload) => {
  const {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  } = payload;

  return await axios({
    method: "post",
    url: `${backEndUrl}/api/qa/chemical-solution-controls/record/ccr/${qaChemicalSolutionControlWorksheetId}/${qaChemicalSolutionControlRecordId}`,
    data: qaChemicalSolutionControlRecord,
  }).then((res) => {
    return res.data;
  });
};

function* getChemicalSolutionControlWorksheets({ payload }) {
  const { qaChemicalSolutionControl } = yield select();

  payload =
    payload ?? qaChemicalSolutionControl?.selectedChemicalSolutionControlStatus;

  console.log(payload);

  try {
    const { success, data } = yield call(
      getChemicalSolutionControlWorksheetsAsync,
      payload
    );
    const { qaChemicalSolutionControlWorksheets } = data;
    const { qaChemicalSolutionControl } = yield select();

    if (success) {
      const { selectedChemicalSolutionControlWorksheet } =
        qaChemicalSolutionControl;

      yield put(
        getChemicalSolutionControlWorksheetsSuccess(
          qaChemicalSolutionControlWorksheets
        )
      );
      if (Object.keys(selectedChemicalSolutionControlWorksheet).length !== 0) {
        yield put(
          changeSelectedChemicalSolutionControlWorksheet(
            qaChemicalSolutionControlWorksheets.filter(
              (qaChemicalSolutionWorksheet) => {
                return (
                  qaChemicalSolutionWorksheet.id ===
                  selectedChemicalSolutionControlWorksheet.id
                );
              }
            )[0]
          )
        );
      }
    }
  } catch (error) {
    yield put(getChemicalSolutionControlWorksheetsError(error));
    toastError(error.message);
  }
}

function* createChemicalSolutionControlWorksheet({ payload }) {
  try {
    const { success } = yield call(
      createChemicalSolutionControlWorksheetAsync,
      payload
    );

    if (success) {
      yield put(createChemicalSolutionControlWorksheetSuccess());
      yield put(toggleCreateChemicalSolutionControlWorksheetDialog());
      toastCreateChemicalSolutionControlWorksheetSuccess();
    }
  } catch (error) {
    yield put(createChemicalSolutionControlWorksheetError(error));
    toastError(error.message);
  }
}

function* editChemicalSolutionControlWorksheet({ payload }) {
  try {
    const { success } = yield call(
      editChemicalSolutionControlWorksheetAsync,
      payload
    );

    if (success) {
      yield put(editChemicalSolutionControlWorksheetSuccess());
      yield put(toggleEditChemicalSolutionControlWorksheetDialog({}));
      toastEditChemicalSolutionControlWorksheetSuccess();
    }
  } catch (error) {
    yield put(editChemicalSolutionControlWorksheetError(error));
    toastError(error.message);
  }
}

function* deleteChemicalSolutionControlWorksheet({ payload }) {
  try {
    const { success } = yield call(
      deleteChemicalSolutionControlWorksheetAsync,
      payload
    );

    if (success) {
      yield put(deleteChemicalSolutionControlWorksheetSuccess());
      yield put(toggleDeleteChemicalSolutionControlWorksheetDialog({}));
      toastDeleteChemicalSolutionControlWorksheetSuccess();
    }
  } catch (error) {
    yield put(deleteChemicalSolutionControlWorksheetError(error));
    toastError(error.message);
  }
}

function* reviseChemicalSolutionControlWorksheet({ payload }) {
  try {
    const { success } = yield call(
      reviseChemicalSolutionControlWorksheetAsync,
      payload
    );

    if (success) {
      yield put(reviseChemicalSolutionControlWorksheetSuccess());
      yield put(toggleReviseChemicalSolutionControlWorksheetDialog({}));
      toastReviseChemicalSolutionControlWorksheetSuccess();
    }
  } catch (error) {
    yield put(reviseChemicalSolutionControlWorksheetError(error));
    toastError(error.message);
  }
}

function* createChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      createChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(createChemicalSolutionControlRecordSuccess());
      yield put(toggleCreateChemicalSolutionControlRecordDialog());
      toastCreateChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(createChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

function* editChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      editChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(editChemicalSolutionControlRecordSuccess());
      yield put(toggleEditChemicalSolutionControlRecordDialog({}));
      toastEditChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(editChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

function* deleteChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      deleteChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(deleteChemicalSolutionControlRecordSuccess());
      yield put(toggleDeleteChemicalSolutionControlRecordDialog({}));
      toastDeleteChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(deleteChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

function* verifyChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      verifyChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(verifyChemicalSolutionControlRecordSuccess());
      yield put(toggleVerifyChemicalSolutionControlRecordDialog({}));
      toastVerifyChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(verifyChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

function* undoVerifyChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      undoVerifyChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(undoVerifyChemicalSolutionControlRecordSuccess());
      yield put(toggleUndoVerifyChemicalSolutionControlRecordDialog({}));
      toastUndoVerifyChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(undoVerifyChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

function* attachCcrChemicalSolutionControlRecord({ payload }) {
  try {
    const { success } = yield call(
      attachCcrChemicalSolutionControlRecordAsync,
      payload
    );

    if (success) {
      yield put(attachCcrChemicalSolutionControlRecordSuccess());
      yield put(toggleAttachCcrChemicalSolutionControlRecordDialog({}));
      toastAttachCcrChemicalSolutionControlRecordSuccess();
    }
  } catch (error) {
    yield put(attachCcrChemicalSolutionControlRecordError(error));
    toastError(error.message);
  }
}

export function* watchGetChemicalSolutionControlWorksheets() {
  yield takeEvery(
    GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchChangeSelectedChemicalSolutionControlStatus() {
  yield takeEvery(
    CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchCreateChemicalSolutionControlWorksheet() {
  yield takeEvery(
    CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
    createChemicalSolutionControlWorksheet
  );
}

export function* watchCreateChemicalSolutionControlWorksheetSuccess() {
  yield takeEvery(
    CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchEditChemicalSolutionControlWorksheet() {
  yield takeEvery(
    EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
    editChemicalSolutionControlWorksheet
  );
}

export function* watchEditChemicalSolutionControlWorksheetSuccess() {
  yield takeEvery(
    EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchDeleteChemicalSolutionControlWorksheet() {
  yield takeEvery(
    DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
    deleteChemicalSolutionControlWorksheet
  );
}

export function* watchDeleteChemicalSolutionControlWorksheetSuccess() {
  yield takeEvery(
    DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchReviseChemicalSolutionControlWorksheet() {
  yield takeEvery(
    REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
    reviseChemicalSolutionControlWorksheet
  );
}

export function* watchReviseChemicalSolutionControlWorksheetSuccess() {
  yield takeEvery(
    REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchCreateChemicalSolutionControlRecord() {
  yield takeEvery(
    CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD,
    createChemicalSolutionControlRecord
  );
}

export function* watchCreateChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchEditChemicalSolutionControlRecord() {
  yield takeEvery(
    EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD,
    editChemicalSolutionControlRecord
  );
}

export function* watchEditChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchDeleteChemicalSolutionControlRecord() {
  yield takeEvery(
    DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD,
    deleteChemicalSolutionControlRecord
  );
}

export function* watchDeleteChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchVerifyChemicalSolutionControlRecord() {
  yield takeEvery(
    VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
    verifyChemicalSolutionControlRecord
  );
}

export function* watchVerifyChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchUndoVerifyChemicalSolutionControlRecord() {
  yield takeEvery(
    UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
    undoVerifyChemicalSolutionControlRecord
  );
}

export function* watchUndoVerifyChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export function* watchAttachCcrChemicalSolutionControlRecord() {
  yield takeEvery(
    ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD,
    attachCcrChemicalSolutionControlRecord
  );
}

export function* watchAttachCcrChemicalSolutionControlRecordSuccess() {
  yield takeEvery(
    ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
    getChemicalSolutionControlWorksheets
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetChemicalSolutionControlWorksheets),
    fork(watchChangeSelectedChemicalSolutionControlStatus),
    fork(watchCreateChemicalSolutionControlWorksheet),
    fork(watchCreateChemicalSolutionControlWorksheetSuccess),
    fork(watchEditChemicalSolutionControlWorksheet),
    fork(watchEditChemicalSolutionControlWorksheetSuccess),
    fork(watchReviseChemicalSolutionControlWorksheet),
    fork(watchReviseChemicalSolutionControlWorksheetSuccess),
    fork(watchDeleteChemicalSolutionControlWorksheet),
    fork(watchDeleteChemicalSolutionControlWorksheetSuccess),
    fork(watchCreateChemicalSolutionControlRecord),
    fork(watchCreateChemicalSolutionControlRecordSuccess),
    fork(watchEditChemicalSolutionControlRecord),
    fork(watchEditChemicalSolutionControlRecordSuccess),
    fork(watchDeleteChemicalSolutionControlRecord),
    fork(watchDeleteChemicalSolutionControlRecordSuccess),
    fork(watchVerifyChemicalSolutionControlRecord),
    fork(watchVerifyChemicalSolutionControlRecordSuccess),
    fork(watchUndoVerifyChemicalSolutionControlRecord),
    fork(watchUndoVerifyChemicalSolutionControlRecordSuccess),
    fork(watchAttachCcrChemicalSolutionControlRecord),
    fork(watchAttachCcrChemicalSolutionControlRecordSuccess),
  ]);
}
