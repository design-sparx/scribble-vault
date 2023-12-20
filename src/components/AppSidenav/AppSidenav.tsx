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
  IconCirclePlus,
  IconCirclePlus2,
  IconPackageImport,
  IconPlus,
  IconRoute,
  IconTemplate,
  IconTrash,
} from '@tabler/icons-react';
import { usePages, useUser, useWorkspaces } from '@/hooks';
import classes from './AppSidenav.module.css';
import _ from 'lodash';
import { IPage, IWorkspace } from '@/types';

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
        leftSection={<IconCirclePlus size={ICON_SIZE} />}
        className={classes.link}
      />
      <AppShell.Section grow component={ScrollArea}>
        <AppShell.Section mb="md">
          <Text tt="capitalize" size="sm" py="sm" fw={600}>
            Workspaces
          </Text>
          {navWorkspaces?.map((navWorkspace) => (
            <NavLink
              key={navWorkspace.workspace?.id}
              label={navWorkspace.workspace?.name}
              leftSection={
                <Avatar src={navWorkspace.workspace?.icon} size={ICON_SIZE} />
              }
              className={classes.linkHeader}
              classNames={{
                root: classes.link,
                children: classes.linkChildren,
              }}
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
                />
              ))}
            </NavLink>
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <Text tt="capitalize" size="sm" py="sm" fw={600}>
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
