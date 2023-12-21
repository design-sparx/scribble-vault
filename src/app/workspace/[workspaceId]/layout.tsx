'use client';
import { useWorkspaceDetails } from '@/hooks';
import {
  ActionIcon,
  Button,
  ButtonProps,
  Flex,
  Group,
  Image,
  Loader,
  Menu,
  Paper,
  PaperProps,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconArchive,
  IconDoorExit,
  IconDots,
  IconEdit,
  IconFileExport,
  IconMessagePlus,
  IconPackageImport,
  IconUsersPlus,
} from '@tabler/icons-react';
import { ShareModal } from '@/components/ShareModal';
import { useDisclosure } from '@mantine/hooks';
import { AddCommentModal } from '@/components/AddCommentModal';
import { ChangeViewPopover } from '@/components/ChangeViewPopover';
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
  params: { workspaceId: string };
}) {
  const { workspaceData, workspaceError, workspaceLoading } =
    useWorkspaceDetails(params.workspaceId);
  const [shareOpened, { open: shareOpen, close: shareClose }] =
    useDisclosure(false);
  const [commentOpened, { open: commentOpen, close: commentClose }] =
    useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  const PAPER_PROPS: PaperProps = {
    px: 'md',
    py: 'md',
    shadow: 'sm',
    withBorder: true,
  };

  if (workspaceLoading) {
    return (
      <Paper {...PAPER_PROPS}>
        <Loader />
      </Paper>
    );
  }

  if (workspaceError) {
    return (
      <ErrorAlert
        title="Error loading workspace"
        message={workspaceError?.toString()}
      />
    );
  }

  return (
    <section>
      <Paper {...PAPER_PROPS}>
        <Flex align="center" justify="space-between">
          <Flex gap="xs" align="center">
            <Image
              src={workspaceData?.icon}
              alt={workspaceData?.name}
              h={18}
              w={18}
            />
            <Text fz="md" tt="capitalize">
              {workspaceData?.name}
            </Text>
          </Flex>
          <Flex align="center" gap="sm">
            <UnstyledButton>
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
                    <Divider />
                    <Item leftSection={<IconPackageImport size={ICON_SIZE} />}>
                      Import template
                    </Item>
                    <Item leftSection={<IconFileExport size={ICON_SIZE} />}>
                      Export template
                    </Item>
                    <Divider />
                    <Item leftSection={<IconDoorExit size={ICON_SIZE} />}>
                      Leave
                    </Item>
                    <Item leftSection={<IconArchive size={ICON_SIZE} />}>
                      Archive
                    </Item>
                  </Dropdown>
                </Menu>
              </Flex>
            </UnstyledButton>
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
            <Image
              src={workspaceData?.icon}
              alt={workspaceData?.name}
              h={24}
              w={24}
            />
            <Text>{workspaceData?.name}</Text>
          </Group>
        }
        size="lg"
      />
      <EditWorkspaceModal opened={editOpened} onClose={editClose} />
    </section>
  );
}
