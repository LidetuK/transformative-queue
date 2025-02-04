import React from "react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage, ensuring 100% on the last step
  const progress = currentStep === totalSteps - 1 ? 100 : (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-form-progress transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default FormProgress;