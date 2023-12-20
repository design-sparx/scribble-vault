import { BubbleMenu, FloatingMenu } from '@tiptap/react';
import {
  ActionIcon,
  ActionIconProps,
  Button,
  Code,
  CodeProps,
  Menu,
  MenuProps,
  Paper,
  Tooltip,
} from '@mantine/core';
import {
  IconBlockquote,
  IconBold,
  IconChevronRight,
  IconCode,
  IconDots,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconLetterCase,
  IconLink,
  IconList,
  IconListDetails,
  IconListNumbers,
  IconPageBreak,
  IconSeparatorHorizontal,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconTable,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import './menubar.scss';

const { Target, Divider, Dropdown, Item, Label } = Menu;

export const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;

const ICON_SIZE = 18;

const ACTION_PROPS: ActionIconProps = {
  c: 'black',
};

const HINT_TEXT_PROPS: CodeProps = {};

const MENU_PROPS: MenuProps = {
  width: 300,
  shadow: 'md',
};

const SUB_MENU_PROPS: MenuProps = {
  position: 'right-start',
  withArrow: true,
  width: 300,
  trigger: 'hover',
  openDelay: 100,
  closeDelay: 400,
  shadow: 'md',
};

type MenuBarProps = { editor: any };

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Paper shadow="sm">
            <ActionIcon.Group>
              <ActionIcon
                onClick={() =>
                  editor.chain().focus().toggleLink({ href: '#' }).run()
                }
                className={editor.isActive('link') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconLink size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconBold size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconItalic size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconUnderline size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconStrikethrough size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconCode size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive('superscript') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconSuperscript size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={editor.isActive('subscript') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconSubscript size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconList size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockQuote') ? 'is-active' : ''}
                {...ACTION_PROPS}
              >
                <IconBlockquote size={ICON_SIZE} />
              </ActionIcon>
              <Menu {...MENU_PROPS}>
                <Target>
                  <ActionIcon {...ACTION_PROPS}>
                    <IconDots size={ICON_SIZE} />
                  </ActionIcon>
                </Target>
                <Dropdown>
                  <Menu {...SUB_MENU_PROPS}>
                    <Target>
                      <Item
                        leftSection={<IconLetterCase size={ICON_SIZE} />}
                        rightSection={<IconChevronRight size={ICON_SIZE} />}
                      >
                        Text
                      </Item>
                    </Target>
                    <Dropdown>
                      <Item
                        leftSection={<IconBold size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + b</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                      >
                        Bold
                      </Item>
                      <Item
                        leftSection={<IconItalic size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + i</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        className={editor.isActive('italic') ? 'is-active' : ''}
                      >
                        Italic
                      </Item>
                      <Item
                        leftSection={<IconUnderline size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + u</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleUnderline().run()
                        }
                        className={
                          editor.isActive('underline') ? 'is-active' : ''
                        }
                      >
                        Underline
                      </Item>
                      <Item
                        leftSection={<IconStrikethrough size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + shift + x</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleStrike().run()
                        }
                        className={
                          editor.isActive('strikeThrough') ? 'is-active' : ''
                        }
                      >
                        Strike
                      </Item>
                      <Item
                        leftSection={<IconSuperscript size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + .</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleSuperscript().run()
                        }
                        className={
                          editor.isActive('superscript') ? 'is-active' : ''
                        }
                      >
                        Superscript
                      </Item>
                      <Item
                        leftSection={<IconSubscript size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + ,</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleSubscript().run()
                        }
                        className={
                          editor.isActive('subscript') ? 'is-active' : ''
                        }
                      >
                        Subscript
                      </Item>
                      <Item
                        leftSection={<IconCode size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + e</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleCode().run()
                        }
                        className={editor.isActive('code') ? 'is-active' : ''}
                      >
                        Code
                      </Item>
                    </Dropdown>
                  </Menu>
                  <Menu {...SUB_MENU_PROPS}>
                    <Target>
                      <Item
                        leftSection={<IconList size={ICON_SIZE} />}
                        rightSection={<IconChevronRight size={ICON_SIZE} />}
                      >
                        List
                      </Item>
                    </Target>
                    <Dropdown>
                      <Item
                        leftSection={<IconList size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + shift + 8</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleBulletList().run()
                        }
                        className={
                          editor.isActive('bulletList') ? 'is-active' : ''
                        }
                      >
                        Bullet list
                      </Item>
                      <Item
                        leftSection={<IconListNumbers size={ICON_SIZE} />}
                        rightSection={
                          <Code {...HINT_TEXT_PROPS}>ctrl + shift + 7</Code>
                        }
                        onClick={() =>
                          editor.chain().focus().toggleOrderedList().run()
                        }
                        className={
                          editor.isActive('orderedList') ? 'is-active' : ''
                        }
                      >
                        Numbered list
                      </Item>
                    </Dropdown>
                  </Menu>
                  <Item
                    leftSection={<IconLink size={ICON_SIZE} />}
                    onClick={() =>
                      editor.chain().focus().toggleLink({ href: '#' }).run()
                    }
                    className={editor.isActive('link') ? 'is-active' : ''}
                  >
                    Link
                  </Item>
                  <Item
                    leftSection={<IconBlockquote size={ICON_SIZE} />}
                    rightSection={
                      <Code {...HINT_TEXT_PROPS}>ctrl + shift + b</Code>
                    }
                    onClick={() => editor.chain().focus().setBlockquote().run()}
                    className={editor.isActive('blockQuote') ? 'is-active' : ''}
                  >
                    Quote
                  </Item>
                  <Menu {...SUB_MENU_PROPS}>
                    <Target>
                      <Item
                        leftSection={<IconTable size={ICON_SIZE} />}
                        rightSection={<IconChevronRight size={ICON_SIZE} />}
                      >
                        Table
                      </Item>
                    </Target>
                    <Dropdown>
                      <Item
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .insertTable({
                              rows: 3,
                              cols: 3,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        Insert table
                      </Item>
                      <Item
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .insertTable({
                              rows: 3,
                              cols: 3,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        insertTable
                      </Item>
                      <Item
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .insertContent(tableHTML, {
                              parseOptions: {
                                preserveWhitespace: false,
                              },
                            })
                            .run()
                        }
                      >
                        insertHTMLTable
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().addColumnBefore().run()
                        }
                        disabled={!editor.can().addColumnBefore()}
                      >
                        addColumnBefore
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().addColumnAfter().run()
                        }
                        disabled={!editor.can().addColumnAfter()}
                      >
                        addColumnAfter
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().deleteColumn().run()
                        }
                        disabled={!editor.can().deleteColumn()}
                      >
                        deleteColumn
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().addRowBefore().run()
                        }
                        disabled={!editor.can().addRowBefore()}
                      >
                        addRowBefore
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().addRowAfter().run()
                        }
                        disabled={!editor.can().addRowAfter()}
                      >
                        addRowAfter
                      </Item>
                      <Item
                        onClick={() => editor.chain().focus().deleteRow().run()}
                        disabled={!editor.can().deleteRow()}
                      >
                        deleteRow
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().deleteTable().run()
                        }
                        disabled={!editor.can().deleteTable()}
                      >
                        deleteTable
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().mergeCells().run()
                        }
                        disabled={!editor.can().mergeCells()}
                      >
                        mergeCells
                      </Item>
                      <Item
                        onClick={() => editor.chain().focus().splitCell().run()}
                        disabled={!editor.can().splitCell()}
                      >
                        splitCell
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().toggleHeaderColumn().run()
                        }
                        disabled={!editor.can().toggleHeaderColumn()}
                      >
                        toggleHeaderColumn
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().toggleHeaderRow().run()
                        }
                        disabled={!editor.can().toggleHeaderRow()}
                      >
                        toggleHeaderRow
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().toggleHeaderCell().run()
                        }
                        disabled={!editor.can().toggleHeaderCell()}
                      >
                        toggleHeaderCell
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().mergeOrSplit().run()
                        }
                        disabled={!editor.can().mergeOrSplit()}
                      >
                        mergeOrSplit
                      </Item>
                      <Item
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .setCellAttribute('backgroundColor', '#FAF594')
                            .run()
                        }
                        disabled={
                          !editor
                            .can()
                            .setCellAttribute('backgroundColor', '#FAF594')
                        }
                      >
                        setCellAttribute
                      </Item>
                      <Item
                        onClick={() => editor.chain().focus().fixTables().run()}
                        disabled={!editor.can().fixTables()}
                      >
                        fixTables
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().goToNextCell().run()
                        }
                        disabled={!editor.can().goToNextCell()}
                      >
                        goToNextCell
                      </Item>
                      <Item
                        onClick={() =>
                          editor.chain().focus().goToPreviousCell().run()
                        }
                        disabled={!editor.can().goToPreviousCell()}
                      >
                        goToPreviousCell
                      </Item>
                    </Dropdown>
                  </Menu>
                  <Item
                    leftSection={<IconTrash size={ICON_SIZE} />}
                    onClick={() =>
                      editor.chain().focus().deleteSelection().run()
                    }
                    c="red"
                  >
                    Delete
                  </Item>
                </Dropdown>
              </Menu>
            </ActionIcon.Group>
          </Paper>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <ActionIcon.Group>
            <Tooltip label="Paragraph">
              <ActionIcon
                onClick={() => editor.chain().focus().setParagraph()}
                className={editor.isActive('text') ? 'is-active' : ''}
              >
                <IconLetterCase size={ICON_SIZE} />{' '}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="To-do list">
              <ActionIcon
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={editor.isActive('taskList') ? 'is-active' : ''}
              >
                <IconListDetails size={ICON_SIZE} />{' '}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Heading 1">
              <ActionIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={editor.isActive('heading1') ? 'is-active' : ''}
              >
                <IconH1 size={ICON_SIZE} />{' '}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Heading 2">
              <ActionIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={editor.isActive('heading2') ? 'is-active' : ''}
              >
                <IconH2 size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Heading 3">
              <ActionIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={editor.isActive('heading3') ? 'is-active' : ''}
              >
                <IconH3 size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Table">
              <ActionIcon
                onClick={() =>
                  editor.commands.insertTable({
                    rows: 3,
                    cols: 3,
                    withHeaderRow: true,
                  })
                }
                className={editor.isActive('table') ? 'is-active' : ''}
              >
                <IconTable size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Bullet list">
              <ActionIcon
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
              >
                <IconList size={ICON_SIZE} />{' '}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Ordered list">
              <ActionIcon
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
              >
                <IconListNumbers size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Quote">
              <ActionIcon
                onClick={() => editor.chain().focus().setBlockquote().run()}
                className={editor.isActive('blockQuote') ? 'is-active' : ''}
              >
                <IconBlockquote size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Break">
              <ActionIcon
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className={editor.isActive('break') ? 'is-active' : ''}
              >
                <IconPageBreak size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Horizontail rule">
              <ActionIcon
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={editor.isActive('horizontalRule') ? 'is-active' : ''}
              >
                <IconSeparatorHorizontal size={ICON_SIZE} />
              </ActionIcon>
            </Tooltip>
          </ActionIcon.Group>
        </FloatingMenu>
      )}
    </>
  );
};
