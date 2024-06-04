import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getMediasError, getMediasSuccess } from './actions';
import { GET_MEDIAS } from '../actions';
import { toastError } from '../../components/Toasts';
import { backEndUrl } from '../../constants/defaultValues';

const getMediaAsync = async () => {
  return await axios.get(`${backEndUrl}/api/medias/all`).then((res) => {
    return res.data;
  });
};

function* getMedia() {
  try {
    const response = yield call(getMediaAsync);
    const { success, message, data } = response;

    if (success) {
      yield put(getMediasSuccess(data.medias));
    } else {
      throw new Error(message);
    }
  } catch (error) {
    yield put(getMediasError(error));
    toastError(error.message);
  }
}

export function* watchGetMedia() {
  yield takeEvery(GET_MEDIAS, getMedia);
}

export default function* rootSaga() {
  yield all([fork(watchGetMedia)]);
}
