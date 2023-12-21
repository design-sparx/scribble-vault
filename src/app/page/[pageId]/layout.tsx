'use client';
import { usePageDetails, useWorkspaces } from '@/hooks';
import {
  ActionIcon,
  Breadcrumbs,
  Button,
  ButtonProps,
  darken,
  Flex,
  Group,
  Image,
  isLightColor,
  lighten,
  Loader,
  Menu,
  Paper,
  PaperProps,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronRight,
  IconDots,
  IconEdit,
  IconMessagePlus,
  IconTrash,
  IconUsersPlus,
} from '@tabler/icons-react';
import { colourNameToHex } from '@/utils';
import { useEffect, useState } from 'react';
import { IWorkspace } from '@/types';
import _ from 'lodash';
import Link from 'next/link';
import { PATH_WORKSPACE } from '@/constants/routes';
import { ChangeViewPopover } from '@/components/ChangeViewPopover';
import { useDisclosure } from '@mantine/hooks';
import { ShareModal } from '@/components/ShareModal';
import { AddCommentModal } from '@/components/AddCommentModal';
import { EditWorkspaceModal } from '@/components/EditWorkspaceModal';
import { ErrorAlert } from '@/components/ErrorAlert';

const { Target, Dropdown, Item, Divider } = Menu;

const ICON_SIZE = 18;

const BUTTON_PROPS: ButtonProps = {
  variant: 'default',
};

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageId: string };
}) {
  const { pageData, pageError, pageLoading } = usePageDetails(params.pageId);
  const { workspacesData } = useWorkspaces();
  const [shareOpened, { open: shareOpen, close: shareClose }] =
    useDisclosure(false);
  const [commentOpened, { open: commentOpen, close: commentClose }] =
    useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const parsedColor = colourNameToHex(pageData?.color || '');

  const PAPER_PROPS: PaperProps = {
    bg: lighten(parsedColor, 0.9),
    px: 'md',
    py: 'sm',
    shadow: 'sm',
    withBorder: true,
    style: {
      borderColor: isLightColor(parsedColor)
        ? darken(parsedColor, 0.3)
        : lighten(parsedColor, 0.6),
    },
  };

  const items = [
    {
      title: workspace?.name,
      href: workspace?.id ? PATH_WORKSPACE.details(workspace?.id) : '#',
      icon: workspace?.icon,
    },
    { title: pageData?.name, href: '#', icon: pageData?.icon },
  ].map((item, index) => (
    <UnstyledButton
      component={Link}
      key={`${item.title}-${index}`}
      href={item.href}
    >
      <Flex gap="xs" align="center">
        <Image src={item.icon} alt={item.title} h={18} w={18} />
        <Text fz="md">{item.title}</Text>
      </Flex>
    </UnstyledButton>
  ));

  useEffect(() => {
    const d = _.find(workspacesData, ['id', pageData?.workspace_id]);

    setWorkspace(d);
  }, [pageData?.workspace_id, workspacesData]);

  if (pageLoading) {
    return (
      <Paper {...PAPER_PROPS}>
        <Loader />
      </Paper>
    );
  }

  if (pageError) {
    return (
      <ErrorAlert title="Error loading page" message={pageError?.toString()} />
    );
  }

  return (
    <section>
      <Paper {...PAPER_PROPS}>
        <Flex align="center" justify="space-between">
          <Breadcrumbs separator={<IconChevronRight size={18} />}>
            {items}
          </Breadcrumbs>
          <Flex align="center" gap="xs">
            <Button
              leftSection={<IconUsersPlus size={ICON_SIZE} />}
              onClick={shareOpen}
              {...BUTTON_PROPS}
            >
              Share
            </Button>
            <ChangeViewPopover buttonProps={BUTTON_PROPS} />
            <Button
              leftSection={<IconMessagePlus size={ICON_SIZE} />}
              onClick={commentOpen}
              {...BUTTON_PROPS}
            >
              Comment
            </Button>
            <Menu position="bottom-end">
              <Target>
                <ActionIcon>
                  <IconDots size={ICON_SIZE} />
                </ActionIcon>
              </Target>
              <Dropdown>
                <Item
                  leftSection={<IconEdit size={ICON_SIZE} />}
                  onClick={editOpen}
                >
                  Edit
                </Item>
                <Item leftSection={<IconTrash size={ICON_SIZE} />}>Delete</Item>
              </Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Paper>
      {children}
      <ShareModal opened={shareOpened} onClose={shareClose} />
      <AddCommentModal
        opened={commentOpened}
        onClose={commentClose}
        title={
          <Group>
            <Image src={pageData?.icon} alt={pageData?.name} h={24} w={24} />
            <Text>{pageData?.name}</Text>
          </Group>
        }
        size="lg"
      />
      <EditWorkspaceModal opened={editOpened} onClose={editClose} />
    </section>
  );
}
