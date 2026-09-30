import {
  BookOpen,
  Building2,
  Command,
  LayoutDashboard,
  Package,
  Settings,
  Ticket,
  UserCog,
  Users,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'André Costa',
    email: 'andre@flowtechsolutions.com',
    avatar: '/avatars/default.jpg',
  },

  teams: [
    {
      name: 'Deskentra',
      logo: Command,
      plan: 'Support Platform',
    },
  ],

  navGroups: [
    {
      title: 'Workspace',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Tickets',
          url: '/tickets',
          icon: Ticket,
        },
        {
          title: 'Companies',
          url: '/companies',
          icon: Building2,
        },
        {
          title: 'Contacts',
          url: '/contacts',
          icon: Users,
        },
        {
          title: 'Products',
          url: '/products',
          icon: Package,
        },
        {
          title: 'Knowledge Base',
          url: '/knowledge-base',
          icon: BookOpen,
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        {
          title: 'Users',
          url: '/users',
          icon: UserCog,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}