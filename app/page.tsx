"use client"
import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Siren,
  KeyRound,
  Truck,
  BatteryCharging,
  FuelIcon as GasPump,
  PenToolIcon as Tool,
  Users,
  Phone,
  Star,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Play,
  MessageCircle,
  Download,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  // Particles
  type Particle = { size: number; left: number; delay: number; duration: number; bg: string; id: number }
  const [particles, setParticles] = useState<Particle[]>([])
  const [liveStats, setLiveStats] = useState({
    helpedToday: 247,
    activeRequests: 12,
    avgResponseTime: 8.5,
  })

  // Generate blue particles once
  useEffect(() => {
    const count = 60
    const blueShades = [
      "rgba(30, 64, 175, 0.2)",
      "rgba(59, 130, 246, 0.15)",
      "rgba(14, 165, 233, 0.18)",
      "rgba(56, 189, 248, 0.12)",
    ]
    const parts: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 8 + 15,
      bg: blueShades[Math.floor(Math.random() * blueShades.length)],
    }))
    setParticles(parts)

    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        helpedToday: prev.helpedToday + Math.floor(Math.random() * 3),
        activeRequests: Math.max(5, prev.activeRequests + Math.floor(Math.random() * 5) - 2),
        avgResponseTime: Math.max(5, prev.avgResponseTime + (Math.random() - 0.5)),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Animated Background */}
      <div className="background-animation" />
      {/* Floating Particles */}
      <div className="particles" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              background: p.bg,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <Header />

      <main>
        {/* Hero with Live Stats */}
        <section className="hero" id="home">
          <div className="hero-content">
            {/* Live Status Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{liveStats.helpedToday} helped today</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>{liveStats.avgResponseTime.toFixed(1)} min avg response</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" />
                <span>{liveStats.activeRequests} active now</span>
              </div>
            </div>

            <h1>Premium Roadside Assistance</h1>
            <p>
              Professional 24/7 roadside assistance with certified mechanics arriving within minutes. From flat tires to
              engine troubles, we're your trusted partner on every journey.
            </p>
            <div className="hero-buttons">
              <Link href="/request-help" className="btn btn-primary">
                <Siren />
                Request Emergency Help
              </Link>
              <Button variant="outline" className="btn btn-secondary bg-transparent">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 font-semibold text-sm text-white">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Certified Mechanics</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="page-section bg-powder-blue" id="services">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Professional Roadside Services</h2>
              <p className="section-subtitle">
                Comprehensive automotive assistance with state-of-the-art equipment and certified technicians ready to
                help 24/7.
              </p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Tire Service"
                  className="feature-image"
                />
                <div className="service-icon">
                  <KeyRound />
                </div>
                <h3>Tire Services</h3>
                <p>
                  Complete tire solutions including flat tire repair, tire replacement, and emergency roadside tire
                  assistance with premium tire brands.
                </p>
              </div>

              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Battery Service"
                  className="feature-image"
                />
                <div className="service-icon">
                  <BatteryCharging />
                </div>
                <h3>Battery Jump Start</h3>
                <p>
                  Professional battery services including jump starts, battery testing, and on-site battery replacement
                  with premium automotive batteries.
                </p>
              </div>

              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Lockout Service"
                  className="feature-image"
                />
                <div className="service-icon">
                  <KeyRound />
                </div>
                <h3>Lockout Service</h3>
                <p>
                  Professional vehicle lockout assistance using specialized tools to safely unlock your vehicle without
                  any damage to your car.
                </p>
              </div>

              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Towing Service"
                  className="feature-image"
                />
                <div className="service-icon">
                  <Truck />
                </div>
                <h3>Professional Towing</h3>
                <p>
                  Safe and secure towing services with modern flatbed trucks. We handle luxury vehicles, motorcycles,
                  and specialty automobiles.
                </p>
              </div>

              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Fuel Delivery"
                  className="feature-image"
                />
                <div className="service-icon">
                  <GasPump />
                </div>
                <h3>Fuel Delivery</h3>
                <p>
                  Emergency fuel delivery service bringing premium gasoline or diesel directly to your location so you
                  can continue your journey.
                </p>
              </div>

              <div className="service-card">
                <img
                  src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Mechanical Repairs"
                  className="feature-image"
                />
                <div className="service-icon">
                  <Tool />
                </div>
                <h3>On-Site Repairs</h3>
                <p>
                  Professional on-location mechanical repairs including belt replacement, hose repairs, and diagnostic
                  services to get you back on the road.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Area Map */}
        <section className="page-section bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Nationwide Coverage</h2>
              <p className="section-subtitle">
                We're available across Nigeria's major cities and highways, ensuring help is always nearby.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gray-100 rounded-lg p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Coverage Map</p>
                    <p className="text-muted-foreground mb-4">Coming Soon</p>
                    <Button variant="outline" className="bg-white text-blue-900 border-blue-200" asChild>
                      <a href="#waitlist" aria-label="Join waitlist for coverage map">Join Waitlist</a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Major Cities Covered</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Lagos",
                      "Abuja",
                      "Kano",
                      "Ibadan",
                      "Port Harcourt",
                      "Benin City",
                      "Kaduna",
                      "Jos",
                      "Ilorin",
                      "Aba",
                      "Onitsha",
                      "Warri",
                    ].map((city) => (
                      <div key={city} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Highway Coverage</h4>
                  <p className="text-blue-800 text-sm">
                    Full coverage on major highways including Lagos-Ibadan, Abuja-Kaduna, Port Harcourt-Aba, and all
                    major interstate routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats page-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">75K+</span>
                <div className="stat-label">Satisfied Customers</div>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <div className="stat-label">Average Response Time (minutes)</div>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <div className="stat-label">Available Every Day</div>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <div className="stat-label">Customer Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="page-section bg-light-blue" id="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How RoadHelp Works</h2>
              <p className="section-subtitle">
                Our streamlined process ensures you receive professional assistance quickly and efficiently, getting you
                back on the road safely.
              </p>
            </div>

            <div className="steps-container">
              <div className="step-card">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Request Help"
                  className="feature-image"
                />
                <div className="step-number">1</div>
                <h3 className="step-title">Request Help</h3>
                <p className="step-description">
                  Use our intuitive app or call our 24/7 hotline to describe your situation. Our GPS system
                  automatically locates you for faster service.
                </p>
              </div>

              <div className="step-card">
                <img
                  src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Get Matched"
                  className="feature-image"
                />
                <div className="step-number">2</div>
                <h3 className="step-title">Get Matched</h3>
                <p className="step-description">
                  Our intelligent system instantly connects you with the nearest certified mechanic who specializes in
                  your specific automotive issue.
                </p>
              </div>

              <div className="step-card">
                <img
                  src="https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Track Progress"
                  className="feature-image"
                />
                <div className="step-number">3</div>
                <h3 className="step-title">Track & Communicate</h3>
                <p className="step-description">
                  Track your mechanic's real-time location and estimated arrival time. Communicate directly through our
                  secure messaging platform.
                </p>
              </div>

              <div className="step-card">
                <img
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Get Fixed"
                  className="feature-image"
                />
                <div className="step-number">4</div>
                <h3 className="step-title">Problem Solved</h3>
                <p className="step-description">
                  Our certified technician resolves your issue professionally. Pay securely through the app and receive
                  a detailed service report.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="page-section bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get Help Faster with Our Mobile App</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">One-Tap Emergency Request</h4>
                      <p className="text-muted-foreground text-sm">
                        Request help with a single tap, GPS automatically detects your location
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Real-Time Tracking</h4>
                      <p className="text-muted-foreground text-sm">
                        Watch your mechanic's location and get live ETA updates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Secure In-App Payments</h4>
                      <p className="text-muted-foreground text-sm">
                        Pay safely with card, bank transfer, or mobile money
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Service History</h4>
                      <p className="text-muted-foreground text-sm">Keep track of all your services and receipts</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="flex items-center gap-2">
                    <a
                      href="https://apps.apple.com/app/apple-store/idXXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download for iOS (Coming Soon)"
                    >
                      <Download className="w-4 h-4" />
                      Download for iOS (Coming Soon)
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
                    <a
                      href="https://play.google.com/store/apps/details?id=XXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download for Android (Coming Soon)"
                    >
                      <Download className="w-4 h-4" />
                      Download for Android (Coming Soon)
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src="/images/mobile-app.jpg"
                  alt="RoadHelp Mobile App"
                  className="max-w-sm rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="page-section bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Get answers to common questions about our roadside assistance service.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How quickly can you reach me?",
                  answer:
                    "Our average response time is 12 minutes in major cities and 20-30 minutes on highways. We have mechanics strategically positioned across Nigeria to ensure rapid response.",
                },
                {
                  question: "What areas do you cover?",
                  answer:
                    "We provide 24/7 coverage in all major Nigerian cities including Lagos, Abuja, Kano, Ibadan, Port Harcourt, and along major highways connecting these cities.",
                },
                {
                  question: "How much does the service cost?",
                  answer:
                    "Pricing varies by service type and location. Basic services like jump starts start from ₦5,000, while towing services range from ₦15,000-₦50,000 depending on distance. You'll see transparent pricing before confirming any service.",
                },
                {
                  question: "Are your mechanics certified?",
                  answer:
                    "Yes, all our mechanics are certified professionals with verified credentials. They undergo background checks and carry proper insurance for your peace of mind.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major payment methods including bank cards, bank transfers, mobile money (Opay, PalmPay, etc.), and cash payments.",
                },
                {
                  question: "Do you provide services at night?",
                  answer:
                    "We operate 24/7, 365 days a year. Emergency situations don't wait for business hours, and neither do we.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="page-section bg-red-600 text-white">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Need Emergency Help Right Now?</h2>
              <p className="text-xl mb-8 text-red-100">
                Don't wait - our emergency hotline is available 24/7 for immediate assistance
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 0700-ROADHELP
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: +234 800 123 4567
                </Button>
              </div>

              <p className="text-red-200">
                Average response time: <span className="font-bold text-white">8-12 minutes</span> in major cities
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta page-section">
          <div className="final-cta-content">
            <h2>Never Get Stranded Again</h2>
            <p>
              Join over 75,000 drivers who trust RoadHelp for reliable, fast, and professional roadside assistance.
              Experience premium automotive care when you need it most.
            </p>
            <div className="hero-buttons">
              <Link href="/request-help" className="btn btn-primary">
                <Phone />
                Get Help Now
              </Link>
              <Link href="/mechanic/dashboard" className="btn btn-secondary">
                <Users />
                Become a Partner
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
