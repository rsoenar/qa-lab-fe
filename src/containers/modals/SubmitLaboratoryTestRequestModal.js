import { Button, Checkbox, Input, TextField } from "@material-ui/core";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
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
  submitLaboratoryTestRequest,
  toggleSubmitRequestModal,
} from "../../redux/actions";

import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { LoadingSpinner } from "../../components/Miscellaneous";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { laboratoryTestRequestFormValidationSchema } from "../../constants/validationSchemas";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

class SubmitLaboratoryTestRequestModal extends PureComponent {
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
      laboratory: "",
      organizationUnit: "",
      requestNumber: "",
      material: "",
      type: "",
      specification: "",
      program: "",
      budgetNumber: "",
      reasonOfTest: "",
      manufacturer: "",
      manufacturingDate: "",
      expiryDate: "",
      batchNumber: "",
      sample: "",
      condition: "",
      unit: "",
      quantity: "",
      typeOfTest: "",
      testAccordingToSpecification: "",
      selectedFile: null,
    };
  }

  componentDidUpdate(prevProps, _prevState) {
    const { showSubmitRequestModal } = this.props;

    if (
      showSubmitRequestModal !== prevProps.showSubmitRequestModal &&
      showSubmitRequestModal
    ) {
      this.setState({
        selectedFile: null,
      });
    }
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  triggerSubmitLaboratoryTestRequest = (values) => {
    const { token, loading, submitLaboratoryTestRequest } = this.props;
    const { selectedFile } = this.state;
    const { id } = jwt_decode(token);
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
    } = values;
    let laboratoryTest = new FormData();

    if (!loading) {
      laboratoryTest.append("requester", id);
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
      submitLaboratoryTestRequest(laboratoryTest);
    }
  };

  render() {
    const { loading, showSubmitRequestModal, toggleSubmitRequestModal } =
      this.props;
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
    } = this.state;
    let laboratoryTestRequestFormInitialValues = {};

    if (showSubmitRequestModal) {
      laboratoryTestRequestFormInitialValues = {
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
      };
    }
    return (
      <Modal
        backdrop={true}
        className={`modal-form-xl`}
        isOpen={showSubmitRequestModal}
        toggle={toggleSubmitRequestModal}
      >
        {showSubmitRequestModal ? (
          <React.Fragment>
            <Formik
              initialValues={laboratoryTestRequestFormInitialValues}
              onSubmit={this.triggerSubmitLaboratoryTestRequest}
              validationSchema={laboratoryTestRequestFormValidationSchema}
            >
              {({ setFieldValue, values, touched, errors, handleChange }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Form autoComplete="off">
                    <ModalHeader>
                      Create a New Laboratory Test Request
                    </ModalHeader>
                    <ModalBody>
                      <Container>
                        <Row className="mb-4 pb-4 mt-4 pt-4">
                          <Col>
                            <Autocomplete
                              fullWidth
                              getOptionLabel={(option) => option}
                              onChange={(_event, value) => {
                                setFieldValue("laboratory", value);
                                switch (value) {
                                  case "QA 3100 - Solution Control":
                                    this.setState(() => ({
                                      organizationUnits:
                                        organizationUnitsSolutionControl,
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
                                        organizationUnitsProcessControl,
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
                                      organizationUnits: organizationUnitsKimia,
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
                                      organizationUnits:
                                        organizationUnitsDefault,
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
                              openOnFocus
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
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
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
                              openOnFocus
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
                              freeSolo
                              fullWidth
                              getOptionLabel={(option) => option}
                              onInputChange={(_event, value) => {
                                setFieldValue("requestNumber", value);
                              }}
                              openOnFocus
                              options={requestNumbers}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={
                                    errors.requestNumber &&
                                    touched.requestNumber
                                  }
                                  helperText={
                                    errors.requestNumber &&
                                    touched.requestNumber &&
                                    errors.requestNumber
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Request Number"
                                  name="requestNumber"
                                  value={values.requestNumber}
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
                                  error={errors.material && touched.material}
                                  helperText={
                                    errors.material &&
                                    touched.material &&
                                    errors.material
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Material*"
                                  name="material"
                                  value={values.material}
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
                                  label="Type / Code*"
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
                                  error={
                                    errors.specification &&
                                    touched.specification
                                  }
                                  helperText={
                                    errors.specification &&
                                    touched.specification &&
                                    errors.specification
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  label="Material Specification*"
                                  name="specification"
                                  value={values.specification}
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
                                  label="Reason Of Test"
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
                                  name="manufacturer"
                                  label="Manufactured"
                                  InputLabelProps={{ shrink: true }}
                                  value={values.manufacturer}
                                  error={
                                    errors.manufacturer && touched.manufacturer
                                  }
                                  helperText={
                                    errors.manufacturer &&
                                    touched.manufacturer &&
                                    errors.manufacturer
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
                              error={errors.sample && touched.sample}
                              fullWidth
                              helperText={
                                errors.sample && touched.sample && errors.sample
                              }
                              InputLabelProps={{ shrink: true }}
                              label="Quantity of Sample"
                              name="sample"
                              onChange={handleChange}
                              type="text"
                              value={values.sample}
                            />
                          </Col>
                          <Col>
                            <Autocomplete
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
                                  label="Type of Test*"
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
                            <div className="label">
                              Attachment File | Uploaded :
                            </div>
                            <Input
                              disableUnderline
                              label="Attachment File"
                              onChange={this.onFileChange}
                              type="file"
                            />
                          </Col>
                        </Row>
                      </Container>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        color="secondary"
                        onClick={
                          !loading
                            ? () => {
                                toggleSubmitRequestModal();
                              }
                            : null
                        }
                        type="button"
                        variant="contained"
                      >
                        <LoadingSpinner />
                        <span className="label">Cancel</span>
                      </Button>
                      <Button
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        color="primary"
                        type={loading ? "button" : "submit"}
                        variant="contained"
                      >
                        <LoadingSpinner />
                        <span className="label">Submit</span>
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

const mapStateToProps = ({ auth, qaLaboratoryTest }) => {
  const { token } = auth;
  const { loading, showSubmitRequestModal } = qaLaboratoryTest;

  return {
    token,
    loading,
    showSubmitRequestModal,
  };
};

const mapActionsToProps = {
  toggleSubmitRequestModal,
  submitLaboratoryTestRequest,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SubmitLaboratoryTestRequestModal);
