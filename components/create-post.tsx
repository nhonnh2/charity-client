'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, Link, Smile, Video } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');

  return (
    <Card className="mb-6 border border-border/40 shadow-sm overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Avatar className="border-2 border-primary/10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Avatar"
            />
            <AvatarFallback className="bg-primary/5 text-primary">
              U
            </AvatarFallback>
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
      <CardFooter className="border-t px-6 py-3 flex justify-between bg-muted/20">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <ImageIcon className="h-5 w-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm ảnh</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  <Video className="h-5 w-5 text-accent" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm video</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-colors"
                >
                  <Link className="h-5 w-5 text-purple-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm liên kết</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors"
                >
                  <Smile className="h-5 w-5 text-yellow-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thêm biểu tượng cảm xúc</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          disabled={!postContent.trim()}
        >
          Đăng
        </Button>
      </CardFooter>
    </Card>
  );
}
