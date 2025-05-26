import { useState } from "react";
import { Upload, X } from "lucide-react";

interface CustomDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  className?: string;
  value?: string;
}

const CustomDropdown = ({ options, onSelect, placeholder, className = "", value }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-left flex justify-between items-center"
      >
        <span className={selectedValue ? "text-black" : "text-gray-400"}>
          {selectedValue || placeholder}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface IFormData {
  country: string;
  manufacturerName: string;
  category: string;
  applicantName: string;
  position: string;
  email: string;
  pitchDeck: File | null;
  financingType: string;
}

export default function Manufacturers() {
  const [formData, setFormData] = useState<IFormData>({
    country: "",
    manufacturerName: "",
    category: "",
    applicantName: "",
    position: "",
    email: "",
    pitchDeck: null,
    financingType: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof IFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const countries = [
    "Benin Republic", "Carbo Verde", "Côte d'Ivoire", "The Gambia", 
    "Ghana", "Guinea", "Guinea-Bissau", "Liberia", "Nigeria", 
    "Senegal", "Sierra Leone", "Togo"
  ];

  const categories = [
    "Pharmaceutical manufacturer", 
    "Medical device Manufacturers", 
    "Others"
  ];

  const positions = ["CEO", "DIRECTOR", "CFO", "OTHERS"];

  const financingTypes = ["Debt", "Equity", "Convertible Note"];

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof IFormData, string>> = {};

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Manufacturer name validation
    if (!formData.manufacturerName.trim()) {
      newErrors.manufacturerName = 'Manufacturer name is required';
    } else if (formData.manufacturerName.trim().length < 2) {
      newErrors.manufacturerName = 'Manufacturer name must be at least 2 characters';
    }

    // Category validation
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    // Applicant name validation
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant name is required';
    } else if (formData.applicantName.trim().length < 2) {
      newErrors.applicantName = 'Applicant name must be at least 2 characters';
    }

    // Position validation
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Pitch deck validation
    if (!formData.pitchDeck) {
      newErrors.pitchDeck = 'Pitch deck is required';
    }

    // Financing type validation
    if (!formData.financingType.trim()) {
      newErrors.financingType = 'Financing type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof IFormData;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handleDropdownChange = (field: keyof IFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type (accept PDF, DOC, DOCX, PPT, PPTX)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        pitchDeck: 'Please upload a PDF, Word document, or PowerPoint file'
      }));
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        pitchDeck: 'File size must be less than 10MB'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      pitchDeck: file
    }));

    // Clear error
    if (errors.pitchDeck) {
      setErrors(prev => ({
        ...prev,
        pitchDeck: ''
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      pitchDeck: null
    }));
  };

  const handleSubmit = () => {
    
    if (validateForm()) {
      setIsSubmitted(true);
      setShowConfirmation(true);
      
      // Simulate API call
      setTimeout(() => {
        setShowConfirmation(false);
        setIsSubmitted(false);
        // Reset form or redirect
        console.log('Form submitted successfully:', formData);
      }, 3000);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your submission. We'll review your application and get back to you soon.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">PWS</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Manufacturers Information</h1>
          <p className="text-gray-500 text-center mb-8">
            Please complete all required fields to submit your application
          </p>

          <div className="space-y-6">
            {/* Country */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-start">
                Country <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={countries}
                onSelect={(value) => handleDropdownChange('country', value)}
                placeholder="Choose your country..."
                value={formData.country}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Manufacturer Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-start">
                Name Of Manufacturer <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="manufacturerName"
                value={formData.manufacturerName}
                onChange={handleInputChange}
                placeholder="Enter manufacturer name"
                className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.manufacturerName && (
                <p className="text-red-500 text-sm mt-1">{errors.manufacturerName}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-start">
                Category of Manufacturing <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={categories}
                onSelect={(value) => handleDropdownChange('category', value)}
                placeholder="Choose category..."
                value={formData.category}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Contact Info Section */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4 ">Contact Information</h3>
              
              {/* Applicant Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-start">
                  Name of Applicant <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  placeholder="Enter applicant name"
                  className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.applicantName && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicantName}</p>
                )}
              </div>

              {/* Position */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-start">
                  Position <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  options={positions}
                  onSelect={(value) => handleDropdownChange('position', value)}
                  placeholder="Choose position..."
                  value={formData.position}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-start">
                  Email (Contact Email) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter contact email"
                  className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Pitch Deck Upload */}
            <div className="border-t pt-6">
              <label className="block text-gray-700 font-medium mb-2 text-start">
                Pitch Deck <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {formData.pitchDeck ? (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="flex items-center">
                      <Upload className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{formData.pitchDeck.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop your pitch deck here, or{" "}
                      <label className="text-blue-500 cursor-pointer hover:underline text-start">
                        browse files
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-400">
                      PDF, DOC, DOCX, PPT, PPTX (max 10MB)
                    </p>
                  </div>
                )}
              </div>
              {errors.pitchDeck && (
                <p className="text-red-500 text-sm mt-1">{errors.pitchDeck}</p>
              )}
            </div>

            {/* Financing Type */}
            <div className="border-t pt-6">
              <label className="block text-gray-700 font-medium mb-2 text-start">
                Types of Financing <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={financingTypes}
                onSelect={(value) => handleDropdownChange('financingType', value)}
                placeholder="Choose financing type..."
                value={formData.financingType}
              />
              {errors.financingType && (
                <p className="text-red-500 text-sm mt-1">{errors.financingType}</p>
              )}
            </div>

            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="w-full bg-[#5C97FF] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? 'Submitting...' : 'Submit Application'}
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
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
              <a href="/auth/login" className="text-blue-500 font-medium hover:underline">
                Login Instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}