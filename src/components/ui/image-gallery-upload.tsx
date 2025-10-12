'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type ImageGalleryUploadProps = {
  value?: File[];
  onChange: (files: File[]) => void;
  onClearError?: () => void; // Callback to clear error
  accept?: string;
  maxSize?: number; // in bytes per file
  maxFiles?: number; // maximum number of files
  label?: string;
  description?: string;
  error?: string;
  className?: string;
};

export const ImageGalleryUpload = ({
  value = [],
  onChange,
  onClearError,
  accept = 'image/png,image/jpeg,image/jpg,image/gif,image/svg+xml',
  maxSize = 5 * 1024 * 1024, // 5MB per file
  maxFiles = 10,
  label = 'Tải lên hình ảnh',
  description = 'PNG, JPG, GIF hoặc SVG (tối đa 5MB mỗi file)',
  error,
  className,
}: ImageGalleryUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Generate previews when files change
  useEffect(() => {
    if (!value || value.length === 0) {
      setPreviews([]);
      return;
    }

    // Create object URLs for previews
    const objectUrls = value.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // Cleanup
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [value]);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `${file.name}: File quá lớn (tối đa ${maxSize / 1024 / 1024}MB)`;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(t => t.trim());
    const fileType = file.type;
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.endsWith(type);
      }
      return (
        fileType === type || fileType.match(new RegExp(type.replace('*', '.*')))
      );
    });

    if (!isValidType) {
      return `${file.name}: Định dạng không hợp lệ`;
    }

    return null;
  };

  const handleFilesChange = (newFiles: FileList | null) => {
    setLocalError(null);

    if (!newFiles || newFiles.length === 0) return;

    const filesArray = Array.from(newFiles);

    // Check max files limit
    if (value.length + filesArray.length > maxFiles) {
      setLocalError(`Chỉ được tải lên tối đa ${maxFiles} hình ảnh`);
      return;
    }

    // Validate all files
    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        return;
      }
    }

    onChange([...value, ...filesArray]);
    // Clear form error after successful upload
    onClearError?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesChange(e.target.files);
    // Reset input để có thể chọn lại cùng file
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
    setLocalError(null);
    onClearError?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesChange(e.dataTransfer.files);
  };

  const displayError = error || localError;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
          isDragging && 'border-primary bg-primary/5',
          displayError && 'border-destructive',
          value.length >= maxFiles && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => value.length < maxFiles && inputRef.current?.click()}
      >
        <ImageIcon className='h-8 w-8 mx-auto text-muted-foreground mb-2' />
        <p className='text-sm font-medium'>{label}</p>
        <p className='text-xs text-muted-foreground mt-1'>{description}</p>
        <p className='text-xs text-muted-foreground'>
          Hoặc kéo thả file vào đây
        </p>
        {value.length > 0 && (
          <p className='text-xs text-muted-foreground mt-2'>
            Đã chọn {value.length}/{maxFiles} hình ảnh
          </p>
        )}
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='mt-4'
          onClick={e => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          disabled={value.length >= maxFiles}
        >
          <Upload className='mr-2 h-4 w-4' />
          Chọn tệp
        </Button>

        <input
          ref={inputRef}
          type='file'
          accept={accept}
          multiple
          className='hidden'
          onChange={handleInputChange}
        />
      </div>

      {/* Error Message */}
      {displayError && (
        <div className='flex items-center gap-2 text-sm text-destructive'>
          <AlertCircle className='h-4 w-4' />
          <span>{displayError}</span>
        </div>
      )}

      {/* Image Gallery Preview */}
      {previews.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>
            Gallery hình ảnh ({value.length} ảnh)
          </p>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {previews.map((preview, index) => (
              <div
                key={`${value[index].name}-${index}`}
                className='relative group aspect-square rounded-lg overflow-hidden border bg-muted'
              >
                <Image
                  src={preview}
                  alt={value[index].name}
                  fill
                  className='object-cover'
                />

                {/* Overlay with remove button */}
                <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <Button
                    type='button'
                    variant='destructive'
                    size='sm'
                    onClick={() => handleRemove(index)}
                    className='h-8 w-8 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>

                {/* File info */}
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-black/75 text-white text-xs truncate'>
                  <p className='truncate'>{value[index].name}</p>
                  <p>{(value[index].size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
