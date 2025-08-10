"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wrench,
  Star,
  MapPin,
  Phone,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  UserPlus,
  Settings,
} from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock data for mechanics
const mechanics = [
  {
    id: "MECH-001",
    name: "Emeka Okonkwo",
    phone: "+234 803 456 7890",
    email: "emeka.okonkwo@email.com",
    specialization: ["General Repairs", "Tire Services", "Battery"],
    rating: 4.9,
    totalReviews: 156,
    completedJobs: 156,
    status: "active",
    location: "Lagos Island",
    coordinates: { lat: 6.4541, lng: 3.3947 },
    joinedDate: "2023-06-15",
    lastActive: "2024-01-15T11:30:00Z",
    earnings: {
      thisMonth: 245000,
      total: 1850000,
    },
    vehicle: {
      type: "Service Van",
      plateNumber: "LAG-123-ABC",
      model: "Toyota Hiace 2020",
    },
    documents: {
      license: "verified",
      insurance: "verified",
      certification: "verified",
    },
    availability: {
      monday: { start: "08:00", end: "18:00" },
      tuesday: { start: "08:00", end: "18:00" },
      wednesday: { start: "08:00", end: "18:00" },
      thursday: { start: "08:00", end: "18:00" },
      friday: { start: "08:00", end: "18:00" },
      saturday: { start: "09:00", end: "15:00" },
      sunday: "off",
    },
  },
  {
    id: "MECH-002",
    name: "Fatima Sani",
    phone: "+234 807 123 4567",
    email: "fatima.sani@email.com",
    specialization: ["Electrical Systems", "Engine Diagnostics", "Air Conditioning"],
    rating: 4.8,
    totalReviews: 142,
    completedJobs: 142,
    status: "active",
    location: "Ikeja",
    coordinates: { lat: 6.5964, lng: 3.3515 },
    joinedDate: "2023-08-20",
    lastActive: "2024-01-15T11:25:00Z",
    earnings: {
      thisMonth: 198000,
      total: 1420000,
    },
    vehicle: {
      type: "Service Van",
      plateNumber: "LAG-456-DEF",
      model: "Nissan NV200 2019",
    },
    documents: {
      license: "verified",
      insurance: "verified",
      certification: "verified",
    },
    availability: {
      monday: { start: "07:00", end: "19:00" },
      tuesday: { start: "07:00", end: "19:00" },
      wednesday: { start: "07:00", end: "19:00" },
      thursday: { start: "07:00", end: "19:00" },
      friday: { start: "07:00", end: "19:00" },
      saturday: { start: "08:00", end: "16:00" },
      sunday: { start: "10:00", end: "14:00" },
    },
  },
  {
    id: "MECH-003",
    name: "Tunde Adeyemi",
    phone: "+234 809 987 6543",
    email: "tunde.adeyemi@email.com",
    specialization: ["Tire Services", "Brake Systems", "Suspension"],
    rating: 4.7,
    totalReviews: 98,
    completedJobs: 98,
    status: "offline",
    location: "Lekki",
    coordinates: { lat: 6.4474, lng: 3.4106 },
    joinedDate: "2023-11-10",
    lastActive: "2024-01-14T16:45:00Z",
    earnings: {
      thisMonth: 156000,
      total: 890000,
    },
    vehicle: {
      type: "Motorcycle",
      plateNumber: "LAG-789-GHI",
      model: "Honda CB 150 2021",
    },
    documents: {
      license: "verified",
      insurance: "pending",
      certification: "verified",
    },
    availability: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: "off",
      sunday: "off",
    },
  },
  {
    id: "MECH-004",
    name: "Aisha Abdullahi",
    phone: "+234 701 555 8888",
    email: "aisha.abdullahi@email.com",
    specialization: ["General Repairs", "Fuel Systems", "Lockout Services"],
    rating: 4.9,
    totalReviews: 203,
    completedJobs: 203,
    status: "busy",
    location: "Victoria Island",
    coordinates: { lat: 6.4281, lng: 3.4219 },
    joinedDate: "2023-04-12",
    lastActive: "2024-01-15T11:35:00Z",
    earnings: {
      thisMonth: 312000,
      total: 2450000,
    },
    vehicle: {
      type: "Service Van",
      plateNumber: "LAG-321-JKL",
      model: "Ford Transit 2021",
    },
    documents: {
      license: "verified",
      insurance: "verified",
      certification: "verified",
    },
    availability: {
      monday: { start: "06:00", end: "20:00" },
      tuesday: { start: "06:00", end: "20:00" },
      wednesday: { start: "06:00", end: "20:00" },
      thursday: { start: "06:00", end: "20:00" },
      friday: { start: "06:00", end: "20:00" },
      saturday: { start: "08:00", end: "18:00" },
      sunday: { start: "10:00", end: "16:00" },
    },
  },
]

