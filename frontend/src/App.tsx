import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "@/features/Authentication/Context/AuthProvider";

import LoginPage from "@/features/Authentication/Pages/LoginPage";
import AcceptInvitationPage from "@/features/Authentication/Pages/AcceptInvitationPage";

import ProtectedRoute from "@/features/Authentication/Components/ProtectedRoute";

import DashboardPage from "@/features/Dashboard/pages/DashboardPage";

import CompaniesPage from "@/features/Companies/Pages/CompaniesPage";
import CompanyDetailsPage from "@/features/Companies/Pages/CompanyDetailsPage";

import TicketsPage from "@/features/Tickets/Pages/TicketsPage";
import TicketDetailsPage from "@/features/Tickets/Pages/TicketDetailsPage";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout";

import { Toaster } from "@/components/ui/sonner";

import UsersPage from "@/features/Users/Pages/UsersPage";

import ProductsPage from "@/features/Products/Pages/ProductsPage";

import ContactsPage from "@/features/Contacts/Pages/ContactsPage";

import SettingsPage from "@/features/Settings/Pages/SettingsPage";

import KnowledgeBasePage from "@/features/KnowledgeBase/Pages/KnowledgeBasePage";

import KnowledgeArticleDetailsPage from "@/features/KnowledgeBase/Pages/KnowledgeArticleDetailsPage";
import ContactDetailsPage from "./features/Contacts/Pages/ContactDetailsPage";
import CustomerInvitationPage from "@/features/Authentication/Pages/CustomerInvitationPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/customer/invite/:token"
            element={<CustomerInvitationPage />}
          />

          <Route
            path="/accept-invitation"
            element={<AcceptInvitationPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />

              <Route
                path="/dashboard"
                element={<DashboardPage />}
              />

              <Route
                path="/companies"
                element={<CompaniesPage />}
              />

              <Route
                path="/companies/:id"
                element={<CompanyDetailsPage />}
              />

              <Route
                path="/products"
                element={<ProductsPage />}
              />

              <Route
                path="/contacts"
                element={<ContactsPage />}
              />

              <Route
                path="/contacts/:id"
                element={<ContactDetailsPage />}
              />

              <Route
                path="/tickets"
                element={<TicketsPage />}
              />

              <Route
                path="/tickets/:id"
                element={<TicketDetailsPage />}
              />

              <Route
                path="/users"
                element={<UsersPage />}
              />

              <Route
                path="/settings"
                element={<SettingsPage />}
              />

              <Route
                path="/knowledge-base"
                element={<KnowledgeBasePage />}
              />

              <Route
                path="/knowledge-base/:id"
                element={<KnowledgeArticleDetailsPage />}
              />
            </Route>
          </Route>
        </Routes>

        <Toaster richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}