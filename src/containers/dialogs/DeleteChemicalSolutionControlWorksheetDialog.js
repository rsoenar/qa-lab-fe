import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  toggleDeleteChemicalSolutionControlWorksheetDialog,
  deleteChemicalSolutionControlWorksheet,
} from '../../redux/actions';
import { SlideTransition } from '../../components/Transitions';

class DeleteChemicalSolutionControlWorksheetDialog extends PureComponent {
  render() {
    const {
      showDeleteChemicalSolutionControlWorksheetDialog,
      selectedChemicalSolutionControlWorksheetToDelete,
      toggleDeleteChemicalSolutionControlWorksheetDialog,
      deleteChemicalSolutionControlWorksheet,
    } = this.props;

    return (
      <Dialog
        open={showDeleteChemicalSolutionControlWorksheetDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleDeleteChemicalSolutionControlWorksheetDialog({});
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to delete worksheet
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to permanently delete this worksheet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleDeleteChemicalSolutionControlWorksheetDialog({});
            }}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteChemicalSolutionControlWorksheet(
                selectedChemicalSolutionControlWorksheetToDelete?.id,
                {
                  revisedWorksheet:
                    selectedChemicalSolutionControlWorksheetToDelete?.revisedWorksheet,
                }
              );
            }}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ qaChemicalSolutionControl }) => {
  const {
    showDeleteChemicalSolutionControlWorksheetDialog,
    selectedChemicalSolutionControlWorksheetToDelete,
  } = qaChemicalSolutionControl;

  return {
    showDeleteChemicalSolutionControlWorksheetDialog,
    selectedChemicalSolutionControlWorksheetToDelete,
  };
};

const mapActionsToProps = {
  toggleDeleteChemicalSolutionControlWorksheetDialog,
  deleteChemicalSolutionControlWorksheet,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteChemicalSolutionControlWorksheetDialog);
