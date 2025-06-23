import React, { useState } from "react";

interface CustomDropdownProps {
  options: string[];
  onSelect?: (value: string) => void;
  placeholder: string;
  className?: string;
  value?: string;
  multiple?: boolean;
  selectedValues?: string[];
  onMultiSelect?: (values: string[]) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  onMultiSelect,
  placeholder,
  value,
  className = "",
  multiple = false,
  selectedValues = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (option: string) => {
    if (multiple && onMultiSelect) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      onMultiSelect(newValues);
    } else {
      setSelectedValue(option);
      if (onSelect) {
        onSelect(option);
      }
      setIsOpen(false);
    }
  };

  const displayValue = multiple
    ? selectedValues.length > 0
      ? selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} selected`
      : placeholder
    : selectedValue || placeholder;

  const hasValue = multiple ? selectedValues.length > 0 : selectedValue;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-left flex justify-between items-center"
      >
        <span className={hasValue ? "text-black" : "text-gray-400"}>
          {displayValue}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center ${
                multiple && selectedValues.includes(option) ? "bg-blue-100" : ""
              }`}
            >
              {multiple && (
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => {}}
                  className="mr-2"
                  readOnly
                />
              )}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
