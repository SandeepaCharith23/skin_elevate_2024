"use client";
import { useRouter } from "next/navigation"; // or "next/router" in older versions

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";

import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const PatientForm = () => {
  console.log("PatientForm Rebuilds");

  //router
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // State for the message

  // console.log(setIsLoading);

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
  // async function onSubmit(values: z.infer<typeof UserFormValidation>) {
  //   // Do something with the form values.
  //   console.log("Inside onsubmit");

  //   setIsLoading(true);

  //   try {
  //     const userData = {
  //       name: values.name,
  //       email: values.email,
  //       phone: values.phone,
  //     };
  //     console.log("Button Clicked in side try catch");
  //     const user = await createuser(userData);
  //     if (user) router.push(`patients/${user.$id}/register`);

  //     setMessage("User created successfully! inside onsubmit"); // Set success message
  //   } catch (error) {
  //     console.log(error);
  //     setMessage("Failed to create user."); // Set error message
  //   }

  //   setIsLoading(false);
  // }

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser && newUser.$id) {
        router.push(`/patients/${newUser.$id}/register`);
        setMessage("User created successfully!"); // Set success message
      } else {
        setMessage("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while creating the user:", error);
      setMessage("An error occurred while creating the user."); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle manual redirection to registration page
  const handleRedirect = () => {
    // You can redirect to any route you want here
    router.push("patients");
  };

  const navigateToMainDashboard = () => {
    router.push("patients");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
          <h1 className="header">Hi user</h1>
          <p className="text-dark-700">Welcome to Skin Elevate 2024</p>
        </section>

        {/* user name input */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John "
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

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

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        <button
          type="button"
          className="shad-primary-btn w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={navigateToMainDashboard}
        >
          Main Dashboard
        </button>

        {/* Manual Redirect Button */}
        {/* <button
          type="submit"
          onClick={handleRedirect}
          className="shad-primary-btn w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          log in
        </button> */}
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </Form>
  );
};

export default PatientForm;
