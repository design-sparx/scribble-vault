import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { IUser } from '@/types';
import classes from './UserButton.module.css';

type UserButtonProps = {
  user?: IUser;
  loading: boolean;
  error: any;
  wIcon?: boolean;
};

export const UserButton = ({
  user,
  loading,
  error,
  wIcon,
}: UserButtonProps) => {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={user?.avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </div>

        {wIcon && (
          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        )}
      </Group>
    </UnstyledButton>
  );
};
