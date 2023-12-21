import { Stack, Loader, Text } from '@mantine/core';

export default function Loading() {
  return (
    <Stack align="center" py="xl">
      <Loader size="xl" />
      <Text>Please wait...</Text>
    </Stack>
  );
}
