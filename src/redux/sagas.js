import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userManagementSagas from './userManagement/saga';
import mediaSagas from './media/saga';
import qaLaboratoryTestSagas from './qaLaboratoryTest/saga';
import qaChemicalSolutionControlSagas from './qaChemicalSolutionControl/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    userManagementSagas(),
    mediaSagas(),
    qaLaboratoryTestSagas(),
    qaChemicalSolutionControlSagas(),
  ]);
}
