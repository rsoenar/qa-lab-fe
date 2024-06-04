import {
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_RECORD,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_ERROR,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_SUCCESS,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  TOGGLE_ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
} from "../actions";

export const toggleCreateChemicalSolutionControlWorksheetDialog = () => ({
  type: TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
});

export const toggleEditChemicalSolutionControlWorksheetDialog = (
  qaChemicalSolutionControlWorksheet
) => ({
  type: TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  payload: qaChemicalSolutionControlWorksheet,
});

export const toggleDeleteChemicalSolutionControlWorksheetDialog = (
  qaChemicalSolutionControlWorksheet
) => ({
  type: TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  payload: qaChemicalSolutionControlWorksheet,
});

export const toggleReviseChemicalSolutionControlWorksheetDialog = (
  qaChemicalSolutionControlWorksheet
) => ({
  type: TOGGLE_REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  payload: qaChemicalSolutionControlWorksheet,
});

export const toggleCreateChemicalSolutionControlRecordDialog = () => ({
  type: TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
});

export const toggleEditChemicalSolutionControlRecordDialog = (
  qaChemicalSolutionControlRecord
) => ({
  type: TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  payload: qaChemicalSolutionControlRecord,
});

export const toggleDeleteChemicalSolutionControlRecordDialog = (
  qaChemicalSolutionControlRecord
) => ({
  type: TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  payload: qaChemicalSolutionControlRecord,
});

export const toggleVerifyChemicalSolutionControlRecordDialog = (
  qaChemicalSolutionControlRecord
) => ({
  type: TOGGLE_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  payload: qaChemicalSolutionControlRecord,
});

export const toggleUndoVerifyChemicalSolutionControlRecordDialog = (
  qaChemicalSolutionControlRecord
) => ({
  type: TOGGLE_UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  payload: qaChemicalSolutionControlRecord,
});

export const toggleAttachCcrChemicalSolutionControlRecordDialog = (
  qaChemicalSolutionControlRecord
) => ({
  type: TOGGLE_ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  payload: qaChemicalSolutionControlRecord,
});

export const getChemicalSolutionControlWorksheets = (
  selectedChemicalSolutionControlStatus
) => ({
  type: GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS,
  payload: selectedChemicalSolutionControlStatus,
});

export const getChemicalSolutionControlWorksheetsError = (error) => ({
  type: GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_ERROR,
  payload: error,
});

export const getChemicalSolutionControlWorksheetsSuccess = (
  qaChemicalSolutionControlWorksheets
) => ({
  type: GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_SUCCESS,
  payload: qaChemicalSolutionControlWorksheets,
});

export const changeSelectedChemicalSolutionControlStatus = (
  selectedChemicalSolutionControlStatus
) => ({
  type: CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS,
  payload: selectedChemicalSolutionControlStatus,
});

export const changeSelectedChemicalSolutionControlWorksheet = (
  qaChemicalSolutionControlWorksheet
) => ({
  type: CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  payload: qaChemicalSolutionControlWorksheet,
});

export const changeSelectedChemicalSolutionControlRecord = (
  qaChemicalSolutionControlRecord
) => ({
  type: CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: qaChemicalSolutionControlRecord,
});

export const createChemicalSolutionControlWorksheet = (
  qaChemicalSolutionControlWorksheet
) => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  payload: qaChemicalSolutionControlWorksheet,
});

export const createChemicalSolutionControlWorksheetError = (error) => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  payload: error,
});

export const createChemicalSolutionControlWorksheetSuccess = () => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
});

export const editChemicalSolutionControlWorksheet = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlWorksheet
) => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  },
});

export const editChemicalSolutionControlWorksheetError = (error) => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  payload: error,
});

export const editChemicalSolutionControlWorksheetSuccess = () => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
});

export const deleteChemicalSolutionControlWorksheet = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlWorksheet
) => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  },
});

export const deleteChemicalSolutionControlWorksheetError = (error) => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  payload: error,
});

export const deleteChemicalSolutionControlWorksheetSuccess = () => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
});

export const reviseChemicalSolutionControlWorksheet = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlWorksheet
) => ({
  type: REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlWorksheet,
  },
});

export const reviseChemicalSolutionControlWorksheetError = (error) => ({
  type: REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  payload: error,
});

export const reviseChemicalSolutionControlWorksheetSuccess = () => ({
  type: REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
});

export const createChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecord
) => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecord,
  },
});

export const createChemicalSolutionControlRecordError = (error) => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const createChemicalSolutionControlRecordSuccess = () => ({
  type: CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});

export const editChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecordId,
  qaChemicalSolutionControlRecord
) => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  },
});

export const editChemicalSolutionControlRecordError = (error) => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const editChemicalSolutionControlRecordSuccess = () => ({
  type: EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});

export const deleteChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecordId
) => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
  },
});

export const deleteChemicalSolutionControlRecordError = (error) => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const deleteChemicalSolutionControlRecordSuccess = () => ({
  type: DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});

export const verifyChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecordId,
  qaChemicalSolutionControlRecord
) => ({
  type: VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  },
});

export const verifyChemicalSolutionControlRecordError = (error) => ({
  type: VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const verifyChemicalSolutionControlRecordSuccess = () => ({
  type: VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});

export const undoVerifyChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecordId,
  qaChemicalSolutionControlRecord
) => ({
  type: UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  },
});

export const undoVerifyChemicalSolutionControlRecordError = (error) => ({
  type: UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const undoVerifyChemicalSolutionControlRecordSuccess = () => ({
  type: UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});

export const attachCcrChemicalSolutionControlRecord = (
  qaChemicalSolutionControlWorksheetId,
  qaChemicalSolutionControlRecordId,
  qaChemicalSolutionControlRecord
) => ({
  type: ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD,
  payload: {
    qaChemicalSolutionControlWorksheetId,
    qaChemicalSolutionControlRecordId,
    qaChemicalSolutionControlRecord,
  },
});

export const attachCcrChemicalSolutionControlRecordError = (error) => ({
  type: ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  payload: error,
});

export const attachCcrChemicalSolutionControlRecordSuccess = () => ({
  type: ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
});
