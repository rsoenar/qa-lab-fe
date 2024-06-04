/* eslint-disable import/no-anonymous-default-export */
import {
  APPROVE_LABORATORY_TEST_REPORT,
  APPROVE_LABORATORY_TEST_REPORT_ERROR,
  APPROVE_LABORATORY_TEST_REPORT_SUCCESS,
  APPROVE_LABORATORY_TEST_REQUEST,
  APPROVE_LABORATORY_TEST_REQUEST_ERROR,
  APPROVE_LABORATORY_TEST_REQUEST_SUCCESS,
  CHANGE_SELECTED_LABORATORY_TEST_YEAR,
  DELETE_LABORATORY_TEST_REQUEST,
  DELETE_LABORATORY_TEST_REQUEST_ERROR,
  DELETE_LABORATORY_TEST_REQUEST_SUCCESS,
  DOWNLOAD_LABORATORY_TEST_ATTACHMENT,
  DOWNLOAD_LABORATORY_TEST_ATTACHMENT_ERROR,
  DOWNLOAD_LABORATORY_TEST_ATTACHMENT_SUCCESS,
  DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT,
  DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_ERROR,
  DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_SUCCESS,
  DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT,
  DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_ERROR,
  DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_SUCCESS,
  EDIT_LABORATORY_TEST_REPORT,
  EDIT_LABORATORY_TEST_REPORT_ERROR,
  EDIT_LABORATORY_TEST_REPORT_SUCCESS,
  EDIT_LABORATORY_TEST_REQUEST,
  EDIT_LABORATORY_TEST_REQUEST_ERROR,
  EDIT_LABORATORY_TEST_REQUEST_SUCCESS,
  GET_LABORATORY_TESTS,
  GET_LABORATORY_TESTS_ERROR,
  GET_LABORATORY_TESTS_SUCCESS,
  RECEIVE_LABORATORY_TEST_REQUEST,
  RECEIVE_LABORATORY_TEST_REQUEST_ERROR,
  RECEIVE_LABORATORY_TEST_REQUEST_SUCCESS,
  REVISE_LABORATORY_TEST_REPORT,
  REVISE_LABORATORY_TEST_REPORT_ERROR,
  REVISE_LABORATORY_TEST_REPORT_SUCCESS,
  SUBMIT_LABORATORY_TEST_REPORT,
  SUBMIT_LABORATORY_TEST_REPORT_ERROR,
  SUBMIT_LABORATORY_TEST_REPORT_SUCCESS,
  SUBMIT_LABORATORY_TEST_REQUEST,
  SUBMIT_LABORATORY_TEST_REQUEST_ERROR,
  SUBMIT_LABORATORY_TEST_REQUEST_SUCCESS,
  TOGGLE_APPROVE_REPORT_MODAL,
  TOGGLE_APPROVE_REQUEST_MODAL,
  TOGGLE_DELETE_REQUEST_MODAL,
  TOGGLE_DOWNLOAD_DOCUMENT_MODAL,
  TOGGLE_EDIT_REPORT_MODAL,
  TOGGLE_EDIT_REQUEST_MODAL,
  TOGGLE_RECEIVE_REQUEST_MODAL,
  TOGGLE_REPORT_HISTORY_MODAL,
  TOGGLE_REVISE_REPORT_MODAL,
  TOGGLE_SUBMIT_REPORT_MODAL,
  TOGGLE_SUBMIT_REQUEST_MODAL,
} from "../actions";

