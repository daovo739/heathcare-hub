'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PropsWithChildren } from 'react';

interface Props {
  progress: number;
  title: string;
}

export const ProgressiveContainer = ({
  children,
  progress = 10,
  title,
}: PropsWithChildren<Props>) => {
  return (
    <Card className="w-full max-w-md">
      <Progress
        value={progress}
        className="relative before:absolute before:inset-x-0 before:bg-background before:z-10 before:h-1/2 before:bottom-0"
      />
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
};
