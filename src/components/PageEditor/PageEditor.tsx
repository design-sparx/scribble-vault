'use client';
import Document from '@tiptap/extension-document';
import { Placeholder } from '@tiptap/extension-placeholder';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { TableCell } from '@tiptap/extension-table-cell';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { Mention } from '@tiptap/extension-mention';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Paragraph } from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';
import { Underline } from '@tiptap/extension-underline';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HardBreak } from '@tiptap/extension-hard-break';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { ListItem } from '@tiptap/extension-list-item';
import suggestions from './suggestions';
import { MenuBar } from '@/components/PageEditor/MenuBar';
import './styles.scss';
import { Box, BoxProps } from '@mantine/core';

type PageEditorProps = {
  title: string;
  description: string;
  content: string;
} & BoxProps;

const ICON_SIZE = 18;

const CustomDocument = Document.extend({
  content: 'heading block*',
});

const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export const PageEditor = ({
  content,
  description,
  title,
  ...others
}: PageEditorProps) => {
  const editor = useEditor({
    extensions: [
      Blockquote,
      CustomDocument,
      CustomTableCell,
      CustomTaskItem,
      Dropcursor,
      HardBreak,
      HorizontalRule,
      Image,
      Link,
      ListItem,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: suggestions,
      }),
      Paragraph,
      Placeholder.configure({
        placeholder: ({ node }: any) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }

          return 'Can you add some further context?';
        },
      }),
      Superscript,
      Subscript,
      StarterKit.configure({
        document: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Text,
      Underline,
    ],
    content: `
      <div>
        <h2>
          ${title}
        </h2>
        <h4>Description</h4>
        <p >
          ${description}
        </p>
        <h4>Brief</h4>
        <p>${content}</p>
      </div>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <Box {...others}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};
