/* eslint-disable import/no-anonymous-default-export */
import {
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_RECORD,
  CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS,
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
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR,
  EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_ERROR,
  GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_SUCCESS,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG,
  TOGGLE_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  TOGGLE_UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR,
  UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD,
} from "../actions";

const INIT_STATE = {
  loading: false,
  error: null,
  chemicalSolutionControlWorksheets: [],
  selectedChemicalSolutionControlStatus: "active",
  selectedChemicalSolutionControl: [],
  selectedChemicalSolutionControlWorksheet: {},
  selectedChemicalSolutionControlRecord: {},
  selectedChemicalSolutionControlWorksheetToEdit: {},
  selectedChemicalSolutionControlWorksheetToDelete: {},
  selectedChemicalSolutionControlWorksheetToRevise: {},
  showCreateChemicalSolutionControlWorksheetDialog: false,
  showEditChemicalSolutionControlWorksheetDialog: false,
  showDeleteChemicalSolutionControlWorksheetDialog: false,
  showReviseChemicalSolutionControlWorksheetDialog: false,
  showEditChemicalSolutionControlRecordDialog: false,
  showCreateChemicalSolutionControlRecordDialog: false,
  showDeleteChemicalSolutionControlRecordDialog: false,
  showVerifyChemicalSolutionControlRecordDialog: false,
  showUndoVerifyChemicalSolutionControlRecordDialog: false,
  showAttachCcrChemicalSolutionControlRecordDialog: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG:
      return {
        ...state,
        showCreateChemicalSolutionControlWorksheetDialog:
          !state.showCreateChemicalSolutionControlWorksheetDialog,
      };
    case TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG:
      return {
        ...state,
        showEditChemicalSolutionControlWorksheetDialog:
          !state.showEditChemicalSolutionControlWorksheetDialog,
        selectedChemicalSolutionControlWorksheetToEdit: action.payload,
      };
    case TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG:
      return {
        ...state,
        showDeleteChemicalSolutionControlWorksheetDialog:
          !state.showDeleteChemicalSolutionControlWorksheetDialog,
        selectedChemicalSolutionControlWorksheetToDelete: action.payload,
      };
    case TOGGLE_REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_DIALOG:
      return {
        ...state,
        showReviseChemicalSolutionControlWorksheetDialog:
          !state.showReviseChemicalSolutionControlWorksheetDialog,
        selectedChemicalSolutionControlWorksheetToRevise: action.payload,
      };
    case TOGGLE_CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showCreateChemicalSolutionControlRecordDialog:
          !state.showCreateChemicalSolutionControlRecordDialog,
      };
    case TOGGLE_EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showEditChemicalSolutionControlRecordDialog:
          !state.showEditChemicalSolutionControlRecordDialog,
        selectedChemicalSolutionControlRecord: action.payload,
      };
    case TOGGLE_DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showDeleteChemicalSolutionControlRecordDialog:
          !state.showDeleteChemicalSolutionControlRecordDialog,
        selectedChemicalSolutionControlRecord: action.payload,
      };
    case TOGGLE_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showVerifyChemicalSolutionControlRecordDialog:
          !state.showVerifyChemicalSolutionControlRecordDialog,
        selectedChemicalSolutionControlRecord: action.payload,
      };
    case TOGGLE_UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showUndoVerifyChemicalSolutionControlRecordDialog:
          !state.showUndoVerifyChemicalSolutionControlRecordDialog,
        selectedChemicalSolutionControlRecord: action.payload,
      };
    case TOGGLE_ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_DIALOG:
      return {
        ...state,
        showAttachCcrChemicalSolutionControlRecordDialog:
          !state.showAttachCcrChemicalSolutionControlRecordDialog,
        selectedChemicalSolutionControlRecord: action.payload,
      };

    case GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS:
      return { ...state, loading: true, error: null };
    case GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        chemicalSolutionControlWorksheets: [],
      };
    case GET_CHEMICAL_SOLUTION_CONTROL_WORKSHEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        chemicalSolutionControlWorksheets: action.payload,
      };

    case CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_STATUS:
      return {
        ...state,
        selectedChemicalSolutionControlStatus: action.payload,
      };
    case CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_WORKSHEET:
      return {
        ...state,
        selectedChemicalSolutionControlWorksheet: action.payload,
      };
    case CHANGE_SELECTED_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return {
        ...state,
        selectedChemicalSolutionControlRecord: action.payload,
      };

    case CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET:
      return { ...state, loading: true, error: null };
    case CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET:
      return { ...state, loading: true, error: null };
    case EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET:
      return { ...state, loading: true, error: null };
    case DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET:
      return { ...state, loading: true, error: null };
    case REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REVISE_CHEMICAL_SOLUTION_CONTROL_WORKSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UNDO_VERIFY_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD:
      return { ...state, loading: true, error: null };
    case ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ATTACH_CCR_CHEMICAL_SOLUTION_CONTROL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return { ...state };
  }
};
