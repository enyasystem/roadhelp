"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Clock, CheckCircle, AlertTriangle, Shield, Zap, User, Car } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { FormField, ValidatedInput, ValidatedTextarea } from "@/components/ui/form-field"
import { requestHelpSchema, type RequestHelpFormData, formatNigerianPhone } from "@/lib/validations"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter as DialogActions,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function RequestHelpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    setValue,
    watch,
    trigger,
  } = useForm<RequestHelpFormData>({
    resolver: zodResolver(requestHelpSchema),
    mode: "onChange",
    defaultValues: {
      location: "Plot 123, Admiralty Way, Lekki Phase 1, Lagos",
      hasSpare: false,
      agreedToTerms: false,
    },
  })

  const watchedFields = watch()

  const onSubmit = async (data: RequestHelpFormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const isFieldValid = (fieldName: keyof RequestHelpFormData) => {
    return touchedFields[fieldName] && !errors[fieldName]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 py-12">
        <div className="container px-4">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              Emergency Request
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Roadside Assistance</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and we'll connect you with a certified mechanic in your area.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Service Request
                  </CardTitle>
                  <CardDescription>Provide details about your situation so we can help you quickly.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </h3>

                      <FormField
                        label="Full Name"
                        error={errors.fullName?.message}
                        success={isFieldValid("fullName")}
                        required
                        description="Enter your first and last name"
                      >
                        <ValidatedInput
                          {...register("fullName")}
                          placeholder="e.g., Adunni Okafor"
                          error={errors.fullName?.message}
                          success={isFieldValid("fullName")}
                        />
                      </FormField>

                      <FormField
                        label="Phone Number"
                        error={errors.phone?.message}
                        success={isFieldValid("phone")}
                        required
                        description="We'll use this to contact you and send updates"
                      >
                        <ValidatedInput
                          {...register("phone", {
                            onChange: (e) => {
                              const formatted = formatNigerianPhone(e.target.value)
                              setValue("phone", formatted)
                              trigger("phone")
                            },
                          })}
                          type="tel"
                          placeholder="+234 803 123 4567"
                          error={errors.phone?.message}
                          success={isFieldValid("phone")}
                        />
                      </FormField>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Details
                      </h3>

                      <FormField
                        label="Your Current Location"
                        error={errors.location?.message}
                        success={isFieldValid("location")}
                        required
                        description="Be as specific as possible (street name, landmarks, area)"
                      >
                        <ValidatedInput
                          {...register("location")}
                          placeholder="e.g., Plot 123, Admiralty Way, Lekki Phase 1, Lagos"
                          error={errors.location?.message}
                          success={isFieldValid("location")}
                        />
                      </FormField>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Vehicle Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          label="Vehicle Make"
                          error={errors.vehicleMake?.message}
                          success={isFieldValid("vehicleMake")}
                          required
                        >
                          <Select
                            onValueChange={(value) =>
                              setValue("vehicleMake", value as any, {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true,
                              })
                            }
                          >
                            <SelectTrigger className={errors.vehicleMake ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="toyota">Toyota</SelectItem>
                              <SelectItem value="honda">Honda</SelectItem>
                              <SelectItem value="nissan">Nissan</SelectItem>
                              <SelectItem value="hyundai">Hyundai</SelectItem>
                              <SelectItem value="kia">Kia</SelectItem>
                              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                              <SelectItem value="bmw">BMW</SelectItem>
                              <SelectItem value="lexus">Lexus</SelectItem>
                              <SelectItem value="ford">Ford</SelectItem>
                              <SelectItem value="volkswagen">Volkswagen</SelectItem>
                              <SelectItem value="peugeot">Peugeot</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>

                        <FormField
                          label="Model & Year"
                          error={errors.vehicleModel?.message}
                          success={isFieldValid("vehicleModel")}
                          required
                          description="Include the year for better service"
                        >
                          <ValidatedInput
                            {...register("vehicleModel")}
                            placeholder="e.g., Camry 2018"
                            error={errors.vehicleModel?.message}
                            success={isFieldValid("vehicleModel")}
                          />
                        </FormField>
                      </div>
                    </div>

                    {/* Issue Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Issue Details
                      </h3>

                      <FormField
                        label="What's the problem?"
                        error={errors.issue?.message}
                        success={isFieldValid("issue")}
                        required
                      >
                        <Select
                          onValueChange={(value) =>
                            setValue("issue", value as any, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                        >
                          <SelectTrigger className={errors.issue ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select the type of issue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flat-tire">🛞 Flat Tire</SelectItem>
                            <SelectItem value="dead-battery">🔋 Dead Battery</SelectItem>
                            <SelectItem value="towing">🚛 Need Towing</SelectItem>
                            <SelectItem value="out-of-fuel">⛽ Out of Fuel</SelectItem>
                            <SelectItem value="lockout">🔑 Locked Out</SelectItem>
                            <SelectItem value="engine-trouble">🔧 Engine Won't Start</SelectItem>
                            <SelectItem value="overheating">🌡️ Engine Overheating</SelectItem>
                            <SelectItem value="other">❓ Other Issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField
                        label="Urgency Level"
                        error={errors.urgency?.message}
                        success={isFieldValid("urgency")}
                        required
                        description="Help us prioritize your request"
                      >
                        <Select
                          onValueChange={(value) =>
                            setValue("urgency", value as any, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                        >
                          <SelectTrigger className={errors.urgency ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low - I have time to wait</SelectItem>
                            <SelectItem value="medium">🟡 Medium - Moderately urgent</SelectItem>
                            <SelectItem value="high">🔴 High - Very urgent/unsafe location</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>

                      {watchedFields.issue === "flat-tire" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasSpare"
                            checked={watchedFields.hasSpare}
                            onCheckedChange={(checked) =>
                              setValue("hasSpare", checked as boolean, {
                                shouldDirty: true,
                                shouldTouch: true,
                              })
                            }
                          />
                          <label htmlFor="hasSpare" className="text-sm font-medium">
                            I have a spare tire available
                          </label>
                        </div>
                      )}

                      <FormField
                        label="Additional Details"
                        error={errors.comments?.message}
                        success={isFieldValid("comments")}
                        description="Any additional information that might help the mechanic"
                      >
                        <ValidatedTextarea
                          {...register("comments")}
                          placeholder="e.g., 'Front left tire is completely flat', 'Car makes clicking sound when I turn the key', 'I'm parked near a landmark'"
                          rows={4}
                          error={errors.comments?.message}
                          success={isFieldValid("comments")}
                        />
                      </FormField>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreedToTerms"
                        checked={watchedFields.agreedToTerms}
                        onCheckedChange={(checked) =>
                          setValue("agreedToTerms", checked as boolean, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }
                        className={errors.agreedToTerms ? "border-red-500" : ""}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="agreedToTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By requesting help, you agree to our service terms and pricing.
                        </p>
                        {errors.agreedToTerms && <p className="text-xs text-red-500">{errors.agreedToTerms.message}</p>}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !isValid}>
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Finding Help...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Request Help Now
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Map showing your location in Nigeria"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      title: "Quick Response",
                      description: "Average arrival time is under 45 minutes",
                    },
                    {
                      icon: CheckCircle,
                      title: "Certified Mechanics",
                      description: "All our mechanics are licensed and insured",
                    },
                    {
                      icon: Phone,
                      title: "Stay Connected",
                      description: "Real-time updates via SMS and app notifications",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Emergency?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-3">
                    If you're in immediate danger or need emergency services, call 199 or 112 first.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency: +234 700 ROADGUARD
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success Popup with deep link */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center">Request Submitted</DialogTitle>
            <DialogDescription className="text-center">
              {"Your emergency request has been submitted successfully! A certified mechanic is on the way."}
            </DialogDescription>
          </DialogHeader>
          <DialogActions className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/track">
                <MapPin className="mr-2 h-4 w-4" />
                Track Mechanic
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent" onClick={() => setShowSuccess(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}
