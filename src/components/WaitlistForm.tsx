import React, { useState } from "react";
import FormProgress from "./FormProgress";
import FormStep from "./FormStep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  interest: string;
  source: string;
}

const WaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    interest: "",
    source: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection("up");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("down");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "You've been added to the waitlist. We'll be in touch soon!",
    });
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const countryCodes = [
    { value: "+1", label: "United States (+1)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+91", label: "India (+91)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+86", label: "China (+86)" },
    { value: "+33", label: "France (+33)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+81", label: "Japan (+81)" },
  ];

  return (
    <div className="min-h-screen bg-form-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        <form onSubmit={handleSubmit} className="mt-8 relative min-h-[400px]" onKeyPress={handleKeyPress}>
          <FormStep
            question="What's your first name?"
            isActive={currentStep === 0}
            direction={direction}
          >
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-white/80"
            />
          </FormStep>

          <FormStep
            question="And your last name?"
            isActive={currentStep === 1}
            direction={direction}
          >
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              placeholder="Type your answer here..."
              className="w-full bg-white/80"
            />
          </FormStep>

          <FormStep
            question="What's your email address?"
            isActive={currentStep === 2}
            direction={direction}
          >
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-white/80"
            />
          </FormStep>

          <FormStep
            question="What's your phone number?"
            isActive={currentStep === 3}
            direction={direction}
          >
            <div className="space-y-4">
              <Select
                value={formData.countryCode}
                onValueChange={(value) => updateFormData("countryCode", value)}
              >
                <SelectTrigger className="w-full bg-white/80">
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((code) => (
                    <SelectItem key={code.value} value={code.value}>
                      {code.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full bg-white/80"
              />
            </div>
          </FormStep>

          <FormStep
            question="Why are you interested in joining this program?"
            isActive={currentStep === 4}
            direction={direction}
          >
            <Textarea
              value={formData.interest}
              onChange={(e) => updateFormData("interest", e.target.value)}
              placeholder="Tell us about your interest..."
              className="w-full bg-white/80"
            />
          </FormStep>

          <FormStep
            question="How did you hear about us?"
            isActive={currentStep === 5}
            direction={direction}
            options={[
              { key: "A", label: "Social Media" },
              { key: "B", label: "Email Newsletter" },
              { key: "C", label: "Friend/Family Referral" },
              { key: "D", label: "Podcast/Video" },
              { key: "E", label: "Other" },
            ]}
            selectedOption={formData.source}
            onOptionSelect={(key) => updateFormData("source", key)}
          />

          <div className="fixed bottom-8 right-8 flex gap-4">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            {currentStep < totalSteps - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                size="icon"
                className="rounded-full"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="px-6">
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;