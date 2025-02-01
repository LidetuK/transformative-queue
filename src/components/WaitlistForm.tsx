import React, { useState } from "react";
import FormProgress from "./FormProgress";
import FormStep from "./FormStep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  source: string;
}

const WaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    source: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "You've been added to the waitlist. We'll be in touch soon!",
    });
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-form-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        <form onSubmit={handleSubmit} className="mt-8 relative min-h-[400px]">
          <FormStep
            question="What's your first name?"
            isActive={currentStep === 0}
          >
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              placeholder="Enter your first name"
              className="w-full"
            />
          </FormStep>

          <FormStep
            question="And your last name?"
            isActive={currentStep === 1}
          >
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              placeholder="Enter your last name"
              className="w-full"
            />
          </FormStep>

          <FormStep
            question="What's your email address?"
            isActive={currentStep === 2}
          >
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </FormStep>

          <FormStep
            question="What's your phone number?"
            isActive={currentStep === 3}
          >
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </FormStep>

          <FormStep
            question="Why are you interested in joining this program?"
            isActive={currentStep === 4}
          >
            <Textarea
              value={formData.interest}
              onChange={(e) => updateFormData("interest", e.target.value)}
              placeholder="Tell us about your interest..."
              className="w-full"
            />
          </FormStep>

          <FormStep
            question="How did you hear about us?"
            isActive={currentStep === 5}
          >
            <select
              value={formData.source}
              onChange={(e) => updateFormData("source", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select an option</option>
              <option value="social">Social Media</option>
              <option value="email">Email Newsletter</option>
              <option value="referral">Friend/Family Referral</option>
              <option value="podcast">Podcast/Video</option>
              <option value="other">Other</option>
            </select>
          </FormStep>

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button type="button" onClick={handlePrevious} variant="outline">
                Previous
              </Button>
            )}
            {currentStep < totalSteps - 1 ? (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
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