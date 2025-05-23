import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";

import HomePage from "@/pages/home-page";
import ServicesPage from "@/pages/services-page";
import ServiceDetailPage from "@/pages/service-detail-page";
import SolutionsPage from "@/pages/solutions-page";
import SolutionDetailPage from "@/pages/solution-detail-page";
import ResourcesPage from "@/pages/resources-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import LetsDiscussPage from "@/pages/lets-discuss-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";

// Admin pages
import Dashboard from "@/pages/admin/dashboard";
import AdminServices from "@/pages/admin/services";
import AdminSolutions from "@/pages/admin/solutions";
import AdminResources from "@/pages/admin/resources";
import AdminMessages from "@/pages/admin/messages";
import AdminInfo from "@/pages/admin/info";
import AdminSettings from "@/pages/admin/settings";
import AdminUsers from "@/pages/admin/users";

import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

// Wrap public routes with PageLayout
const PublicRoute = ({ component: Component }: { component: () => React.JSX.Element }) => {
  return (
    <PageLayout>
      <Component />
    </PageLayout>
  );
};

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={() => <PublicRoute component={HomePage} />} />
      <Route path="/services" component={() => <PublicRoute component={ServicesPage} />} />
      <Route path="/services/:id" component={() => <PublicRoute component={ServiceDetailPage} />} />
      <Route path="/solutions" component={() => <PublicRoute component={SolutionsPage} />} />
      <Route path="/solutions/:id" component={() => <PublicRoute component={SolutionDetailPage} />} />
      <Route path="/resources" component={() => <PublicRoute component={ResourcesPage} />} />
      <Route path="/resources/:type" component={() => <PublicRoute component={ResourcesPage} />} />
      <Route path="/about" component={() => <PublicRoute component={AboutPage} />} />
      <Route path="/contact" component={() => <PublicRoute component={ContactPage} />} />
      <Route path="/lets-discuss" component={() => <PublicRoute component={LetsDiscussPage} />} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Admin Routes - Protected */}
      <ProtectedRoute path="/admin" component={Dashboard} />
      <ProtectedRoute path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute path="/admin/services" component={AdminServices} />
      <ProtectedRoute path="/admin/solutions" component={AdminSolutions} />
      <ProtectedRoute path="/admin/resources" component={AdminResources} />
      <ProtectedRoute path="/admin/messages" component={AdminMessages} />
      <ProtectedRoute path="/admin/info" component={AdminInfo} />
      <ProtectedRoute path="/admin/users" component={AdminUsers} />
      <ProtectedRoute path="/admin/settings" component={AdminSettings} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
