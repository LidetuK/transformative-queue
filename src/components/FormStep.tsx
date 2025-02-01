import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormStepProps {
  question: string;
  children: React.ReactNode;
  isActive: boolean;
  direction?: "up" | "down";
  options?: { key: string; label: string }[];
  selectedOption?: string;
  onOptionSelect?: (key: string) => void;
}

const FormStep: React.FC<FormStepProps> = ({
  question,
  children,
  isActive,
  direction = "up",
  options,
  selectedOption,
  onOptionSelect,
}) => {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto transition-all duration-500",
        direction === "up" ? "animate-slideUp" : "animate-slideDown"
      )}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-form-text mb-2">{question}</h2>
      </div>

      {options ? (
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => onOptionSelect?.(option.key)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-form-selected focus:outline-none focus:ring-2 focus:ring-form-accent",
                selectedOption === option.key
                  ? "bg-form-selected"
                  : "bg-white/80",
                "flex justify-between items-center"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 text-xs border rounded-sm text-center leading-6">
                  {option.key}
                </span>
                {option.label}
              </span>
              {selectedOption === option.key && (
                <Check className="w-5 h-5 text-form-accent" />
              )}
            </button>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default FormStep;