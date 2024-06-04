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
  toggleVerifyChemicalSolutionControlRecordDialog,
  verifyChemicalSolutionControlRecord,
} from '../../redux/actions';
import { SlideTransition } from '../../components/Transitions';
import jwt_decode from 'jwt-decode';

class VerifyChemicalSolutionControlRecordDialog extends PureComponent {
  render() {
    const {
      token,
      showVerifyChemicalSolutionControlRecordDialog,
      selectedChemicalSolutionControlWorksheet,
      selectedChemicalSolutionControlRecord,
      toggleVerifyChemicalSolutionControlRecordDialog,
      verifyChemicalSolutionControlRecord,
    } = this.props;
    const { id: userId } = jwt_decode(token);

    return (
      <Dialog
        open={showVerifyChemicalSolutionControlRecordDialog}
        TransitionComponent={SlideTransition}
        fullWidth
        maxWidth="sm"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={() => {
          toggleVerifyChemicalSolutionControlRecordDialog();
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm to verify
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to verify this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleVerifyChemicalSolutionControlRecordDialog();
            }}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              verifyChemicalSolutionControlRecord(
                selectedChemicalSolutionControlWorksheet.id,
                selectedChemicalSolutionControlRecord.id,
                {
                  verifier: userId,
                  result: 'Fail',
                }
              );
            }}
            color="primary"
            variant="contained"
          >
            Fail
          </Button>
          <Button
            onClick={() => {
              verifyChemicalSolutionControlRecord(
                selectedChemicalSolutionControlWorksheet.id,
                selectedChemicalSolutionControlRecord.id,
                {
                  verifier: userId,
                  result: 'Pass',
                }
              );
            }}
            color="primary"
            variant="contained"
          >
            Pass
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, qaChemicalSolutionControl }) => {
  const { token } = auth;
  const {
    showVerifyChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  } = qaChemicalSolutionControl;

  return {
    token,
    showVerifyChemicalSolutionControlRecordDialog,
    selectedChemicalSolutionControlWorksheet,
    selectedChemicalSolutionControlRecord,
  };
};

const mapActionsToProps = {
  toggleVerifyChemicalSolutionControlRecordDialog,
  verifyChemicalSolutionControlRecord,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VerifyChemicalSolutionControlRecordDialog);
