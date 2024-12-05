import { ClipboardList } from 'lucide-react';
import React from 'react';

type Detail = string;

interface Subsection {
  title: string;
  details: Detail[];
}

export interface Section {
  [sectionTitle: string]: Subsection[];
}

type Props = {
  data: Section;
};

export const NutritionResult = ({ data }: Props) => {
  return (
    <div className="space-y-6 bg-warning/10 text-gray-800 p-4 rounded-md">
      <div className="flex items-center gap-1 mb-2 text-orange-800">
        <ClipboardList size={30} />
        <h2 className="text-3xl font-black m-0">Kết quả dinh dưỡng</h2>
      </div>
      {Object.entries(data).map(([sectionTitle, subsections], index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-md bg-white border border-orange-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            {sectionTitle}
          </h2>
          {subsections.map((subsection, subIndex) => (
            <div key={subIndex} className="mb-1">
              <h3 className="text-lg font-medium mb-2 text-gray-700">
                - {subsection.title}
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {subsection.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
