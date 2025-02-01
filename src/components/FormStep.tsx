import React from "react";
import { cn } from "@/lib/utils";

interface FormStepProps {
  question: string;
  children: React.ReactNode;
  isActive: boolean;
}

const FormStep: React.FC<FormStepProps> = ({ question, children, isActive }) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full transition-all duration-300",
        isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      <h2 className="text-2xl font-semibold mb-6 text-form-text">{question}</h2>
      {children}
    </div>
  );
};

export default FormStep;