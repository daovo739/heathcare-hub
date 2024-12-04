import emPi from '@/assets/images/emPi.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-[15%] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-primary text-2xl font-bold">
            Enouvo Healthcare Hub
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Hero Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={emPi}
              alt="Em Pi"
              width={400}
              height={400}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Hero Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-left font-bold text-gray-700 max-w-md">
              The free and effective way to keep you healthy!
            </h1>
            <div className="flex flex-col w-full max-w-md gap-3">
              <Button asChild className="w-full h-12 text-lg">
                <Link href="/get-started">GET STARTED</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-lg text-[#1cb0f6] border-[#1cb0f6]"
              >
                I ALREADY HAVE AN ACCOUNT
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <div className="flex items-center gap-4 overflow-x-auto px-4 text-neutral-500">
            @2024 Enouvo Healthcare Hub
          </div>
        </div>
      </footer>
    </div>
  );
}
