'use client';

import React from 'react';
import { toast } from 'sonner';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Fallback UI to show when error occurs
   * If not provided, uses default error UI
   */
  fallback?: React.ComponentType<ErrorFallbackProps>;
  /**
   * Callback when error is caught
   * Useful for logging to external services (Sentry, LogRocket, etc.)
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Show toast notification when error occurs
   * @default true
   */
  showToast?: boolean;
  /**
   * Custom toast message
   */
  toastMessage?: string;
  /**
   * Context for error (helps debugging)
   */
  errorContext?: string;
  /**
   * Reset error boundary when these props change
   */
  resetKeys?: Array<string | number>;
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo | null;
  resetError: () => void;
  errorContext?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Global Error Boundary for catching React rendering errors
 *
 * Features:
 * - Catches rendering errors in component tree
 * - Shows custom fallback UI
 * - Auto toast notification
 * - Error logging in dev mode
 * - Error reporting callback
 * - Reset functionality
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary fallback={CustomErrorFallback}>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * // With error reporting
 * <ErrorBoundary
 *   onError={(error) => Sentry.captureException(error)}
 *   errorContext="Dashboard Page"
 * >
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const {
      onError,
      showToast = true,
      toastMessage,
      errorContext,
    } = this.props;

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.group(
        `🚨 Error Boundary Caught ${errorContext ? `(${errorContext})` : ''}`
      );
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }

    // Show toast notification
    if (showToast && typeof window !== 'undefined') {
      const message =
        toastMessage ||
        'Đã xảy ra lỗi khi hiển thị nội dung. Vui lòng thử lại.';
      toast.error(message, {
        duration: 5000,
        action: {
          label: 'Thử lại',
          onClick: () => this.resetError(),
        },
      });
    }

    // Call external error handler (e.g., Sentry)
    if (onError) {
      onError(error, errorInfo);
    }

    // Update state with error info
    this.setState({
      errorInfo,
    });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when resetKeys change
    if (
      hasError &&
      resetKeys &&
      prevProps.resetKeys &&
      resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index])
    ) {
      this.resetError();
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback: FallbackComponent, errorContext } = this.props;

    if (hasError && error) {
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={error}
            errorInfo={errorInfo}
            resetError={this.resetError}
            errorContext={errorContext}
          />
        );
      }

      // Default fallback UI
      return (
        <DefaultErrorFallback
          error={error}
          errorInfo={errorInfo}
          resetError={this.resetError}
          errorContext={errorContext}
        />
      );
    }

    return children;
  }
}

/**
 * Default Error Fallback UI
 */
function DefaultErrorFallback({
  error,
  resetError,
  errorContext,
}: ErrorFallbackProps) {
  return (
    <div className='flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-8'>
      <div className='max-w-md text-center'>
        <div className='mb-4 text-6xl'>😵</div>
        <h2 className='mb-2 text-2xl font-bold text-foreground'>
          Đã xảy ra lỗi
        </h2>
        {errorContext && (
          <p className='mb-4 text-sm text-muted-foreground'>
            Lỗi trong: {errorContext}
          </p>
        )}
        <p className='mb-6 text-muted-foreground'>
          Xin lỗi, đã có lỗi xảy ra khi hiển thị nội dung này. Vui lòng thử lại
          hoặc làm mới trang.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className='mb-6 rounded-md bg-destructive/10 p-4 text-left'>
            <p className='mb-2 font-mono text-xs font-semibold text-destructive'>
              Development Info:
            </p>
            <p className='break-all font-mono text-xs text-destructive'>
              {error.message}
            </p>
          </div>
        )}

        <div className='flex gap-3 justify-center'>
          <button
            onClick={resetError}
            className='inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors'
          >
            Thử lại
          </button>
          <button
            onClick={() => window.location.reload()}
            className='inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors'
          >
            Làm mới trang
          </button>
        </div>
      </div>
    </div>
  );
}
