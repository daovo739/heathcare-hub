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
    <div className="space-y-6 bg-gray-50 text-gray-800">
      {Object.entries(data).map(([sectionTitle, subsections], index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
        >
          <h2 className="text-md font-semibold mb-4 ">{sectionTitle}</h2>
          {subsections.map((subsection, subIndex) => (
            <div key={subIndex} className="mb-1">
              <h3 className="text-sm font-medium mb-2 text-gray-700">
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
