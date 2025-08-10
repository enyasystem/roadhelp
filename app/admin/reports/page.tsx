"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, BarChart3, PieChart, TrendingUp, Users, Car, DollarSign, Clock, MapPin } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock reports data
const availableReports = [
  {
    id: "service-requests",
    title: "Service Requests Report",
    description: "Comprehensive report of all service requests with status, response times, and customer satisfaction",
    icon: Car,
    category: "Operations",
    lastGenerated: "2024-01-15T09:30:00Z",
    size: "2.3 MB",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "financial-summary",
    title: "Financial Summary Report",
    description: "Revenue, expenses, and profit analysis with payment method breakdown",
    icon: DollarSign,
    category: "Financial",
    lastGenerated: "2024-01-15T08:45:00Z",
    size: "1.8 MB",
    formats: ["PDF", "Excel"],
  },
  {
    id: "mechanic-performance",
    title: "Mechanic Performance Report",
    description: "Individual mechanic statistics including ratings, earnings, and job completion rates",
    icon: Users,
    category: "HR",
    lastGenerated: "2024-01-14T16:20:00Z",
    size: "3.1 MB",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "customer-analytics",
    title: "Customer Analytics Report",
    description: "Customer behavior, retention rates, and satisfaction metrics",
    icon: BarChart3,
    category: "Analytics",
    lastGenerated: "2024-01-14T14:15:00Z",
    size: "2.7 MB",
    formats: ["PDF", "Excel"],
  },
  {
    id: "response-time-analysis",
    title: "Response Time Analysis",
    description: "Geographic analysis of response times and service coverage areas",
    icon: Clock,
    category: "Operations",
    lastGenerated: "2024-01-13T11:30:00Z",
    size: "1.5 MB",
    formats: ["PDF", "CSV"],
  },
  {
    id: "geographic-coverage",
    title: "Geographic Coverage Report",
    description: "Service area analysis with demand patterns and coverage gaps",
    icon: MapPin,
    category: "Analytics",
    lastGenerated: "2024-01-12T10:00:00Z",
    size: "4.2 MB",
    formats: ["PDF", "Excel"],
  },
]

const reportCategories = ["All", "Operations", "Financial", "HR", "Analytics"]

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [dateRange, setDateRange] = useState("30d")
  const [format, setFormat] = useState("PDF")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredReports = availableReports.filter((report) => {
    const matchesCategory = selectedCategory === "All" || report.category === selectedCategory
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map((report) => report.id))
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reports...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                <p className="text-muted-foreground">Generate and download comprehensive business reports</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedReports.length === filteredReports.length ? "Deselect All" : "Select All"}
                </Button>
                <Button size="sm" disabled={selectedReports.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Selected ({selectedReports.length})
                </Button>
              </div>
            </div>
          </div>
        </AnimatedDiv>

        {/* Report Configuration */}
        <AnimatedDiv delay={0.2}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure your report parameters before generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category Filter</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search">Search Reports</Label>
                  <Input
                    id="search"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Available Reports */}
        <AnimatedDiv delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Available Reports ({filteredReports.length})</CardTitle>
              <CardDescription>Select reports to generate and download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report, index) => (
                  <AnimatedDiv key={report.id} delay={index * 0.1}>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <Checkbox
                        id={report.id}
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                      />

                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <report.icon className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{report.title}</h3>
                            <span className="px-2 py-1 text-xs bg-muted rounded-full">{report.category}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Last generated: {formatDate(report.lastGenerated)}</span>
                            <span>Size: {report.size}</span>
                            <span>Formats: {report.formats.join(", ")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </AnimatedDiv>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>

        {/* Quick Actions */}
        <AnimatedDiv delay={0.4}>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Report Actions</CardTitle>
              <CardDescription>Generate commonly requested reports instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Daily Summary</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">
                    Today's key metrics and performance indicators
                  </p>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Weekly Dashboard</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">Comprehensive weekly performance overview</p>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Monthly Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left">Detailed monthly trends and insights</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedDiv>
      </div>
    </AdminLayout>
  )
}
