import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Service, insertServiceSchema } from "@shared/schema";
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
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

const AdminServices = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch services
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: async (service: { title: string; description: string; content: string; imageUrl: string }) => {
      const res = await apiRequest('POST', '/api/services', service);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Service created",
        description: "The service has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to create service",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, service }: { id: number; service: Partial<{ title: string; description: string; content: string; imageUrl: string }> }) => {
      const res = await apiRequest('PUT', `/api/services/${id}`, service);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Service updated",
        description: "The service has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to update service",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/services/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Service deleted",
        description: "The service has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete service",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setImageUrl("");
    setCurrentService(null);
  };

  const handleAddService = () => {
    try {
      const serviceData = insertServiceSchema.parse({
        title,
        description,
        content,
        imageUrl,
      });
      createMutation.mutate(serviceData);
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateService = () => {
    if (!currentService) return;
    
    try {
      const serviceData = insertServiceSchema.partial().parse({
        title,
        description,
        content,
        imageUrl,
      });
      updateMutation.mutate({ id: currentService.id, service: serviceData });
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setTitle(service.title);
    setDescription(service.description);
    setContent(service.content);
    setImageUrl(service.imageUrl || "");
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Manage Services | Admin Dashboard</title>
      </Helmet>

      <AdminLayout title="Services">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Manage AI services that your company offers
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !services || services.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                No services yet. Click "Add Service" to create your first service.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                      <TableCell>{format(new Date(service.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(new Date(service.updatedAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(service)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDeleteDialog(service)}
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

        {/* Add Service Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new AI service to showcase on your website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                onClick={handleAddService} 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Service"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Service Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Update the details of this AI service.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                onClick={handleUpdateService} 
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
                This will permanently delete the service "{currentService?.title}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => currentService && deleteMutation.mutate(currentService.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Service"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
};

export default AdminServices;
