import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { InsertMessage } from '@shared/schema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const DiscussForm = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await apiRequest('POST', '/api/messages', data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    {...field} 
                    className="bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your Company Ltd." 
                  {...field} 
                  className="bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="automation">AI Automation</SelectItem>
                  <SelectItem value="development">AI Software Development</SelectItem>
                  <SelectItem value="consulting">AI Consulting</SelectItem>
                  <SelectItem value="solution">Custom AI Solution</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Details</FormLabel>
              <FormControl>
                <Textarea 
                  rows={4} 
                  placeholder="Tell us about your project, goals, and specific requirements..." 
                  {...field} 
                  className="bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Request
              <i className="fas fa-paper-plane ml-2"></i>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DiscussForm;
