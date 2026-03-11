"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  name: string;
  options: Option[];
  defaultValue?: string[];
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  name,
  options,
  defaultValue = [],
  placeholder = "اختر...",
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Hidden inputs for form submission */}
      {selectedValues.map((val) => (
        <input key={val} type="hidden" name={name} value={val} />
      ))}
      {/* If nothing is selected, we still want to submit an empty array (or nothing), but FormData won't include it if no inputs exist. We handle this in Server Actions by reading getAll(). */}

      <div
        className="w-full min-h-[56px] bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-wrap items-center gap-2 cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-2 focus-within:ring-primary-light-green/20 focus-within:border-primary-light-green"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2 flex-grow">
            {selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light-green/10 text-primary-dark-green text-sm font-tajawal font-medium"
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => removeOption(e, opt.value)}
                  className="p-0.5 rounded-full hover:bg-primary-light-green/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 font-cairo flex-grow select-none">{placeholder}</span>
        )}

        <div className="shrink-0 text-gray-400">
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto animate-in fade-in slide-in-from-top-2">
          {options.length > 0 ? (
            <ul className="py-2">
              {options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <li
                    key={opt.value}
                    className={`px-4 py-3 cursor-pointer flex items-center justify-between font-cairo transition-colors ${
                      isSelected ? "bg-primary-light-green/5 text-primary-dark-green" : "hover:bg-gray-50 text-gray-700"
                    }`}
                    onClick={() => toggleOption(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-primary-dark-green" />}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 font-cairo text-sm">
              لا توجد خيارات متاحة.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
