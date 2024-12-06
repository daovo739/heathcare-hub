'use client';

import FoodInfoCard from '@/components/FoodInfoCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { generateFromImage } from '@/service/gemini/service';
import { useMutation } from '@tanstack/react-query';
import { Camera, Info, Loader2, Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseMealSections } from './lib';
import { useToast } from '@/hooks/use-toast';

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resultText, setResultText] = useState('');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
  });

  const handleReset = () => {
    setFile(null);
  };

  const {
    mutate: generateFromImageMutator,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const rs = await generateFromImage(file);

      console.log(rs);

      if (rs?.includes('không hợp lệ')) {
        return toast({
          variant: 'error',
          description: 'Hình ảnh không hợp lệ',
        });
      }

      setResultText(rs ?? '');
    },
  });

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Quét Thực Phẩm</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tải lên hình ảnh thực phẩm</CardTitle>
          <CardDescription>
            Chụp ảnh hoặc tải lên hình ảnh thực phẩm để phân tích
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-info text-white p-4 rounded-md mb-4 italic">
            <Info className="h-4 w-4 inline-block mr-2" />
            Thông tin chỉ mang tính chất tham khảo, không có giá trị thay thế
            thuốc chữa bệnh
          </div>
          {!file ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <input {...getInputProps()} />
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">
                Kéo và thả hình ảnh vào đây, hoặc click để chọn file
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded food"
                className="w-full max-h-[32rem] object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => generateFromImageMutator()}
            disabled={!file || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang phân tích...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {!resultText ? 'Phân tích' : 'Phân tích lại'}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <p>
        {isSuccess && !!file && (
          <FoodInfoCard foodInfo={parseMealSections(resultText)} />
        )}
      </p>
    </div>
  );
}
