'use client';

import { cn } from '@/lib/utils'; // Ensure you have this from shadcn
import { History, Home, Settings } from 'lucide-react'; // Icons from lucide-react
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import emPi from '@/assets/images/emPi.png';

const menuItems = [
  { name: 'Trang chủ', icon: Home, href: '/dashboard' },
  { name: 'Lịch sử tư vấn', icon: History, href: '/history' },
  { name: 'Cài đặt', icon: Settings, href: '/settings' },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white text-neutral-900 flex flex-col pt-8">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center text-2xl font-bold">
        <div className="relative size-36">
          <Image src={emPi} alt="Em Pi" fill className="size-36" priority />
        </div>
        <span>EpDiThi</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 mt-12  border-t border-gray-700">
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
