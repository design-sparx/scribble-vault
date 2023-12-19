import { Box, BoxProps, Center, Image, Stack, Text } from '@mantine/core';

type EmptyProps = BoxProps;

export const Empty = ({ ...others }: EmptyProps) => {
  return (
    <Box h={500} {...others}>
      <Stack align="center" justify="center" style={{ height: '100%' }}>
        <Image src="/img/empty-box.png" alt="empty icon" h={96} w={96} />
        <Text>Have a marvelous day off, Kelvin!</Text>
      </Stack>
    </Box>
  );
};
