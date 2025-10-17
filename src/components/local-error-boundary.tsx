'use client';

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import {
  MinimalErrorFallback,
  CardErrorFallback,
  SectionErrorFallback,
  ListItemErrorFallback,
  WidgetErrorFallback,
  FormErrorFallback,
} from './error-fallbacks';

type FallbackType =
  | 'minimal'
  | 'card'
  | 'section'
  | 'list-item'
  | 'widget'
  | 'form';

interface LocalErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Type of fallback UI to show
   * @default 'card'
   */
  fallbackType?: FallbackType;
  /**
   * Context for error (e.g., 'Campaign List', 'User Profile')
   */
  errorContext?: string;
  /**
   * Show toast notification
   * @default false (for local boundaries, to avoid toast spam)
   */
  showToast?: boolean;
  /**
   * Custom toast message
   */
  toastMessage?: string;
  /**
   * Callback when error occurs
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Reset keys - will reset error boundary when these change
   */
  resetKeys?: Array<string | number>;
}

const FALLBACK_MAP = {
  minimal: MinimalErrorFallback,
  card: CardErrorFallback,
  section: SectionErrorFallback,
  'list-item': ListItemErrorFallback,
  widget: WidgetErrorFallback,
  form: FormErrorFallback,
};

/**
 * Local Error Boundary - Use for specific sections/components
 *
 * This is a convenience wrapper around ErrorBoundary with preset fallback UIs
 * and sensible defaults for local error handling.
 *
 * Features:
 * - Multiple preset fallback types
 * - No toast spam (showToast=false by default)
 * - Auto-reset on prop changes
 * - Lightweight and reusable
 *
 * @example
 * ```tsx
 * // Wrap a card component
 * <LocalErrorBoundary fallbackType="card" errorContext="Campaign Card">
 *   <CampaignCard campaign={campaign} />
 * </LocalErrorBoundary>
 *
 * // Wrap a list
 * {campaigns.map(c => (
 *   <LocalErrorBoundary key={c.id} fallbackType="list-item" resetKeys={[c.id]}>
 *     <CampaignListItem campaign={c} />
 *   </LocalErrorBoundary>
 * ))}
 *
 * // Wrap a widget
 * <LocalErrorBoundary fallbackType="widget" errorContext="Stats Widget">
 *   <StatsWidget />
 * </LocalErrorBoundary>
 * ```
 */
export function LocalErrorBoundary({
  children,
  fallbackType = 'card',
  errorContext,
  showToast = false,
  toastMessage,
  onError,
  resetKeys,
}: LocalErrorBoundaryProps) {
  const FallbackComponent = FALLBACK_MAP[fallbackType];

  return (
    <ErrorBoundary
      fallback={FallbackComponent}
      errorContext={errorContext}
      showToast={showToast}
      toastMessage={toastMessage}
      onError={onError}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Convenience components for common use cases
 */

export function CardErrorBoundary({
  children,
  errorContext,
  resetKeys,
}: {
  children: React.ReactNode;
  errorContext?: string;
  resetKeys?: Array<string | number>;
}) {
  return (
    <LocalErrorBoundary
      fallbackType='card'
      errorContext={errorContext}
      resetKeys={resetKeys}
    >
      {children}
    </LocalErrorBoundary>
  );
}

export function WidgetErrorBoundary({
  children,
  errorContext,
  resetKeys,
}: {
  children: React.ReactNode;
  errorContext?: string;
  resetKeys?: Array<string | number>;
}) {
  return (
    <LocalErrorBoundary
      fallbackType='widget'
      errorContext={errorContext}
      resetKeys={resetKeys}
    >
      {children}
    </LocalErrorBoundary>
  );
}

export function SectionErrorBoundary({
  children,
  errorContext,
  resetKeys,
}: {
  children: React.ReactNode;
  errorContext?: string;
  resetKeys?: Array<string | number>;
}) {
  return (
    <LocalErrorBoundary
      fallbackType='section'
      errorContext={errorContext}
      resetKeys={resetKeys}
    >
      {children}
    </LocalErrorBoundary>
  );
}

export function ListItemErrorBoundary({
  children,
  resetKeys,
}: {
  children: React.ReactNode;
  resetKeys?: Array<string | number>;
}) {
  return (
    <LocalErrorBoundary fallbackType='list-item' resetKeys={resetKeys}>
      {children}
    </LocalErrorBoundary>
  );
}

export function FormSectionErrorBoundary({
  children,
  errorContext,
}: {
  children: React.ReactNode;
  errorContext?: string;
}) {
  return (
    <LocalErrorBoundary fallbackType='form' errorContext={errorContext}>
      {children}
    </LocalErrorBoundary>
  );
}
