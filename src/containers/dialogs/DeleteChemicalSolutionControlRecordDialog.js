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
  toggleDeleteChemicalSolutionControlRecordDialog,
  deleteChemicalSolutionControlRecord,
} from '../../redux/actions';
import { SlideTransition } from '../../components/Transitions';

class DeleteChemicalSolutionControlRecordDialog extends PureComponent {
  render() {
    const {
      showDeleteChemicalSolutionControlRecordDialog,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
      toggleDeleteChemicalSolutionControlRecordDialog,
      deleteChemicalSolutionControlRecord,
    } = this.props;

    return (
      <Dialog
        open={showDeleteChemicalSolutionControlRecordDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleDeleteChemicalSolutionControlRecordDialog({});
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to delete record
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to permanently delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleDeleteChemicalSolutionControlRecordDialog({});
            }}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteChemicalSolutionControlRecord(
                selectedChemicalSolutionControlWorksheet.id,
                selectedChemicalSolutionControlRecord.id
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
    showDeleteChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  } = qaChemicalSolutionControl;

  return {
    showDeleteChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  };
};

const mapActionsToProps = {
  toggleDeleteChemicalSolutionControlRecordDialog,
  deleteChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeleteChemicalSolutionControlRecordDialog);
