import * as Yup from "yup";

const registerUserFormValidationSchema = Yup.object().shape({
  registerNik: Yup.string()
    .required("NIK is required")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .matches(/^[0-9]+$/, "Must be only digits"),
  registerPassword: Yup.string().required("Password is required"),
  registerConfirmPassword: Yup.string()
    .oneOf([Yup.ref("registerPassword"), null], "Password doesn't match")
    .required("Required"),
});

const loginUserFormValidationSchema = Yup.object().shape({
  loginUsername: Yup.string().required("Username / NIK is required"),
  loginPassword: Yup.string().required("Password is required"),
});

const changePasswordFormValidationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Username / NIK is required"),
  confirmNewPassword: Yup.string().required("Password is required"),
});

const changeProfileFormValidationSchema = Yup.object().shape({
  nik: Yup.string()
    .required("NIK is required")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .matches(/^[0-9]+$/, "Must be only digits"),
  name: Yup.string().required("Required"),
  organization: Yup.string()
    .required("Required")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .matches(/^[a-zA-Z]{2}/, "First two characters must be letters"),
  iaeEmail: Yup.string(),
  phoneNo: Yup.string(),
});

const laboratoryTestFormByAdminValidationSchema = Yup.object().shape({
  laboratory: Yup.string().nullable().required("Required"),
  organizationUnit: Yup.string().nullable().required("Required"),
  requestNumber: Yup.string().nullable().required("Required"),
  material: Yup.string().nullable().required("Required"),
  type: Yup.string().nullable().required("Required"),
  specification: Yup.string().nullable().required("Required"),
  program: Yup.string().nullable().required("Required"),
  budgetNumber: Yup.string().nullable().required("Required"),
  reasonOfTest: Yup.string().nullable().required("Required"),
  manufacturer: Yup.string().nullable().required("Required"),
  manufacturingDate: Yup.string().nullable().required("Required"),
  expiryDate: Yup.string().nullable().required("Required"),
  batchNumber: Yup.string().nullable().required("Required"),
  sample: Yup.string().nullable().required("Required"),
  condition: Yup.string().nullable().required("Required"),
  unit: Yup.string().nullable().required("Required"),
  quantity: Yup.string().nullable().required("Required"),
  typeOfTest: Yup.string().nullable().required("Required"),
  testAccordingToSpecification: Yup.string().nullable().required("Required"),
  requester: Yup.string().nullable().required("Required"),
  requestApprover: Yup.string().nullable().required("Required"),
  reporter: Yup.string().nullable().required("Required"),
  reportApprover: Yup.string().nullable().required("Required"),
});

const laboratoryTestRequestFormValidationSchema = Yup.object().shape({
  laboratory: Yup.string().nullable().required("Required"),
  organizationUnit: Yup.string().nullable().required("Required"),
  requestNumber: Yup.string().nullable().required("Required"),
  material: Yup.string().nullable().required("Required"),
  type: Yup.string().nullable().required("Required"),
  specification: Yup.string().nullable().required("Required"),
  program: Yup.string().nullable().required("Required"),
  budgetNumber: Yup.string().nullable().required("Required"),
  reasonOfTest: Yup.string().nullable().required("Required"),
  manufacturer: Yup.string().nullable().required("Required"),
  manufacturingDate: Yup.string().nullable().required("Required"),
  expiryDate: Yup.string().nullable().required("Required"),
  batchNumber: Yup.string().nullable().required("Required"),
  sample: Yup.string().nullable().required("Required"),
  condition: Yup.string().nullable().required("Required"),
  unit: Yup.string().nullable().required("Required"),
  quantity: Yup.string().nullable().required("Required"),
  typeOfTest: Yup.string().nullable().required("Required"),
  testAccordingToSpecification: Yup.string().nullable().required("Required"),
});

const laboratoryTestRequestReceiveFormValidationSchema = Yup.object().shape({
  requestDate: Yup.date().nullable().required("Required"),
  requestReceiveDate: Yup.string().nullable().required("Required"),
  workdayEstimation: Yup.string().nullable().required("Required"),
  estimationCloseDate: Yup.string().nullable().required("Required"),
});

