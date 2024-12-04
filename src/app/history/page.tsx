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
import { parseFormattedText } from '../w/action';

const getLogHistory = async () => {
  const res = getChatLogs();

  return res;
};

export default async function Page() {
  const logs = await getLogHistory();

  console.log(logs);

  return (
    <div>
      <h1 className="text-2xl font-bold">Lịch sử các đề xuất dinh dưỡng</h1>

      {logs.map((log) => (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span>
                {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss')}
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <NutritionInfo data={log.dataForm} />

              <NutritionResult result={parseFormattedText(log.botResponse)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
