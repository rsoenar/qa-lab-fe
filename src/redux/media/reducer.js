/* eslint-disable import/no-anonymous-default-export */
import { GET_MEDIAS, GET_MEDIAS_ERROR, GET_MEDIAS_SUCCESS } from '../actions';

const INIT_STATE = {
  getMediasLoading: false,
  getMediasError: null,
  medias: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEDIAS:
      return { ...state, loading: true, error: null };
    case GET_MEDIAS_ERROR:
      return {
        ...state,
        getMediasLoading: false,
        getMediasError: action.payload,
        medias: [],
      };
    case GET_MEDIAS_SUCCESS:
      return {
        ...state,
        getMediasLoading: false,
        getMediasError: null,
        medias: action.payload,
      };

    default:
      return { ...state };
  }
};
