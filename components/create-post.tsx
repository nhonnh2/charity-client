"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Link, Smile, Video } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CreatePost() {
  const [postContent, setPostContent] = useState("")

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Chia sẻ cập nhật về chiến dịch của bạn..."
              className="min-h-24 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3 flex justify-between">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm ảnh</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Video className="h-5 w-5 text-green-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm video</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Link className="h-5 w-5 text-purple-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm liên kết</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Smile className="h-5 w-5 text-yellow-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm biểu tượng cảm xúc</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" disabled={!postContent.trim()}>
          Đăng
        </Button>
      </CardFooter>
    </Card>
  )
}
