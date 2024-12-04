'use client';

import { cn } from '@/lib/utils'; // Ensure you have this from shadcn
import { History, Home, Settings } from 'lucide-react'; // Icons from lucide-react
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'History', icon: History, href: '/history' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white text-neutral-900 flex flex-col pt-8">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
        EpDiThi
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-4 p-2 rounded transition text-neutral-600 hover:bg-[#E9FFEA] mb-3',
              {
                'bg-[#E9FFEA]': pathname === item.href,
              }
            )}
          >
            <item.icon className="size-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
