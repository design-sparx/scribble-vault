'use client';
import { usePageDetails, useWorkspaces } from '@/hooks';
import {
  ActionIcon,
  Avatar,
  Breadcrumbs,
  darken,
  Flex,
  Image,
  isLightColor,
  lighten,
  Menu,
  Paper,
  PaperProps,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronRight,
  IconDotsVertical,
  IconSelector,
} from '@tabler/icons-react';
import { colourNameToHex } from '@/utils';
import { useEffect, useState } from 'react';
import { IWorkspace } from '@/types';
import _ from 'lodash';
import Link from 'next/link';
import { PATH_WORKSPACE } from '@/constants/routes';

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
  const { workspacesData } = useWorkspaces();
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
        <Text fz="md" tt="capitalize">
          {item.title}
        </Text>
      </Flex>
    </UnstyledButton>
  ));

  useEffect(() => {
    const d = _.find(workspacesData, ['id', pageData?.workspace_id]);

    setWorkspace(d);
  }, [pageData?.workspace_id, workspacesData]);

  return (
    <section>
      <Paper {...PAPER_PROPS}>
        <Flex align="center" justify="space-between">
          <Breadcrumbs separator={<IconChevronRight size={18} />}>
            {items}
          </Breadcrumbs>
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