export default function MechanicsPage() {
  const [mechanicsList, setMechanicsList] = useState(mechanics)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "busy":
        return "secondary"
      case "offline":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "busy":
        return <Clock className="h-4 w-4" />
      case "offline":
        return <div className="h-2 w-2 bg-gray-400 rounded-full" />
      default:
        return <div className="h-2 w-2 bg-gray-400 rounded-full" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredMechanics = mechanicsList.filter((mechanic) => {
    const matchesSearch =
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || mechanic.status === statusFilter
    const matchesLocation =
      locationFilter === "all" || mechanic.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesLocation
  })

  const stats = {
    total: mechanicsList.length,
    active: mechanicsList.filter((m) => m.status === "active").length,
    busy: mechanicsList.filter((m) => m.status === "busy").length,
    offline: mechanicsList.filter((m) => m.status === "offline").length,
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading mechanics...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <AnimatedDiv delay={0.1}>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Mechanics Management</h1>
                <p className="text-muted-foreground">Manage your network of certified mechanics</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Mechanic
                </Button>
              </div>
            </div>
          </div>
        </AnimatedDiv>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <AnimatedDiv delay={0.2}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mechanics</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Registered mechanics</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.3}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <p className="text-xs text-muted-foreground">Available for jobs</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Busy</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.busy}</div>
                <p className="text-xs text-muted-foreground">Currently working</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.5}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
                <div className="h-4 w-4 bg-gray-400 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
                <p className="text-xs text-muted-foreground">Not available</p>
              </CardContent>
            </Card>
          </AnimatedDiv>
        </div>

        {/* Filters */}
        <AnimatedDiv delay={0.6}>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lagos island">Lagos Island</SelectItem>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                    <SelectItem value="victoria island">Victoria Island</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Mechanics List */}
        <AnimatedDiv delay={0.7}>
          <Card>
            <CardHeader>
              <CardTitle>Mechanics ({filteredMechanics.length})</CardTitle>
              <CardDescription>Manage your network of certified mechanics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMechanics.map((mechanic, index) => (
                  <AnimatedDiv key={mechanic.id} delay={index * 0.1}>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">
                                {mechanic.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{mechanic.name}</h3>
                                <Badge
                                  variant={getStatusColor(mechanic.status) as any}
                                  className="flex items-center gap-1"
                                >
                                  {getStatusIcon(mechanic.status)}
                                  {mechanic.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{mechanic.id}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Contact</p>
                              <p className="text-sm text-muted-foreground">{mechanic.phone}</p>
                              <p className="text-sm text-muted-foreground">{mechanic.email}</p>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Location & Vehicle</p>
                              <div className="flex items-center gap-1 mb-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{mechanic.location}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {mechanic.vehicle.type} - {mechanic.vehicle.plateNumber}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Performance</p>
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <p className="text-sm">
                                  {mechanic.rating} ({mechanic.totalReviews} reviews)
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">{mechanic.completedJobs} jobs completed</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Specializations</p>
                            <div className="flex flex-wrap gap-1">
                              {mechanic.specialization.map((spec, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(mechanic.earnings.thisMonth)}</p>
                            <p className="text-sm text-muted-foreground">This month</p>
                            <p className="text-xs text-muted-foreground">Joined {formatDate(mechanic.joinedDate)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedDiv>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>
      </div>
    </AdminLayout>
  )
}
