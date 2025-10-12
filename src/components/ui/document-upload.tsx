'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Upload,
  X,
  File,
  AlertCircle,
  FileImage,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type DocumentUploadProps = {
  value?: File[];
  onChange: (files: File[]) => void;
  onClearError?: () => void; // Callback to clear error
  accept?: string;
  maxSize?: number; // in bytes
  label?: string;
  description?: string;
  multiple?: boolean;
  error?: string;
  className?: string;
};

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return <FileText className='h-5 w-5 text-red-500' />;
    case 'doc':
    case 'docx':
      return <FileText className='h-5 w-5 text-blue-500' />;
    case 'xls':
    case 'xlsx':
      return <FileText className='h-5 w-5 text-green-600' />;
    case 'txt':
      return <FileText className='h-5 w-5 text-gray-600' />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <FileImage className='h-5 w-5 text-green-500' />;
    default:
      return <File className='h-5 w-5 text-gray-500' />;
  }
};

export const DocumentUpload = ({
  value = [],
  onChange,
  onClearError,
  accept = 'application/pdf,image/png,image/jpeg,image/jpg,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain',
  maxSize = 10 * 1024 * 1024, // 10MB
  label = 'Tải lên tài liệu',
  description = 'PDF, Images, Word, Excel (tối đa 10MB mỗi file)',
  multiple = true,
  error,
  className,
}: DocumentUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `${file.name}: File quá lớn (tối đa ${maxSize / 1024 / 1024}MB)`;
    }

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

    // Validate all files
    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        return;
      }
    }

    if (multiple) {
      onChange([...value, ...filesArray]);
    } else {
      onChange([filesArray[0]]);
    }

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
          'border-2 border-dashed rounded-lg p-4 text-center transition-colors',
          isDragging && 'border-primary bg-primary/5',
          displayError && 'border-destructive'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileText className='h-6 w-6 mx-auto text-muted-foreground mb-2' />
        <p className='text-sm font-medium'>{label}</p>
        <p className='text-xs text-muted-foreground mt-1'>{description}</p>
        <p className='text-xs text-muted-foreground'>
          Hoặc kéo thả file vào đây
        </p>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='mt-3'
          onClick={() => inputRef.current?.click()}
        >
          <Upload className='mr-2 h-4 w-4' />
          Chọn tệp
        </Button>

        <input
          ref={inputRef}
          type='file'
          accept={accept}
          multiple={multiple}
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

      {/* Files List */}
      {value.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>
            Đã chọn {value.length} file{value.length > 1 ? 's' : ''}
          </p>
          <div className='space-y-2'>
            {value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className='flex items-center justify-between p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors'
              >
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  {getFileIcon(file.name)}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>{file.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
                  onClick={() => handleRemove(index)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
