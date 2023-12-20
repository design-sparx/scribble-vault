import {
  ActionIcon,
  ActionIconProps,
  Flex,
  FlexProps,
  TextInput,
  Tooltip,
  Image,
} from '@mantine/core';
import { Logo } from '@/components/Logo';
import {
  IconBell,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconSearch,
} from '@tabler/icons-react';
import { NavBtn } from '@/components/NavBtn';
import { useWorkspaces } from '@/hooks';
import { SearchSpotlight } from '@/components/SearchSpotlight';
import classes from './AppHeader.module.css';
import { useRouter } from 'next/navigation';
import { PATH_WORKSPACE } from '@/constants/routes';
import { spotlight } from '@mantine/spotlight';

const ICON_SIZE = 20;

const ACTION_PROPS: ActionIconProps = {
  variant: 'subtle',
  size: 'md',
  color: 'dark',
};

type AppHeaderProps = {
  desktopOpened: boolean;
  mobileOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
} & FlexProps;

export const AppHeader = (props: AppHeaderProps) => {
  const {
    toggleDesktop,
    toggleMobile,
    mobileOpened,
    desktopOpened,
    ...others
  } = props;
  const { workspacesData } = useWorkspaces();
  const { push } = useRouter();

  return (
    <Flex
      h="100%"
      px="md"
      align="center"
      justify="space-between"
      className={classes.root}
      {...others}
    >
      <Flex gap="xs" align="center">
        <Tooltip label="collapse sidebar">
          <ActionIcon
            onClick={toggleDesktop}
            visibleFrom="sm"
            {...ACTION_PROPS}
          >
            {desktopOpened ? (
              <IconLayoutSidebarLeftCollapse size={ICON_SIZE} />
            ) : (
              <IconLayoutSidebarRightCollapse size={ICON_SIZE} />
            )}
          </ActionIcon>
        </Tooltip>
        <Tooltip label="collapse sidebar">
          <ActionIcon onClick={toggleMobile} hiddenFrom="sm" {...ACTION_PROPS}>
            {mobileOpened ? (
              <IconLayoutSidebarLeftCollapse size={ICON_SIZE} />
            ) : (
              <IconLayoutSidebarRightCollapse size={ICON_SIZE} />
            )}
          </ActionIcon>
        </Tooltip>
        <Logo />
      </Flex>
      <Flex gap="xs" align="center">
        <NavBtn
          action="back"
          asIcon
          iconSize={ICON_SIZE}
          actionProps={ACTION_PROPS}
        />
        <NavBtn
          action="forward"
          asIcon
          iconSize={ICON_SIZE}
          actionProps={ACTION_PROPS}
        />
        <TextInput
          leftSection={<IconSearch size={16} />}
          placeholder="search"
          size="sm"
          w={600}
          onClick={spotlight.open}
        />
      </Flex>
      <Tooltip label="Notifications">
        <ActionIcon {...ACTION_PROPS}>
          <IconBell size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <SearchSpotlight
        actions={[
          {
            group: 'Quick links',
            actions:
              workspacesData?.map((workspace) => ({
                id: workspace.id,
                label: workspace.name,
                onClick: () => push(PATH_WORKSPACE.details(workspace.id)),
                leftSection: (
                  <Image
                    src={workspace.icon}
                    alt={workspace.name}
                    h={24}
                    w={24}
                  />
                ),
              })) || [],
          },
        ]}
      />
    </Flex>
  );
};
