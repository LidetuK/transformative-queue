import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface InterestInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const InterestInput = ({ value, onChange, error }: InterestInputProps) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tell us about your interest..."
      className="w-full bg-white/80 border-form-accent focus:ring-form-accent min-h-[120px]"
    />
  );
};

export default InterestInput;