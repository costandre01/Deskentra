import {
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeToggle from "@/components/theme/ThemeToggle";
import { useAuth } from "@/features/Authentication/Context/useAuth";
import NotificationDropdown from "@/features/Notifications/Components/notificationDropdown";

function getPageInfo(pathname: string) {
  if (pathname === "/dashboard" || pathname === "/") {
    return {
      title: "Dashboard",
      description: "Overview of your workspace.",
    };
  }

  if (pathname === "/tickets") {
    return {
      title: "Tickets",
      description: "Manage and track support tickets.",
    };
  }

  if (pathname.startsWith("/tickets/")) {
    return {
      title: "Ticket Details",
      description: "View and manage ticket information.",
    };
  }

  if (pathname === "/companies") {
    return {
      title: "Companies",
      description: "Manage your companies.",
    };
  }

  if (pathname === "/contacts") {
    return {
      title: "Contacts",
      description: "Manage your contacts.",
    };
  }

  if (pathname === "/products") {
    return {
      title: "Products",
      description: "Manage your products.",
    };
  }

  if (pathname === "/knowledge-base") {
    return {
      title: "Knowledge Base",
      description: "Manage support knowledge and articles.",
    };
  }

  if (pathname === "/users") {
    return {
      title: "Users",
      description: "Manage Deskentra users.",
    };
  }

  if (pathname === "/settings") {
    return {
      title: "Settings",
      description: "Manage your Deskentra settings.",
    };
  }

  if (pathname === "/profile") {
    return {
      title: "Profile",
      description: "Manage your personal information.",
    };
  }

  return {
    title: "Deskentra",
    description: "Support Platform",
  };
}

export default function AppHeader() {
  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const pageInfo = getPageInfo(location.pathname);

  const firstName = user?.firstName ?? "User";
  const lastName = user?.lastName ?? "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">
          {pageInfo.title}
        </h1>

        <p className="text-sm text-muted-foreground">
          {pageInfo.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="w-72 pl-9"
          />
        </div>

        <ThemeToggle />

        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 rounded-full p-0"
            >
              <Avatar>
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>
                  {firstName} {lastName}
                </span>

                <span className="text-xs font-normal text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => navigate("/settings?tab=profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={logout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}