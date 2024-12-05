import { NutritionInfo } from '@/components/NutritionInfo';
import { NutritionResult } from '@/components/NutritionResult';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getChatLogs } from '@/service/gemini/service';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { parseFormattedText } from '../w/action';

const getLogHistory = async () => {
  const res = getChatLogs();

  return res;
};

export default async function Page() {
  const logs = await getLogHistory();

  return (
    <div>
      <h1 className="text-2xl font-bold">Lịch sử các đề xuất dinh dưỡng</h1>

      {logs.map((log) => {
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
