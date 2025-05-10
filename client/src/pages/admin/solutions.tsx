import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Solution, insertSolutionSchema } from "@shared/schema";
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

const AdminSolutions = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<Solution | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch solutions
  const { data: solutions, isLoading } = useQuery<Solution[]>({
    queryKey: ['/api/solutions'],
  });

  // Create solution mutation
  const createMutation = useMutation({
    mutationFn: async (solution: { title: string; description: string; content: string; imageUrl: string }) => {
      const res = await apiRequest('POST', '/api/solutions', solution);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Solution created",
        description: "The solution has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/solutions'] });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to create solution",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update solution mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, solution }: { id: number; solution: Partial<{ title: string; description: string; content: string; imageUrl: string }> }) => {
      const res = await apiRequest('PUT', `/api/solutions/${id}`, solution);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Solution updated",
        description: "The solution has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/solutions'] });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to update solution",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete solution mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/solutions/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Solution deleted",
        description: "The solution has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/solutions'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete solution",
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
    setCurrentSolution(null);
  };

  const handleAddSolution = () => {
    try {
      const solutionData = insertSolutionSchema.parse({
        title,
        description,
        content,
        imageUrl,
      });
      createMutation.mutate(solutionData);
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSolution = () => {
    if (!currentSolution) return;
    
    try {
      const solutionData = insertSolutionSchema.partial().parse({
        title,
        description,
        content,
        imageUrl,
      });
      updateMutation.mutate({ id: currentSolution.id, service: solutionData });
    } catch (error) {
      toast({
        title: "Validation error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (solution: Solution) => {
    setCurrentSolution(solution);
    setTitle(solution.title);
    setDescription(solution.description);
    setContent(solution.content);
    setImageUrl(solution.imageUrl || "");
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (solution: Solution) => {
    setCurrentSolution(solution);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Manage Solutions | Admin Dashboard</title>
      </Helmet>

      <AdminLayout title="Solutions">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Solutions</CardTitle>
              <CardDescription>
                Manage industry-specific AI solutions
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Solution
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !solutions || solutions.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                No solutions yet. Click "Add Solution" to create your first industry solution.
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
                  {solutions.map((solution) => (
                    <TableRow key={solution.id}>
                      <TableCell className="font-medium">{solution.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{solution.description}</TableCell>
                      <TableCell>{format(new Date(solution.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(new Date(solution.updatedAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(solution)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openDeleteDialog(solution)}
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

        {/* Add Solution Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Solution</DialogTitle>
              <DialogDescription>
                Create a new industry-specific AI solution to showcase on your website.
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
                onClick={handleAddSolution} 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Solution"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Solution Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Solution</DialogTitle>
              <DialogDescription>
                Update the details of this industry-specific AI solution.
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
                onClick={handleUpdateSolution} 
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
                This will permanently delete the solution "{currentSolution?.title}".
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => currentSolution && deleteMutation.mutate(currentSolution.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Solution"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
};

export default AdminSolutions;
