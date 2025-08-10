import { z } from "zod"

// Nigerian phone number validation
const nigerianPhoneRegex = /^(\+234|0)[789][01]\d{8}$/

// Nigerian vehicle makes commonly found
const popularVehicleMakes = [
  "toyota", "honda", "nissan", "hyundai", "kia", "mercedes", "bmw", 
  "lexus", "ford", "volkswagen", "peugeot", "mazda", "mitsubishi", "other"
] as const

// Nigerian states and major cities
const nigerianLocations = [
  "lagos", "abuja", "kano", "ibadan", "port-harcourt", "benin-city", 
  "kaduna", "jos", "ilorin", "enugu", "aba", "warri", "other"
] as const

export const requestHelpSchema = z.object({
  location: z.string()
    .min(10, "Please provide a more detailed location")
    .max(200, "Location is too long")
    .refine(
      (val) => val.includes(",") || val.includes("street") || val.includes("road") || val.includes("avenue"),
      "Please include street name or area for better location accuracy"
    ),
  
  issue: z.enum([
    "flat-tire", "dead-battery", "towing", "out-of-fuel", 
    "lockout", "engine-trouble", "overheating", "other"
  ], {
    required_error: "Please select the type of issue you're experiencing"
  }),
  
  vehicleMake: z.enum(popularVehicleMakes, {
    required_error: "Please select your vehicle make"
  }),
  
  vehicleModel: z.string()
    .min(2, "Please enter your vehicle model")
    .max(50, "Vehicle model is too long")
    .refine(
      (val) => /\d{4}/.test(val) || /20\d{2}/.test(val),
      "Please include the year (e.g., 'Camry 2019')"
    ),
  
  phone: z.string()
    .refine(
      (val) => nigerianPhoneRegex.test(val.replace(/\s/g, "")),
      "Please enter a valid Nigerian phone number (e.g., +234 803 123 4567 or 08031234567)"
    ),
  
  fullName: z.string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long")
    .refine(
      (val) => val.trim().split(" ").length >= 2,
      "Please enter your first and last name"
    ),
  
  comments: z.string()
    .max(500, "Comments are too long (maximum 500 characters)")
    .optional(),
  
  urgency: z.enum(["low", "medium", "high"], {
    required_error: "Please indicate the urgency level"
  }),
  
  hasSpare: z.boolean().optional(),
  
  agreedToTerms: z.boolean()
    .refine(val => val === true, "You must agree to the terms and conditions")
})

export type RequestHelpFormData = z.infer<typeof requestHelpSchema>

// Helper function to format Nigerian phone numbers
export function formatNigerianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  
  if (cleaned.startsWith("234")) {
    const number = cleaned.slice(3)
    return `+234 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
  }
  
  if (cleaned.startsWith("0")) {
    const number = cleaned.slice(1)
    return `0${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
  }
  
  return phone
}
