import { GET_MEDIAS, GET_MEDIAS_ERROR, GET_MEDIAS_SUCCESS } from '../actions';

export const getMedias = () => ({
  type: GET_MEDIAS,
});

export const getMediasError = (error) => ({
  type: GET_MEDIAS_ERROR,
  payload: error,
});

export const getMediasSuccess = (medias) => ({
  type: GET_MEDIAS_SUCCESS,
  payload: medias,
});
