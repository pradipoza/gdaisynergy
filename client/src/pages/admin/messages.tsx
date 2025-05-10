import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Message } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import MessagesList from "@/components/admin/MessagesList";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const AdminMessages = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedMessageContent, setSelectedMessageContent] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Fetch messages
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
    refetchInterval: 60000, // Refetch every minute
  });

  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('PATCH', `/api/messages/${id}/read`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to mark message as read",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete message mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/messages/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete message",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const confirmDelete = (message: Message) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  const viewMessage = (message: Message) => {
    setSelectedMessageContent(message);
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
    setIsViewDialogOpen(true);
  };

  // Filter messages based on active tab
  const filteredMessages = messages
    ? activeTab === "all" 
      ? messages 
      : activeTab === "unread"
        ? messages.filter(message => !message.read)
        : messages.filter(message => message.read)
    : [];

  const unreadCount = messages?.filter(message => !message.read).length || 0;

  return (
    <>
      <Helmet>
        <title>Messages | Admin Dashboard</title>
      </Helmet>

      <AdminLayout title="Messages">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Manage inquiries and messages from visitors ({unreadCount} unread)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Messages</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !filteredMessages || filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                No messages found in this category.
              </div>
            ) : (
              <MessagesList 
                messages={filteredMessages} 
                onDelete={confirmDelete} 
                onView={viewMessage}
                onMarkAsRead={(id) => markAsReadMutation.mutate(id)}
              />
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this message from {selectedMessage?.name}.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => selectedMessage && deleteMutation.mutate(selectedMessage.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Message"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* View Message Dialog */}
        {selectedMessageContent && (
          <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Message from {selectedMessageContent.name}</AlertDialogTitle>
                <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                  <div><strong>Email:</strong> {selectedMessageContent.email}</div>
                  {selectedMessageContent.company && (
                    <div><strong>Company:</strong> {selectedMessageContent.company}</div>
                  )}
                  {selectedMessageContent.phone && (
                    <div><strong>Phone:</strong> {selectedMessageContent.phone}</div>
                  )}
                  {selectedMessageContent.service && (
                    <div><strong>Service Interest:</strong> {selectedMessageContent.service}</div>
                  )}
                </div>
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessageContent.message}</p>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <Button
                  variant="outline"
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessageContent.email}?subject=Re: Your Inquiry to NepalAI`;
                  }}
                >
                  Reply via Email
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminMessages;
