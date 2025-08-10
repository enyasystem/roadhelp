"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Star, MapPin, Phone, Search, Download, Eye, MessageSquare, DollarSign, Car } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock data for customers
const customers = [
  {
    id: "CUST-001",
    name: "Adunni Okafor",
    phone: "+234 803 456 7890",
    email: "adunni.okafor@email.com",
    location: "Lekki Phase 1, Lagos",
    joinedDate: "2023-08-15",
    lastRequestDate: "2024-01-15T10:30:00Z",
    totalRequests: 12,
    completedRequests: 11,
    cancelledRequests: 1,
    totalSpent: 145000,
    averageRating: 4.8,
    status: "active",
    vehicles: [
      {
        make: "Toyota",
        model: "Camry 2019",
        plateNumber: "ABC-123-DE",
        color: "Silver",
      },
    ],
    preferredServices: ["Tire Services", "Battery Jump Start"],
    loyaltyTier: "gold",
    notes: "Preferred customer, always pays on time",
  },
  {
    id: "CUST-002",
    name: "Chinedu Okwu",
    phone: "+234 809 987 6543",
    email: "chinedu.okwu@email.com",
    location: "Ikeja GRA, Lagos",
    joinedDate: "2023-05-20",
    lastRequestDate: "2024-01-15T09:45:00Z",
    totalRequests: 8,
    completedRequests: 8,
    cancelledRequests: 0,
    totalSpent: 89500,
    averageRating: 5.0,
    status: "active",
    vehicles: [
      {
        make: "Honda",
        model: "Accord 2020",
        plateNumber: "XYZ-789-FG",
        color: "Black",
      },
    ],
    preferredServices: ["Battery Jump Start", "Engine Diagnostics"],
    loyaltyTier: "silver",
    notes: "Very satisfied customer, leaves excellent reviews",
  },
  {
    id: "CUST-003",
    name: "Kemi Adebayo",
    phone: "+234 701 555 4444",
    email: "kemi.adebayo@email.com",
    location: "Surulere, Lagos",
    joinedDate: "2023-12-10",
    lastRequestDate: "2024-01-15T11:00:00Z",
    totalRequests: 3,
    completedRequests: 2,
    cancelledRequests: 1,
    totalSpent: 18500,
    averageRating: 4.9,
    status: "active",
    vehicles: [
      {
        make: "Nissan",
        model: "Pathfinder 2018",
        plateNumber: "DEF-456-HI",
        color: "White",
      },
    ],
    preferredServices: ["Lockout Service"],
    loyaltyTier: "bronze",
    notes: "New customer, still building relationship",
  },
  {
    id: "CUST-004",
    name: "Ibrahim Musa",
    phone: "+234 802 333 7777",
    email: "ibrahim.musa@email.com",
    location: "Victoria Island, Lagos",
    joinedDate: "2023-03-08",
    lastRequestDate: "2024-01-15T11:30:00Z",
    totalRequests: 15,
    completedRequests: 14,
    cancelledRequests: 1,
    totalSpent: 198000,
    averageRating: 4.6,
    status: "active",
    vehicles: [
      {
        make: "Mercedes",
        model: "C-Class 2021",
        plateNumber: "GHI-789-JK",
        color: "Blue",
      },
      {
        make: "BMW",
        model: "X5 2020",
        plateNumber: "JKL-012-MN",
        color: "Black",
      },
    ],
    preferredServices: ["Fuel Delivery", "Towing", "General Repairs"],
    loyaltyTier: "platinum",
    notes: "VIP customer with multiple vehicles",
  },
  {
    id: "CUST-005",
    name: "Fatima Abdullahi",
    phone: "+234 805 888 9999",
    email: "fatima.abdullahi@email.com",
    location: "Abuja",
    joinedDate: "2023-09-22",
    lastRequestDate: "2024-01-10T14:20:00Z",
    totalRequests: 6,
    completedRequests: 6,
    cancelledRequests: 0,
    totalSpent: 67500,
    averageRating: 4.7,
    status: "inactive",
    vehicles: [
      {
        make: "Toyota",
        model: "Corolla 2019",
        plateNumber: "ABJ-345-PQ",
        color: "Red",
      },
    ],
    preferredServices: ["Tire Services", "Battery Jump Start"],
    loyaltyTier: "silver",
    notes: "Moved to Abuja, less frequent usage",
  },
]

export default function CustomersPage() {
  const [customersList, setCustomersList] = useState(customers)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "default"
      case "gold":
        return "secondary"
      case "silver":
        return "outline"
      case "bronze":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      default:
        return "outline"
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

  const filteredCustomers = customersList.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesTier = tierFilter === "all" || customer.loyaltyTier === tierFilter

    return matchesSearch && matchesStatus && matchesTier
  })

  const stats = {
    total: customersList.length,
    active: customersList.filter((c) => c.status === "active").length,
    inactive: customersList.filter((c) => c.status === "inactive").length,
    totalRevenue: customersList.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading customers...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
                <p className="text-muted-foreground">Manage customer relationships and service history</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Newsletter
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
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Registered customers</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.3}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <p className="text-xs text-muted-foreground">Currently using service</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">From all customers</p>
              </CardContent>
            </Card>
          </AnimatedDiv>

          <AnimatedDiv delay={0.5}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Spending</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(stats.totalRevenue / stats.total)}
                </div>
                <p className="text-xs text-muted-foreground">Per customer</p>
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
                    placeholder="Search by name, email, phone, or customer ID..."
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Customers List */}
        <AnimatedDiv delay={0.7}>
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              <CardDescription>Manage customer relationships and service history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer, index) => (
                  <AnimatedDiv key={customer.id} delay={index * 0.1}>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-lg">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{customer.name}</h3>
                                <Badge variant={getStatusColor(customer.status) as any}>{customer.status}</Badge>
                                <Badge variant={getTierColor(customer.loyaltyTier) as any}>
                                  {customer.loyaltyTier}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{customer.id}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Contact Information</p>
                              <p className="text-sm text-muted-foreground">{customer.phone}</p>
                              <p className="text-sm text-muted-foreground">{customer.email}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{customer.location}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Service History</p>
                              <p className="text-sm text-muted-foreground">{customer.totalRequests} total requests</p>
                              <p className="text-sm text-muted-foreground">{customer.completedRequests} completed</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <p className="text-sm">{customer.averageRating} rating</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Vehicles & Spending</p>
                              <div className="flex items-center gap-1 mb-1">
                                <Car className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{customer.vehicles.length} vehicle(s)</p>
                              </div>
                              <p className="text-sm font-medium text-green-600">
                                {formatCurrency(customer.totalSpent)}
                              </p>
                              <p className="text-xs text-muted-foreground">Total spent</p>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Preferred Services</p>
                            <div className="flex flex-wrap gap-1">
                              {customer.preferredServices.map((service, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {customer.notes && (
                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Notes</p>
                              <p className="text-sm text-muted-foreground italic">{customer.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Joined</p>
                            <p className="font-medium">{formatDate(customer.joinedDate)}</p>
                            <p className="text-sm text-muted-foreground mt-1">Last Request</p>
                            <p className="text-sm">{formatDate(customer.lastRequestDate)}</p>
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
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
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
