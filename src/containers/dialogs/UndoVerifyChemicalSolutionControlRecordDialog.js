import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  toggleUndoVerifyChemicalSolutionControlRecordDialog,
  undoVerifyChemicalSolutionControlRecord,
} from "../../redux/actions";
import { SlideTransition } from "../../components/Transitions";

class UndoVerifyChemicalSolutionControlRecordDialog extends PureComponent {
  render() {
    const {
      showUndoVerifyChemicalSolutionControlRecordDialog,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
      toggleUndoVerifyChemicalSolutionControlRecordDialog,
      undoVerifyChemicalSolutionControlRecord,
    } = this.props;

    return (
      <Dialog
        open={showUndoVerifyChemicalSolutionControlRecordDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleUndoVerifyChemicalSolutionControlRecordDialog();
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to undo verify
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to undo verify this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleUndoVerifyChemicalSolutionControlRecordDialog();
            }}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              undoVerifyChemicalSolutionControlRecord(
                selectedChemicalSolutionControlWorksheet.id,
                selectedChemicalSolutionControlRecord.id,
                {
                  verifier: null,
                  result: "",
                }
              );
            }}
            color="primary"
            variant="contained"
          >
            Undo Verify
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ qaChemicalSolutionControl }) => {
  const {
    showUndoVerifyChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  } = qaChemicalSolutionControl;

  return {
    showUndoVerifyChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  };
};

const mapActionsToProps = {
  toggleUndoVerifyChemicalSolutionControlRecordDialog,
  undoVerifyChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UndoVerifyChemicalSolutionControlRecordDialog);
