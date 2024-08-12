"use client";
import { useRouter } from "next/navigation"; // or "next/router" in older versions

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";

import { createuser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RegisterForm = () => {
  console.log("PatientForm Rebuilds");

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
          name="Name"
          label="Full Name"
          placeholder="John "
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
        />

        {/* user email address */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="User email address"
          label="email address"
          placeholder="abc@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />

        {/* user mobile number */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="User mobile phone number"
          label="Mobile number"
          placeholder="+94 XXXXXXXXX"
          iconSrc="/assets/icons/"
          iconAlt="email icon"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </Form>
  );
};

export default RegisterForm;
