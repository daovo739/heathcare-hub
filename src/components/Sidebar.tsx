import React from 'react';
import { Home, Settings, Users } from 'lucide-react'; // Icons from lucide-react
import { cn } from '@/lib/utils'; // Ensure you have this from shadcn

const menuItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];
export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        Admin
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-4 p-2 rounded hover:bg-gray-700 transition',
              'text-gray-300'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
