import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  KeyRound,
  BatteryCharging,
  Truck,
  FuelIcon as GasPump,
  PenToolIcon as Tool,
  Clock,
  CheckCircle,
  Phone,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: <KeyRound className="w-8 h-8" />,
      title: "Tire Services",
      description:
        "Complete tire solutions including flat tire repair, tire replacement, and emergency roadside tire assistance.",
      features: [
        "Flat tire repair and patching",
        "Emergency tire replacement",
        "Tire pressure adjustment",
        "Spare tire installation",
      ],
      price: "From ₦8,000",
      responseTime: "8-15 minutes",
    },
    {
      icon: <BatteryCharging className="w-8 h-8" />,
      title: "Battery Jump Start",
      description:
        "Professional battery services including jump starts, battery testing, and on-site battery replacement.",
      features: [
        "Emergency jump start service",
        "Battery testing and diagnostics",
        "New battery installation",
        "Battery terminal cleaning",
      ],
      price: "From ₦5,000",
      responseTime: "5-12 minutes",
    },
    {
      icon: <KeyRound className="w-8 h-8" />,
      title: "Lockout Service",
      description: "Professional vehicle lockout assistance using specialized tools to safely unlock your vehicle.",
      features: ["Car door unlocking", "Trunk/boot opening", "Key extraction from ignition", "No damage guarantee"],
      price: "From ₦7,500",
      responseTime: "10-18 minutes",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Professional Towing",
      description: "Safe and secure towing services with modern flatbed trucks for all vehicle types.",
      features: ["Flatbed towing service", "Long-distance towing", "Motorcycle towing", "Luxury vehicle handling"],
      price: "From ₦15,000",
      responseTime: "15-25 minutes",
    },
    {
      icon: <GasPump className="w-8 h-8" />,
      title: "Fuel Delivery",
      description: "Emergency fuel delivery service bringing premium gasoline or diesel directly to your location.",
      features: [
        "Premium gasoline delivery",
        "Diesel fuel service",
        "Minimum 5-liter delivery",
        "Fuel quality guarantee",
      ],
      price: "From ₦3,500 + fuel cost",
      responseTime: "12-20 minutes",
    },
    {
      icon: <Tool className="w-8 h-8" />,
      title: "On-Site Repairs",
      description: "Professional on-location mechanical repairs and diagnostic services to get you back on the road.",
      features: [
        "Belt and hose replacement",
        "Basic engine diagnostics",
        "Alternator repairs",
        "Minor electrical fixes",
      ],
      price: "From ₦12,000",
      responseTime: "20-35 minutes",
    },
  ]

  const pricingPlans = [
    {
      name: "Pay-Per-Use",
      description: "Perfect for occasional users",
      price: "No monthly fee",
      features: [
        "Standard service rates apply",
        "24/7 emergency support",
        "GPS tracking included",
        "Secure payment options",
        "Service history tracking",
      ],
      popular: false,
    },
    {
      name: "RoadHelp Plus",
      description: "Best value for regular drivers",
      price: "₦2,500/month",
      features: [
        "15% discount on all services",
        "Priority response (faster ETA)",
        "Free annual vehicle inspection",
        "24/7 premium support hotline",
        "Unlimited service requests",
        "Family plan coverage (up to 3 vehicles)",
      ],
      popular: true,
    },
    {
      name: "Business Fleet",
      description: "Designed for companies and fleet owners",
      price: "Custom pricing",
      features: [
        "Volume discounts (20-30% off)",
        "Dedicated account manager",
        "Fleet tracking dashboard",
        "Monthly service reports",
        "Priority mechanic assignment",
        "Custom billing and invoicing",
      ],
      popular: false,
    },
  ]

  return (
    <>
      <div className="background-animation" />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="page-section bg-powder-blue">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">Our Services</h1>
              <p className="section-subtitle">
                Comprehensive roadside assistance services available 24/7 across Nigeria. Professional mechanics,
                transparent pricing, and guaranteed satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="page-section bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">{service.icon}</div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">{service.price}</p>
                        <p className="text-xs text-muted-foreground">Starting price</p>
                      </div>
                      <Button>
                        <Phone className="w-4 h-4 mr-2" />
                        Request Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Pricing Plans */}
        <section className="page-section bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Service Pricing Plans</h2>
              <p className="section-subtitle">
                Choose the plan that best fits your needs. All plans include our core services with varying benefits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-primary">{plan.price}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.name === "Business Fleet" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="page-section bg-white">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Service Coverage Areas</h2>
              <p className="section-subtitle">
                We provide comprehensive roadside assistance across Nigeria's major cities and highways.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { region: "Lagos State", cities: ["Lagos", "Ikeja", "Lekki", "Victoria Island"] },
                { region: "FCT Abuja", cities: ["Abuja", "Gwagwalada", "Kuje", "Bwari"] },
                { region: "Kano State", cities: ["Kano", "Wudil", "Gwarzo", "Karaye"] },
                { region: "Rivers State", cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Ikwerre"] },
              ].map((area, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{area.region}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {area.cities.map((city, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-sm">{city}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Don't see your area listed? We're expanding rapidly across Nigeria.
              </p>
              <Button variant="outline">Check Coverage in Your Area</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="page-section bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Right Now?</h2>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Our emergency response team is standing by 24/7 to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-help">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Request Emergency Help
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Call: 0700-ROADHELP
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
