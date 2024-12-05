'use client';

import { generateFromImage } from '@/service/gemini/service';
import { useState } from 'react';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <h1>Gen Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (!file) {
            return;
          }
          setFile(file);
        }}
      />

      <button
        onClick={async () => {
          if (!file) return;
          const rs = await generateFromImage(file);
          console.log(rs);
        }}
      >
        test
      </button>
    </div>
  );
}
