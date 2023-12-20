import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  UnstyledButtonProps,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { IUser } from '@/types';
import classes from './UserButton.module.css';

type UserButtonProps = {
  user?: IUser;
  loading: boolean;
  error: any;
  wIcon?: boolean;
} & UnstyledButtonProps;

export const UserButton = (props: UserButtonProps) => {
  const { user, loading, error, wIcon, ...others } = props;

  return (
    <UnstyledButton className={classes.user} {...others}>
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
