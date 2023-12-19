'use client';
import { usePageDetails } from '@/hooks';
import {
  ActionIcon,
  Avatar,
  Flex,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconDotsVertical, IconSelector } from '@tabler/icons-react';

const { Target, Dropdown, Item, Divider } = Menu;

const ICON_SIZE = 18;

export default function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageId: string };
}) {
  const { pageData, pageError, pageLoading } = usePageDetails(params.pageId);

  return (
    <section>
      <nav>
        <Flex align="center" justify="space-between">
          <Menu>
            <Target>
              <UnstyledButton>
                <Flex align="center" gap="sm">
                  <Avatar src={pageData?.icon} size="sm" />
                  <Text>{pageData?.name}</Text>
                  <IconSelector size={ICON_SIZE} />
                </Flex>
              </UnstyledButton>
            </Target>
          </Menu>
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
      </nav>
      {children}
    </section>
  );
}
