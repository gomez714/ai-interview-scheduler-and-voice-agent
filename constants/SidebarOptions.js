import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interviews',
        icon: Calendar,
        path: '/scheduled-interviews'
    },
    {
        name: 'All Interviews',
        icon: List,
        path: '/all-interviews'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    }
]