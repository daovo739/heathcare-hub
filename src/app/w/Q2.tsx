import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Heading } from './Heading';
import { exclusions } from './options';
import { Button } from '@/components/ui/button';
import { CollectDataForm } from './CollectData';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

export function Q2() {
  const { setValue, watch } = useFormContext<CollectDataForm>();

  const currentExclusions = watch('exclude');

  return (
    <div>
      <Heading
        title="Có loại thực phẩm nào bạn tránh không?"
        subTitle="Có thể là do dị ứng hoặc bất kỳ lý do nào khác."
      />

      {/* Common exclusion */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Loại trừ phổ biến</h2>
        <div className="flex flex-wrap gap-2">
          {exclusions.at(0)?.items?.map((item) => (
            <Button
              variant="outline"
              className={cn('rounded-md hover:bg-blue-600 hover:text-white', {
                'bg-blue-600 text-white': currentExclusions.includes(item),
              })}
              key={item}
              onClick={() => {
                setValue(
                  'exclude',
                  currentExclusions.includes(item)
                    ? currentExclusions.filter((i) => i !== item)
                    : [...currentExclusions, item]
                );
              }}
              type="button"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* Exclusion groups */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              <h2 className="text-lg font-semibold mb-3">Các loại trừ khác</h2>
            </AccordionTrigger>
            <AccordionContent>
              {exclusions.at(1)?.subcategories?.map((group) => (
                <div key={group.name} className="flex flex-col">
                  <span className="text-md font-semibold">{group.name}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.items.map((item) => (
                      <Button
                        variant="outline"
                        key={item}
                        className={cn(
                          'rounded-md hover:bg-blue-600 hover:text-white',
                          {
                            'bg-blue-600 text-white':
                              currentExclusions.includes(item),
                          }
                        )}
                        onClick={() => {
                          setValue(
                            'exclude',
                            currentExclusions.includes(item)
                              ? currentExclusions.filter((i) => i !== item)
                              : [...currentExclusions, item]
                          );
                        }}
                        type="button"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