const laboratoryTestReportFormValidationSchema = Yup.object().shape({
  reportDate: Yup.string().nullable().required("Required"),
  reportNumber: Yup.string().nullable().required("Required"),
});

const chemicalSolutionControlCreateWorksheetFormValidationSchema =
  Yup.object().shape({
    solutionProcess: Yup.string().nullable().required("Required"),
    tankNumber: Yup.string().nullable().required("Required"),
    tankSize: Yup.string().nullable().required("Required"),
    tankVolume: Yup.string().nullable().required("Required"),
    location: Yup.string().nullable().required("Required"),
    testMethod: Yup.string().nullable().required("Required"),
    frequencyOfTest: Yup.string().nullable().required("Required"),
    temperatureRangeInCelcius: Yup.string().nullable().required("Required"),
  });

const chemicalSolutionControlEditWorksheetFormValidationSchema =
  Yup.object().shape({
    solutionProcess: Yup.string().nullable().required("Required"),
    tankNumber: Yup.string().nullable().required("Required"),
    tankSize: Yup.string().nullable().required("Required"),
    tankVolume: Yup.string().nullable().required("Required"),
    location: Yup.string().nullable().required("Required"),
    testMethod: Yup.string().nullable().required("Required"),
    frequencyOfTest: Yup.string().nullable().required("Required"),
    temperatureRangeInCelcius: Yup.string().nullable().required("Required"),
  });

const chemicalSolutionControlReviseWorksheetFormValidationSchema =
  Yup.object().shape({
    solutionProcess: Yup.string().nullable().required("Required"),
    tankNumber: Yup.string().nullable().required("Required"),
    tankSize: Yup.string().nullable().required("Required"),
    tankVolume: Yup.string().nullable().required("Required"),
    location: Yup.string().nullable().required("Required"),
    testMethod: Yup.string().nullable().required("Required"),
    frequencyOfTest: Yup.string().nullable().required("Required"),
    temperatureRangeInCelcius: Yup.string().nullable().required("Required"),
  });

const chemicalSolutionControlCreateRecordFormValidationSchema =
  Yup.object().shape({
    sampleTakenDate: Yup.date().nullable().required("Required"),
    sampleTakenTime: Yup.string().nullable().required("Required"),
    agitationInMinutes: Yup.string().nullable().required("Required"),
    temperatureInCelcius: Yup.string().nullable().required("Required"),
    sampleAnalysisDate: Yup.date().nullable().required("Required"),
    sampleAnalysisTime: Yup.string().nullable().required("Required"),
    remarks: Yup.string().nullable(),
  });

const chemicalSolutionControlEditRecordFormValidationSchema =
  Yup.object().shape({
    sampleTakenDate: Yup.date().nullable().required("Required"),
    sampleTakenTime: Yup.string().nullable().required("Required"),
    agitationInMinutes: Yup.string().nullable().required("Required"),
    temperatureInCelcius: Yup.string().nullable().required("Required"),
    sampleAnalysisDate: Yup.date().nullable().required("Required"),
    sampleAnalysisTime: Yup.string().nullable().required("Required"),
    remarks: Yup.string().nullable(),
  });

const chemicalSolutionControlRecordAttachCcrFormValidationSchema =
  Yup.object().shape({
    chemicalChargingRecordNumber: Yup.string().nullable().required("Required"),
    chemicalChargingRecordReceivedDate: Yup.date()
      .nullable()
      .required("Required"),
  });

export {
  registerUserFormValidationSchema,
  loginUserFormValidationSchema,
  changePasswordFormValidationSchema,
  changeProfileFormValidationSchema,
  laboratoryTestFormByAdminValidationSchema,
  laboratoryTestRequestFormValidationSchema,
  laboratoryTestRequestReceiveFormValidationSchema,
  laboratoryTestReportFormValidationSchema,
  chemicalSolutionControlCreateWorksheetFormValidationSchema,
  chemicalSolutionControlEditWorksheetFormValidationSchema,
  chemicalSolutionControlReviseWorksheetFormValidationSchema,
  chemicalSolutionControlCreateRecordFormValidationSchema,
  chemicalSolutionControlEditRecordFormValidationSchema,
  chemicalSolutionControlRecordAttachCcrFormValidationSchema,
};
