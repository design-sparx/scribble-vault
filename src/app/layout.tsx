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
import { PATH_PAGE } from '@/constants/routes';
import { AppSidenav } from '@/components/AppSidenav';
import { AppHeader } from '@/components/AppHeader';

const ICON_SIZE = 18;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
                <AppHeader
                  mobileOpened={mobileOpened}
                  toggleMobile={toggleMobile}
                  desktopOpened={desktopOpened}
                  toggleDesktop={toggleDesktop}
                />
              </AppShell.Header>
              <AppShell.Navbar px="md" className={classes.sidenav}>
                <AppSidenav />
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
