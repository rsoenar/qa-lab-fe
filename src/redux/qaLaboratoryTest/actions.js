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

export const toggleSubmitRequestModal = () => ({
  type: TOGGLE_SUBMIT_REQUEST_MODAL,
});

export const toggleEditRequestModal = (qaLaboratoryTest) => ({
  type: TOGGLE_EDIT_REQUEST_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleApproveRequestModal = (qaLaboratoryTest) => ({
  type: TOGGLE_APPROVE_REQUEST_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleDeleteRequestModal = (qaLaboratoryTest) => ({
  type: TOGGLE_DELETE_REQUEST_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleReceiveRequestModal = (qaLaboratoryTest) => ({
  type: TOGGLE_RECEIVE_REQUEST_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleSubmitReportModal = (qaLaboratoryTest) => ({
  type: TOGGLE_SUBMIT_REPORT_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleEditReportModal = (qaLaboratoryTest) => ({
  type: TOGGLE_EDIT_REPORT_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleApproveReportModal = (qaLaboratoryTest) => ({
  type: TOGGLE_APPROVE_REPORT_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleReviseReportModal = (qaLaboratoryTest) => ({
  type: TOGGLE_REVISE_REPORT_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleDownloadDocumentModal = (qaLaboratoryTest) => ({
  type: TOGGLE_DOWNLOAD_DOCUMENT_MODAL,
  payload: qaLaboratoryTest,
});

export const toggleReportHistoryModal = (qaLaboratoryTest) => ({
  type: TOGGLE_REPORT_HISTORY_MODAL,
  payload: qaLaboratoryTest,
});

export const getLaboratoryTests = (selectedLaboratoryTestYear) => ({
  type: GET_LABORATORY_TESTS,
  payload: selectedLaboratoryTestYear,
});

export const getLaboratoryTestsError = (error) => ({
  type: GET_LABORATORY_TESTS_ERROR,
  payload: error,
});

export const getLaboratoryTestsSuccess = (qaLaboratoryTests) => ({
  type: GET_LABORATORY_TESTS_SUCCESS,
  payload: qaLaboratoryTests,
});

export const changeSelectedLaboratoryTestYear = (
  selectedLaboratoryTestYear
) => ({
  type: CHANGE_SELECTED_LABORATORY_TEST_YEAR,
  payload: selectedLaboratoryTestYear,
});

export const submitLaboratoryTestRequest = (qaLaboratoryTest) => ({
  type: SUBMIT_LABORATORY_TEST_REQUEST,
  payload: qaLaboratoryTest,
});

export const submitLaboratoryTestRequestError = (error) => ({
  type: SUBMIT_LABORATORY_TEST_REQUEST_ERROR,
  payload: error,
});

export const submitLaboratoryTestRequestSuccess = () => ({
  type: SUBMIT_LABORATORY_TEST_REQUEST_SUCCESS,
});

export const editLaboratoryTestRequest = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: EDIT_LABORATORY_TEST_REQUEST,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const editLaboratoryTestRequestError = (error) => ({
  type: EDIT_LABORATORY_TEST_REQUEST_ERROR,
  payload: error,
});

export const editLaboratoryTestRequestSuccess = () => ({
  type: EDIT_LABORATORY_TEST_REQUEST_SUCCESS,
});

export const approveLaboratoryTestRequest = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: APPROVE_LABORATORY_TEST_REQUEST,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const approveLaboratoryTestRequestError = (error) => ({
  type: APPROVE_LABORATORY_TEST_REQUEST_ERROR,
  payload: error,
});

export const approveLaboratoryTestRequestSuccess = () => ({
  type: APPROVE_LABORATORY_TEST_REQUEST_SUCCESS,
});

export const deleteLaboratoryTestRequest = (qaLaboratoryTestId) => ({
  type: DELETE_LABORATORY_TEST_REQUEST,
  payload: qaLaboratoryTestId,
});

export const deleteLaboratoryTestRequestError = (error) => ({
  type: DELETE_LABORATORY_TEST_REQUEST_ERROR,
  payload: error,
});

export const deleteLaboratoryTestRequestSuccess = () => ({
  type: DELETE_LABORATORY_TEST_REQUEST_SUCCESS,
});

export const receiveLaboratoryTestRequest = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: RECEIVE_LABORATORY_TEST_REQUEST,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const receiveLaboratoryTestRequestError = (error) => ({
  type: RECEIVE_LABORATORY_TEST_REQUEST_ERROR,
  payload: error,
});

export const receiveLaboratoryTestRequestSuccess = () => ({
  type: RECEIVE_LABORATORY_TEST_REQUEST_SUCCESS,
});

export const submitLaboratoryTestReport = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: SUBMIT_LABORATORY_TEST_REPORT,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const submitLaboratoryTestReportError = (error) => ({
  type: SUBMIT_LABORATORY_TEST_REPORT_ERROR,
  payload: error,
});

export const submitLaboratoryTestReportSuccess = () => ({
  type: SUBMIT_LABORATORY_TEST_REPORT_SUCCESS,
});

export const editLaboratoryTestReport = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: EDIT_LABORATORY_TEST_REPORT,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const editLaboratoryTestReportError = (error) => ({
  type: EDIT_LABORATORY_TEST_REPORT_ERROR,
  payload: error,
});

export const editLaboratoryTestReportSuccess = () => ({
  type: EDIT_LABORATORY_TEST_REPORT_SUCCESS,
});

export const approveLaboratoryTestReport = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: APPROVE_LABORATORY_TEST_REPORT,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const approveLaboratoryTestReportError = (error) => ({
  type: APPROVE_LABORATORY_TEST_REPORT_ERROR,
  payload: error,
});

export const approveLaboratoryTestReportSuccess = () => ({
  type: APPROVE_LABORATORY_TEST_REPORT_SUCCESS,
});

export const reviseLaboratoryTestReport = (
  qaLaboratoryTestId,
  qaLaboratoryTest
) => ({
  type: REVISE_LABORATORY_TEST_REPORT,
  payload: { qaLaboratoryTestId, qaLaboratoryTest },
});

export const reviseLaboratoryTestReportError = (error) => ({
  type: REVISE_LABORATORY_TEST_REPORT_ERROR,
  payload: error,
});

export const reviseLaboratoryTestReportSuccess = () => ({
  type: REVISE_LABORATORY_TEST_REPORT_SUCCESS,
});

export const downloadLaboratoryTestRequestDocument = (qaLaboratoryTest) => ({
  type: DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT,
  payload: qaLaboratoryTest,
});

export const downloadLaboratoryTestRequestDocumentError = (error) => ({
  type: DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_ERROR,
  payload: error,
});

export const downloadLaboratoryTestRequestDocumentSuccess = () => ({
  type: DOWNLOAD_LABORATORY_TEST_REQUEST_DOCUMENT_SUCCESS,
});

export const downloadLaboratoryTestReportDocument = (qaLaboratoryTest) => ({
  type: DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT,
  payload: qaLaboratoryTest,
});

export const downloadLaboratoryTestReportDocumentError = (error) => ({
  type: DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_ERROR,
  payload: error,
});
export const downloadLaboratoryTestReportDocumentSuccess = () => ({
  type: DOWNLOAD_LABORATORY_TEST_REPORT_DOCUMENT_SUCCESS,
});

export const downloadLaboratoryTestAttachment = (qaLaboratoryTest) => ({
  type: DOWNLOAD_LABORATORY_TEST_ATTACHMENT,
  payload: qaLaboratoryTest,
});

export const downloadLaboratoryTestAttachmentError = (error) => ({
  type: DOWNLOAD_LABORATORY_TEST_ATTACHMENT_ERROR,
  payload: error,
});

export const downloadLaboratoryTestAttachmentSuccess = () => ({
  type: DOWNLOAD_LABORATORY_TEST_ATTACHMENT_SUCCESS,
});
