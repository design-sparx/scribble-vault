import {
  Avatar,
  Group,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import {
  IconChevronDown,
  IconLogout,
  IconMessageStar,
  IconRefresh,
  IconSettings,
} from '@tabler/icons-react';
import { IUser } from '@/types';
import classes from './UserButton.module.css';
import { ErrorAlert } from '@/components/ErrorAlert';

type UserButtonProps = {
  loading: boolean;
  error: any;
  user?: IUser;
  wIcon?: boolean;
  wEmail?: boolean;
} & UnstyledButtonProps;

export const UserButton = (props: UserButtonProps) => {
  const { user, loading, error, wIcon, wEmail, ...others } = props;

  if (error) {
    return <ErrorAlert title="Error loading user" message={error.toString()} />;
  }

  return (
    <Menu>
      <Menu.Target>
        <Skeleton visible={loading}>
          <UnstyledButton className={classes.user} {...others}>
            <Group>
              <Avatar src={user?.avatar} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {user?.name}
                </Text>

                {wEmail && (
                  <Text c="dimmed" size="xs">
                    {user?.email}
                  </Text>
                )}
              </div>

              {wIcon && <IconChevronDown size={18} />}
            </Group>
          </UnstyledButton>
        </Skeleton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size={18} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageStar size={18} />}>
          Feedback
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconRefresh size={18} />}>Sync</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size={18} />} c="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
