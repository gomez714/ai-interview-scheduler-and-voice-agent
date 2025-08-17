import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Interview Results',
        icon: Calendar,
        path: '/interview-results'
    },
    {
        name: 'My Interviews',
        icon: List,
        path: '/my-interviews'
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