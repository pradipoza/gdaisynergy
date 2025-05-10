import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Analytics, Service, Solution, Message } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import AnalyticsCard from "@/components/admin/AnalyticsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  // Fetch analytics data
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery<Analytics[]>({
    queryKey: ['/api/analytics?days=30'],
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Fetch services count
  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Fetch solutions count
  const { data: solutions } = useQuery<Solution[]>({
    queryKey: ['/api/solutions'],
  });

  // Fetch messages
  const { data: messages } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
  });

  // Prepare chart data
  const chartData = analyticsData?.map(day => ({
    date: format(new Date(day.date), 'MMM dd'),
    pageViews: day.pageViews,
    visitors: day.visitors,
    serviceClicks: day.serviceClicks,
    inquiries: day.inquiries
  })) || [];

  // Calculate totals
  const totalPageViews = analyticsData?.reduce((sum, day) => sum + day.pageViews, 0) || 0;
  const totalVisitors = analyticsData?.reduce((sum, day) => sum + day.visitors, 0) || 0;
  const totalServiceClicks = analyticsData?.reduce((sum, day) => sum + day.serviceClicks, 0) || 0;
  const totalInquiries = analyticsData?.reduce((sum, day) => sum + day.inquiries, 0) || 0;
  
  // Count unread messages
  const unreadMessages = messages?.filter(msg => !msg.read).length || 0;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | NepalAI</title>
      </Helmet>

      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticsCard
              title="Total Page Views"
              value={totalPageViews}
              icon="fas fa-eye"
              trend={5.2}
              description="Last 30 days"
              color="blue"
            />
            <AnalyticsCard
              title="Total Visitors"
              value={totalVisitors}
              icon="fas fa-users"
              trend={2.1}
              description="Last 30 days"
              color="green"
            />
            <AnalyticsCard
              title="Service Clicks"
              value={totalServiceClicks}
              icon="fas fa-mouse-pointer"
              trend={8.5}
              description="Last 30 days"
              color="purple"
            />
            <AnalyticsCard
              title="Inquiries"
              value={totalInquiries}
              icon="fas fa-envelope"
              trend={12.3}
              description="Last 30 days"
              color="orange"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Page views and visitors over time</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAnalytics ? (
                  <div className="flex justify-center items-center h-80">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pageViews"
                        stroke="#3A0CA3"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="visitors" stroke="#4361EE" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Service clicks and inquiries over time</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAnalytics ? (
                  <div className="flex justify-center items-center h-80">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="serviceClicks" fill="#7209B7" />
                      <Bar dataKey="inquiries" fill="#F72585" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Content Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Content Summary</CardTitle>
                <CardDescription>Overview of published content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">Services</span>
                    <span className="font-semibold">{services?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">Solutions</span>
                    <span className="font-semibold">{solutions?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">Blogs</span>
                    <span className="font-semibold">{messages?.filter(m => m.service === 'blog').length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">Case Studies</span>
                    <span className="font-semibold">{messages?.filter(m => m.service === 'case-study').length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">News</span>
                    <span className="font-semibold">{messages?.filter(m => m.service === 'news').length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  You have {unreadMessages} unread messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAnalytics ? (
                  <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : !messages || messages.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    No messages to display
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((message) => (
                      <div key={message.id} className="flex items-start gap-4 p-3 rounded-lg bg-neutral-50">
                        <div className={`w-2 h-2 mt-2 rounded-full ${message.read ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{message.name}</h4>
                            <span className="text-xs text-neutral-500">
                              {format(new Date(message.createdAt), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 truncate">{message.message}</p>
                          <div className="text-xs text-neutral-500 mt-1">
                            {message.email} {message.service ? `• ${message.service}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
