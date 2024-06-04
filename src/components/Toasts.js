import { toast } from "react-toastify";
import { byes } from "../constants/vocabularies";

function toastError(message) {
  toast(`⛔ ${message}`);
}

function toastNewPasswordsNotMatched() {
  toast(`❗ New password didn't match.`);
}

function toastRequestReceiveDateMustBeBigger() {
  toast(`❗ Request receive date must be bigger than the request date.`);
}

function toastEstimationCloseDateMustBeBigger() {
  toast(
    `❗ Estimation close date must be bigger than the request receive date.`
  );
}

function toastUserRegistrationSuccess() {
  toast(`✈️ User registration success.`);
}

function toastChangeProfileSuccess() {
  toast(`👨‍👩‍👧‍👦 Profile updated.`);
}

function toastChangePasswordSuccess() {
  toast(`🔑 Change password success.`);
}

function toastLogoutSuccess(name) {
  toast(
    `👋 ${byes[Math.floor(Math.random() * byes.length)]}${
      name ? `, ${name}.` : "."
    }`
  );
}

function toastSubmitLaboratoryTestRequestSuccess() {
  toast(`📄 A new laboratory test request created.`);
}

function toastEditLaboratoryTestRequestSuccess() {
  toast(`✏️ Laboratory test request updated.`);
}

function toastApproveLaboratoryTestRequestSuccess() {
  toast(`✔️ Laboratory test request approved.`);
}

function toastDeleteLaboratoryTestRequestSuccess() {
  toast(`❌ Laboratory test request canceled.`);
}

function toastReceiveLaboratoryTestRequestSuccess() {
  toast(`📨 Laboratory test request received.`);
}

function toastSubmitLaboratoryTestReportSuccess() {
  toast(`📄 Laboratory test report created.`);
}

function toastEditLaboratoryTestReportSuccess() {
  toast(`✏️ Laboratory test report updated.`);
}

function toastApproveLaboratoryTestReportSuccess() {
  toast(`✔️ Laboratory test report approved.`);
}

function toastReviseLaboratoryTestReportSuccess() {
  toast(`📄 Laboratory test report revised.`);
}

function toastCreateChemicalSolutionControlWorksheetSuccess() {
  toast(`📄 A new chemical solution control worksheet created.`);
}

function toastEditChemicalSolutionControlWorksheetSuccess() {
  toast(`✏️ Chemical solution control worksheet updated.`);
}

function toastDeleteChemicalSolutionControlWorksheetSuccess() {
  toast(`❌ Chemical solution control worksheet deleted.`);
}

function toastReviseChemicalSolutionControlWorksheetSuccess() {
  toast(`✏️ Chemical solution control worksheet revised.`);
}

function toastCreateChemicalSolutionControlRecordSuccess() {
  toast(`📄 A new chemical solution control record created.`);
}

function toastEditChemicalSolutionControlRecordSuccess() {
  toast(`✏️ Chemical solution control record updated.`);
}

function toastDeleteChemicalSolutionControlRecordSuccess() {
  toast(`❌ Chemical solution control record deleted.`);
}

function toastVerifyChemicalSolutionControlRecordSuccess() {
  toast(`✔️ Chemical solution control record verified.`);
}

function toastUndoVerifyChemicalSolutionControlRecordSuccess() {
  toast(`◀️ Chemical solution control record undo verify.`);
}

function toastAttachCcrChemicalSolutionControlRecordSuccess() {
  toast(`📄 Chemical charging record added.`);
}

export {
  toastError,
  toastNewPasswordsNotMatched,
  toastRequestReceiveDateMustBeBigger,
  toastEstimationCloseDateMustBeBigger,
  toastUserRegistrationSuccess,
  toastChangeProfileSuccess,
  toastChangePasswordSuccess,
  toastLogoutSuccess,
  toastSubmitLaboratoryTestRequestSuccess,
  toastEditLaboratoryTestRequestSuccess,
  toastApproveLaboratoryTestRequestSuccess,
  toastDeleteLaboratoryTestRequestSuccess,
  toastReceiveLaboratoryTestRequestSuccess,
  toastSubmitLaboratoryTestReportSuccess,
  toastEditLaboratoryTestReportSuccess,
  toastApproveLaboratoryTestReportSuccess,
  toastReviseLaboratoryTestReportSuccess,
  toastCreateChemicalSolutionControlWorksheetSuccess,
  toastEditChemicalSolutionControlWorksheetSuccess,
  toastDeleteChemicalSolutionControlWorksheetSuccess,
  toastReviseChemicalSolutionControlWorksheetSuccess,
  toastCreateChemicalSolutionControlRecordSuccess,
  toastEditChemicalSolutionControlRecordSuccess,
  toastDeleteChemicalSolutionControlRecordSuccess,
  toastVerifyChemicalSolutionControlRecordSuccess,
  toastUndoVerifyChemicalSolutionControlRecordSuccess,
  toastAttachCcrChemicalSolutionControlRecordSuccess,
};
