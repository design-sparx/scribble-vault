import { Stack, Loader, Text } from '@mantine/core';

export default function Loading() {
  return (
    <Stack>
      <Loader size="lg" />
      <Text>Please wait...</Text>
    </Stack>
  );
}
