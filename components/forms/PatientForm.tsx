"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'

    
}



const PatientForm = ()=> {

  //router
  const router= useRouter();
  const [isLoading ,setIsLoading]=useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  // 2. Define a submit handler.
 async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    
    setIsLoading(true);
    try{

        // catch the user data and store it 
        // const userData={
        //   name,email,phone  
        // }
        // create a user object
        // const user=await createUser(userData); 

        //redirect user to store data
        // if(user) router.push('/patient/${user.$id}/register')

    }catch(error)
    {
        console.log(error);
    }
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
        
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm