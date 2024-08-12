import { Phone } from "lucide-react";
import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2,"Username must be at least 2 characters.")
    .max(20,"Username must be at less 20 characters."),
    
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone),'invalid Phone Number'),
    

  })