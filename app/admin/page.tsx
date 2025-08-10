"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, DollarSign, TrendingUp, Clock, Settings, BarChart3, Wrench, Download } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock data
const dashboardStats = {
  totalRequests: 1247,
  activeRequests: 23,
  totalMechanics: 89,
  activeMechanics: 67,
  totalRevenue: 2847500,
  avgResponseTime: 18,
  customerSatisfaction: 4.8,
  completionRate: 96.2,
}

const recentRequests = [
  {
    id: "REQ-001",
    customer: "Adunni Okafor",
    issue: "Flat Tire",
    location: "Victoria Island, Lagos",
    mechanic: "Emeka Okonkwo",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedCompletion: "2024-01-15T11:15:00Z",
    amount: 12500,
  },
  {
    id: "REQ-002",
    customer: "Chinedu Okwu",
    issue: "Dead Battery",
    location: "Ikeja GRA, Lagos",
    mechanic: "Fatima Sani",
    status: "completed",
    priority: "medium",
    createdAt: "2024-01-15T09:45:00Z",
    estimatedCompletion: "2024-01-15T10:30:00Z",
    amount: 8500,
  },
  {
    id: "REQ-003",
    customer: "Kemi Adebayo",
    issue: "Car Lockout",
    location: "Surulere, Lagos",
    mechanic: "Unassigned",
    status: "pending",
    priority: "low",
    createdAt: "2024-01-15T11:00:00Z",
    estimatedCompletion: null,
    amount: 6000,
  },
]

const mechanics = [
  {
    id: "MECH-001",
    name: "Emeka Okonkwo",
    phone: "+234 803 456 7890",
    specialization: "General Repairs",
    rating: 4.9,
    completedJobs: 156,
    status: "active",
    location: "Lagos Island",
    joinedDate: "2023-06-15",
  },
  {
    id: "MECH-002",
    name: "Fatima Sani",
    phone: "+234 807 123 4567",
    specialization: "Electrical Systems",
    rating: 4.8,
    completedJobs: 142,
    status: "active",
    location: "Ikeja",
    joinedDate: "2023-08-20",
  },
  {
    id: "MECH-003",
    name: "Tunde Adeyemi",
    phone: "+234 809 987 6543",
    specialization: "Tire Services",
    rating: 4.7,
    completedJobs: 98,
    status: "offline",
    location: "Lekki",
    joinedDate: "2023-11-10",
  },
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor and manage your roadside assistance operations</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </AnimatedDiv>

        <Tabs defaultValue="overview" className="space-y-6">
          <AnimatedDiv delay={0.2}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="mechanics" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Mechanics
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </AnimatedDiv>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedDiv delay={0.1}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalRequests.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.2}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.activeRequests}</div>
                    <p className="text-xs text-muted-foreground">Currently in progress</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.3}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.avgResponseTime} min</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">-2 min</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <AnimatedDiv delay={0.5}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Service Requests</CardTitle>
                    <CardDescription>Latest requests from customers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {request.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{request.customer}</p>
                            <p className="text-xs text-muted-foreground">
                              {request.issue} • {request.location}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(request.status) as any} className="text-xs">
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.6}>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Mechanics</CardTitle>
                    <CardDescription>Mechanics currently online and available</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mechanics
                      .filter((m) => m.status === "active")
                      .map((mechanic) => (
                        <div key={mechanic.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {mechanic.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{mechanic.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {mechanic.specialization} • {mechanic.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Online</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Manage all customer service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Request management interface would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mechanics Tab */}
          <TabsContent value="mechanics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mechanics Management</CardTitle>
                <CardDescription>Manage your network of certified mechanics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Mechanics management interface would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Detailed analytics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
