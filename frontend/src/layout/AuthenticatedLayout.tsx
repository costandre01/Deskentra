import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AuthenticatedLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto bg-muted/30 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}