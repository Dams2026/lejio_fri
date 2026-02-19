import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { FriAuthProvider } from "@/providers/FriAuthProvider";
import { BrandProvider } from "@/providers/BrandContext";
import { ProtectedRoute } from "@/components/fri/ProtectedRoute";

// FORCE NEW BUILD - DO NOT REMOVE - 2026-02-08-bilsalg-status-2
const APP_VERSION = "2026.02.08.003";
import { TenantProvider } from "@/hooks/useTenant";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "./pages/NotFound";

// AUTOFIQ (White-label lessor platform) - lazy loaded
const AutofiqLandingPage = lazy(() => import("./pages/fri/landing/LandingPage").then(m => ({ default: m.FriLandingPage })));
const AutofiqTrialPage = lazy(() => import("./pages/fri/TrialPage").then(m => ({ default: m.FriTrialPage })));
const AutofiqFeaturesPage = lazy(() => import("./pages/fri/FeaturesPage").then(m => ({ default: m.FriFeaturesPage })));
const AutofiqLoginPage = lazy(() => import("./pages/fri/auth/LoginPage").then(m => ({ default: m.FriLoginPage })));
const AutofiqSignupPage = lazy(() => import("./pages/fri/auth/SignupPage").then(m => ({ default: m.FriSignupPage })));
const AutofiqDashboard = lazy(() => import("./pages/fri/dashboard/Dashboard").then(m => ({ default: m.FriDashboard })));
const TenantSignupPage = lazy(() => import("./pages/fri/tenant/SignupPage").then(m => ({ default: m.TenantSignupPage })));

// AUTOFIQ Admin - lazy loaded
const AutofiqAdminLoginPage = lazy(() => import("./pages/fri/admin/LoginPage").then(m => ({ default: m.FriAdminLoginPage })));
const AutofiqAdminDashboard = lazy(() => import("./pages/fri/admin/Dashboard").then(m => ({ default: m.FriAdminDashboard })));
const AutofiqAdminLessorsPage = lazy(() => import("./pages/fri/admin/LessorsPage").then(m => ({ default: m.FriAdminLessorsPage })));
const AutofiqAdminLessorDetailsPage = lazy(() => import("./pages/fri/admin/LessorDetailsPage").then(m => ({ default: m.FriAdminLessorDetailsPage })));
const AutofiqAdminTicketsPage = lazy(() => import("./pages/fri/admin/TicketsPage").then(m => ({ default: m.FriAdminTicketsPage })));
const AutofiqAdminTicketDetailsPage = lazy(() => import("./pages/fri/admin/TicketDetailsPage").then(m => ({ default: m.FriAdminTicketDetailsPage })));
const AutofiqAdminPaymentsPage = lazy(() => import("./pages/fri/admin/PaymentsPage").then(m => ({ default: m.FriAdminPaymentsPage })));
const AutofiqAdminModulesPage = lazy(() => import("./pages/fri/admin/ModulesPage").then(m => ({ default: m.FriAdminModulesPage })));
const AutofiqAdminLayout = lazy(() => import("./pages/fri/admin/Layout").then(m => ({ default: m.FriAdminLayout })));

// Autofiq Lessor Pages - lazy loaded
const AutofiqApiKeysPage = lazy(() => import("./pages/fri/dashboard/ApiKeysPage").then(m => ({ default: m.FriApiKeysPage })));
const AutofiqTeamManagement = lazy(() => import("./pages/fri/dashboard/FriTeamManagement").then(m => ({ default: m.default })));
const AutofiqLessorDashboard = lazy(() => import("./pages/fri/dashboard/FriLessorDashboard").then(m => ({ default: m.default })));
const AutofiqInvoiceManagement = lazy(() => import("./pages/fri/dashboard/FriInvoiceManagement").then(m => ({ default: m.default })));
const AutofiqModulesPage = lazy(() => import("./pages/fri/dashboard/ModulesPage").then(m => ({ default: m.FriModulesPage })));
const AutofiqVehiclesPage = lazy(() => import("./pages/fri/dashboard/VehiclesPage").then(m => ({ default: m.FriVehiclesPage })));
const AutofiqBookingsPage = lazy(() => import("./pages/fri/dashboard/BookingsPage").then(m => ({ default: m.FriBookingsPage })));
const AutofiqPaymentsPage = lazy(() => import("./pages/fri/dashboard/PaymentsPage").then(m => ({ default: m.FriPaymentsPage })));
const AutofiqSettingsPage = lazy(() => import("./pages/fri/dashboard/SettingsPage").then(m => ({ default: m.FriSettingsPage })));
const AutofiqDealerHubPage = lazy(() => import("./pages/fri/dashboard/DealerHubPage").then(m => ({ default: m.default })));

