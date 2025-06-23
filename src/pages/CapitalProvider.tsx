import { useState } from "react";
import { Upload, X } from "lucide-react";
import { CustomDropdown } from "../components/utils/CustomDropdown";

interface IFormData {
  organisation_name: string;
  country_of_registration: string;
  organisation_type: string;
  website: string;
  contact_person_name: string;
  contact_person_title: string;
  contact_phone: string;
  contact_email: string;
  funding_size_range: string;
  investment_types: string[];
  sectors_of_interest: string[];
  project_stage_preferences: string[];
  preferred_report_frequency: string;
  certificate: File | null;
  aml_policy: File | null;
  logo: File | null;
}

export default function CapitalProvider() {
  const [formData, setFormData] = useState<IFormData>({
    organisation_name: "",
    country_of_registration: "",
    organisation_type: "",
    website: "",
    contact_person_name: "",
    contact_person_title: "",
    contact_phone: "",
    contact_email: "",
    funding_size_range: "",
    investment_types: [],
    sectors_of_interest: [],
    project_stage_preferences: [],
    preferred_report_frequency: "",
    certificate: null,
    aml_policy: null,
    logo: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormData, string>>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({
    certificate: false,
    aml_policy: false,
    logo: false,
  });

  const countries = [
    "Benin Republic",
    "Carbo Verde",
    "Côte d'Ivoire",
    "The Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Liberia",
    "Nigeria",
    "Senegal",
    "Sierra Leone",
    "Togo",
  ];

  const organisationTypes = [
    "Development Finance Institution",
    "Commercial Bank",
    "VC",
    "Philanthropic Investor",
    "Others",
  ];

  const fundingSizeRanges = ["$1M–$10M", "$10M–$50M", "$50M–$100M", "$100M+"];

  const investmentTypes = [
    "Equity",
    "Debt",
    "Grant",
    "Guarantee",
    "Blended Finance",
  ];

  const sectorsOfInterest = ["Pharmaceuticals", "Medical devices", "Others"];

  const projectStagePreferences = ["Early-stage", "Growth", "Mature"];

  const reportFrequencies = ["Monthly", "Quarterly", "On Milestones"];

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url: string) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof IFormData, string>> = {};

    if (!formData.organisation_name.trim()) {
      newErrors.organisation_name = "Organisation name is required";
    } else if (formData.organisation_name.trim().length < 2) {
      newErrors.organisation_name =
        "Organisation name must be at least 2 characters";
    }

    if (!formData.country_of_registration.trim()) {
      newErrors.country_of_registration = "Country of registration is required";
    }

    if (!formData.organisation_type.trim()) {
      newErrors.organisation_type = "Organisation type is required";
    }

    if (formData.website && !validateURL(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof IFormData, string>> = {};

    if (!formData.contact_person_name.trim()) {
      newErrors.contact_person_name = "Contact person name is required";
    } else if (formData.contact_person_name.trim().length < 2) {
      newErrors.contact_person_name = "Name must be at least 2 characters";
    }

    if (!formData.contact_person_title.trim()) {
      newErrors.contact_person_title = "Job title is required";
    }

    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = "Phone number is required";
    }

    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "Email is required";
    } else if (!validateEmail(formData.contact_email)) {
      newErrors.contact_email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Partial<Record<keyof IFormData, string>> = {};

    if (!formData.funding_size_range.trim()) {
      newErrors.funding_size_range = "Funding size range is required";
    }

    if (formData.investment_types.length === 0) {
      newErrors.investment_types =
        "At least one investment type must be selected";
    }

    if (formData.sectors_of_interest.length === 0) {
      newErrors.sectors_of_interest = "At least one sector must be selected";
    }

    if (formData.project_stage_preferences.length === 0) {
      newErrors.project_stage_preferences =
        "At least one project stage must be selected";
    }

    if (!formData.preferred_report_frequency.trim()) {
      newErrors.preferred_report_frequency = "Report frequency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof IFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleDropdownChange = (field: keyof IFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleMultiSelectChange = (
    field: keyof IFormData,
    values: string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileUpload = (
    file: File,
    fileType: "certificate" | "aml_policy" | "logo"
  ) => {
    // Validate file type
    let allowedTypes: string[] = [];

    if (fileType === "logo") {
      allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else {
      allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
    }

    if (!allowedTypes.includes(file.type)) {
      const typeError =
        fileType === "logo"
          ? "Please upload a JPG, JPEG, or PNG image"
          : "Please upload a PDF or Word document";

      setErrors((prev) => ({
        ...prev,
        [fileType]: typeError,
      }));
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [fileType]: "File size must be less than 10MB",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fileType]: file,
    }));

    // Clear error
    if (errors[fileType]) {
      setErrors((prev) => ({
        ...prev,
        [fileType]: "",
      }));
    }
  };

  const handleDrag = (
    e: React.DragEvent,
    fileType: "certificate" | "aml_policy" | "logo"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [fileType]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [fileType]: false }));
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    fileType: "certificate" | "aml_policy" | "logo"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [fileType]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], fileType);
    }
  };

  const removeFile = (fileType: "certificate" | "aml_policy" | "logo") => {
    setFormData((prev) => ({
      ...prev,
      [fileType]: null,
    }));
  };

  const nextStep = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      setIsSubmitted(true);
      setShowConfirmation(true);

      // Simulate API call
      setTimeout(() => {
        setShowConfirmation(false);
        setIsSubmitted(false);
        console.log("Capital Provider application submitted:", formData);
      }, 3000);
    }
  };

  const FileUploadComponent = ({
    fileType,
    label,
    acceptedFormats,
  }: {
    fileType: "certificate" | "aml_policy" | "logo";
    label: string;
    acceptedFormats: string;
  }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2 text-start">
        {label} {fileType !== "logo" && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive[fileType]
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
        }`}
        onDragEnter={(e) => handleDrag(e, fileType)}
        onDragLeave={(e) => handleDrag(e, fileType)}
        onDragOver={(e) => handleDrag(e, fileType)}
        onDrop={(e) => handleDrop(e, fileType)}
      >
        {formData[fileType] ? (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <div className="flex items-center">
              <Upload className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                {formData[fileType]?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeFile(fileType)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your {label.toLowerCase()} here, or{" "}
              <label className="text-blue-500 cursor-pointer hover:underline">
                browse files
                <input
                  type="file"
                  className="hidden"
                  accept={fileType === "logo" ? "image/*" : ".pdf,.doc,.docx"}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], fileType);
                    }
                  }}
                />
              </label>
            </p>
            <p className="text-sm text-gray-400">{acceptedFormats}</p>
          </div>
        )}
      </div>
      {errors[fileType] && (
        <p className="text-red-500 text-sm mt-1">{errors[fileType]}</p>
      )}
    </div>
  );

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="p-8 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your Capital Provider application. We'll review your
              submission and get back to you soon.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center p-6">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <a
            href="/"
            className="h-8 w-8 mr-2 flex items-center justify-center text-xs font-bold"
          >
            <img src="/logo.png" alt="" />
          </a>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                Basic Information
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Tell us about your organization
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Organisation Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organisation_name"
                    value={formData.organisation_name}
                    onChange={handleInputChange}
                    placeholder="Enter organisation name"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.organisation_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.organisation_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Country of Registration{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={countries}
                    onSelect={(value) =>
                      handleDropdownChange("country_of_registration", value)
                    }
                    placeholder="Choose country..."
                    value={formData.country_of_registration}
                  />
                  {errors.country_of_registration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country_of_registration}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Type of Organisation <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={organisationTypes}
                    onSelect={(value) =>
                      handleDropdownChange("organisation_type", value)
                    }
                    placeholder="Choose organisation type..."
                    value={formData.organisation_type}
                  />
                  {errors.organisation_type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.organisation_type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.website}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Person */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                Contact Person
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Primary contact information
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact_person_name"
                    value={formData.contact_person_name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.contact_person_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_person_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact_person_title"
                    value={formData.contact_person_title}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.contact_person_title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_person_title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.contact_phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.contact_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Investment Profile */}
          {currentStep === 3 && (
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                Investment Profile
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Define your investment preferences
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Funding Size Range <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={fundingSizeRanges}
                    onSelect={(value) =>
                      handleDropdownChange("funding_size_range", value)
                    }
                    placeholder="Choose funding range..."
                    value={formData.funding_size_range}
                  />
                  {errors.funding_size_range && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.funding_size_range}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Investment Type (check all that apply){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={investmentTypes}
                    onMultiSelect={(values) =>
                      handleMultiSelectChange("investment_types", values)
                    }
                    placeholder="Select investment types..."
                    value=""
                    multiple={true}
                    selectedValues={formData.investment_types}
                  />
                  {errors.investment_types && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.investment_types}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Sectors of Interest <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={sectorsOfInterest}
                    onMultiSelect={(values) =>
                      handleMultiSelectChange("sectors_of_interest", values)
                    }
                    placeholder="Select sectors..."
                    value=""
                    multiple={true}
                    selectedValues={formData.sectors_of_interest}
                  />
                  {errors.sectors_of_interest && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sectors_of_interest}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Project Stage Preference{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={projectStagePreferences}
                    onMultiSelect={(values) =>
                      handleMultiSelectChange(
                        "project_stage_preferences",
                        values
                      )
                    }
                    placeholder="Select project stages..."
                    value=""
                    multiple={true}
                    selectedValues={formData.project_stage_preferences}
                  />
                  {errors.project_stage_preferences && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.project_stage_preferences}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-start">
                    Preferred Report Frequency{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={reportFrequencies}
                    onSelect={(value) =>
                      handleDropdownChange("preferred_report_frequency", value)
                    }
                    placeholder="Choose report frequency..."
                    value={formData.preferred_report_frequency}
                  />
                  {errors.preferred_report_frequency && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferred_report_frequency}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Compliance & Documents */}
          {currentStep === 4 && (
            <div>
              <h1 className="text-3xl font-bold text-center mb-2">
                Compliance & Documents
              </h1>
              <p className="text-gray-500 text-center mb-8">
                Upload required documents
              </p>

              <div className="space-y-8">
                <FileUploadComponent
                  fileType="certificate"
                  label="Certificate of Incorporation"
                  acceptedFormats="PDF, DOC, DOCX (max 10MB)"
                />

                <FileUploadComponent
                  fileType="aml_policy"
                  label="AML/CFT Policy Statement"
                  acceptedFormats="PDF, DOC, DOCX (max 10MB)"
                />

                <FileUploadComponent
                  fileType="logo"
                  label="Organization Logo"
                  acceptedFormats="JPG, JPEG, PNG (max 10MB)"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}

            <div className="ml-auto">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#5C97FF] text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="px-6 py-3 bg-[#5C97FF] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>

          {currentStep === 4 && (
            <>
              <div className="text-center text-sm text-gray-500 mt-6">
                By submitting, you agree to our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </div>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Login Instead
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
