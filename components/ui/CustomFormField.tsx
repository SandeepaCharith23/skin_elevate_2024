"use client"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Control, Field } from 'react-hook-form'
import { FormFieldType } from '../forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput, { Value } from 'react-phone-number-input'
  

  interface CustomProps{
    control: Control<any>,
    fieldType:FormFieldType,
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode,
  }

  const RederField=({field,props}:{field:any;props:CustomProps}) =>{
    const {fieldType,placeholder,iconSrc,iconAlt}=props;
    switch(fieldType)
    {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border-dark-500 bg-dark-400'>
                   {iconSrc && (
                    <Image 
                    src={iconSrc}
                    alt={iconAlt}
                    height={24} 
                    width={24} 
                    className='ml-2'     
                               />
                   )}
                   <FormControl>
                    <Input
                    placeholder={placeholder}
                    {...field}
                    className='shad-input border-0'

                    
                    />
                   </FormControl>
                </div>

            )

            case FormFieldType.PHONE_INPUT:
                return ( 
                 <FormControl>
                      <PhoneInput
                            defaultCountry='LK'
                            placeholder={placeholder}
                            international
                            withCountryCallingCode
                            onChange={field.onChange}
                            value={field.value as undefined}
                            className='input-phone'                 
                    />
                 </FormControl>
                )
        default:
            break;
    }
  }

const CustomFormField = (props: CustomProps) => {
    const {control,fieldType,name,label,placeholder,iconSrc,iconAlt}=props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>
                        {label}
                    </FormLabel>
                )}

              <RederField  field={field} props={props}/>
              <FormMessage className='shad-error'/>
            </FormItem>
          )}
        />
  )
}

export default CustomFormField