import { useState } from 'react';
import { Message } from '@shared/schema';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  Mail, 
  MessageSquare, 
  Check 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface MessagesListProps {
  messages: Message[];
  onDelete: (message: Message) => void;
  onView: (message: Message) => void;
  onMarkAsRead: (id: number) => void;
}

const MessagesList = ({ messages, onDelete, onView, onMarkAsRead }: MessagesListProps) => {
  // Sort messages with unread first and then by date
  const sortedMessages = [...messages].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1; // Unread messages first
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Then newest first
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>From</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMessages.map((message) => (
          <TableRow key={message.id} className={!message.read ? 'bg-blue-50' : ''}>
            <TableCell>
              <div className={`w-3 h-3 rounded-full ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span>{message.name}</span>
                <span className="text-xs text-gray-500">{message.email}</span>
              </div>
            </TableCell>
            <TableCell className="max-w-xs truncate">{message.message}</TableCell>
            <TableCell>
              {message.service ? (
                <Badge variant="outline">{message.service}</Badge>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </TableCell>
            <TableCell>{format(new Date(message.createdAt), 'MMM d, yyyy')}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onView(message)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Message
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => window.location.href = `mailto:${message.email}?subject=Re: Your Inquiry to NepalAI`}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Reply via Email
                  </DropdownMenuItem>
                  {!message.read && (
                    <DropdownMenuItem onClick={() => onMarkAsRead(message.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Read
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(message)}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MessagesList;
