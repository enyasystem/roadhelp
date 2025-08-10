"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Car,
  Wrench,
  TrendingUp,
  Users,
  Settings,
  DollarSign,
  FileText,
  Shield,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    name: "Overview",
    href: "/admin",
    icon: BarChart3,
    current: true,
  },
  {
    name: "Service Requests",
    href: "/admin/requests",
    icon: Car,
    current: false,
  },
  {
    name: "Mechanics",
    href: "/admin/mechanics",
    icon: Wrench,
    current: false,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
    current: false,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    current: false,
  },
  {
    name: "Financial",
    href: "/admin/financial",
    icon: DollarSign,
    current: false,
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: FileText,
    current: false,
  },
]

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    name: "Security",
    href: "/admin/security",
    icon: Shield,
  },
  {
    name: "Help & Support",
    href: "/admin/help",
    icon: HelpCircle,
  },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={onClose}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn("w-full justify-start gap-3", isActive && "bg-secondary font-medium")}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>

            <div className="pt-6 mt-6 border-t">
              <div className="space-y-1">
                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} onClick={onClose}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn("w-full justify-start gap-3", isActive && "bg-secondary font-medium")}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground">
              <p>RoadHelp Admin v2.1.0</p>
              <p>© 2024 RoadHelp Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
