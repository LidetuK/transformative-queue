import React from "react";
import { Input } from "@/components/ui/input";

interface PersonalInfoProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}

const PersonalInfo = ({ value, onChange, placeholder, error }: PersonalInfoProps) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
    />
  );
};

export default PersonalInfo;