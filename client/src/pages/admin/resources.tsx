import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Resource, insertResourceSchema } from "@shared/schema";
import AdminLayout from "@/components/layout/AdminLayout";
import ContentEditor from "@/components/admin/ContentEditor";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Loader2, Pencil, Plus, Trash2, Tag as TagIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminResources = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  
  // Form state
  const [type, setType] = useState<string>("blog");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);

  // Fetch resources
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Create resource mutation
  const createMutation = useMutation({
    mutationFn: async (resource: { type: string; title: string; description: string; content: string; imageUrl: string; tags: string[]; featured: boolean }) => {
      const res = await apiRequest('POST', '/api/resources', resource);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Resource created",
        description: "The resource has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to create resource",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update resource mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, resource }: { id: number; resource: Partial<{ type: string; title: string; description: string; content: string; imageUrl: string; tags: string[]; featured: boolean }> }) => {
      const res = await apiRequest('PUT', `/api/resources/${id}`, resource);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Resource updated",
        description: "The resource has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to update resource",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete resource mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/resources/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Resource deleted",
        description: "The resource has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete resource",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setType("blog");
    setTitle("");
    setDescription("");
    setContent("");
    setImageUrl("");
    setTags([]);
    setTagInput("");
    setFeatured(false);
    setCurrentResource(null);
  };

  const handleAddResource = () => {
    try {
      const resourceData = insertResourceSchema.parse({
        type,
        title,
        description,
        content,
        imageUrl,
        tags,
        featured,
      });
      createMutation.mutate(resourceData);
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateResource = () => {
    if (!currentResource) return;
    
    try {
      const resourceData = insertResourceSchema.partial().parse({
        type,
        title,
        description,
        content,
        imageUrl,
        tags,
        featured,
      });
      updateMutation.mutate({ id: currentResource.id, resource: resourceData });
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (resource: Resource) => {
    setCurrentResource(resource);
    setType(resource.type);
    setTitle(resource.title);
    setDescription(resource.description);
    setContent(resource.content);
    setImageUrl(resource.imageUrl || "");
    setTags(resource.tags || []);
    setFeatured(resource.featured || false);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (resource: Resource) => {
    setCurrentResource(resource);
    setIsDeleteDialogOpen(true);
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Filter resources based on active tab
  const filteredResources = resources
    ? activeTab === "all" 
      ? resources 
      : resources.filter(resource => resource.type === activeTab)
    : [];

  return (
    <>
      <Helmet>
        <title>Manage Resources | Admin Dashboard</title>
      </Helmet>

      <AdminLayout title="Resources">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Manage blogs, news, portfolios, and case studies
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="blog">Blogs</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="case-study">Case Studies</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !filteredResources || filteredResources.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                No resources found. {activeTab === "all" ? "Click \"Add Resource\" to create your first resource." : `Add a new ${activeTab} by clicking "Add Resource".`}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.type.replace('-', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        {resource.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Featured
                          </span>
                        ) : (
                          <span className="text-neutral-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>{format(new Date(resource.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(resource)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDeleteDialog(resource)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Resource Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Create a new blog, news article, portfolio item, or case study.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={type}
                  onValueChange={setType}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag and press Enter"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <TagIcon className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)} 
                          className="text-primary hover:text-primary-dark"
                        >
                          <span className="sr-only">Remove tag</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="featured" className="text-right">
                  Featured
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <span className="text-sm text-gray-500">
                    {featured ? "This resource will appear in featured sections" : "This resource will not be featured"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="content" className="text-right mt-2">
                  Content
                </Label>
                <div className="col-span-3">
                  <ContentEditor value={content} onChange={setContent} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddResource} 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Resource"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Resource Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription>
                Update the details of this resource.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={type}
                  onValueChange={setType}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="edit-tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag and press Enter"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <TagIcon className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md"
                      >
                        <span>{tag}</span>
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)} 
                          className="text-primary hover:text-primary-dark"
                        >
                          <span className="sr-only">Remove tag</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-featured" className="text-right">
                  Featured
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="edit-featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <span className="text-sm text-gray-500">
                    {featured ? "This resource will appear in featured sections" : "This resource will not be featured"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="edit-content" className="text-right mt-2">
                  Content
                </Label>
                <div className="col-span-3">
                  <ContentEditor value={content} onChange={setContent} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateResource} 
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the resource "{currentResource?.title}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => currentResource && deleteMutation.mutate(currentResource.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Resource"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
};

export default AdminResources;
