'use client';

import { useEffect } from 'react';

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

export default function RichTextDisplay({
  content,
  className = '',
}: RichTextDisplayProps) {
  // Inject CSS for table styling to match editor
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .rich-text-display table {
        border-collapse: collapse !important;
        table-layout: fixed !important;
        width: 100% !important;
        margin: 16px 0 !important;
        overflow: hidden !important;
        border: 1px solid #d1d5db !important;
        border-radius: 6px !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        background-color: #ffffff !important;
        display: table !important;
      }
      
      .rich-text-display table td,
      .rich-text-display table th {
        min-width: 1em !important;
        border: 1px solid #e5e7eb !important;
        padding: 16px 20px !important;
        vertical-align: top !important;
        box-sizing: border-box !important;
        position: relative !important;
        background-color: #ffffff !important;
        min-height: 50px !important;
        display: table-cell !important;
      }
      
      .rich-text-display table th {
        font-weight: 700 !important;
        text-align: left !important;
        background-color: #f3f4f6 !important;
        color: #1f2937 !important;
        border-bottom: 2px solid #9ca3af !important;
      }
      
      .rich-text-display table p {
        margin: 0;
      }
      
      .rich-text-display table tr:hover td {
        background-color: #f8fafc;
      }
      
      .rich-text-display table tr:hover th {
        background-color: #e5e7eb;
      }
      
      .rich-text-display ul {
        list-style-type: disc;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .rich-text-display ol {
        list-style-type: decimal;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .rich-text-display li {
        margin-bottom: 0.5rem;
      }
      
      .rich-text-display p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }
      
      .rich-text-display strong {
        font-weight: 700;
        color: #111827;
      }
      
      .rich-text-display em {
        font-style: italic;
      }
      
      .rich-text-display u {
        text-decoration: underline;
      }
      
      .rich-text-display blockquote {
        border-left: 4px solid #e5e7eb;
        padding-left: 1rem;
        margin: 1rem 0;
        font-style: italic;
        color: #6b7280;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      className={`rich-text-display text-gray-700 prose prose-sm max-w-none ${className}`}
      style={
        {
          // Match editor styling for tables
          '--tw-prose-body': '#374151',
          '--tw-prose-headings': '#111827',
          '--tw-prose-lead': '#4b5563',
          '--tw-prose-links': '#3b82f6',
          '--tw-prose-bold': '#111827',
          '--tw-prose-counters': '#6b7280',
          '--tw-prose-bullets': '#d1d5db',
          '--tw-prose-hr': '#e5e7eb',
          '--tw-prose-quotes': '#111827',
          '--tw-prose-quote-borders': '#e5e7eb',
          '--tw-prose-captions': '#6b7280',
          '--tw-prose-code': '#111827',
          '--tw-prose-pre-code': '#e5e7eb',
          '--tw-prose-pre-bg': '#1f2937',
          '--tw-prose-th-borders': '#d1d5db',
          '--tw-prose-td-borders': '#e5e7eb',
        } as React.CSSProperties
      }
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