const INIT_STATE = {
  loading: false,
  error: null,
  laboratoryTests: [],
  selectedLaboratoryTestYear: new Date().getFullYear(),
  selectedLaboratoryTest: {},
  showSubmitRequestModal: false,
  showEditRequestModal: false,
  showApproveRequestModal: false,
  showDeleteRequestModal: false,
  showReceiveRequestModal: false,
  showSubmitReportModal: false,
  showEditReportModal: false,
  showApproveReportModal: false,
  showReviseReportModal: false,
  showDownloadDocumentModal: false,
  showReportHistoryModal: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SUBMIT_REQUEST_MODAL:
      return {
        ...state,
        showSubmitRequestModal: !state.showSubmitRequestModal,
      };
    case TOGGLE_EDIT_REQUEST_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showEditRequestModal: !state.showEditRequestModal,
      };
    case TOGGLE_APPROVE_REQUEST_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showApproveRequestModal: !state.showApproveRequestModal,
      };
    case TOGGLE_DELETE_REQUEST_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showDeleteRequestModal: !state.showDeleteRequestModal,
      };
    case TOGGLE_RECEIVE_REQUEST_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showReceiveRequestModal: !state.showReceiveRequestModal,
      };
    case TOGGLE_SUBMIT_REPORT_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showSubmitReportModal: !state.showSubmitReportModal,
      };
    case TOGGLE_EDIT_REPORT_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showEditReportModal: !state.showEditReportModal,
      };
    case TOGGLE_APPROVE_REPORT_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showApproveReportModal: !state.showApproveReportModal,
      };
    case TOGGLE_REVISE_REPORT_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showReviseReportModal: !state.showReviseReportModal,
      };
    case TOGGLE_DOWNLOAD_DOCUMENT_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showDownloadDocumentModal: !state.showDownloadDocumentModal,
      };
    case TOGGLE_REPORT_HISTORY_MODAL:
      return {
        ...state,
        selectedLaboratoryTest: action.payload,
        showReportHistoryModal: !state.showReportHistoryModal,
      };

    case GET_LABORATORY_TESTS:
      return { ...state, loading: true, error: null };
    case GET_LABORATORY_TESTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        laboratoryTests: [],
      };
    case GET_LABORATORY_TESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        laboratoryTests: action.payload,
      };

    case CHANGE_SELECTED_LABORATORY_TEST_YEAR:
      return {
        ...state,
        selectedLaboratoryTestYear: action.payload,
      };

    case SUBMIT_LABORATORY_TEST_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBMIT_LABORATORY_TEST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUBMIT_LABORATORY_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case EDIT_LABORATORY_TEST_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_LABORATORY_TEST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_LABORATORY_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case APPROVE_LABORATORY_TEST_REQUEST:
      return { ...state, loading: true, error: null };
    case APPROVE_LABORATORY_TEST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case APPROVE_LABORATORY_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_LABORATORY_TEST_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_LABORATORY_TEST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_LABORATORY_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case RECEIVE_LABORATORY_TEST_REQUEST:
      return { ...state, loading: true, error: null };
    case RECEIVE_LABORATORY_TEST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RECEIVE_LABORATORY_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case SUBMIT_LABORATORY_TEST_REPORT:
      return { ...state, loading: true, error: null };
    case SUBMIT_LABORATORY_TEST_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUBMIT_LABORATORY_TEST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case EDIT_LABORATORY_TEST_REPORT:
      return { ...state, loading: true, error: null };
    case EDIT_LABORATORY_TEST_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_LABORATORY_TEST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case APPROVE_LABORATORY_TEST_REPORT:
      return { ...state, loading: true, error: null };
    case APPROVE_LABORATORY_TEST_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case APPROVE_LABORATORY_TEST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case REVISE_LABORATORY_TEST_REPORT:
      return { ...state, loading: true, error: null };
    case REVISE_LABORATORY_TEST_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REVISE_LABORATORY_TEST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT:
      return { ...state, loading: true, error: null };
    case DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT:
      return { ...state, loading: true, error: null };
    case DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DOWNLOAD_LABORATORY_TEST_ATTACHMENT:
      return { ...state, loading: true, error: null };
    case DOWNLOAD_LABORATORY_TEST_ATTACHMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DOWNLOAD_LABORATORY_TEST_ATTACHMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
