"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, MessageSquare, Search, Wallet } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const isMobile = useMobile()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Wallet className="h-5 w-5 text-green-600" />
                    <span>TrustCharity</span>
                  </Link>
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Trang chủ</span>
                  </Link>
                  <Link href="/campaigns" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Chiến dịch</span>
                  </Link>
                  <Link href="/wallet" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Ví điện tử</span>
                  </Link>
                  <Link href="/transactions" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Giao dịch Onchain</span>
                  </Link>
                  <Link href="/how-it-works" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Cách thức hoạt động</span>
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2 text-lg font-semibold">
                    <span>Hồ sơ</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">TrustCharity</span>
          </Link>
        </div>

        <div className="flex md:w-1/3 lg:w-1/4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm chiến dịch..." className="w-full pl-8" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {isMobile ? (
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/wallet">
                      <Wallet className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </>
              )}
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                Đăng nhập
              </Button>
              <Button size="sm">Đăng ký</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
