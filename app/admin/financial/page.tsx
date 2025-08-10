"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, Receipt, Download, AlertCircle } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

// Mock financial data
const financialData = {
  overview: {
    totalRevenue: 2847500,
    monthlyRevenue: 445000,
    pendingPayments: 89500,
    completedPayments: 2758000,
    averageTransactionValue: 11250,
    paymentSuccessRate: 98.2,
    refunds: 12500,
    commissionEarned: 427125,
  },
  revenueByMonth: [
    { month: "Jul 2023", revenue: 198000, transactions: 89, growth: 8.5 },
    { month: "Aug 2023", revenue: 245000, transactions: 112, growth: 23.7 },
    { month: "Sep 2023", revenue: 215000, transactions: 98, growth: -12.2 },
    { month: "Oct 2023", revenue: 298000, transactions: 134, growth: 38.6 },
    { month: "Nov 2023", revenue: 342000, transactions: 156, growth: 14.8 },
    { month: "Dec 2023", revenue: 389000, transactions: 178, growth: 13.7 },
    { month: "Jan 2024", revenue: 445000, transactions: 201, growth: 14.4 },
  ],
  paymentMethods: [
    { method: "Card Payment", count: 687, percentage: 55.1, amount: 1567500 },
    { method: "Bank Transfer", count: 312, percentage: 25.0, amount: 712000 },
    { method: "Mobile Money", count: 189, percentage: 15.2, amount: 428500 },
    { method: "Cash", count: 59, percentage: 4.7, amount: 139500 },
  ],
  pendingTransactions: [
    {
      id: "TXN-001",
      customer: "Adunni Okafor",
      amount: 12500,
      service: "Flat Tire",
      date: "2024-01-15T10:30:00Z",
      status: "pending",
      paymentMethod: "Card Payment",
    },
    {
      id: "TXN-002",
      customer: "Ibrahim Musa",
      amount: 7500,
      service: "Fuel Delivery",
      date: "2024-01-15T11:30:00Z",
      status: "processing",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "TXN-003",
      customer: "Kemi Adebayo",
      amount: 6000,
      service: "Car Lockout",
      date: "2024-01-15T11:00:00Z",
      status: "failed",
      paymentMethod: "Card Payment",
    },
  ],
  mechanicPayouts: [
    {
      id: "PAY-001",
      mechanic: "Emeka Okonkwo",
      amount: 98500,
      jobs: 12,
      period: "Jan 1-15, 2024",
      status: "paid",
      paidDate: "2024-01-16T09:00:00Z",
    },
    {
      id: "PAY-002",
      mechanic: "Fatima Sani",
      amount: 76500,
      jobs: 9,
      period: "Jan 1-15, 2024",
      status: "pending",
      paidDate: null,
    },
    {
      id: "PAY-003",
      mechanic: "Aisha Abdullahi",
      amount: 125000,
      jobs: 15,
      period: "Jan 1-15, 2024",
      status: "processing",
      paidDate: null,
    },
  ],
}

export default function FinancialPage() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "processing":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading financial data...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
                <p className="text-muted-foreground">Track revenue, payments, and financial performance</p>
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
                <DollarSign className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="payouts" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Payouts
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>
          </AnimatedDiv>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Financial Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedDiv delay={0.3}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(financialData.overview.totalRevenue)}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">+14.4%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.4}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(financialData.overview.monthlyRevenue)}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-600">+14.4%</span>
                      <span className="ml-1">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.5}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(financialData.overview.pendingPayments)}
                    </div>
                    <p className="text-xs text-muted-foreground">Awaiting collection</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv delay={0.6}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialData.overview.paymentSuccessRate}%</div>
                    <p className="text-xs text-muted-foreground">Payment success rate</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <AnimatedDiv delay={0.7}>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue and growth rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {financialData.revenueByMonth.map((item) => (
                        <div key={item.month} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.month}</p>
                            <p className="text-sm text-muted-foreground">{item.transactions} transactions</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                            <div className="flex items-center text-sm">
                              {item.growth > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span className={item.growth > 0 ? "text-green-600" : "text-red-600"}>
                                {item.growth > 0 ? "+" : ""}
                                {item.growth.toFixed(1)}%
                              </span>
                            </div>
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
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Revenue breakdown by payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {financialData.paymentMethods.map((method, index) => (
                        <div key={method.method} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full bg-primary"
                              style={{
                                backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                              }}
                            />
                            <div>
                              <p className="font-medium">{method.method}</p>
                              <p className="text-sm text-muted-foreground">{method.count} transactions</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(method.amount)}</p>
                            <p className="text-sm text-muted-foreground">{method.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Transactions</CardTitle>
                  <CardDescription>Transactions requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.pendingTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold">{transaction.id}</span>
                            <Badge variant={getStatusColor(transaction.status) as any}>{transaction.status}</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <p>Customer: {transaction.customer}</p>
                            <p>Service: {transaction.service}</p>
                            <p>Payment: {transaction.paymentMethod}</p>
                            <p>Date: {formatDate(transaction.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatCurrency(transaction.amount)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button size="sm">Process</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Mechanic Payouts</CardTitle>
                  <CardDescription>Payments to mechanics for completed jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.mechanicPayouts.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold">{payout.id}</span>
                            <Badge variant={getStatusColor(payout.status) as any}>{payout.status}</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <p>Mechanic: {payout.mechanic}</p>
                            <p>Jobs: {payout.jobs} completed</p>
                            <p>Period: {payout.period}</p>
                            {payout.paidDate && <p>Paid: {formatDate(payout.paidDate)}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatCurrency(payout.amount)}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            {payout.status === "pending" && <Button size="sm">Pay Now</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Generate and download financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Revenue Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Detailed revenue breakdown by service type, location, and time period
                      </p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Revenue Report
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Transaction Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete transaction history with payment status and methods
                      </p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Transaction Report
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Payout Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">Mechanic earnings and payout history</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Payout Report
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Tax Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tax-ready financial summary for accounting purposes
                      </p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Tax Report
                      </Button>
                    </div>
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
