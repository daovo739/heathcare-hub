'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl font-bold">
          Tính năng đang trong quá trình phát triển, hãy quay lại sau ...
        </h1>
        <Button onClick={() => router.push('/dashboard')}>
          Trở về trang chủ
        </Button>
      </div>
    </div>
  );
}
