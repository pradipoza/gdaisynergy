import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CompanyInfo } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import ContentEditor from "@/components/admin/ContentEditor";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";

const CompanyInfoPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [aboutContent, setAboutContent] = useState("");
  const [contactContent, setContactContent] = useState("");
  
  // Fetch about info
  const { data: aboutInfo, isLoading: isLoadingAbout } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/about'],
  });

  // Fetch contact info
  const { data: contactInfo, isLoading: isLoadingContact } = useQuery<CompanyInfo>({
    queryKey: ['/api/company-info/contact'],
  });

  // Set initial content when data is loaded
  useEffect(() => {
    if (aboutInfo) {
      setAboutContent(aboutInfo.content || "");
    }
  }, [aboutInfo]);

  useEffect(() => {
    if (contactInfo) {
      setContactContent(contactInfo.content || "");
    }
  }, [contactInfo]);

  // Update company info mutation
  const updateInfoMutation = useMutation({
    mutationFn: async ({ type, content }: { type: string; content: string }) => {
      const res = await apiRequest('PUT', `/api/company-info/${type}`, { content });
      return res.json();
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Information updated",
        description: `The ${variables.type} information has been updated successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/company-info/${variables.type}`] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update information",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveAbout = () => {
    updateInfoMutation.mutate({ type: "about", content: aboutContent });
  };

  const handleSaveContact = () => {
    updateInfoMutation.mutate({ type: "contact", content: contactContent });
  };

  return (
    <>
      <Helmet>
        <title>Company Information | Admin Dashboard</title>
      </Helmet>

      <AdminLayout title="Company Information">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Us</CardTitle>
                <CardDescription>
                  Edit your company's about us information that will be displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAbout ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ContentEditor 
                    value={aboutContent} 
                    onChange={setAboutContent} 
                    placeholder="Enter your company's about us information here..."
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleSaveAbout} 
                  disabled={updateInfoMutation.isPending && activeTab === "about"}
                >
                  {updateInfoMutation.isPending && activeTab === "about" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Edit your company's contact information that will be displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingContact ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ContentEditor 
                    value={contactContent} 
                    onChange={setContactContent}
                    placeholder="Enter your company's contact information here..."
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleSaveContact} 
                  disabled={updateInfoMutation.isPending && activeTab === "contact"}
                >
                  {updateInfoMutation.isPending && activeTab === "contact" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Guidelines</CardTitle>
              <CardDescription>
                Suggestions for creating effective company information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">About Us Content</h3>
                  <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                    <li>Include your company's mission and vision</li>
                    <li>Share your company's history and founding story</li>
                    <li>Highlight your team's expertise and qualifications</li>
                    <li>Explain what makes your AI solutions unique</li>
                    <li>Use formatting (headers, bullet points) for better readability</li>
                    <li>Consider including testimonials from satisfied clients</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                    <li>Include physical address with postal code</li>
                    <li>List contact phone numbers (with country codes)</li>
                    <li>Provide multiple email addresses for different inquiries</li>
                    <li>Add links to all social media profiles</li>
                    <li>Consider adding business hours</li>
                    <li>Include an embedded map or coordinates if applicable</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
};

export default CompanyInfoPage;
