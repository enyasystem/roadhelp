import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { Building, Target, ShieldCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <div className="background-animation" />
      <Header />
      <main className="pt-20">
        <section className="page-section bg-powder-blue">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">About RoadHelp</h1>
              <p className="section-subtitle">
                Your trusted partner on the road. We're dedicated to providing fast, reliable, and professional roadside
                assistance across Nigeria.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary-blue">Our Mission</h2>
                <p className="text-text-light">
                  To revolutionize roadside assistance in Nigeria by leveraging technology to connect drivers in
                  distress with a network of vetted, professional, and rapid-response mechanics. We aim to make every
                  journey safer and reduce the stress and uncertainty of vehicle breakdowns.
                </p>
                <p className="text-text-light">
                  Founded in Lagos, RoadHelp was born from the personal experience of being stranded on the Third
                  Mainland Bridge. We knew there had to be a better way. Today, we're proud to serve thousands of
                  drivers with a commitment to speed, safety, and service excellence.
                </p>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Lagos Cityscape"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="service-card">
                <div className="service-icon">
                  <Target />
                </div>
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p>
                  Your safety and satisfaction are our top priorities. We go the extra mile to ensure you're back on the
                  road safely.
                </p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <ShieldCheck />
                </div>
                <h3 className="text-xl font-semibold">Integrity & Trust</h3>
                <p>
                  We operate with transparency. All our mechanics are background-checked, and our pricing is upfront.
                </p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <Building />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p>
                  We continuously improve our technology and processes to provide a seamless and efficient experience
                  for you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
