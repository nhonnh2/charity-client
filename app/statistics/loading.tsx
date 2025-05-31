import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Heart, LineChart } from "lucide-react"

export default function StatisticsLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <div className="mt-4 flex items-center">
                  <Skeleton className="h-6 w-20 mr-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Biểu đồ và phân tích */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-10 w-[140px]" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-40" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-48" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-48 rounded-full mx-auto my-6" />
              <div className="space-y-3 mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>

        {/* Tabs cho các loại thống kê khác nhau */}
        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Chiến dịch</span>
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Blockchain</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Hoạt động gần đây</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-10 w-[180px]" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <Skeleton className="h-6 w-64 mb-2" />
                              <Skeleton className="h-4 w-96" />
                            </div>
                            <div className="text-right shrink-0">
                              <Skeleton className="h-6 w-24 mb-1" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <Skeleton className="h-2 w-full" />
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
