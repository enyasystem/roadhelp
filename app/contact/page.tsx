import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <>
      <div className="background-animation" />
      <Header />
      <main className="pt-20">
        <section className="page-section bg-powder-blue">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">Contact Us</h1>
              <p className="section-subtitle">Have a question or need support? We're here to help.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="service-card p-8">
                <h2 className="text-2xl font-bold text-primary-blue mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="e.g., Adunni Okafor" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your question or feedback..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full !bg-primary-blue !text-white" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="service-card p-8">
                  <h3 className="text-xl font-bold text-primary-blue mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-primary-blue" />
                      <div>
                        <p className="font-semibold">Emergency Hotline</p>
                        <a href="tel:+234700ROADHELP" className="text-text-light hover:text-primary-blue">
                          +234 700 ROADHELP
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-6 w-6 text-primary-blue" />
                      <div>
                        <p className="font-semibold">Support Email</p>
                        <a href="mailto:support@roadhelp.ng" className="text-text-light hover:text-primary-blue">
                          support@roadhelp.ng
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-6 w-6 text-primary-blue" />
                      <div>
                        <p className="font-semibold">Head Office</p>
                        <p className="text-text-light">123 Ikoyi Drive, Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=250&width=500"
                    alt="Map showing office location"
                    width={500}
                    height={250}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
