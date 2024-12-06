'use client';

import { cn } from '@/lib/utils'; // Ensure you have this from shadcn
import {
  Dices,
  Gamepad,
  History,
  Home,
  PersonStanding,
  Settings,
} from 'lucide-react'; // Icons from lucide-react
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import emPi from '@/assets/images/emPi.png';

const menuItems = [
  { name: 'Trang chủ', icon: Home, href: '/dashboard' },
  { name: 'Lịch sử tư vấn', icon: History, href: '/history' },
  { name: 'Cài đặt', icon: Settings, href: '/settings', comingSoon: true },
  {
    name: 'Đề xuất chương trình luyện tập',
    icon: Dices,
    href: '/suggest',
    comingSoon: true,
  },
  {
    name: 'Đề xuất hỗ trợ tinh thần',
    icon: PersonStanding,
    href: '/support',
    comingSoon: true,
  },
  { name: 'Trò chơi', icon: Gamepad, href: '/game', comingSoon: true },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="max-w-[24rem] min-w-64 bg-white text-neutral-900 flex flex-col pt-8">
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
              'flex flex-wrap gap-4 p-2 rounded-md transition text-neutral-600 hover:bg-primary hover:text-primary-foreground mb-3',
              {
                'bg-primary text-primary-foreground': pathname === item.href,
                'pointer-events-none text-neutral-400': item.comingSoon,
              }
            )}
          >
            <div className="flex items-center gap-4">
              <item.icon className="size-5" />
              <span>{item.name}</span>
            </div>
            {item.comingSoon && (
              <span className="text-xs border solid border-primary text-primary px-3 py-2 rounded-full w-fit p-2">
                Sắp ra mắt ...
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
