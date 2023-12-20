import { ActionIcon, Flex, FlexProps, TextInput } from '@mantine/core';
import { Logo } from '@/components/Logo';
import {
  IconBell,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconSearch,
} from '@tabler/icons-react';
import { NavBtn } from '@/components/NavBtn';
import { useDisclosure } from '@mantine/hooks';

const ICON_SIZE = 18;

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

  return (
    <Flex h="100%" px="md" align="center" {...others}>
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
  );
};
