"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart3, Clock, DollarSign, Users, Car, MapPin, Download } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock analytics data
const analyticsData = {
  overview: {
    totalRequests: 1247,
    totalRevenue: 2847500,
    averageResponseTime: 18,
    customerSatisfaction: 4.8,
    completionRate: 96.2,
    activeCustomers: 892,
    activeMechanics: 67,
    growthRate: 12.5,
  },
  requestsByMonth: [
    { month: "Jul", requests: 89, revenue: 198000 },
    { month: "Aug", requests: 112, revenue: 245000 },
    { month: "Sep", requests: 98, revenue: 215000 },
    { month: "Oct", requests: 134, revenue: 298000 },
    { month: "Nov", requests: 156, revenue: 342000 },
    { month: "Dec", requests: 178, revenue: 389000 },
    { month: "Jan", requests: 201, revenue: 445000 },
  ],
  requestsByType: [
    { type: "Flat Tire", count: 342, percentage: 27.4, revenue: 855000 },
    { type: "Dead Battery", count: 298, percentage: 23.9, revenue: 596000 },
    { type: "Towing", count: 187, percentage: 15.0, revenue: 748000 },
    { type: "Lockout", count: 156, percentage: 12.5, revenue: 312000 },
    { type: "Fuel Delivery", count: 134, percentage: 10.7, revenue: 201000 },
    { type: "Engine Trouble", count: 89, percentage: 7.1, revenue: 267000 },
    { type: "Other", count: 41, percentage: 3.3, revenue: 82000 },
  ],
  responseTimeByArea: [
    { area: "Lagos Island", avgTime: 15, requests: 298 },
    { area: "Victoria Island", avgTime: 12, requests: 234 },
    { area: "Ikeja", avgTime: 18, requests: 187 },
    { area: "Lekki", avgTime: 22, requests: 156 },
    { area: "Surulere", avgTime: 25, requests: 134 },
    { area: "Yaba", avgTime: 20, requests: 98 },
    { area: "Others", avgTime: 28, requests: 140 },
  ],
  mechanicPerformance: [
    { name: "Emeka Okonkwo", jobs: 156, rating: 4.9, earnings: 1850000 },
    { name: "Fatima Sani", jobs: 142, rating: 4.8, earnings: 1420000 },
    { name: "Aisha Abdullahi", jobs: 203, rating: 4.9, earnings: 2450000 },
    { name: "Tunde Adeyemi", jobs: 98, rating: 4.7, earnings: 890000 },
    { name: "Kemi Adebayo", jobs: 87, rating: 4.6, earnings: 765000 },
  ],
  customerSatisfactionTrend: [
    { month: "Jul", rating: 4.5 },
    { month: "Aug", rating: 4.6 },
    { month: "Sep", rating: 4.7 },
    { month: "Oct", rating: 4.7 },
    { month: "Nov", rating: 4.8 },
    { month: "Dec", rating: 4.8 },
    { month: "Jan", rating: 4.8 },
  ],
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("requests")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
                <p className="text-muted-foreground">Detailed insights into your roadside assistance operations</p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
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
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="geographic" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Geographic
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial
              </TabsTrigger>
            </TabsList>
          </AnimatedDiv>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedDiv delay={0.3}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.totalRequests.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">+{formatPercentage(analyticsData.overview.growthRate)}</span>
                      <span className="ml-1">from last period</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.totalRevenue)}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">+8.2%</span>
                      <span className="ml-1">from last period</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.5}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.averageResponseTime} min</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">-2 min</span>
                      <span className="ml-1">improvement</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.6}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.customerSatisfaction}/5.0</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">+0.1</span>
                      <span className="ml-1">from last period</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <AnimatedDiv delay={0.7}>
                <Card>
                  <CardHeader>
                    <CardTitle>Requests by Service Type</CardTitle>
                    <CardDescription>Distribution of service requests by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.requestsByType.map((item, index) => (
                        <div key={item.type} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full bg-primary"
                              style={{
                                backgroundColor: `hsl(${index * 45}, 70%, 50%)`,
                              }}
                            />
                            <span className="font-medium">{item.type}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.count}</div>
                            <div className="text-sm text-muted-foreground">{formatPercentage(item.percentage)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.8}>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Requests and revenue over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.requestsByMonth.map((item, index) => (
                        <div key={item.month} className="flex items-center justify-between">
                          <div className="font-medium">{item.month} 2024</div>
                          <div className="text-right">
                            <div className="font-semibold">{item.requests} requests</div>
                            <div className="text-sm text-muted-foreground">{formatCurrency(item.revenue)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <AnimatedDiv delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Mechanics</CardTitle>
                    <CardDescription>Mechanics ranked by jobs completed and ratings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.mechanicPerformance.map((mechanic, index) => (
                        <div key={mechanic.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{mechanic.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {mechanic.jobs} jobs • ⭐ {mechanic.rating}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(mechanic.earnings)}</p>
                            <p className="text-sm text-muted-foreground">Total earnings</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Satisfaction Trend</CardTitle>
                    <CardDescription>Average customer ratings over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.customerSatisfactionTrend.map((item) => (
                        <div key={item.month} className="flex items-center justify-between">
                          <div className="font-medium">{item.month} 2024</div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(item.rating / 5) * 100}%` }}
                              />
                            </div>
                            <span className="font-semibold">{item.rating}/5.0</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>
          </TabsContent>

          {/* Geographic Tab */}
          <TabsContent value="geographic" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Response Time by Area</CardTitle>
                  <CardDescription>Average response times across different locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.responseTimeByArea.map((area) => (
                      <div key={area.area} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{area.area}</p>
                            <p className="text-sm text-muted-foreground">{area.requests} requests</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{area.avgTime} min</p>
                          <p className="text-sm text-muted-foreground">Avg response</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <AnimatedDiv delay={0.3}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+15.2%</div>
                    <p className="text-xs text-muted-foreground">Month over month</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(analyticsData.overview.totalRevenue / analyticsData.overview.totalRequests)}
                    </div>
                    <p className="text-xs text-muted-foreground">Per service request</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.5}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPercentage(analyticsData.overview.completionRate)}</div>
                    <p className="text-xs text-muted-foreground">Successfully completed</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            <AnimatedDiv delay={0.6}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service Type</CardTitle>
                  <CardDescription>Revenue breakdown by service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.requestsByType.map((item, index) => (
                      <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full bg-primary"
                            style={{
                              backgroundColor: `hsl(${index * 45}, 70%, 50%)`,
                            }}
                          />
                          <div>
                            <p className="font-medium">{item.type}</p>
                            <p className="text-sm text-muted-foreground">{item.count} requests</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                          <p className="text-sm text-muted-foreground">{formatPercentage(item.percentage)} of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
