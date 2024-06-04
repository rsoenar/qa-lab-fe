import {
  Button,
  Checkbox,
  IconButton,
  Input,
  TextField,
} from "@material-ui/core";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@material-ui/icons";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Form, Formik } from "formik";
import React, { PureComponent } from "react";
import {
  conditionsBondingAndComposite,
  conditionsDefault,
  conditionsKimia,
  conditionsMetallurgy,
  conditionsProcessControl,
  conditionsSolutionControl,
  laboratories,
  manufacturersBondingAndComposite,
  manufacturersDefault,
  manufacturersKimia,
  manufacturersMetallurgy,
  manufacturersProcessControl,
  manufacturersSolutionControl,
  materialsBondingAndComposite,
  materialsDefault,
  materialsKimia,
  materialsMetallurgy,
  materialsProcessControl,
  materialsSolutionControl,
  organizationUnitsBondingAndComposite,
  organizationUnitsDefault,
  organizationUnitsKimia,
  organizationUnitsMetallurgy,
  organizationUnitsProcessControl,
  organizationUnitsSolutionControl,
  programsBondingAndComposite,
  programsDefault,
  programsKimia,
  programsMetallurgy,
  programsProcessControl,
  programsSolutionControl,
  reasonOfTestBondingAndComposite,
  reasonOfTestsDefault,
  reasonOfTestsKimia,
  reasonOfTestsMetallurgy,
  reasonOfTestsProcessControl,
  reasonOfTestsSolutionControl,
  requestNumbersBondingAndCompositeACS,
  requestNumbersBondingAndCompositeMDME,
  requestNumbersBondingAndCompositeQC1300,
  requestNumbersBondingAndCompositeQC1500,
  requestNumbersBondingAndCompositeQC3100,
  requestNumbersBondingAndCompositeQC3300,
  requestNumbersBondingAndCompositeQC3500,
  requestNumbersBondingAndCompositeQC4000,
  requestNumbersBondingAndCompositeQC4100,
  requestNumbersBondingAndCompositeQC4400,
  requestNumbersBondingAndCompositeQC5300,
  requestNumbersBondingAndCompositeQC5500,
  requestNumbersBondingAndCompositeTraining,
  requestNumbersDefault,
  requestNumbersMetallurgyMDME,
  requestNumbersMetallurgyQA3100,
  requestNumbersMetallurgyQA3400,
  requestNumbersMetallurgyQC1400,
  requestNumbersMetallurgyQC3500,
  requestNumbersProcessControlDM6000,
  requestNumbersProcessControlDM6100,
  requestNumbersProcessControlDM6200,
  requestNumbersProcessControlMPD,
  requestNumbersProcessControlQA3100,
  requestNumbersProcessControlQC3400,
  requestNumbersProcessControlQC3500,
  requestNumbersProcessControlQC5300,
  requestNumbersSolutionControlDM6000,
  requestNumbersSolutionControlDM6100,
  requestNumbersSolutionControlDM6200,
  requestNumbersSolutionControlMPD,
  requestNumbersSolutionControlQA3100,
  requestNumbersSolutionControlQC3400,
  requestNumbersSolutionControlQC3500,
  requestNumbersSolutionControlQC5300,
  specificationsBondingAndComposite,
  specificationsDefault,
  specificationsKimia,
  specificationsMetallurgy,
  specificationsProcessControl,
  specificationsSolutionControl,
  typeOfTests,
  typesBondingAndComposite,
  typesDefault,
  typesKimia,
  typesMetallurgy,
  typesProcessControl,
  typesSolutionControl,
  units,
} from "../../constants/laboratoryTestValues";
import {
  downloadLaboratoryTestAttachment,
  editLaboratoryTestRequest,
  toggleEditRequestModal,
} from "../../redux/actions";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  laboratoryTestRequestFormValidationSchema,
  laboratoryTestFormByAdminValidationSchema,
} from "../../constants/validationSchemas";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import moment from "moment";

class EditLaboratoryTestRequestModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      organizationUnits: [],
      requestNumbers: [],
      materials: [],
      types: [],
      specifications: [],
      programs: [],
      reasonOfTests: [],
      manufacturers: [],
      conditions: [],
      testAccordingToSpecifications: [],
      employees: [],
      laboratory: "",
      organizationUnit: "",
      requestNumber: "",
      budgetNumber: "",
      reasonOfTest: "",
      material: "",
      type: "",
      specification: "",
      manufacturer: "",
      manufacturingDate: "",
      expiryDate: "",
      program: "",
      batchNumber: "",
      sample: "",
      condition: "",
      unit: "",
      quantity: "",
      typeOfTest: "",
      testAccordingToSpecification: "",
      requestAttachmentFileName: null,
      requestAttachmentFileOriginalName: null,
      requestDate: "",
      requestReceiveDate: "",
      estimationCloseDate: "",
      requester: "",
      requestApprover: "",
      reporter: "",
      reportApprover: "",
      selectedFile: null,
      deleteAttachment: false,
    };
  }

  static getDerivedStateFromProps(props, _state) {
    const { showEditRequestModal, selectedLaboratoryTest, users } = props;

    if (showEditRequestModal) {
      let { laboratory, testAccordingToSpecification } = selectedLaboratoryTest;
      let organizationUnits = [];
      let requestNumbers = [];
      let programs = [];
      let conditions = [];
      let specifications = [];
      let manufacturers = [];
      let reasonOfTests = [];
      let materials = [];
      let types = [];
      let employees = users?.map((user) => `${user.nik} - ${user.name}`) ?? [];

      switch (laboratory) {
        case "QA 3100 - Solution Control":
          organizationUnits = organizationUnitsSolutionControl;
          requestNumbers = requestNumbersDefault;
          programs = programsSolutionControl;
          materials = materialsSolutionControl;
          types = typesSolutionControl;
          specifications = specificationsSolutionControl;
          manufacturers = manufacturersSolutionControl;
          reasonOfTests = reasonOfTestsSolutionControl;
          conditions = conditionsSolutionControl;
          break;
        case "QA 3100 - Process Control":
          organizationUnits = organizationUnitsProcessControl;
          requestNumbers = requestNumbersDefault;
          programs = programsProcessControl;
          materials = materialsProcessControl;
          types = typesProcessControl;
          specifications = specificationsProcessControl;
          manufacturers = manufacturersProcessControl;
          reasonOfTests = reasonOfTestsProcessControl;
          conditions = conditionsProcessControl;
          break;
        case "QA 3100 - Kimia":
          organizationUnits = organizationUnitsKimia;
          requestNumbers = requestNumbersDefault;
          programs = programsKimia;
          materials = materialsKimia;
          types = typesKimia;
          specifications = specificationsKimia;
          manufacturers = manufacturersKimia;
          reasonOfTests = reasonOfTestsKimia;
          conditions = conditionsKimia;
          break;
        case "QA 3200 - Bonding & Composite":
          organizationUnits = organizationUnitsBondingAndComposite;
          requestNumbers = requestNumbersDefault;
          programs = programsBondingAndComposite;
          materials = materialsBondingAndComposite;
          types = typesBondingAndComposite;
          specifications = specificationsBondingAndComposite;
          manufacturers = manufacturersBondingAndComposite;
          reasonOfTests = reasonOfTestBondingAndComposite;
          conditions = conditionsBondingAndComposite;
          break;
        case "QA 3200 - Metallurgy":
          organizationUnits = organizationUnitsMetallurgy;
          requestNumbers = requestNumbersDefault;
          programs = programsMetallurgy;
          materials = materialsMetallurgy;
          types = typesMetallurgy;
          specifications = specificationsMetallurgy;
          manufacturers = manufacturersMetallurgy;
          reasonOfTests = reasonOfTestsMetallurgy;
          conditions = conditionsMetallurgy;
          break;
        default:
          organizationUnits = organizationUnitsDefault;
          requestNumbers = requestNumbersDefault;
          programs = programsDefault;
          materials = materialsDefault;
          types = typesDefault;
          specifications = specificationsDefault;
          manufacturers = manufacturersDefault;
          reasonOfTests = reasonOfTestsDefault;
          conditions = conditionsDefault;
      }
      return {
        organizationUnits: organizationUnits,
        requestNumbers: requestNumbers,
        programs: programs,
        conditions: conditions,
        specifications: specifications,
        manufacturers: manufacturers,
        reasonOfTests: reasonOfTests,
        materials: materials,
        types: types,
        testAccordingToSpecifications: [testAccordingToSpecification],
        employees: employees,
      };
    }
    return {};
  }

  componentDidUpdate(prevProps, _prevState) {
    const { showEditRequestModal, selectedLaboratoryTest, users } = this.props;

    if (
      showEditRequestModal !== prevProps.showEditRequestModal &&
      showEditRequestModal &&
      selectedLaboratoryTest
    ) {
      let {
        laboratory,
        organizationUnit,
        requestNumber,
        material,
        type,
        specification,
        program,
        budgetNumber,
        reasonOfTest,
        manufacturer,
        manufacturingDate,
        expiryDate,
        batchNumber,
        sample,
        condition,
        unit,
        quantity,
        typeOfTest,
        requestAttachmentFileName,
        requestAttachmentFileOriginalName,
        testAccordingToSpecification,
        requesterName,
        requesterNik,
        requestApproverName,
        requestApproverNik,
        reporterName,
        reporterNik,
        reportApproverName,
        reportApproverNik,
      } = selectedLaboratoryTest;
      const today = moment().format("YYYY-MM-DD");
      const requester = users?.find(
        (user) => user?.name === requesterName && user?.nik === requesterNik
      );
      const requestApprover = users?.find(
        (user) =>
          user?.name === requestApproverName && user?.nik === requestApproverNik
      );
      const reporter = users?.find(
        (user) => user?.name === reporterName && user?.nik === reporterNik
      );
      const reportApprover = users?.find(
        (user) =>
          user?.name === reportApproverName && user?.nik === reportApproverNik
      );

      this.setState({
        laboratory,
        organizationUnit,
        requestNumber,
        material: material?.split(", "),
        type: type?.split(", "),
        specification: specification?.split(", "),
        program,
        budgetNumber,
        reasonOfTest,
        manufacturer,
        manufacturingDate,
        expiryDate,
        batchNumber,
        sample,
        condition,
        unit,
        quantity,
        typeOfTest: typeOfTest?.split(","),
        requestAttachmentFileName,
        requestAttachmentFileOriginalName,
        testAccordingToSpecification,
        requestDate:
          selectedLaboratoryTest?.requestDate?.substring(0, 10) ?? today,
        requestReceiveDate:
          selectedLaboratoryTest?.requestReceiveDate?.substring(0, 10) ?? today,
        estimationCloseDate:
          selectedLaboratoryTest?.estimationCloseDate?.substring(0, 10) ??
          today,
        requester: requester ? `${requester.nik} - ${requester?.name}` : "",
        requestApprover: requestApprover
          ? `${requestApprover.nik} - ${requestApprover?.name}`
          : "",
        reporter: reporter ? `${reporter.nik} - ${reporter?.name}` : "",
        reportApprover: reportApprover
          ? `${reportApprover.nik} - ${reportApprover?.name}`
          : "",
        selectedFile: null,
        deleteAttachment: false,
      });
    }
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      deleteAttachment: false,
    });
  };

  deleteAttachment = () => {
    this.setState({
      deleteAttachment: true,
    });
  };

  triggerDownloadLaboratoryTestAttachment() {
    const { selectedLaboratoryTest, downloadLaboratoryTestAttachment } =
      this.props;
    const { requestAttachmentFileName } = selectedLaboratoryTest;

    downloadLaboratoryTestAttachment({ fileName: requestAttachmentFileName });
  }

  triggerEditLaboratoryTestRequest = (values) => {
    const {
      token,
      loading,
      selectedLaboratoryTest,
      editLaboratoryTestRequest,
      users,
    } = this.props;
    const { selectedFile, deleteAttachment } = this.state;
    const userId = jwt_decode(token)?.id;
    const { superAdmin, laboratoryTestAdmin } =
      jwt_decode(token)?.authorization;
    const { id, requestReceiveDate: existingRequestReceiveDate } =
      selectedLaboratoryTest;
    const {
      laboratory,
      organizationUnit,
      requestNumber,
      budgetNumber,
      reasonOfTest,
      material,
      type,
      specification,
      manufacturer,
      manufacturingDate,
      expiryDate,
      program,
      batchNumber,
      sample,
      condition,
      unit,
      quantity,
      typeOfTest,
      testAccordingToSpecification,
      requestDate,
      requestReceiveDate,
      estimationCloseDate,
      requester,
      requestApprover,
      reporter,
      reportApprover,
    } = values;
    let laboratoryTest = new FormData();

    const requesterFound = users?.find(
      (user) =>
        user?.name === requester?.substring(9) &&
        user?.nik === requester?.substring(0, 6)
    );
    const requestApproverFound = users?.find(
      (user) =>
        user?.name === requestApprover?.substring(9) &&
        user?.nik === requestApprover?.substring(0, 6)
    );
    const reporterFound = users?.find(
      (user) =>
        user?.name === reporter?.substring(9) &&
        user?.nik === reporter?.substring(0, 6)
    );
    const reportApproverFound = users?.find(
      (user) =>
        user?.name === reportApprover?.substring(9) &&
        user?.nik === reportApprover?.substring(0, 6)
    );

    if (!loading) {
      laboratoryTest.append("laboratory", laboratory?.trim());
      laboratoryTest.append("organizationUnit", organizationUnit?.trim());
      laboratoryTest.append("requestNumber", requestNumber?.trim());
      laboratoryTest.append("budgetNumber", budgetNumber?.trim());
      laboratoryTest.append("reasonOfTest", reasonOfTest?.trim());
      laboratoryTest.append("material", material);
      laboratoryTest.append("type", type);
      laboratoryTest.append("specification", specification);
      laboratoryTest.append("manufacturer", manufacturer?.trim());
      laboratoryTest.append("manufacturingDate", manufacturingDate?.trim());
      laboratoryTest.append("expiryDate", expiryDate?.trim());
      laboratoryTest.append("program", program?.trim());
      laboratoryTest.append("batchNumber", batchNumber?.trim());
      laboratoryTest.append("sample", sample?.trim());
      laboratoryTest.append("condition", condition?.trim());
      laboratoryTest.append("unit", unit?.trim());
      laboratoryTest.append("quantity", quantity?.trim());
      laboratoryTest.append("typeOfTest", typeOfTest);
      laboratoryTest.append(
        "testAccordingToSpecification",
        testAccordingToSpecification?.trim()
      );
      if (selectedFile) {
        laboratoryTest.append("file", selectedFile);
      }
      if (deleteAttachment) {
        laboratoryTest.append("file", null);
      }

      if (existingRequestReceiveDate) {
        laboratoryTest.append("requestDate", requestDate);
        laboratoryTest.append("requestReceiveDate", requestReceiveDate);
        laboratoryTest.append("estimationCloseDate", estimationCloseDate);

        if (requesterFound && requesterFound?.id) {
          laboratoryTest.append("requester", requesterFound.id);
        }
        if (requestApproverFound && requestApproverFound?.id) {
          laboratoryTest.append("requestApprover", requestApproverFound.id);
        }
        if (reporterFound && reporterFound?.id) {
          laboratoryTest.append("reporter", reporterFound.id);
        }
        if (reportApproverFound && reportApproverFound?.id) {
          laboratoryTest.append("reportApprover", reportApproverFound.id);
        }
      } else {
        laboratoryTest.append("requester", userId);
      }

      if (!existingRequestReceiveDate && superAdmin) {
        laboratoryTest.delete("requester");
      }
      if (!existingRequestReceiveDate && laboratoryTestAdmin) {
        laboratoryTest.delete("requester");
      }

      editLaboratoryTestRequest(id, laboratoryTest);
    }
  };

  render() {
    const {
      loading,
      showEditRequestModal,
      selectedLaboratoryTest,
      toggleEditRequestModal,
    } = this.props;
    const {
      organizationUnits,
      requestNumbers,
      materials,
      types,
      specifications,
      programs,
      reasonOfTests,
      manufacturers,
      conditions,
      testAccordingToSpecifications,
      employees,
      laboratory,
      organizationUnit,
      requestNumber,
      material,
      type,
      specification,
      program,
      budgetNumber,
      reasonOfTest,
      batchNumber,
      sample,
      condition,
      manufacturer,
      manufacturingDate,
      expiryDate,
      unit,
      quantity,
      requestAttachmentFileOriginalName,
      typeOfTest,
      testAccordingToSpecification,
      requestDate,
      requestReceiveDate,
      estimationCloseDate,
      requester,
      requestApprover,
      reporter,
      reportApprover,
      deleteAttachment,
    } = this.state;
    let laboratoryTestRequestFormInitialValues = {};

    if (showEditRequestModal) {
      laboratoryTestRequestFormInitialValues = {
        laboratory,
        organizationUnit,
        requestNumber,
        program,
        budgetNumber,
        reasonOfTest,
        material: selectedLaboratoryTest?.material,
        type: selectedLaboratoryTest?.type,
        specification: selectedLaboratoryTest?.specification,
        manufacturer,
        manufacturingDate,
        expiryDate,
        batchNumber,
        sample,
        condition,
        unit,
        quantity,
        typeOfTest: selectedLaboratoryTest?.typeOfTest,
        testAccordingToSpecification,
        requestDate,
        requestReceiveDate,
        estimationCloseDate,
        requester,
        requestApprover,
        reporter,
        reportApprover,
      };
    }
    return (
      <Modal
        className={`modal-form-xl`}
        isOpen={showEditRequestModal}
        toggle={toggleEditRequestModal}
        backdrop={true}
      >
        {showEditRequestModal && selectedLaboratoryTest ? (
          <React.Fragment>
            <Formik
              initialValues={laboratoryTestRequestFormInitialValues}
              onSubmit={this.triggerEditLaboratoryTestRequest}
              validationSchema={
                selectedLaboratoryTest?.requestReceiveDate
                  ? laboratoryTestFormByAdminValidationSchema
                  : laboratoryTestRequestFormValidationSchema
              }
            >
              {({ setFieldValue, values, touched, errors, handleChange }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Form autoComplete="off">
                    <ModalHeader>Edit Laboratory Test Request</ModalHeader>
                    <ModalBody>
                      <Container>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={laboratory}
                              fullWidth
                              getOptionLabel={(option) => option}
                              openOnFocus
                              onChange={(_event, value) => {
                                setFieldValue("laboratory", value);
                                switch (value) {
                                  case "QA 3100 - Solution Control":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsDefault,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsSolutionControl,
                                      materials: materialsSolutionControl,
                                      types: typesSolutionControl,
                                      specifications:
                                        specificationsSolutionControl,
                                      manufacturers:
                                        manufacturersSolutionControl,
                                      reasonOfTests:
                                        reasonOfTestsSolutionControl,
                                      conditions: conditionsSolutionControl,
                                    }));
                                    break;
                                  case "QA 3100 - Process Control":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsDefault,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsProcessControl,
                                      materials: materialsProcessControl,
                                      types: typesProcessControl,
                                      specifications:
                                        specificationsProcessControl,
                                      manufacturers:
                                        manufacturersProcessControl,
                                      reasonOfTests:
                                        reasonOfTestsProcessControl,
                                      conditions: conditionsProcessControl,
                                    }));
                                    break;
                                  case "QA 3100 - Kimia":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsDefault,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsKimia,
                                      materials: materialsKimia,
                                      types: typesKimia,
                                      specifications: specificationsKimia,
                                      manufacturers: manufacturersKimia,
                                      reasonOfTests: reasonOfTestsKimia,
                                      conditions: conditionsKimia,
                                    }));
                                    break;
                                  case "QA 3200 - Bonding & Composite":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsBondingAndComposite,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsBondingAndComposite,
                                      materials: materialsBondingAndComposite,
                                      types: typesBondingAndComposite,
                                      specifications:
                                        specificationsBondingAndComposite,
                                      manufacturers:
                                        manufacturersBondingAndComposite,
                                      reasonOfTests:
                                        reasonOfTestBondingAndComposite,
                                      conditions: conditionsBondingAndComposite,
                                    }));
                                    break;
                                  case "QA 3200 - Metallurgy":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsMetallurgy,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsMetallurgy,
                                      materials: materialsMetallurgy,
                                      types: typesMetallurgy,
                                      specifications: specificationsMetallurgy,
                                      manufacturers: manufacturersMetallurgy,
                                      reasonOfTests: reasonOfTestsMetallurgy,
                                      conditions: conditionsMetallurgy,
                                    }));
                                    break;
                                  default:
                                    this.setState(() => ({
                                      organizationUnits: organizationUnit,
                                      requestNumbers: requestNumbersDefault,
                                      programs: programsDefault,
                                      materials: materialsDefault,
                                      types: typesDefault,
                                      specifications: specificationsDefault,
                                      manufacturers: manufacturersDefault,
                                      reasonOfTests: reasonOfTestsDefault,
                                      conditions: conditionsDefault,
                                    }));
                                }
                              }}
                              options={laboratories}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="laboratory"
                                  label="Request for Laboratory"
                                  InputLabelProps={{ shrink: true }}
                                  error={
                                    errors.laboratory && touched.laboratory
                                  }
                                  helperText={
                                    errors.laboratory &&
                                    touched.laboratory &&
                                    errors.laboratory
                                  }
                                  value={values.laboratory}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={organizationUnit}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              openOnFocus
                              onInputChange={(_event, value) => {
                                setFieldValue("organizationUnit", value);
                                switch (values.laboratory) {
                                  case "QA 3100 - Solution Control":
                                    switch (value) {
                                      case "DM 6000":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlDM6000,
                                        }));
                                        break;
                                      case "DM 6100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlDM6100,
                                        }));
                                        break;
                                      case "DM 6200":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlDM6200,
                                        }));
                                        break;
                                      case "MPD":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlMPD,
                                        }));
                                        break;
                                      case "QA 3100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlQA3100,
                                        }));
                                        break;
                                      case "QC 3400":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlQC3400,
                                        }));
                                        break;
                                      case "QC 3500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlQC3500,
                                        }));
                                        break;
                                      case "QC 5300":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersSolutionControlQC5300,
                                        }));
                                        break;
                                      default:
                                        this.setState(() => ({
                                          requestNumbers: requestNumbersDefault,
                                        }));
                                    }
                                    break;
                                  case "QA 3100 - Process Control":
                                    switch (value) {
                                      case "DM 6000":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlDM6000,
                                        }));
                                        break;
                                      case "DM 6100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlDM6100,
                                        }));
                                        break;
                                      case "DM 6200":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlDM6200,
                                        }));
                                        break;
                                      case "MPD":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlMPD,
                                        }));
                                        break;
                                      case "QA 3100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlQA3100,
                                        }));
                                        break;
                                      case "QC 3400":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlQC3400,
                                        }));
                                        break;
                                      case "QC 3500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlQC3500,
                                        }));
                                        break;
                                      case "QC 5300":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersProcessControlQC5300,
                                        }));
                                        break;
                                      default:
                                        this.setState(() => ({
                                          requestNumbers: requestNumbersDefault,
                                        }));
                                    }
                                    break;
                                  case "QA 3200 - Bonding & Composite":
                                    switch (value) {
                                      case "QC 1300":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC1300,
                                        }));
                                        break;
                                      case "QC 1500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC1500,
                                        }));
                                        break;
                                      case "QC 3100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC3100,
                                        }));
                                        break;
                                      case "QC 3300":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC3300,
                                        }));
                                        break;
                                      case "QC 3500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC3500,
                                        }));
                                        break;
                                      case "QC 4000":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC4000,
                                        }));
                                        break;
                                      case "QC 4100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC4100,
                                        }));
                                        break;
                                      case "QC 4400":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC4400,
                                        }));
                                        break;
                                      case "QC 5300":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC5300,
                                        }));
                                        break;
                                      case "QC 5500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeQC5500,
                                        }));
                                        break;
                                      case "ACS":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeACS,
                                        }));
                                        break;
                                      case "MD - ME":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeMDME,
                                        }));
                                        break;
                                      case "Training":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersBondingAndCompositeTraining,
                                        }));
                                        break;
                                      default:
                                        this.setState(() => ({
                                          requestNumbers: requestNumbersDefault,
                                        }));
                                    }
                                    break;
                                  case "QA 3200 - Metallurgy":
                                    switch (value) {
                                      case "QA 3100":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersMetallurgyQA3100,
                                        }));
                                        break;
                                      case "QA 3400":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersMetallurgyQA3400,
                                        }));
                                        break;
                                      case "QC 1400":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersMetallurgyQC1400,
                                        }));
                                        break;
                                      case "QC 3500":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersMetallurgyQC3500,
                                        }));
                                        break;
                                      case "MD - ME":
                                        this.setState(() => ({
                                          requestNumbers:
                                            requestNumbersMetallurgyMDME,
                                        }));
                                        break;
                                      default:
                                        this.setState(() => ({
                                          requestNumbers: requestNumbersDefault,
                                        }));
                                    }
                                    break;
                                  default:
                                    this.setState(() => ({
                                      requestNumbers: requestNumbersDefault,
                                    }));
                                }
                              }}
                              options={organizationUnits}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="organizationUnit"
                                  label="Organization Unit"
                                  InputLabelProps={{ shrink: true }}
                                  value={values.organizationUnit}
                                  error={
                                    errors.organizationUnit &&
                                    touched.organizationUnit
                                  }
                                  helperText={
                                    errors.organizationUnit &&
                                    touched.organizationUnit &&
                                    errors.organizationUnit
                                  }
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={requestNumber}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("requestNumber", value);
                              }}
                              options={requestNumbers}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="requestNumber"
                                  label="Request Number"
                                  InputLabelProps={{ shrink: true }}
                                  value={values.requestNumber}
                                  error={
                                    errors.requestNumber &&
                                    touched.requestNumber
                                  }
                                  helperText={
                                    errors.requestNumber &&
                                    touched.requestNumber &&
                                    errors.requestNumber
                                  }
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={material}
                              disableCloseOnSelect
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              multiple
                              onChange={(_event, value) => {
                                setFieldValue("material", value.join(", "));
                              }}
                              openOnFocus
                              options={materials}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="material"
                                  label="Material"
                                  InputLabelProps={{ shrink: true }}
                                  value={values.material}
                                  error={errors.material && touched.material}
                                  helperText={
                                    errors.material &&
                                    touched.material &&
                                    errors.material
                                  }
                                />
                              )}
                              renderOption={(
                                option,
                                { inputValue, selected }
                              ) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <React.Fragment>
                                    <Checkbox
                                      checked={selected}
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      style={{ marginRight: 8 }}
                                    />
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </React.Fragment>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={type}
                              disableCloseOnSelect
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              multiple
                              onChange={(_event, value) => {
                                setFieldValue("type", value.join(", "));
                              }}
                              openOnFocus
                              options={types}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.type && touched.type}
                                  helperText={
                                    errors.type && touched.type && errors.type
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Type / Code"
                                  name="type"
                                  value={values.type}
                                />
                              )}
                              renderOption={(
                                option,
                                { inputValue, selected }
                              ) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <React.Fragment>
                                    <Checkbox
                                      checked={selected}
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      style={{ marginRight: 8 }}
                                    />
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </React.Fragment>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={specification}
                              disableCloseOnSelect
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              multiple
                              onChange={(_event, value) => {
                                setFieldValue(
                                  "specification",
                                  value.join(", ")
                                );
                                this.setState(() => ({
                                  testAccordingToSpecifications: [
                                    value.join(", "),
                                  ],
                                }));
                              }}
                              openOnFocus
                              options={specifications}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="specification"
                                  label="Material Specification"
                                  InputLabelProps={{ shrink: true }}
                                  value={values.specification}
                                  error={
                                    errors.specification &&
                                    touched.specification
                                  }
                                  helperText={
                                    errors.specification &&
                                    touched.specification &&
                                    errors.specification
                                  }
                                />
                              )}
                              renderOption={(
                                option,
                                { inputValue, selected }
                              ) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <React.Fragment>
                                    <Checkbox
                                      checked={selected}
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      style={{ marginRight: 8 }}
                                    />
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </React.Fragment>
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={program}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("program", value);
                              }}
                              openOnFocus
                              options={programs}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.program && touched.program}
                                  helperText={
                                    errors.program &&
                                    touched.program &&
                                    errors.program
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Program"
                                  name="program"
                                  value={values.program}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <TextField
                              error={
                                errors.budgetNumber && touched.budgetNumber
                              }
                              fullWidth
                              helperText={
                                errors.budgetNumber &&
                                touched.budgetNumber &&
                                errors.budgetNumber
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Budget No. / RV No. / JID No."
                              name="budgetNumber"
                              onChange={handleChange}
                              type="text"
                              value={values.budgetNumber}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={reasonOfTest}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("reasonOfTest", value);
                              }}
                              openOnFocus
                              options={reasonOfTests}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={
                                    errors.reasonOfTest && touched.reasonOfTest
                                  }
                                  helperText={
                                    errors.reasonOfTest &&
                                    touched.reasonOfTest &&
                                    errors.reasonOfTest
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Reason of Test"
                                  name="reasonOfTest"
                                  value={values.reasonOfTest}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={manufacturer}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("manufacturer", value);
                              }}
                              openOnFocus
                              options={manufacturers}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={
                                    errors.manufacturer && touched.manufacturer
                                  }
                                  helperText={
                                    errors.manufacturer &&
                                    touched.manufacturer &&
                                    errors.manufacturer
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Manufactured"
                                  name="manufacturer"
                                  value={values.manufacturer}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <TextField
                              error={
                                errors.manufacturingDate &&
                                touched.manufacturingDate
                              }
                              fullWidth
                              helperText={
                                errors.manufacturingDate &&
                                touched.manufacturingDate &&
                                errors.manufacturingDate
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Manufacturing Date"
                              name="manufacturingDate"
                              onChange={handleChange}
                              type="text"
                              value={values.manufacturingDate}
                            />
                          </Col>
                          <Col>
                            <TextField
                              error={errors.expiryDate && touched.expiryDate}
                              fullWidth
                              helperText={
                                errors.expiryDate &&
                                touched.expiryDate &&
                                errors.expiryDate
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Expire Date"
                              name="expiryDate"
                              onChange={handleChange}
                              type="text"
                              value={values.expiryDate}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <TextField
                              error={errors.batchNumber && touched.batchNumber}
                              fullWidth
                              helperText={
                                errors.batchNumber &&
                                touched.batchNumber &&
                                errors.batchNumber
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Batch / Roll Number"
                              name="batchNumber"
                              onChange={handleChange}
                              type="text"
                              value={values.batchNumber}
                            />
                          </Col>
                          <Col>
                            <TextField
                              fullWidth
                              value={values.sample}
                              onChange={handleChange}
                              type="text"
                              name="sample"
                              label="Quantity of Sample"
                              InputLabelProps={{ shrink: true }}
                              error={errors.sample && touched.sample}
                              helperText={
                                errors.sample && touched.sample && errors.sample
                              }
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={condition}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("condition", value);
                              }}
                              openOnFocus
                              options={conditions}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.condition && touched.condition}
                                  helperText={
                                    errors.condition &&
                                    touched.condition &&
                                    errors.condition
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Condition"
                                  name="condition"
                                  value={values.condition}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
                              defaultValue={unit}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("unit", value);
                              }}
                              openOnFocus
                              options={units}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.unit && touched.unit}
                                  helperText={
                                    errors.unit && touched.unit && errors.unit
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Unit"
                                  name="unit"
                                  value={values.unit}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            <TextField
                              error={errors.quantity && touched.quantity}
                              fullWidth
                              helperText={
                                errors.quantity &&
                                touched.quantity &&
                                errors.quantity
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Quantity of Material"
                              name="quantity"
                              onChange={handleChange}
                              type="text"
                              value={values.quantity}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={typeOfTest}
                              disableCloseOnSelect
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              multiple
                              onChange={(_event, value) => {
                                setFieldValue("typeOfTest", value.join(", "));
                              }}
                              openOnFocus
                              options={typeOfTests}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={
                                    errors.typeOfTest && touched.typeOfTest
                                  }
                                  helperText={
                                    errors.typeOfTest &&
                                    touched.typeOfTest &&
                                    errors.typeOfTest
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Type of Test"
                                  name="typeOfTest"
                                  value={values.typeOfTest}
                                />
                              )}
                              renderOption={(
                                option,
                                { inputValue, selected }
                              ) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <React.Fragment>
                                    <Checkbox
                                      checked={selected}
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      style={{ marginRight: 8 }}
                                    />
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </React.Fragment>
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              defaultValue={testAccordingToSpecification}
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue(
                                  "testAccordingToSpecification",
                                  value
                                );
                              }}
                              openOnFocus
                              options={testAccordingToSpecifications}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={
                                    errors.testAccordingToSpecification &&
                                    touched.testAccordingToSpecification
                                  }
                                  helperText={
                                    errors.testAccordingToSpecification &&
                                    touched.testAccordingToSpecification &&
                                    errors.testAccordingToSpecification
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Test According to Specification"
                                  name="testAccordingToSpecification"
                                  value={values.testAccordingToSpecification}
                                />
                              )}
                              renderOption={(option, { inputValue }) => {
                                const matches = match(option, inputValue);
                                const parts = parse(option, matches);
                                return (
                                  <div>
                                    {parts.map((part, index) => (
                                      <span
                                        key={index}
                                        style={{
                                          fontWeight: part.highlight
                                            ? 700
                                            : 400,
                                        }}
                                      >
                                        {part.text}
                                      </span>
                                    ))}
                                  </div>
                                );
                              }}
                            />
                          </Col>
                          <Col>
                            {requestAttachmentFileOriginalName &&
                            !deleteAttachment ? (
                              <div>
                                <span className="label">
                                  Attachment File | Uploaded :
                                </span>{" "}
                                <Button
                                  onClick={
                                    !loading
                                      ? () => {
                                          this.triggerDownloadLaboratoryTestAttachment();
                                        }
                                      : null
                                  }
                                  size="small"
                                  variant="outlined"
                                >
                                  {requestAttachmentFileOriginalName}
                                </Button>
                                <IconButton
                                  aria-label="delete"
                                  color="secondary"
                                  onClick={this.deleteAttachment}
                                >
                                  <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                              </div>
                            ) : (
                              <div>
                                <span className="label">
                                  Attachment File | Uploaded : No File Uploaded
                                </span>{" "}
                              </div>
                            )}
                            <Input
                              disableUnderline
                              label="Attachment File"
                              onChange={this.onFileChange}
                              type="file"
                            />
                          </Col>
                        </Row>

                        {selectedLaboratoryTest?.requestReceiveDate ? (
                          <div
                            style={{
                              borderTop: "1px solid",
                              borderColor: "#000000",
                              paddingTop: "50px",
                              marginTop: "50px",
                            }}
                          >
                            <Row
                              style={{
                                paddingBottom: "20px",
                              }}
                            >
                              <Col>
                                <div
                                  style={{
                                    fontSize: 14,
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  Request Date:
                                </div>
                                <TextField
                                  error={
                                    errors.requestDate && touched.requestDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.requestDate &&
                                    touched.requestDate &&
                                    errors.requestDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="requestDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.requestDate}
                                />
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    fontSize: 14,
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  Sample Receive Date:
                                </div>
                                <TextField
                                  error={
                                    errors.requestReceiveDate &&
                                    touched.requestReceiveDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.requestReceiveDate &&
                                    touched.requestReceiveDate &&
                                    errors.requestReceiveDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="requestReceiveDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.requestReceiveDate}
                                />
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    fontSize: 14,
                                    paddingBottom: "10px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  Estimation Close Date:
                                </div>
                                <TextField
                                  error={
                                    errors.estimationCloseDate &&
                                    touched.estimationCloseDate
                                  }
                                  fullWidth
                                  helperText={
                                    errors.estimationCloseDate &&
                                    touched.estimationCloseDate &&
                                    errors.estimationCloseDate
                                  }
                                  InputLabelProps={{ shrink: false }}
                                  name="estimationCloseDate"
                                  onChange={handleChange}
                                  type="date"
                                  value={values.estimationCloseDate}
                                />
                              </Col>
                            </Row>
                          </div>
                        ) : null}

                        {selectedLaboratoryTest?.requestReceiveDate ? (
                          <div
                            style={{
                              borderTop: "1px solid",
                              borderColor: "#000000",
                              paddingTop: "50px",
                              marginTop: "50px",
                            }}
                          >
                            <Row className="mb-4 pb-4 mt-4 pt-4">
                              <Col>
                                <Autocomplete
                                  defaultValue={requester}
                                  fullWidth
                                  getOptionLabel={(option) => option}
                                  onInputChange={(_event, value) => {
                                    setFieldValue("requester", value);
                                  }}
                                  openOnFocus
                                  options={employees}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={
                                        errors.requester && touched.requester
                                      }
                                      helperText={
                                        errors.requester &&
                                        touched.requester &&
                                        errors.requester
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      label="Requester"
                                      name="requester"
                                      value={values.requester}
                                    />
                                  )}
                                  renderOption={(option, { inputValue }) => {
                                    const matches = match(option, inputValue);
                                    const parts = parse(option, matches);
                                    return (
                                      <div>
                                        {parts.map((part, index) => (
                                          <span
                                            key={index}
                                            style={{
                                              fontWeight: part.highlight
                                                ? 700
                                                : 400,
                                            }}
                                          >
                                            {part.text}
                                          </span>
                                        ))}
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                              <Col>
                                <Autocomplete
                                  defaultValue={requestApprover}
                                  fullWidth
                                  getOptionLabel={(option) => option}
                                  onInputChange={(_event, value) => {
                                    setFieldValue("requestApprover", value);
                                  }}
                                  openOnFocus
                                  options={employees}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={
                                        errors.requestApprover &&
                                        touched.requestApprover
                                      }
                                      helperText={
                                        errors.requestApprover &&
                                        touched.requestApprover &&
                                        errors.requestApprover
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      label="Request Approver"
                                      name="requestApprover"
                                      value={values.requestApprover}
                                    />
                                  )}
                                  renderOption={(option, { inputValue }) => {
                                    const matches = match(option, inputValue);
                                    const parts = parse(option, matches);
                                    return (
                                      <div>
                                        {parts.map((part, index) => (
                                          <span
                                            key={index}
                                            style={{
                                              fontWeight: part.highlight
                                                ? 700
                                                : 400,
                                            }}
                                          >
                                            {part.text}
                                          </span>
                                        ))}
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row className="mb-4 pb-4 mt-4 pt-4">
                              <Col>
                                <Autocomplete
                                  defaultValue={reporter}
                                  fullWidth
                                  getOptionLabel={(option) => option}
                                  onInputChange={(_event, value) => {
                                    setFieldValue("reporter", value);
                                  }}
                                  openOnFocus
                                  options={employees}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={
                                        errors.reporter && touched.reporter
                                      }
                                      helperText={
                                        errors.reporter &&
                                        touched.reporter &&
                                        errors.reporter
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      label="Reporter"
                                      name="reporter"
                                      value={values.reporter}
                                    />
                                  )}
                                  renderOption={(option, { inputValue }) => {
                                    const matches = match(option, inputValue);
                                    const parts = parse(option, matches);
                                    return (
                                      <div>
                                        {parts.map((part, index) => (
                                          <span
                                            key={index}
                                            style={{
                                              fontWeight: part.highlight
                                                ? 700
                                                : 400,
                                            }}
                                          >
                                            {part.text}
                                          </span>
                                        ))}
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                              <Col>
                                <Autocomplete
                                  defaultValue={reportApprover}
                                  fullWidth
                                  getOptionLabel={(option) => option}
                                  onInputChange={(_event, value) => {
                                    setFieldValue("reportApprover", value);
                                  }}
                                  openOnFocus
                                  options={employees}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={
                                        errors.reportApprover &&
                                        touched.reportApprover
                                      }
                                      helperText={
                                        errors.reportApprover &&
                                        touched.reportApprover &&
                                        errors.reportApprover
                                      }
                                      InputLabelProps={{ shrink: true }}
                                      label="Report Approver"
                                      name="reportApprover"
                                      value={values.reportApprover}
                                    />
                                  )}
                                  renderOption={(option, { inputValue }) => {
                                    const matches = match(option, inputValue);
                                    const parts = parse(option, matches);
                                    return (
                                      <div>
                                        {parts.map((part, index) => (
                                          <span
                                            key={index}
                                            style={{
                                              fontWeight: part.highlight
                                                ? 700
                                                : 400,
                                            }}
                                          >
                                            {part.text}
                                          </span>
                                        ))}
                                      </div>
                                    );
                                  }}
                                />
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                      </Container>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        color="primary"
                        type={!loading ? "submit" : "button"}
                        variant="contained"
                      >
                        <LoadingSpinner />
                        <span className="label">Save</span>
                      </Button>
                      <Button
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        color="secondary"
                        onClick={
                          !loading
                            ? () => {
                                toggleEditRequestModal({});
                              }
                            : null
                        }
                        type="button"
                        variant="contained"
                      >
                        <LoadingSpinner />
                        <span className="label">Cancel</span>
                      </Button>
                    </ModalFooter>
                  </Form>
                </MuiPickersUtilsProvider>
              )}
            </Formik>
          </React.Fragment>
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth, qaLaboratoryTest, userManagement }) => {
  const { token } = auth;
  const { loading, showEditRequestModal, selectedLaboratoryTest } =
    qaLaboratoryTest;
  const { users } = userManagement;

  return {
    token,
    loading,
    showEditRequestModal,
    selectedLaboratoryTest,
    users,
  };
};

const mapActionsToProps = {
  toggleEditRequestModal,
  editLaboratoryTestRequest,
  downloadLaboratoryTestAttachment,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditLaboratoryTestRequestModal);
