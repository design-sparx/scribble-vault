'use client';
import { usePageDetails, useWorkspaces } from '@/hooks';
import {
  ActionIcon,
  Avatar,
  Breadcrumbs,
  Button,
  ButtonProps,
  darken,
  Flex,
  Group,
  Image,
  isLightColor,
  lighten,
  Menu,
  Paper,
  PaperProps,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import {
  IconArchive,
  IconChevronRight,
  IconDeviceFloppy,
  IconDoorExit,
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconFileExport,
  IconFilePlus,
  IconMessagePlus,
  IconPackageImport,
  IconSelector,
  IconSquareRoundedPlusFilled,
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

const { Target, Dropdown, Item, Divider } = Menu;

const ICON_SIZE = 18;

const BUTTON_PROPS: ButtonProps = {
  variant: 'default',
};

export default function NewPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <ThemeIcon size="lg" variant="light">
              <IconFilePlus size={18} />
            </ThemeIcon>
            <Text fz="md" tt="capitalize">
              new page
            </Text>
          </Flex>
        </Flex>
      </Paper>
      {children}
    </section>
  );
}
