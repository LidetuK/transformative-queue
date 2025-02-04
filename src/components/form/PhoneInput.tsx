import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneInputProps {
  phone: string;
  areaCode: string;
  onPhoneChange: (value: string) => void;
  onAreaCodeChange: (value: string) => void;
  error?: string;
}

const areaCodes = [
  { value: "+1", label: "North America (+1)", codes: ["201", "202", "203", "205", "206", "207", "208", "209", "210", "212", "213", "214", "215", "216", "217", "218", "219", "220", "224", "225"] },
  { value: "+44", label: "United Kingdom (+44)", codes: ["20", "113", "114", "115", "116", "117", "118", "121", "131", "141", "151"] },
  { value: "+91", label: "India (+91)", codes: ["11", "22", "33", "44", "80", "40", "79", "20", "92", "484"] },
  { value: "+61", label: "Australia (+61)", codes: ["2", "3", "4", "7", "8"] },
  { value: "+86", label: "China (+86)", codes: ["10", "20", "21", "22", "23", "24", "25", "27", "28", "29"] },
  { value: "+33", label: "France (+33)", codes: ["1", "2", "3", "4", "5"] },
  { value: "+49", label: "Germany (+49)", codes: ["30", "40", "69", "89", "201"] },
  { value: "+81", label: "Japan (+81)", codes: ["3", "6", "11", "22", "45", "52", "82", "92", "93", "99"] },
];

const validatePhoneNumber = (phone: string, areaCode: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const selectedCountry = areaCodes.find(country => 
    country.codes.some(code => areaCode.startsWith(code))
  );
  
  if (!selectedCountry) return "Please select a valid area code";
  
  switch(selectedCountry.value) {
    case "+1": // North America
      return /^\d{10}$/.test(cleanPhone) ? "" : "Please enter a valid 10-digit phone number";
    case "+44": // UK
      return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid UK phone number";
    case "+91": // India
      return /^\d{10}$/.test(cleanPhone) ? "" : "Please enter a valid 10-digit phone number";
    case "+61": // Australia
      return /^\d{9,10}$/.test(cleanPhone) ? "" : "Please enter a valid Australian phone number";
    case "+86": // China
      return /^\d{11}$/.test(cleanPhone) ? "" : "Please enter a valid Chinese phone number";
    case "+33": // France
      return /^\d{9}$/.test(cleanPhone) ? "" : "Please enter a valid French phone number";
    case "+49": // Germany
      return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid German phone number";
    case "+81": // Japan
      return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid Japanese phone number";
    default:
      return /^\d{7,15}$/.test(cleanPhone) ? "" : "Please enter a valid phone number";
  }
};

const PhoneInput = ({ phone, areaCode, onPhoneChange, onAreaCodeChange, error }: PhoneInputProps) => {
  const selectedCountry = areaCodes.find(country => 
    country.codes.some(code => areaCode.startsWith(code))
  );

  return (
    <div className="space-y-3">
      <Select
        value={areaCode}
        onValueChange={(value) => onAreaCodeChange(value)}
      >
        <SelectTrigger className="w-full bg-white/80">
          <SelectValue placeholder="Select area code" />
        </SelectTrigger>
        <SelectContent>
          {areaCodes.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phone}
        onChange={(e) => {
          const value = e.target.value.replace(/[^\d\s-()]/g, '');
          onPhoneChange(value);
        }}
        placeholder={selectedCountry?.value === "+1" ? "(555) 000-0000" : "Enter your phone number"}
        className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export { PhoneInput, validatePhoneNumber };