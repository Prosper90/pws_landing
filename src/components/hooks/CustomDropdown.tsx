import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

type DropdownItem = DropdownOption | string;

interface CustomDropdownProps {
  options: DropdownItem[];
  onSelect: (selectedValue: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export const CustomDropdown = ({
  options,
  onSelect,
  placeholder = "Select an option",
  initialValue = "",
  className = "",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to always have {value, label} format
  const normalizedOptions = options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }
    return option;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle initial value
  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLabel = normalizedOptions.find(opt => opt.value === selectedValue)?.label || placeholder;

  return (
    <div 
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span className={`truncate ${!selectedValue ? 'text-gray-400' : ''}`}>
          {selectedLabel}
        </span>
        <ChevronDown 
          className={`w-5 h-5 ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="py-1 overflow-auto text-base border border-gray-300 rounded-md max-h-60 focus:outline-none">
            {normalizedOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                  selectedValue === option.value ? 'bg-indigo-100 text-indigo-800' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};