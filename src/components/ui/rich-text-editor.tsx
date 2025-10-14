'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import UnderlineExtension from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
}

export default function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  className,
  disabled = false,
  error,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable some features we don't need
        code: false,
        codeBlock: false,
        horizontalRule: false,
        heading: false,
        // List features are enabled by default, just ensure they're not disabled
        // bulletList: true (default)
        // orderedList: true (default)
        // listItem: true (default)
        // strike: true (default)
        // blockquote: true (default)
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextStyle,
      Color,
      UnderlineExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline hover:text-primary/80',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      // Thêm keyboard shortcut để thoát khỏi link
      editor.setOptions({
        editorProps: {
          handleKeyDown: (view, event) => {
            if (event.key === 'Escape' && editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
              return true;
            }
            return false;
          },
        },
      });
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[120px] p-3',
          error && 'border-red-500'
        ),
        style: `
          .ProseMirror table {
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
          
          .ProseMirror table td,
          .ProseMirror table th {
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
          
          .ProseMirror table th {
            font-weight: 700 !important;
            text-align: left !important;
            background-color: #f3f4f6 !important;
            color: #1f2937 !important;
            border-bottom: 2px solid #9ca3af !important;
          }
          
          .ProseMirror table .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            background: rgba(59, 130, 246, 0.15);
            border: 2px solid #3b82f6;
            pointer-events: none;
            border-radius: 4px;
          }
          
          .ProseMirror table .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: -2px;
            width: 4px;
            background-color: #3b82f6;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
            pointer-events: none;
          }
          
          .ProseMirror table .column-resize-handle:hover {
            background-color: #1d4ed8;
            width: 6px;
          }
          
          .ProseMirror table p {
            margin: 0;
          }
          
          .ProseMirror table tr:hover td {
            background-color: #f8fafc;
          }
          
          .ProseMirror table tr:hover th {
            background-color: #e5e7eb;
          }
          
          .ProseMirror table td:focus,
          .ProseMirror table th:focus {
            outline: 2px solid #3b82f6;
            outline-offset: -2px;
          }
          
          /* Đảm bảo bảng hiển thị RẤT RÕ RÀNG */
          .ProseMirror table:empty {
            display: table !important;
            border: 4px solid #000000 !important;
            border-radius: 8px !important;
            background-color: #ffffff !important;
            min-height: 150px !important;
            width: 100% !important;
          }
          
          .ProseMirror table td:empty,
          .ProseMirror table th:empty {
            min-height: 50px !important;
            background-color: #ffffff !important;
            border: 3px solid #374151 !important;
            padding: 20px 24px !important;
            display: table-cell !important;
          }
          
          .ProseMirror table td:empty:before,
          .ProseMirror table th:empty:before {
            content: " " !important;
            display: inline-block !important;
            width: 1px !important;
            height: 1px !important;
          }
          
          /* Force table visibility - OVERRIDE ALL */
          .ProseMirror table * {
            box-sizing: border-box !important;
          }
          
          .ProseMirror table tr {
            display: table-row !important;
          }
        `,
      },
    },
  });

  // Prevent SSR hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={cn(
          'border rounded-lg',
          error && 'border-red-500',
          className
        )}
      >
        <div className='min-h-[120px] p-3 flex items-center justify-center text-muted-foreground'>
          Đang tải editor...
        </div>
        {error && (
          <div className='px-3 py-2 text-sm text-red-600 border-t bg-red-50'>
            {error}
          </div>
        )}
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  const setLink = () => {
    // Nếu đang trong link, hủy link
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Nếu có text được chọn, tạo link cho text đó
    const url = window.prompt('Nhập URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setImage = () => {
    const url = window.prompt('Nhập URL hình ảnh:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Table functions
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const mergeCells = () => {
    editor.chain().focus().mergeCells().run();
  };

  const splitCell = () => {
    editor.chain().focus().splitCell().run();
  };

  const toggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run();
  };

  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  const toggleHeaderCell = () => {
    editor.chain().focus().toggleHeaderCell().run();
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled: buttonDisabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type='button'
      variant={isActive ? 'default' : 'ghost'}
      size='sm'
      onClick={onClick}
      disabled={buttonDisabled || disabled}
      title={title}
      className='h-8 w-8 p-0'
    >
      {children}
    </Button>
  );

  return (
    <div
      className={cn('border rounded-lg', error && 'border-red-500', className)}
    >
      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30'>
        {/* Text Formatting */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title='Bold'
          >
            <Bold className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title='Italic'
          >
            <Italic className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title='Underline'
          >
            <Underline className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title='Strikethrough'
          >
            <Strikethrough className='h-4 w-4' />
          </ToolbarButton>
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Lists */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title='Bullet List'
          >
            <List className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title='Numbered List'
          >
            <ListOrdered className='h-4 w-4' />
          </ToolbarButton>
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Alignment */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title='Align Left'
          >
            <AlignLeft className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title='Align Center'
          >
            <AlignCenter className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title='Align Right'
          >
            <AlignRight className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title='Justify'
          >
            <AlignJustify className='h-4 w-4' />
          </ToolbarButton>
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Quote */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title='Quote'
          >
            <Quote className='h-4 w-4' />
          </ToolbarButton>
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Table */}
        <div className='flex items-center gap-1'>
          <ToolbarButton onClick={insertTable} title='Insert Table'>
            <TableIcon className='h-4 w-4' />
          </ToolbarButton>
          {editor.isActive('table') && (
            <>
              <ToolbarButton
                onClick={addColumnBefore}
                title='Add Column Before'
              >
                <Plus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={addColumnAfter} title='Add Column After'>
                <Plus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={deleteColumn} title='Delete Column'>
                <Minus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={addRowBefore} title='Add Row Before'>
                <Plus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={addRowAfter} title='Add Row After'>
                <Plus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={deleteRow} title='Delete Row'>
                <Minus className='h-4 w-4' />
              </ToolbarButton>
              <ToolbarButton onClick={deleteTable} title='Delete Table'>
                <Trash2 className='h-4 w-4' />
              </ToolbarButton>
            </>
          )}
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Link & Image */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive('link')}
            title='Add Link'
          >
            <LinkIcon className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton onClick={setImage} title='Add Image'>
            <ImageIcon className='h-4 w-4' />
          </ToolbarButton>
        </div>

        <Separator orientation='vertical' className='h-6' />

        {/* Undo/Redo */}
        <div className='flex items-center gap-1'>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title='Undo'
          >
            <Undo className='h-4 w-4' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title='Redo'
          >
            <Redo className='h-4 w-4' />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className='min-h-[120px]'>
        <EditorContent editor={editor} />
      </div>

      {/* Error Message */}
      {error && (
        <div className='px-3 py-2 text-sm text-red-600 border-t bg-red-50'>
          {error}
        </div>
      )}
    </div>
  );
}
