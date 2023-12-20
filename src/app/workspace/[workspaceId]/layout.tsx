'use client';
import { useWorkspaceDetails } from '@/hooks';
import {
  ActionIcon,
  Avatar,
  Flex,
  Image,
  Menu,
  Paper,
  PaperProps,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';

const { Target, Dropdown, Item, Divider } = Menu;

const ICON_SIZE = 18;

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  const { workspaceData, workspaceError, workspaceLoading } =
    useWorkspaceDetails(params.workspaceId);

  const PAPER_PROPS: PaperProps = {
    px: 'md',
    py: 'sm',
    shadow: 'sm',
    withBorder: true,
  };

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
                <Text>Share</Text>
                <Avatar.Group>
                  <Avatar src="image.png" />
                  <Avatar src="image.png" />
                  <Avatar src="image.png" />
                  <Avatar>+5</Avatar>
                </Avatar.Group>
              </Flex>
            </UnstyledButton>
            <ActionIcon>
              <IconDotsVertical size={ICON_SIZE} />
            </ActionIcon>
          </Flex>
        </Flex>
      </Paper>
      {children}
    </section>
  );
}
