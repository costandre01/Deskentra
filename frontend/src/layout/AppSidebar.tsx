import { NavLink } from "react-router-dom"
import {
  BookOpen,
  Building2,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Ticket,
  UserCog,
  Users,
} from "lucide-react";

import { useAuth } from "@/features/Authentication/Context/useAuth";

const menuItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tickets",
    to: "/tickets",
    icon: Ticket,
  },
  {
    title: "Companies",
    to: "/companies",
    icon: Building2,
  },
  {
    title: "Contacts",
    to: "/contacts",
    icon: Users,
  },
  {
    title: "Products",
    to: "/products",
    icon: Package,
  },
  {
    title: "Knowledge Base",
    to: "/knowledge-base",
    icon: BookOpen,
  },
]

export default function AppSidebar() {

  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold">Deskentra</h1>
        <p className="text-sm text-muted-foreground">
          Support Platform
        </p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.title}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </NavLink>
            )
          })}
        </div>

        <div className="my-6 border-t" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Administration
        </p>

        <div className="space-y-1">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            <UserCog className="h-5 w-5" />
            Users
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </nav>

      <div className="border-t px-3 py-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}