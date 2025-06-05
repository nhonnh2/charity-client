"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, MoreHorizontal, Search, Send, Smile } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Message {
  id: number
  content: string
  time: string
  sender: "me" | "other"
}

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<number>(1)
  const [messageInput, setMessageInput] = useState("")

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Trần Hùng",
      avatar: "/placeholder.svg?height=40&width=40&text=TH",
      lastMessage: "Cảm ơn bạn đã đóng góp cho chiến dịch",
      time: "10:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Nguyễn Linh",
      avatar: "/placeholder.svg?height=40&width=40&text=NL",
      lastMessage: "Tôi rất ấn tượng với chiến dịch của bạn",
      time: "Hôm qua",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Lê Văn D",
      avatar: "/placeholder.svg?height=40&width=40&text=LVD",
      lastMessage: "Bạn có thể chia sẻ thêm thông tin về...",
      time: "Thứ 2",
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: "Hoàng Minh",
      avatar: "/placeholder.svg?height=40&width=40&text=HM",
      lastMessage: "Tôi muốn tham gia vào chiến dịch của bạn",
      time: "21/05",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Phạm Thị E",
      avatar: "/placeholder.svg?height=40&width=40&text=PTE",
      lastMessage: "Xin chào, tôi có một số câu hỏi về...",
      time: "15/05",
      unread: 0,
      online: false,
    },
  ]

  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        content: "Xin chào, tôi rất ấn tượng với chiến dịch của bạn!",
        time: "10:15",
        sender: "other",
      },
      {
        id: 2,
        content: "Cảm ơn bạn! Tôi rất vui khi bạn quan tâm đến chiến dịch của chúng tôi.",
        time: "10:17",
        sender: "me",
      },
      {
        id: 3,
        content: "Tôi đã đóng góp 2 triệu đồng cho chiến dịch. Hy vọng sẽ giúp ích được phần nào.",
        time: "10:20",
        sender: "other",
      },
      {
        id: 4,
        content: "Cảm ơn bạn rất nhiều vì sự đóng góp hào phóng! Mỗi đóng góp đều rất có ý nghĩa đối với chúng tôi.",
        time: "10:22",
        sender: "me",
      },
      {
        id: 5,
        content: "Không có gì. Tôi rất mong chờ được thấy tiến độ của dự án.",
        time: "10:25",
        sender: "other",
      },
      {
        id: 6,
        content:
          "Chúng tôi sẽ cập nhật tiến độ thường xuyên trên trang chiến dịch. Bạn cũng có thể theo dõi chúng tôi để nhận thông báo.",
        time: "10:28",
        sender: "me",
      },
      {
        id: 7,
        content: "Cảm ơn bạn đã đóng góp cho chiến dịch. Chúng tôi rất trân trọng sự ủng hộ của bạn!",
        time: "10:30",
        sender: "other",
      },
    ],
    2: [
      {
        id: 1,
        content: "Xin chào, tôi rất ấn tượng với chiến dịch của bạn!",
        time: "Hôm qua",
        sender: "other",
      },
      {
        id: 2,
        content: "Cảm ơn bạn! Bạn có câu hỏi gì về chiến dịch không?",
        time: "Hôm qua",
        sender: "me",
      },
    ],
    3: [
      {
        id: 1,
        content: "Bạn có thể chia sẻ thêm thông tin về cách tiền sẽ được sử dụng không?",
        time: "Thứ 2",
        sender: "other",
      },
      {
        id: 2,
        content:
          "Chắc chắn rồi! Chúng tôi có kế hoạch chi tiết cho từng giai đoạn. Bạn có thể xem trong phần mô tả chiến dịch hoặc tôi có thể gửi cho bạn tài liệu chi tiết hơn.",
        time: "Thứ 2",
        sender: "me",
      },
    ],
    4: [
      {
        id: 1,
        content: "Tôi muốn tham gia vào chiến dịch của bạn. Tôi có thể giúp gì không?",
        time: "21/05",
        sender: "other",
      },
      {
        id: 2,
        content:
          "Tuyệt vời! Chúng tôi luôn chào đón tình nguyện viên. Bạn có thể giúp chia sẻ chiến dịch hoặc tham gia trực tiếp vào các hoạt động. Bạn có kỹ năng hoặc sở thích đặc biệt nào không?",
        time: "21/05",
        sender: "me",
      },
    ],
    5: [
      {
        id: 1,
        content: "Xin chào, tôi có một số câu hỏi về chiến dịch của bạn.",
        time: "15/05",
        sender: "other",
      },
      {
        id: 2,
        content: "Xin chào! Tôi rất vui lòng trả lời các câu hỏi của bạn. Bạn muốn biết gì?",
        time: "15/05",
        sender: "me",
      },
    ],
  }

  const activeMessages = messages[activeConversation] || []
  const activeConversationData = conversations.find((conv) => conv.id === activeConversation)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the server
      setMessageInput("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tin nhắn</h1>
          <p className="text-muted-foreground">Trò chuyện với người tạo chiến dịch và người đóng góp</p>
        </div>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm tin nhắn..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {conversations.map((conversation) => (
                <div key={conversation.id}>
                  <div
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{conversation.name}</span>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && <Badge className="ml-auto bg-green-600">{conversation.unread}</Badge>}
                  </div>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2">
          {activeConversationData ? (
            <>
              <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={activeConversationData.avatar || "/placeholder.svg"}
                      alt={activeConversationData.name}
                    />
                    <AvatarFallback>{activeConversationData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{activeConversationData.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {activeConversationData.online ? "Đang hoạt động" : "Không hoạt động"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100vh-16rem)]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {activeMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "me"
                              ? "bg-green-600 text-white"
                              : "bg-muted text-foreground dark:bg-muted/70"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "me" ? "text-green-100" : "text-muted-foreground"
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-[calc(100vh-16rem)]">
              <div className="text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Tin nhắn của bạn</h3>
                <p className="text-muted-foreground max-w-md">
                  Chọn một cuộc trò chuyện từ danh sách bên trái hoặc bắt đầu một cuộc trò chuyện mới.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

// Add MessageCircle icon since it's used in the empty state
function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
