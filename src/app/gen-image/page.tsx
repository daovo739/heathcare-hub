'use client';

import { generateFromImage } from '@/service/gemini/service';
import { useState } from 'react';

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function Page() {
  const [base64, setBase64] = useState<string | null>(null);
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
          const base64 = (await toBase64(file)) as string;
          setBase64(base64);
        }}
      />

      <button
        onClick={async () => {
          if (!base64) return;
          const rs = await generateFromImage(base64, file);
          console.log(rs);
        }}
      >
        test
      </button>
    </div>
  );
}
