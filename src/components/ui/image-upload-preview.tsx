'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type ImageUploadPreviewProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  onClearError?: () => void; // Callback to clear error
  accept?: string;
  maxSize?: number; // in bytes
  label?: string;
  description?: string;
  error?: string;
  className?: string;
};

export const ImageUploadPreview = ({
  value,
  onChange,
  onClearError,
  accept = 'image/png,image/jpeg,image/jpg,image/gif,image/svg+xml',
  maxSize = 5 * 1024 * 1024, // 5MB
  label = 'Tải lên hình ảnh',
  description = 'PNG, JPG, GIF hoặc SVG (tối đa 5MB)',
  error,
  className,
}: ImageUploadPreviewProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Generate preview when file changes
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File quá lớn. Kích thước tối đa ${maxSize / 1024 / 1024}MB`;
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
      return 'Định dạng file không hợp lệ';
    }

    return null;
  };

  const handleFileChange = (file: File | null) => {
    setLocalError(null);

    if (!file) {
      onChange(null);
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    onChange(file);
    // Clear form error after successful upload
    onClearError?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setLocalError(null);
    onClearError?.();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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

    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const displayError = error || localError;

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg transition-colors relative',
          isDragging && 'border-primary bg-primary/5',
          displayError && 'border-destructive',
          !preview && 'p-6'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview && value ? (
          // Preview mode
          <div className='relative group'>
            <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
              <Image
                src={preview}
                alt='Preview'
                fill
                className='object-cover'
              />
            </div>

            {/* Overlay với actions */}
            <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => inputRef.current?.click()}
              >
                <Upload className='mr-2 h-4 w-4' />
                Thay đổi
              </Button>
              <Button
                type='button'
                variant='destructive'
                size='sm'
                onClick={handleRemove}
              >
                <X className='mr-2 h-4 w-4' />
                Xóa
              </Button>
            </div>

            {/* File info */}
            <div className='mt-2 text-xs text-muted-foreground'>
              {value.name} ({(value.size / 1024).toFixed(1)} KB)
            </div>
          </div>
        ) : (
          // Upload mode
          <div className='text-center'>
            <ImageIcon className='h-8 w-8 mx-auto text-muted-foreground mb-2' />
            <p className='text-sm font-medium'>{label}</p>
            <p className='mt-1 text-xs text-muted-foreground'>{description}</p>
            <p className='mt-1 text-xs text-muted-foreground'>
              Hoặc kéo thả file vào đây
            </p>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-4'
              onClick={() => inputRef.current?.click()}
            >
              <Upload className='mr-2 h-4 w-4' />
              Chọn tệp
            </Button>
          </div>
        )}

        <input
          ref={inputRef}
          type='file'
          accept={accept}
          className='hidden'
          onChange={handleInputChange}
        />
      </div>

      {displayError && (
        <div className='flex items-center gap-2 text-sm text-destructive'>
          <AlertCircle className='h-4 w-4' />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
};
