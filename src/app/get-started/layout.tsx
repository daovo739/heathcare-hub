import Link from 'next/link';
import { SurveyProvider } from './_contexts/SurveyContext';

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SurveyProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <div className="mb-8">
          <Link href="/" className="text-3xl font-bold text-primary">
            Enouvo Healthcare Hub
          </Link>
        </div>
        {children}
      </div>
    </SurveyProvider>
  );
}
