import { IconCalendarTime } from '@tabler/icons-react';
import { Group, Stack, Text } from '@mantine/core';
import { createElement } from 'react';

type DateViewProps = {
  label: string;
  date?: string;
  icon?: any;
};

export const DateView = ({ date, icon, label }: DateViewProps) => {
  return (
    <Stack gap={4}>
      <Text>{label}</Text>
      <Group gap={4}>
        {icon ? createElement(icon) : <IconCalendarTime />}
        <Text>{date}</Text>
      </Group>
    </Stack>
  );
};
