"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  TrendingUp,
  Bell,
  MessageSquare,
  User,
  HelpCircle,
  Settings,
  Wallet,
  LogOut,
  ExternalLink,
  BarChart,
  Award,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface SidebarNavProps {
  className?: string
}

export default function Sidebar({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const isMobile = useMobile()

  // Don't render sidebar on mobile
  if (isMobile) {
    return null
  }

  // Nhóm các mục menu theo chức năng
  const mainNavItems = [
    {
      title: "Trang chủ",
      href: "/",
      icon: Home,
    },
    {
      title: "Chiến dịch",
      href: "/campaigns",
      icon: TrendingUp,
    },
    {
      title: "Bảng xếp hạng",
      href: "/rankings",
      icon: Award,
    },
  ]

  const userNavItems = [
    {
      title: "Hồ sơ",
      href: "/profile",
      icon: User,
    },
    {
      title: "Thông báo",
      href: "/notifications",
      icon: Bell,
    },
    {
      title: "Tin nhắn",
      href: "/messages",
      icon: MessageSquare,
    },
  ]

  const blockchainNavItems = [
    {
      title: "Ví điện tử",
      href: "/wallet",
      icon: Wallet,
    },
    {
      title: "Giao dịch Onchain",
      href: "/transactions",
      icon: ExternalLink,
    },
    {
      title: "Thống kê",
      href: "/stats",
      icon: BarChart,
    },
  ]

  const otherNavItems = [
    {
      title: "Cách thức hoạt động",
      href: "/how-it-works",
      icon: HelpCircle,
    },
    {
      title: "Cài đặt",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex flex-col border-r w-64 h-screen sticky top-0">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">TrustCharity</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {/* Nhóm chính */}
          {mainNavItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={`main-${index}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}

          <Separator className="my-3" />

          {/* Nhóm người dùng */}
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cá nhân</h3>
          </div>
          {userNavItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={`user-${index}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}

          <Separator className="my-3" />

          {/* Nhóm blockchain */}
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blockchain</h3>
          </div>
          {blockchainNavItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={`blockchain-${index}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}

          <Separator className="my-3" />

          {/* Nhóm khác */}
          {otherNavItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={`other-${index}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Wallet className="mr-2 h-4 w-4" />
          Tạo chiến dịch
        </Button>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Nguyễn Văn A</div>
              <div className="text-xs text-muted-foreground">@nguyenvana</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
