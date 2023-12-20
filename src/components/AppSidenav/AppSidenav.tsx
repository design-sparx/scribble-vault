'use client';
import React, { useEffect, useState } from 'react';
import {
  AppShell,
  AppShellSectionProps,
  Avatar,
  NavLink,
  ScrollArea,
  Text,
} from '@mantine/core';
import { UserButton } from '@/components/UserButton';
import { PATH_PAGE } from '@/constants/routes';
import {
  IconCircleFilled,
  IconCirclePlus,
  IconCirclePlus2,
  IconPackageImport,
  IconPlus,
  IconRoute,
  IconSquareRoundedPlusFilled,
  IconTemplate,
  IconTrash,
} from '@tabler/icons-react';
import { usePages, useUser, useWorkspaces } from '@/hooks';
import classes from './AppSidenav.module.css';
import _ from 'lodash';
import { IPage, IWorkspace } from '@/types';
import { usePathname } from 'next/navigation';

const ICON_SIZE = 18;

type INavWorkspace = { pages?: IPage[]; workspace?: IWorkspace };

type AppSidenavProps = AppShellSectionProps;

export const AppSidenav = ({ ...others }: AppSidenavProps) => {
  const { userError, userLoading, userData } = useUser();
  const { workspacesData, workspacesLoading, workspacesError } =
    useWorkspaces();
  const { pagesError, pagesLoading, pagesData } = usePages();
  const [navWorkspaces, setNavWorkspaces] = useState<
    INavWorkspace[] | undefined
  >();
  const pathname = usePathname();

  useEffect(() => {
    if (pagesData) {
      const dd = _.chain(pagesData.slice(0, 100))
        .groupBy('workspace_id')
        .map((items, workspace_id) => {
          return {
            workspace: _.find(
              workspacesData,
              (workspace) => workspace.id === workspace_id
            ),
            pages: items,
          };
        })
        .value();

      setNavWorkspaces(dd);
    }
  }, [workspacesData, pagesData]);

  return (
    <>
      <AppShell.Section>
        <UserButton user={userData} error={userError} loading={userLoading} />
      </AppShell.Section>
      <NavLink
        label="Add page"
        leftSection={<IconSquareRoundedPlusFilled size={ICON_SIZE} />}
        className={classes.linkNew}
        href={PATH_PAGE.new}
        active={PATH_PAGE.new === pathname}
      />
      <AppShell.Section grow component={ScrollArea}>
        <AppShell.Section mb="md">
          <Text tt="capitalize" size="md" py="sm" fw={700}>
            Workspaces
          </Text>
          {navWorkspaces?.map((navWorkspace) => (
            <NavLink
              key={navWorkspace.workspace?.id}
              label={navWorkspace.workspace?.name}
              leftSection={
                <Avatar src={navWorkspace.workspace?.icon} size={ICON_SIZE} />
              }
              active={
                navWorkspace.workspace?.id ===
                _.find(navWorkspace.pages, [
                  'id',
                  pathname.split('/')[pathname.split('/').length - 1],
                ])?.workspace_id
              }
              className={classes.linkHeader}
              classNames={{
                root: classes.link,
                children: classes.linkChildren,
              }}
              childrenOffset={0}
            >
              {navWorkspace.pages?.slice(0, 5)?.map((navPage) => (
                <NavLink
                  key={navPage.id}
                  label={
                    <Text lineClamp={1} size="sm">
                      {navPage.name}
                    </Text>
                  }
                  leftSection={<Avatar src={navPage.icon} size={ICON_SIZE} />}
                  href={PATH_PAGE.details(navPage.id)}
                  className={classes.link}
                  active={PATH_PAGE.details(navPage.id) === pathname}
                />
              ))}
            </NavLink>
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <Text tt="capitalize" size="md" py="sm" fw={700}>
            Quick actions
          </Text>
          <NavLink
            label="Templates"
            leftSection={<IconTemplate size={ICON_SIZE} />}
            className={classes.link}
          />
          <NavLink
            label="Import"
            leftSection={<IconPackageImport size={ICON_SIZE} />}
            className={classes.link}
          />
          <NavLink
            label="Updates"
            leftSection={<IconRoute size={ICON_SIZE} />}
            className={classes.link}
          />
          <NavLink
            label="Trash"
            leftSection={<IconTrash size={ICON_SIZE} />}
            className={classes.link}
          />
        </AppShell.Section>
      </AppShell.Section>
    </>
  );
};
