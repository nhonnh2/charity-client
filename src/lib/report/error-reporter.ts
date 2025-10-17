/**
 * Error Reporter
 *
 * Centralized error reporting and logging system
 * Can be integrated with external services like:
 * - Sentry
 * - LogRocket
 * - Bugsnag
 * - Custom logging API
 */

interface ErrorReport {
  error: Error;
  errorInfo?: React.ErrorInfo;
  context?: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

interface ErrorReporterConfig {
  enabled: boolean;
  environment: string;
  logToConsole: boolean;
  reportToService: boolean;
  serviceName?: 'sentry' | 'logrocket' | 'custom';
}

class ErrorReporter {
  private config: ErrorReporterConfig;

  constructor(config?: Partial<ErrorReporterConfig>) {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      environment: process.env.NODE_ENV || 'development',
      logToConsole: process.env.NODE_ENV === 'development',
      reportToService: process.env.NODE_ENV === 'production',
      serviceName: undefined,
      ...config,
    };
  }

  /**
   * Report error to external service and/or console
   */
  report(errorReport: Omit<ErrorReport, 'timestamp'>) {
    if (!this.config.enabled) return;

    const fullReport: ErrorReport = {
      ...errorReport,
      timestamp: new Date(),
    };

    // Log to console in development
    if (this.config.logToConsole) {
      this.logToConsole(fullReport);
    }

    // Report to external service in production
    if (this.config.reportToService) {
      this.reportToExternalService(fullReport);
    }

    // Store in local storage for debugging (development only)
    if (this.config.environment === 'development') {
      this.storeLocally(fullReport);
    }
  }

  /**
   * Report React Error Boundary error
   */
  reportBoundaryError(
    error: Error,
    errorInfo: React.ErrorInfo,
    context?: string
  ) {
    this.report({
      error,
      errorInfo,
      context: context || 'Error Boundary',
      metadata: {
        componentStack: errorInfo.componentStack,
        type: 'boundary',
      },
    });
  }

  /**
   * Report HTTP/API error
   */
  reportApiError(
    error: any,
    endpoint: string,
    method: string,
    context?: string
  ) {
    this.report({
      error: error instanceof Error ? error : new Error(String(error)),
      context: context || 'API Error',
      metadata: {
        endpoint,
        method,
        status: error.status,
        payload: error.payload,
        type: 'api',
      },
    });
  }

  /**
   * Report custom error with metadata
   */
  reportCustomError(
    message: string,
    metadata?: Record<string, any>,
    context?: string
  ) {
    this.report({
      error: new Error(message),
      context: context || 'Custom Error',
      metadata: {
        ...metadata,
        type: 'custom',
      },
    });
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(report: ErrorReport) {
    const { error, errorInfo, context, metadata, timestamp } = report;

    console.group(
      `🚨 Error Report ${context ? `(${context})` : ''} - ${timestamp.toLocaleTimeString()}`
    );
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
    }
    if (metadata) {
      console.error('Metadata:', metadata);
    }
    console.groupEnd();
  }

  /**
   * Report to external service (Sentry, LogRocket, etc.)
   */
  private reportToExternalService(report: ErrorReport) {
    const { error, errorInfo, context, metadata } = report;

    // TODO: Integrate with your error reporting service
    // Example for Sentry:
    /*
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error, {
        contexts: {
          react: errorInfo ? { componentStack: errorInfo.componentStack } : undefined,
        },
        tags: {
          context: context || 'unknown',
          environment: this.config.environment,
        },
        extra: metadata,
      });
    }
    */

    // Example for custom API:
    /*
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        metadata,
        timestamp: report.timestamp.toISOString(),
      }),
    }).catch(console.error);
    */

    // For now, just log that we would report
    if (this.config.logToConsole) {
      console.log(
        '📤 Would report to external service:',
        this.config.serviceName || 'custom'
      );
    }
  }

  /**
   * Store error locally for debugging
   */
  private storeLocally(report: ErrorReport) {
    try {
      const key = 'error-reports';
      const stored = localStorage.getItem(key);
      const reports = stored ? JSON.parse(stored) : [];

      // Keep only last 50 errors
      reports.unshift({
        message: report.error.message,
        stack: report.error.stack,
        context: report.context,
        metadata: report.metadata,
        timestamp: report.timestamp.toISOString(),
      });

      if (reports.length > 50) {
        reports.length = 50;
      }

      localStorage.setItem(key, JSON.stringify(reports));
    } catch (e) {
      // Ignore localStorage errors
      console.warn('Failed to store error locally:', e);
    }
  }

  /**
   * Get stored errors (development only)
   */
  getStoredErrors(): any[] {
    try {
      const stored = localStorage.getItem('error-reports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear stored errors
   */
  clearStoredErrors() {
    try {
      localStorage.removeItem('error-reports');
    } catch (e) {
      console.warn('Failed to clear stored errors:', e);
    }
  }

  /**
   * Update configuration
   */
  configure(config: Partial<ErrorReporterConfig>) {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}

// Export singleton instance
export const errorReporter = new ErrorReporter();

// Export for custom instances
export { ErrorReporter };

// Helper to report errors in try-catch blocks
export const reportError = (
  error: Error,
  context?: string,
  metadata?: Record<string, any>
) => {
  errorReporter.report({
    error,
    context,
    metadata,
  });
};
