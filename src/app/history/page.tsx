'use client';

import { NutritionInfo } from '@/components/NutritionInfo';
import { NutritionResult } from '@/components/NutritionResult';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getChatLogs } from '@/service/gemini/service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { parseFormattedText } from '../w/action';
import { CollectDataForm } from '../w/CollectData';

interface API {
  dataForm: CollectDataForm;
  botResponse: string;
  timestamp: string;
  id: string;
}
[];

const getLogHistory = async () => {
  const res = getChatLogs();

  return res;
};

export default function Page() {
  const { data: logs, isFetching } = useQuery({
    queryKey: ['logHistory'],
    queryFn: async (): Promise<API[]> => {
      const logs = await getChatLogs();
      return logs;
    },
  });

  if (isFetching) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Lịch sử các đề xuất dinh dưỡng</h1>

      {logs?.map((log) => {
        return (
          <Accordion type="single" collapsible className="w-full" key={log.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <CalendarDays />
                  <span>
                    {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-6">
                <NutritionInfo data={log.dataForm} />

                <NutritionResult data={parseFormattedText(log.botResponse)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
