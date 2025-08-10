"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MapPin, Phone, Clock, Car, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrackPage() {
  // Particles
  type Particle = { size: number; left: number; delay: number; duration: number; bg: string; id: number }
  const [particles, setParticles] = useState<Particle[]>([])
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
  }, [])

  // Simulated ETA countdown
  const [eta, setEta] = useState(25)
  useEffect(() => {
    const id = setInterval(() => setEta((prev) => (prev > 0 ? prev - 1 : 0)), 60000)
    return () => clearInterval(id)
  }, [])
  const status = useMemo(() => {
    if (eta > 15) return "En route"
    if (eta > 5) return "Nearby"
    if (eta > 0) return "Arriving soon"
    return "Arrived"
  }, [eta])

  return (
    <>
      {/* Background + Particles to match "/" */}
      <div className="background-animation" />
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

      <main className="pt-20">
        <div className="page-section bg-powder-blue">
          <div className="container">
            <div className="section-header">
              <h1 className="section-title">Track Your Mechanic</h1>
              <p className="section-subtitle">Follow your mechanic's progress and estimated arrival time.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Map */}
              <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-[480px]">
                  <Image
                    src="/placeholder.svg?height=480&width=800"
                    alt="Live map showing route to your location in Lagos"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2 rounded-full bg-primary/80 backdrop-blur-sm px-3 py-2 text-primary-foreground shadow-lg">
                      <Car className="h-4 w-4" />
                      <span className="text-sm font-medium">Mechanic</span>
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-4">
                    <div className="flex items-center gap-2 rounded-full bg-emerald-600/90 backdrop-blur-sm px-3 py-2 text-white shadow-lg">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Your Location</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="service-card text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="service-icon !m-0 !w-12 !h-12 !text-xl">
                      <Clock />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">ETA: {eta} min</p>
                      <p className="text-muted-foreground font-medium">Status: {status}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Emeka's Auto Service</p>
                        <p className="text-sm text-muted-foreground">Toyota specialist • 4.8 ⭐ (89 reviews)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span className="font-medium">Service Van ABJ-432-KJA</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Distance</span>
                      <span className="font-medium">~8.5 km</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm text-muted-foreground">Background-checked & insured mechanic</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 mt-4 border-t">
                    <Button asChild className="flex-1">
                      <a href="tel:+234700ROADHELP">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Mechanic
                      </a>
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="service-card text-left">
                  <h3 className="text-lg font-semibold mb-2">Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Keep your phone available for calls or SMS updates.</li>
                    <li>Share nearby landmarks (e.g., fuel station, bank).</li>
                    <li>If it’s unsafe, move to a secure spot while remaining visible.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