// Workshop Pages - lazy loaded
const GaragePlanPage = lazy(() => import("./pages/fri/workshop/GaragePlan").then(m => ({ default: m.GaragePlanPage })));
const GarageTeamPage = lazy(() => import("./pages/fri/workshop/GarageTeam").then(m => ({ default: m.GarageTeamPage })));
const GarageBooksPage = lazy(() => import("./pages/fri/workshop/GarageBooks").then(m => ({ default: m.GarageBooks })));
const GarageSyncPage = lazy(() => import("./pages/fri/workshop/GarageSync").then(m => ({ default: m.GarageSyncPage })));
const GarageChatPage = lazy(() => import("./pages/fri/workshop/GarageChat").then(m => ({ default: m.GarageChatPage })));
const GarageDealPage = lazy(() => import("./pages/fri/workshop/GarageDeal").then(m => ({ default: m.GarageDealPage })));
const GarageHubPage = lazy(() => import("./pages/fri/workshop/GarageHub").then(m => ({ default: m.GarageHubPage })));
const WorkshopModulesPublic = lazy(() => import("./pages/fri/workshop/WorkshopModulesPublic").then(m => ({ default: m.WorkshopModulesPublic })));
const WorkshopPricingPage = lazy(() => import("./pages/fri/workshop/WorkshopPricingPage").then(m => ({ default: m.WorkshopPricingPage })));

// Page Builder - lazy loaded
const PagesDashboard = lazy(() => import("./pages/dashboard/PagesDashboard").then(m => ({ default: m.PagesDashboard })));
const PageBuilder = lazy(() => import("./pages/dashboard/PageBuilder").then(m => ({ default: m.PageBuilder })));
const PagePreview = lazy(() => import("./pages/dashboard/PagePreview").then(m => ({ default: m.PagePreview })));
const PublicSiteRenderer = lazy(() => import("./pages/PublicSite").then(m => ({ default: m.PublicSiteRenderer })));

// Optimized QueryClient configuration for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for reuse
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch when user returns to tab
      refetchOnReconnect: true, // Refetch if connection lost
      refetchOnMount: true, // Refetch if component remounts
      networkMode: 'always', // Try offline queries
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
      networkMode: 'always',
    }
  }
});

