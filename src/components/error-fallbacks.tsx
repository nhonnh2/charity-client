'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ErrorFallbackProps } from './error-boundary';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

/**
 * Minimal Error Fallback - For small components
 */
export function MinimalErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps) {
  return (
    <Alert variant='destructive' className='my-4'>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Lỗi</AlertTitle>
      <AlertDescription className='flex items-center justify-between'>
        <span>Không thể tải nội dung này.</span>
        <Button size='sm' variant='outline' onClick={resetError}>
          <RefreshCw className='mr-2 h-3 w-3' />
          Thử lại
        </Button>
      </AlertDescription>
    </Alert>
  );
}

/**
 * Card Error Fallback - For card/widget components
 */
export function CardErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className='flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-6'>
      <AlertTriangle className='mb-3 h-8 w-8 text-destructive' />
      <p className='mb-4 text-center text-sm text-muted-foreground'>
        Đã xảy ra lỗi khi tải nội dung
      </p>
      <Button size='sm' variant='outline' onClick={resetError}>
        <RefreshCw className='mr-2 h-4 w-4' />
        Thử lại
      </Button>

      {process.env.NODE_ENV === 'development' && (
        <p className='mt-4 max-w-xs truncate text-xs text-destructive'>
          {error.message}
        </p>
      )}
    </div>
  );
}

/**
 * Page Error Fallback - For full page errors
 */
export function PageErrorFallback({
  error,
  resetError,
  errorContext,
}: ErrorFallbackProps) {
  const router = useRouter();

  return (
    <div className='flex min-h-[600px] w-full flex-col items-center justify-center p-8'>
      <div className='max-w-md text-center'>
        <div className='mb-6 text-8xl'>😵</div>
        <h1 className='mb-3 text-3xl font-bold text-foreground'>
          Đã xảy ra lỗi
        </h1>
        {errorContext && (
          <p className='mb-4 text-sm text-muted-foreground'>
            Trang: {errorContext}
          </p>
        )}
        <p className='mb-8 text-base text-muted-foreground'>
          Xin lỗi, trang này gặp lỗi khi hiển thị. Vui lòng thử lại hoặc quay về
          trang chủ.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className='mb-8 rounded-md bg-destructive/10 p-4 text-left'>
            <p className='mb-2 font-mono text-xs font-semibold text-destructive'>
              Development Info:
            </p>
            <p className='break-all font-mono text-xs text-destructive'>
              {error.message}
            </p>
            {error.stack && (
              <details className='mt-2'>
                <summary className='cursor-pointer font-mono text-xs text-destructive/70'>
                  Stack trace
                </summary>
                <pre className='mt-2 max-h-40 overflow-auto whitespace-pre-wrap font-mono text-xs text-destructive/60'>
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button onClick={resetError} size='lg'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Thử lại
          </Button>
          <Button variant='outline' size='lg' onClick={() => router.push('/')}>
            <Home className='mr-2 h-4 w-4' />
            Về trang chủ
          </Button>
          <Button variant='ghost' size='lg' onClick={() => router.back()}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Section Error Fallback - For page sections (sidebar, header, etc.)
 */
export function SectionErrorFallback({
  error,
  resetError,
  errorContext,
}: ErrorFallbackProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-4'>
      <AlertTriangle className='mb-2 h-6 w-6 text-destructive' />
      <p className='mb-1 text-sm font-medium text-foreground'>
        Lỗi: {errorContext || 'Section'}
      </p>
      <p className='mb-3 text-xs text-muted-foreground'>
        Không thể tải phần này
      </p>
      <Button size='sm' variant='outline' onClick={resetError}>
        <RefreshCw className='mr-2 h-3 w-3' />
        Thử lại
      </Button>

      {process.env.NODE_ENV === 'development' && (
        <p className='mt-3 max-w-full break-all text-xs text-destructive'>
          {error.message}
        </p>
      )}
    </div>
  );
}

/**
 * List Item Error Fallback - For errors in list items
 */
export function ListItemErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps) {
  return (
    <div className='flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3'>
      <div className='flex items-center gap-2'>
        <AlertTriangle className='h-4 w-4 text-destructive' />
        <span className='text-sm text-muted-foreground'>
          Không thể tải mục này
        </span>
      </div>
      <Button size='sm' variant='ghost' onClick={resetError}>
        <RefreshCw className='h-3 w-3' />
      </Button>
    </div>
  );
}

/**
 * Dashboard Widget Error Fallback
 */
export function WidgetErrorFallback({
  error,
  resetError,
  errorContext,
}: ErrorFallbackProps) {
  return (
    <div className='flex h-full min-h-[150px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-destructive/30 bg-destructive/5 p-4'>
      <AlertTriangle className='mb-2 h-5 w-5 text-destructive' />
      <p className='mb-1 text-xs font-medium text-foreground'>
        {errorContext || 'Widget'}
      </p>
      <p className='mb-3 text-xs text-muted-foreground'>Lỗi tải dữ liệu</p>
      <Button size='sm' variant='ghost' onClick={resetError}>
        <RefreshCw className='mr-1 h-3 w-3' />
        Tải lại
      </Button>
    </div>
  );
}

/**
 * Form Error Fallback - For form sections
 */
export function FormErrorFallback({
  error,
  resetError,
  errorContext,
}: ErrorFallbackProps) {
  return (
    <Alert variant='destructive' className='my-4'>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Lỗi {errorContext || 'Form'}</AlertTitle>
      <AlertDescription>
        <p className='mb-3'>
          Đã xảy ra lỗi khi hiển thị form. Vui lòng thử lại.
        </p>
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' onClick={resetError}>
            <RefreshCw className='mr-2 h-3 w-3' />
            Thử lại
          </Button>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => window.location.reload()}
          >
            Làm mới trang
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <p className='mt-3 text-xs text-destructive/80'>{error.message}</p>
        )}
      </AlertDescription>
    </Alert>
  );
}
