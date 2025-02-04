import React, { useState, useEffect } from "react";
import FormProgress from "./FormProgress";
import FormStep from "./FormStep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  interest: string;
  source: string;
  termsAccepted: boolean;
}

const WaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    interest: "",
    source: "",
    termsAccepted: false,
  });

  const totalSteps = 8; // Increased by 1 for success message step

  const validatePhoneNumber = (phone: string, countryCode: string) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Basic validation based on country code
    switch(countryCode) {
      case "+1": // US/Canada
        return /^\d{10}$/.test(cleanPhone) ? "" : "Please enter a valid 10-digit phone number";
      case "+44": // UK
        return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid UK phone number (10-11 digits)";
      case "+91": // India
        return /^\d{10}$/.test(cleanPhone) ? "" : "Please enter a valid 10-digit phone number";
      case "+61": // Australia
        return /^\d{9,10}$/.test(cleanPhone) ? "" : "Please enter a valid Australian phone number";
      case "+86": // China
        return /^\d{11}$/.test(cleanPhone) ? "" : "Please enter a valid Chinese phone number (11 digits)";
      case "+33": // France
        return /^\d{9}$/.test(cleanPhone) ? "" : "Please enter a valid French phone number (9 digits)";
      case "+49": // Germany
        return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid German phone number";
      case "+81": // Japan
        return /^\d{10,11}$/.test(cleanPhone) ? "" : "Please enter a valid Japanese phone number";
      default:
        return /^\d{7,15}$/.test(cleanPhone) ? "" : "Please enter a valid phone number";
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        if (!formData.firstName.trim()) {
          setError("Please enter your first name");
          return false;
        }
        break;
      case 1:
        if (!formData.lastName.trim()) {
          setError("Please enter your last name");
          return false;
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          setError("Please enter your email address");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
        break;
      case 3:
        if (!formData.countryCode) {
          setError("Please select a country code");
          return false;
        }
        if (!formData.phone.trim()) {
          setError("Please enter your phone number");
          return false;
        }
        const phoneError = validatePhoneNumber(formData.phone, formData.countryCode);
        if (phoneError) {
          setError(phoneError);
          return false;
        }
        break;
      case 4:
        if (!formData.interest.trim()) {
          setError("Please tell us about your interest");
          return false;
        }
        break;
      case 5:
        if (!formData.termsAccepted) {
          setError("Please accept the terms and conditions to continue");
          return false;
        }
        break;
      case 6:
        if (!formData.source) {
          setError("Please select how you heard about us");
          return false;
        }
        break;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      if (validateCurrentStep()) {
        setDirection("up");
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("down");
      setCurrentStep((prev) => prev - 1);
      setError(""); // Clear any existing error when going back
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: 'b838d334-7062-4c41-a894-de5f0dd8f25b',
            from_name: "Waitlist Form",
            to: "thee.lifeguide@gmail.com",
            subject: "New Waitlist Submission",
            message: `
              First Name: ${formData.firstName}
              Last Name: ${formData.lastName}
              Email: ${formData.email}
              Phone: ${formData.countryCode} ${formData.phone}
              Interest: ${formData.interest}
              Source: ${formData.source}
            `,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send email');
        }

        setIsSubmitted(true);
        setDirection("up");
        setCurrentStep(totalSteps - 1);
      } catch (error) {
        console.error('Error sending email:', error);
        toast({
          title: "Error",
          description: "There was a problem submitting your form. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
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

  // Add effect to auto-advance when terms are accepted
  useEffect(() => {
    if (currentStep === 5 && formData.termsAccepted) {
      handleNext();
    }
  }, [formData.termsAccepted]);

  return (
    <div className="min-h-screen bg-form-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        <form 
          onSubmit={handleSubmit} 
          className="mt-6 relative min-h-[350px]"
          onKeyPress={handleKeyPress}
        >
          {error && (
            <div className="absolute top-0 left-0 right-0 text-red-500 text-sm mb-2 bg-red-50/80 p-2 rounded animate-slideDown">
              {error}
            </div>
          )}

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
              className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
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
              className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
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
              className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
            />
          </FormStep>

          <FormStep
            question="What's your phone number?"
            isActive={currentStep === 3}
            direction={direction}
          >
            <div className="space-y-3">
              <Select
                value={formData.countryCode}
                onValueChange={(value) => {
                  updateFormData("countryCode", value);
                  // Clear any existing error when country code changes
                  setError("");
                }}
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
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d\s-()]/g, '');
                  updateFormData("phone", value);
                }}
                placeholder={formData.countryCode === "+1" ? "(555) 000-0000" : "Enter your phone number"}
                className="w-full bg-white/80 border-form-accent focus:ring-form-accent"
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
              className="w-full bg-white/80 border-form-accent focus:ring-form-accent min-h-[120px]"
            />
          </FormStep>

          <FormStep
            question="Terms and Conditions"
            isActive={currentStep === 5}
            direction={direction}
          >
            <div className="space-y-4 text-left">
              <div className="prose prose-sm max-w-none">
                <p className="text-form-text font-medium">
                  By clicking "Submit," you agree to the following:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-form-text text-sm">
                  <li>You consent to receive emails, phone calls, and SMS messages from Resk'Que's team or Robbins Research International to provide updates on your waitlist status and/or for marketing purposes.</li>
                  <li>Message frequency will be based on your activity.</li>
                  <li>You may opt out of SMS notifications at any time by texting "STOP."</li>
                  <li>Message and data rates may apply.</li>
                </ul>
                <p className="mt-4 text-form-text text-sm">
                  For more information, please review our{" "}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => 
                    updateFormData("termsAccepted", checked ? "true" : "false")
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-form-text cursor-pointer"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          </FormStep>

          <FormStep
            question="How did you hear about us?"
            isActive={currentStep === 6}
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

          <FormStep
            question="Success!"
            isActive={currentStep === totalSteps - 1}
            direction={direction}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-form-text">
                You've been added to the waitlist
              </h3>
              <p className="text-gray-600">
                We'll be in touch soon!
              </p>
            </div>
          </FormStep>

          <div className="md:fixed md:bottom-8 md:right-8 flex gap-4 mt-6 justify-end sticky bottom-4 right-4 z-10">
            {currentStep > 0 && currentStep < totalSteps - 1 && (
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                size="icon"
                className="rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            {currentStep < totalSteps - 2 ? (
              <Button
                type="button"
                onClick={handleNext}
                size="icon"
                className="rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            ) : currentStep === totalSteps - 2 ? (
              <Button 
                type="submit" 
                className="px-6 shadow-lg hover:shadow-xl transition-all bg-black text-white hover:bg-gray-800"
              >
                Submit
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;
