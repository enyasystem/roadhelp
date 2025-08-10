"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Car,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock data for service requests
const mockRequests = [
  {
    id: "REQ-001",
    customer: {
      name: "Adebayo Johnson",
      phone: "+234 803 123 4567",
      avatar: "/placeholder-user.jpg",
    },
    mechanic: {
      name: "Emeka Okonkwo",
      phone: "+234 805 987 6543",
      avatar: "/placeholder-user.jpg",
    },
    service: "Flat Tire",
    location: "Victoria Island, Lagos",
    coordinates: { lat: 6.4281, lng: 3.4219 },
    status: "in-progress",
    priority: "high",
    requestTime: "2024-01-15T10:30:00Z",
    estimatedArrival: "2024-01-15T11:00:00Z",
    description: "Front left tire is completely flat. Customer is stranded on Ahmadu Bello Way.",
    vehicleInfo: {
      make: "Toyota",
      model: "Camry",
      year: "2019",
      plateNumber: "ABC-123-DE",
    },
    cost: 15000,
  },
  {
    id: "REQ-002",
    customer: {
      name: "Fatima Sani",
      phone: "+234 807 234 5678",
      avatar: "/placeholder-user.jpg",
    },
    mechanic: null,
    service: "Dead Battery",
    location: "Ikeja, Lagos",
    coordinates: { lat: 6.6018, lng: 3.3515 },
    status: "pending",
    priority: "medium",
    requestTime: "2024-01-15T11:15:00Z",
    estimatedArrival: null,
    description: "Car won't start. Battery seems completely dead. Need jump start or replacement.",
    vehicleInfo: {
      make: "Honda",
      model: "Accord",
      year: "2020",
      plateNumber: "XYZ-789-FG",
    },
    cost: 12000,
  },
  {
    id: "REQ-003",
    customer: {
      name: "Chinedu Okoro",
      phone: "+234 809 345 6789",
      avatar: "/placeholder-user.jpg",
    },
    mechanic: {
      name: "Aisha Abdullahi",
      phone: "+234 806 876 5432",
      avatar: "/placeholder-user.jpg",
    },
    service: "Towing",
    location: "Lekki Phase 1, Lagos",
    coordinates: { lat: 6.4698, lng: 3.5852 },
    status: "completed",
    priority: "high",
    requestTime: "2024-01-15T09:00:00Z",
    estimatedArrival: "2024-01-15T09:30:00Z",
    description: "Engine overheated and won't start. Need towing to nearest mechanic workshop.",
    vehicleInfo: {
      make: "Mercedes",
      model: "C-Class",
      year: "2018",
      plateNumber: "MNO-456-HI",
    },
    cost: 25000,
  },
  {
    id: "REQ-004",
    customer: {
      name: "Kemi Adebayo",
      phone: "+234 802 456 7890",
      avatar: "/placeholder-user.jpg",
    },
    mechanic: {
      name: "Tunde Adeyemi",
      phone: "+234 808 765 4321",
      avatar: "/placeholder-user.jpg",
    },
    service: "Lockout",
    location: "Surulere, Lagos",
    coordinates: { lat: 6.4969, lng: 3.3841 },
    status: "assigned",
    priority: "low",
    requestTime: "2024-01-15T12:00:00Z",
    estimatedArrival: "2024-01-15T12:30:00Z",
    description: "Keys locked inside the car. Need professional locksmith service.",
    vehicleInfo: {
      make: "Nissan",
      model: "Altima",
      year: "2021",
      plateNumber: "PQR-012-JK",
    },
    cost: 8000,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  assigned: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-orange-100 text-orange-800 border-orange-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800 border-gray-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const statusIcons = {
  pending: Clock,
  assigned: User,
  "in-progress": Loader,
  completed: CheckCircle,
  cancelled: XCircle,
}

export default function RequestsPage() {
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    const matchesService = serviceFilter === "all" || request.service === serviceFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesService
  })

  const getStatusCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      assigned: requests.filter((r) => r.status === "assigned").length,
      "in-progress": requests.filter((r) => r.status === "in-progress").length,
      completed: requests.filter((r) => r.status === "completed").length,
      cancelled: requests.filter((r) => r.status === "cancelled").length,
    }
  }

  const statusCounts = getStatusCounts()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const requestTime = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - requestTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading requests...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
                <p className="text-muted-foreground">Manage and track all roadside assistance requests</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>
        </AnimatedDiv>

        {/* Filters */}
        <AnimatedDiv delay={0.2}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by customer name, request ID, service type, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="Flat Tire">Flat Tire</SelectItem>
                      <SelectItem value="Dead Battery">Dead Battery</SelectItem>
                      <SelectItem value="Towing">Towing</SelectItem>
                      <SelectItem value="Lockout">Lockout</SelectItem>
                      <SelectItem value="Fuel Delivery">Fuel Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Status Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="space-y-6">
          <AnimatedDiv delay={0.3}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({statusCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Assigned ({statusCounts.assigned})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center gap-2">
                <Loader className="h-4 w-4" />
                In Progress ({statusCounts["in-progress"]})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({statusCounts.completed})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Cancelled ({statusCounts.cancelled})
              </TabsTrigger>
            </TabsList>
          </AnimatedDiv>

          <TabsContent value={statusFilter} className="space-y-4">
            {filteredRequests.length === 0 ? (
              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Car className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                    <p className="text-muted-foreground text-center">
                      No service requests match your current filters. Try adjusting your search criteria.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            ) : (
              <div className="grid gap-4">
                {filteredRequests.map((request, index) => {
                  const StatusIcon = statusIcons[request.status as keyof typeof statusIcons]

                  return (
                    <AnimatedDiv key={request.id} delay={0.4 + index * 0.1}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Car className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{request.id}</CardTitle>
                                <CardDescription>{request.service}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={priorityColors[request.priority as keyof typeof priorityColors]}>
                                {request.priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                                {request.priority.toUpperCase()}
                              </Badge>
                              <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {request.status.replace("-", " ").toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {getTimeAgo(request.requestTime)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {request.location}
                              </span>
                            </div>
                            <span className="font-semibold text-foreground">{formatCurrency(request.cost)}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Customer Info */}
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={request.customer.avatar || "/placeholder.svg"}
                                alt={request.customer.name}
                              />
                              <AvatarFallback>
                                {request.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{request.customer.name}</p>
                              <p className="text-sm text-muted-foreground">{request.customer.phone}</p>
                            </div>
                            {request.mechanic && (
                              <>
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground">Assigned to</div>
                                </div>
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={request.mechanic.avatar || "/placeholder.svg"}
                                    alt={request.mechanic.name}
                                  />
                                  <AvatarFallback>
                                    {request.mechanic.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium">{request.mechanic.name}</p>
                                  <p className="text-sm text-muted-foreground">{request.mechanic.phone}</p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <p className="text-sm">{request.description}</p>
                          </div>

                          {/* Vehicle Info */}
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="text-sm">
                              <span className="font-medium">Vehicle:</span> {request.vehicleInfo.year}{" "}
                              {request.vehicleInfo.make} {request.vehicleInfo.model}
                              <span className="ml-4 font-medium">Plate:</span> {request.vehicleInfo.plateNumber}
                            </div>
                          </div>

                          {/* Estimated Arrival */}
                          {request.estimatedArrival && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Estimated arrival: {formatTime(request.estimatedArrival)}</span>
                            </div>
                          )}
                        </CardContent>
                        <CardContent className="flex gap-2 pt-0">
                          <Button size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </AnimatedDiv>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