// Minimal loading fallback
const LegacyAutofiqRedirect = () => {
  const location = useLocation();
  const nextPath = location.pathname.replace(/^\/fri/, '/autofiq') || '/autofiq';
  return <Navigate to={`${nextPath}${location.search}${location.hash}`} replace />;
};

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TenantProvider apiBaseUrl="/api">
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                <Routes>
                {/* Debug route */}
        <Route path="/debug" element={<div className="p-8"><h1>Debug: App is working! (v2)</h1><p>This is the NEW compiled version</p></div>} />
                <Route path="/fri/*" element={<LegacyAutofiqRedirect />} />
                {/* AUTOFIQ - Main Platform */}
                <Route path="/" element={<Navigate to="/autofiq" replace />} />
                <Route path="/autofiq" element={<AutofiqLandingPage />} />
                <Route path="/autofiq/landing" element={<Navigate to="/autofiq" replace />} />
                <Route path="/trial" element={<Navigate to="/autofiq/trial" replace />} />
                <Route path="/autofiq/trial" element={<AutofiqTrialPage />} />
                <Route path="/features" element={<Navigate to="/autofiq/features" replace />} />
                <Route path="/autofiq/features" element={<AutofiqFeaturesPage />} />
                <Route path="/login" element={<Navigate to="/autofiq/login" replace />} />
                <Route path="/autofiq/login" element={<AutofiqLoginPage />} />
                <Route path="/signup" element={<Navigate to="/autofiq/signup" replace />} />
                <Route path="/autofiq/signup" element={<AutofiqSignupPage />} />
                <Route path="/autofiq/tenant/signup" element={<TenantSignupPage />} />
                <Route path="/autofiq/dashboard" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <AutofiqDashboard />
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/team" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="team">
                        <AutofiqTeamManagement />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/analytics" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="analytics">
                        <AutofiqLessorDashboard />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/invoices" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="invoices">
                        <AutofiqInvoiceManagement />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                
                <Route path="/autofiq/dashboard/vehicles" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <AutofiqVehiclesPage />
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/dealer" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="dealer">
                        <AutofiqDealerHubPage />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/bookings" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <AutofiqBookingsPage />
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/payments" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="payments">
                        <AutofiqPaymentsPage />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/modules" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="modules">
                        <AutofiqModulesPage />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/api-keys" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="api-keys">
                        <AutofiqApiKeysPage />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                <Route path="/autofiq/dashboard/settings" element={
                  <BrandProvider branding={{ primary_color: '#0066cc', secondary_color: '#00cc99', company_name: 'Autofiq' }} domain="autofiq">
                    <FriAuthProvider>
                      <ProtectedRoute permission="settings">
                        <AutofiqSettingsPage />
                      </ProtectedRoute>
                    </FriAuthProvider>
                  </BrandProvider>
                } />
                
                {/* Workshop Pages */}
                <Route path="/autofiq/workshop/garageplan" element={<GaragePlanPage />} />
                <Route path="/autofiq/workshop/garageteam" element={<GarageTeamPage />} />
                <Route path="/autofiq/workshop/garagebooks" element={<GarageBooksPage />} />
                <Route path="/autofiq/workshop/garagesync" element={<GarageSyncPage />} />
                <Route path="/autofiq/workshop/garagechat" element={<GarageChatPage />} />
                <Route path="/autofiq/workshop/garagedeal" element={<GarageDealPage />} />
                <Route path="/autofiq/workshop/garagehub" element={<GarageHubPage />} />
                <Route path="/autofiq/workshop/pricing" element={<WorkshopPricingPage />} />
                <Route path="/autofiq/workshop/modules" element={<WorkshopModulesPublic />} />
                
                {/* AUTOFIQ Admin */}
                <Route path="/autofiq/admin/login" element={<AutofiqAdminLoginPage />} />
                <Route path="/autofiq/admin/*" element={
                  <AutofiqAdminLayout>
                    <Routes>
                      <Route path="/dashboard" element={<AutofiqAdminDashboard />} />
                      <Route path="/lessors" element={<AutofiqAdminLessorsPage />} />
                      <Route path="/lessors/:lessorId" element={<AutofiqAdminLessorDetailsPage />} />
                      <Route path="/support" element={<AutofiqAdminTicketsPage />} />
                      <Route path="/support/:ticketId" element={<AutofiqAdminTicketDetailsPage />} />
                      <Route path="/payments" element={<AutofiqAdminPaymentsPage />} />
                      <Route path="/modules" element={<AutofiqAdminModulesPage />} />
                      <Route path="/" element={<Navigate to="/autofiq/admin/dashboard" replace />} />
                    </Routes>
                  </AutofiqAdminLayout>
                } />

                {/* Page Builder - AUTOFIQ Dashboard */}
                <Route path="/dashboard/pages" element={
                  <FriAuthProvider>
                    <PagesDashboard />
                  </FriAuthProvider>
                } />
                <Route path="/dashboard/pages/:id/preview" element={
                  <FriAuthProvider>
                    <PagePreview />
                  </FriAuthProvider>
                } />
                <Route path="/dashboard/pages/:id/edit" element={
                  <FriAuthProvider>
                    <PageBuilder />
                  </FriAuthProvider>
                } />

                {/* Page Renderer for published sites */}
                <Route path="/site/:lessorId/*" element={<PublicSiteRenderer />} />
                
                {/* Catch all - 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
      </TenantProvider>
    </QueryClientProvider>
  </ErrorBoundary>
  );
}
