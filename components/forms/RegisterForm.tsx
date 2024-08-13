"use client";
import { useRouter } from "next/navigation"; // or "next/router" in older versions

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";

import { createUser, getUser } from "@/lib/actions/patient.actions";
import { RadioGroup } from "../ui/radio-group";
import { GenderOptions, IdentificationTypes } from "@/constants";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  FILE_UPLOAD = "fileUpload",
}

// const RegisterForm = async ({ user }: { user: User }) => {
const RegisterForm = () => {
  //router
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // State for the message

  console.log(setIsLoading);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    console.log("Inside onsubmit");

    setIsLoading(true);

    try {
      // const userData = { name, email, phone };

      // console.log("Button Clicked in side try catch");

      // const user = await createuser(userData);

      // if (user) router.push(`/patients/${user.$id}/register`);
      // // router.push(`app\patients\[userId]\register\page.tsx`)
      setMessage("User created successfully!"); // Set success message
    } catch (error) {
      console.log(error);
      setMessage("Failed to create user."); // Set error message
    }

    // setIsLoading(false);
  }

  const navigateToMainDashboard = () => {
    router.push("suggestions");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome User</h1>
          <p className="text-dark-700">
            "Welcome to Skin Elevate, where your skin's health meets
            cutting-edge technology. Our platform allows you to easily input
            your health data, which is crucial in assessing your skin's unique
            needs. With the power of advanced AI, we analyze your data alongside
            images of your skin to provide personalized insights and
            recommendations. Our goal is to help you achieve healthier, more
            radiant skin by offering tailored advice and treatments based on
            your specific skin type and conditions. Trust in technology, and let
            us guide you on your journey to better skin.
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Personal Information</h2>
        </section>

        {/* user name input */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="Name"
          label="Full Name"
          placeholder="John "
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* user email address */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="email address"
            placeholder="abc@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email icon"
          />

          {/* user mobile number */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Mobile number"
            placeholder="+94 XXXXXXXXX"
            iconSrc="/assets/icons/"
            iconAlt="email icon"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* user birthday */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date Of Birth"
            placeholder="+94 XXXXXXXXX"
            iconSrc="/assets/icons/"
            iconAlt="email icon"
          />

          {/* user gender */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            iconAlt={""}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* user address */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="No XXX,Town "
            iconSrc="/assets/icons/email.svg"
            iconAlt="email icon"
          />

          {/* user Ocuupation */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email icon"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Emergency called person */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactPerson"
            label="Emergency Contcat Person"
            placeholder="Mr.John"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user icon"
          />
          {/* user emergency mobile number */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContact"
            label="Emergency Contact number"
            placeholder="+94 XXXXXXXXX"
            iconSrc="/assets/icons/"
            iconAlt="email icon"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Medical Information</h2>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
              iconAlt={""}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
              iconAlt={""}
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
              iconAlt={""}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
              iconAlt={""}
            />
          </div>
          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
              iconAlt={""}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
              iconAlt={""}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
            iconAlt={""}
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationDocument"
            label="Attached your Photo or Image"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
            iconAlt={""}
          />
        </section>
        <button
          type="button"
          className="shad-primary-btn w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={navigateToMainDashboard}
        >
          Generate Suggestions
        </button>

        {/* <SubmitButton isLoading={isLoading}>Generate Suggestions</SubmitButton> */}
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </Form>
  );
};

export default RegisterForm;
