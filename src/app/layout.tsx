'use client';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';

import {
  ActionIcon,
  AppShell,
  Avatar,
  ColorSchemeScript,
  Flex,
  Group,
  MantineProvider,
  NavLink,
  Paper,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import { myTheme } from '@/theme';
import {
  IconBell,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconPackageImport,
  IconPlus,
  IconRoute,
  IconSearch,
  IconTemplate,
  IconTrash,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { usePages, useUser, useWorkspaces } from '@/hooks';
import { useEffect, useState } from 'react';
import { IPage, IWorkspace } from '@/types';
import _ from 'lodash';
import { inter } from '@/app/fonts';
import { UserButton } from '@/components/UserButton';
import { Logo } from '@/components/Logo';
import { DatesProvider } from '@mantine/dates';
import { NavBtn } from '@/components/NavBtn';

import classes from './layout.module.css';

const ICON_SIZE = 18;

type INavWorkspace = { pages?: IPage[]; workspace?: IWorkspace };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { workspacesData, workspacesLoading, workspacesError } =
    useWorkspaces();
  const { pagesError, pagesLoading, pagesData } = usePages();
  const { userError, userLoading, userData } = useUser();
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
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <title>Scribble Vault</title>
        <meta
          name="description"
          content="Scribble more. Forget less. Scribble Vault."
        />

        <ColorSchemeScript />
      </head>
      <body className={classes.body}>
        <MantineProvider theme={myTheme}>
          <DatesProvider settings={{ firstDayOfWeek: 0 }}>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: { base: 200, md: 300, lg: 300 },
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
              }}
              padding="lg"
              layout="default"
              withBorder={false}
            >
              <AppShell.Header className={classes.header}>
                <Flex h="100%" px="md" align="center">
                  <Logo />
                  <ActionIcon onClick={toggleDesktop} visibleFrom="sm">
                    {desktopOpened ? (
                      <IconLayoutSidebarLeftCollapse size={ICON_SIZE} />
                    ) : (
                      <IconLayoutSidebarRightCollapse size={ICON_SIZE} />
                    )}
                  </ActionIcon>
                  <ActionIcon onClick={toggleMobile} hiddenFrom="sm">
                    {mobileOpened ? (
                      <IconLayoutSidebarLeftCollapse size={ICON_SIZE} />
                    ) : (
                      <IconLayoutSidebarRightCollapse size={ICON_SIZE} />
                    )}
                  </ActionIcon>
                  <NavBtn action="back" asIcon />
                  <NavBtn action="forward" asIcon />
                  <TextInput
                    leftSection={<IconSearch size={ICON_SIZE} />}
                    placeholder="search"
                  />
                  <ActionIcon>
                    <IconBell size={ICON_SIZE} />
                  </ActionIcon>
                </Flex>
              </AppShell.Header>
              <AppShell.Navbar px="md" className={classes.sidenav}>
                <AppShell.Section>
                  <UserButton
                    user={userData}
                    error={userError}
                    loading={userLoading}
                  />
                </AppShell.Section>
                <AppShell.Section grow component={ScrollArea}>
                  <Text
                    c="dimmed"
                    tt="uppercase"
                    size="sm"
                    px="sm"
                    pb="sm"
                    fw={600}
                  >
                    Workspaces
                  </Text>
                  {navWorkspaces?.map((navWorkspace) => (
                    <NavLink
                      key={navWorkspace.workspace?.id}
                      label={navWorkspace.workspace?.name}
                      leftSection={
                        <Avatar
                          src={navWorkspace.workspace?.icon}
                          size={ICON_SIZE}
                        />
                      }
                      childrenOffset={28}
                    >
                      {navWorkspace.pages?.slice(0, 5)?.map((navPage) => (
                        <NavLink
                          key={navPage.id}
                          label={
                            <Text lineClamp={1} size="sm">
                              {navPage.name}
                            </Text>
                          }
                          leftSection={
                            <Avatar src={navPage.icon} size={ICON_SIZE} />
                          }
                        />
                      ))}
                    </NavLink>
                  ))}
                  <NavLink
                    label="Add page"
                    leftSection={<IconPlus size={ICON_SIZE} />}
                  />
                  <Text
                    c="dimmed"
                    tt="uppercase"
                    size="sm"
                    px="sm"
                    pb="sm"
                    fw={600}
                  >
                    Quick actions
                  </Text>
                  <NavLink
                    label="Templates"
                    leftSection={<IconTemplate size={ICON_SIZE} />}
                  />
                  <NavLink
                    label="Import"
                    leftSection={<IconPackageImport size={ICON_SIZE} />}
                  />
                  <NavLink
                    label="Updates"
                    leftSection={<IconRoute size={ICON_SIZE} />}
                  />
                  <NavLink
                    label="Trash"
                    leftSection={<IconTrash size={ICON_SIZE} />}
                  />
                </AppShell.Section>
              </AppShell.Navbar>
              <AppShell.Main className={classes.main}>
                <Paper bg="none">{children}</Paper>
              </AppShell.Main>
            </AppShell>
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
