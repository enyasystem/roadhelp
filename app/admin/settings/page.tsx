"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Globe, CreditCard, Users, Save, RefreshCw } from "lucide-react"
import { AnimatedDiv } from "@/components/animated-div"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      companyName: "RoadHelp Nigeria",
      supportEmail: "support@roadhelp.ng",
      supportPhone: "+234 700 ROADHELP",
      timezone: "Africa/Lagos",
      currency: "NGN",
      language: "en",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      newRequestAlerts: true,
      paymentAlerts: true,
      systemAlerts: true,
    },
    operations: {
      maxResponseTime: 30,
      autoAssignRequests: true,
      requireCustomerRating: true,
      allowCancellation: true,
      cancellationWindow: 5,
      emergencyMode: false,
    },
    pricing: {
      baseFee: 5000,
      perKmRate: 200,
      emergencyMultiplier: 1.5,
      nightTimeMultiplier: 1.2,
      weekendMultiplier: 1.1,
    },
    integrations: {
      paymentGateway: "paystack",
      smsProvider: "twilio",
      emailProvider: "sendgrid",
      mapsProvider: "google",
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSaving(false)
    // Show success message
  }

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading settings...</p>
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
                <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground">Configure your roadside assistance platform</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </AnimatedDiv>

        <Tabs defaultValue="general" className="space-y-6">
          <AnimatedDiv delay={0.2}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="operations" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Operations
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>
          </AnimatedDiv>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic company details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={settings.general.companyName}
                        onChange={(e) => updateSetting("general", "companyName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.general.supportEmail}
                        onChange={(e) => updateSetting("general", "supportEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportPhone">Support Phone</Label>
                      <Input
                        id="supportPhone"
                        value={settings.general.supportPhone}
                        onChange={(e) => updateSetting("general", "supportPhone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={settings.general.timezone}
                        onValueChange={(value) => updateSetting("general", "timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                          <SelectItem value="Africa/Abuja">Africa/Abuja (WAT)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={settings.general.currency}
                        onValueChange={(value) => updateSetting("general", "currency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select
                        value={settings.general.language}
                        onValueChange={(value) => updateSetting("general", "language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ha">Hausa</SelectItem>
                          <SelectItem value="yo">Yoruba</SelectItem>
                          <SelectItem value="ig">Igbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "smsNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Request Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified of new service requests</p>
                      </div>
                      <Switch
                        checked={settings.notifications.newRequestAlerts}
                        onCheckedChange={(checked) => updateSetting("notifications", "newRequestAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified of payment events</p>
                      </div>
                      <Switch
                        checked={settings.notifications.paymentAlerts}
                        onCheckedChange={(checked) => updateSetting("notifications", "paymentAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified of system issues</p>
                      </div>
                      <Switch
                        checked={settings.notifications.systemAlerts}
                        onCheckedChange={(checked) => updateSetting("notifications", "systemAlerts", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Operations Settings */}
          <TabsContent value="operations" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Operational Settings</CardTitle>
                  <CardDescription>Configure how your service operates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="maxResponseTime">Max Response Time (minutes)</Label>
                      <Input
                        id="maxResponseTime"
                        type="number"
                        value={settings.operations.maxResponseTime}
                        onChange={(e) =>
                          updateSetting("operations", "maxResponseTime", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cancellationWindow">Cancellation Window (minutes)</Label>
                      <Input
                        id="cancellationWindow"
                        type="number"
                        value={settings.operations.cancellationWindow}
                        onChange={(e) =>
                          updateSetting("operations", "cancellationWindow", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-assign Requests</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically assign requests to nearest mechanic
                        </p>
                      </div>
                      <Switch
                        checked={settings.operations.autoAssignRequests}
                        onCheckedChange={(checked) => updateSetting("operations", "autoAssignRequests", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Customer Rating</Label>
                        <p className="text-sm text-muted-foreground">
                          Require customers to rate service after completion
                        </p>
                      </div>
                      <Switch
                        checked={settings.operations.requireCustomerRating}
                        onCheckedChange={(checked) => updateSetting("operations", "requireCustomerRating", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Cancellation</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to cancel requests</p>
                      </div>
                      <Switch
                        checked={settings.operations.allowCancellation}
                        onCheckedChange={(checked) => updateSetting("operations", "allowCancellation", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emergency Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable emergency mode for critical situations</p>
                      </div>
                      <Switch
                        checked={settings.operations.emergencyMode}
                        onCheckedChange={(checked) => updateSetting("operations", "emergencyMode", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Configuration</CardTitle>
                  <CardDescription>Set your service pricing structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="baseFee">Base Service Fee (₦)</Label>
                      <Input
                        id="baseFee"
                        type="number"
                        value={settings.pricing.baseFee}
                        onChange={(e) => updateSetting("pricing", "baseFee", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perKmRate">Per KM Rate (₦)</Label>
                      <Input
                        id="perKmRate"
                        type="number"
                        value={settings.pricing.perKmRate}
                        onChange={(e) => updateSetting("pricing", "perKmRate", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyMultiplier">Emergency Multiplier</Label>
                      <Input
                        id="emergencyMultiplier"
                        type="number"
                        step="0.1"
                        value={settings.pricing.emergencyMultiplier}
                        onChange={(e) =>
                          updateSetting("pricing", "emergencyMultiplier", Number.parseFloat(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nightTimeMultiplier">Night Time Multiplier</Label>
                      <Input
                        id="nightTimeMultiplier"
                        type="number"
                        step="0.1"
                        value={settings.pricing.nightTimeMultiplier}
                        onChange={(e) =>
                          updateSetting("pricing", "nightTimeMultiplier", Number.parseFloat(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weekendMultiplier">Weekend Multiplier</Label>
                      <Input
                        id="weekendMultiplier"
                        type="number"
                        step="0.1"
                        value={settings.pricing.weekendMultiplier}
                        onChange={(e) =>
                          updateSetting("pricing", "weekendMultiplier", Number.parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedDiv>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <AnimatedDiv delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Third-party Integrations</CardTitle>
                  <CardDescription>Configure external service providers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="paymentGateway">Payment Gateway</Label>
                      <Select
                        value={settings.integrations.paymentGateway}
                        onValueChange={(value) => updateSetting("integrations", "paymentGateway", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paystack">Paystack</SelectItem>
                          <SelectItem value="flutterwave">Flutterwave</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smsProvider">SMS Provider</Label>
                      <Select
                        value={settings.integrations.smsProvider}
                        onValueChange={(value) => updateSetting("integrations", "smsProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="termii">Termii</SelectItem>
                          <SelectItem value="bulk-sms">Bulk SMS Nigeria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Select
                        value={settings.integrations.emailProvider}
                        onValueChange={(value) => updateSetting("integrations", "emailProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="ses">Amazon SES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mapsProvider">Maps Provider</Label>
                      <Select
                        value={settings.integrations.mapsProvider}
                        onValueChange={(value) => updateSetting("integrations", "mapsProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Maps</SelectItem>
                          <SelectItem value="mapbox">Mapbox</SelectItem>
                          <SelectItem value="here">HERE Maps</SelectItem>
                        </SelectContent>
                      </Select>
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
